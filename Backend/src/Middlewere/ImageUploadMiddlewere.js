import multer from "multer";
import fs from "fs";
class ImageUploadMiddlewere {
  folder_exists(folder) {
    const pathName = `Public/${folder}`;
    if (!fs.existsSync(pathName)) {
      fs.mkdirSync(pathName);
      return true;
    }
    return false;
  }
  upload(destination) {
    this.folder_exists(destination);

    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `Public/${destination}`);
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        let fileName = file.originalname.split(" ").join("-");
        let imageName = uniqueSuffix + "-" + fileName;
        cb(null, imageName);
      },
    });
    return multer({ storage: this.storage });
  }
}
export default ImageUploadMiddlewere;
