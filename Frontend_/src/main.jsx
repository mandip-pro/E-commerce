import React from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ScrollToTop from './Component/ScrollToTop.js'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51R9pDIPSfcJAPxjyPhTCtoBsMNuKF3ghPkxDxOC6i0j7uKFYqNoItt4ct6SC7YrHy5rzRRsdXLyGU4DmwC0NUb3G00M3oG5w6a");


createRoot(document.getElementById('root')).render(
  
  <Elements stripe={stripePromise}>
  <BrowserRouter>
  <ScrollToTop/>
    <App />
  </BrowserRouter>
</Elements>
)
