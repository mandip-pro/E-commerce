import React, { useEffect, useState } from "react";
import toast,{Toaster} from "react-hot-toast";
import "./Buy.css";
import { useNavigate,useLocation } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
function Buy() {
  const token=localStorage.getItem('user')
  const location = useLocation();
    const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user,setUser]=useState({})
  const [product, setProduct] = useState({});
  const [secret, setSectet] = useState();
  const [error, setError] = useState();
  const [total, setTotal] = useState();
  const [quantity,setQuantity]=useState([])
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  useEffect(() => {
    try {
      let user=localStorage.getItem("userDetail")
      const clientSecret = location.state.secret;
      const buyingProducts = location.state.data;
      const sum = location.state.price;
      const ids=location.state.quantity;
      setProduct(buyingProducts);
      setSectet(clientSecret);
      setTotal(sum);
      setQuantity(ids)
      user=JSON.parse(user)
      setUser(user)
      
    } catch (err) {
      setError(err);
    }
  }, []);

  const postOrder=async(paymentInfo)=>{
    const data={
      "productIds":quantity,
      "productDetails":product,
      "userId":user._id,
      "email":user.email,
      "paymentId":paymentInfo.paymentId,
      "amount":total,
      "status":paymentInfo.status
    }
    let responce=await fetch("http://127.0.0.1:3000/api/order",{
      method:"post",
      headers:{
        'Content-Type': 'application/json',
      } ,
    
    body:JSON.stringify(data)})
    responce=await responce.json()
    console.log(responce)
  }
  
  const handlePurchase = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or element not found");
      return;
    }
    setLoading(true)
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      console.log("card element not found");
      setLoading(false);

      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("stripe payment method error: ", error);
      setLoading(false);
      setCardError(error.message);
      return;
    }
    console.log("[PaymentMethod created]: ", paymentMethod);

    if (!secret) {
      console.log("no client secret found");
      setLoading(false);

      return;
    }
    try {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(secret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user.email.split('@')[0]
            },
          },
        });

      if (confirmError) {
        setCardError(confirmError.message);
        setLoading(false);
      } else if (paymentIntent.status === "succeeded") {
        // console.log("Payment succeeded: ", paymentIntent);

        // console.log("Payment Intent Details:", paymentIntent);

        const paymentInfo = {
          userId: user._id,
          email:user.email,
          paymentId: paymentIntent.id,
          amount: paymentIntent.amount,
          status: paymentIntent.status,
        };
        // console.log("Payment info:", paymentInfo);
        toast.success("Successful Payment")
        postOrder(paymentInfo)
        navigate('/orders')
        quantity.map((id)=>{
          handleCross(id)
        })
        // Do something with paymentInfo here, like save to database or show a confirmation
      } else {
        console.log(
          "Payment failed or not completed yet. Status:",
          paymentIntent.status
        );
      }
    } catch (err) {
      console.error("Error confirming payment: ", err);
      setCardError(
        "An error occurred while confirming the payment. Please try again."
      );
      setLoading(false);
    }
  };

  const handleCross = async (a) => {
    let responce=await fetch(
      "http://127.0.0.1:3000/api/users/purchase/" + a,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      responce=await responce.json()
      console.log(responce)
    
  }

  return (
    <>
      {error ? (
        <div className="error-container">
          <div className="error-message">
            <p className="error-text">{error}</p>
            <Link className="error-link" to={"/purchases"}>
              Purchases
            </Link>
          </div>
        </div>
      ) : (
        <div className="order-container">
          <div className="order-details">
            <h1 className="order-title">Order Details</h1>
            <div className="order-price">
              <h2 className="price-label">Total Price</h2>
              <p className="price-value">${total}</p>
            </div>
          </div>
          <div className="payment-container">
            <div className="payment-form">
              <h2 className="payment-title">Process your Payment!</h2>
              <div className="card-input">
                <label className="card-label" htmlFor="card-number">
                  Credit/Debit Card
                </label>
                <form onSubmit={handlePurchase}>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!stripe || loading} // Disable button when loading
                    className="submit-button"
                  >
                    {loading ? "Processing..." : "Pay"}
                  </button>
                </form>
                {cardError && <p className="card-error">{cardError}</p>}
              </div>

              <button className="other-payment-method">
                <span className="payment-icon">🅿️</span> Other Payments Method
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster/>
    </>
  );
}

export default Buy
