import v2 from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

export default v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✅ Loaded" : "❌ Not Loaded",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ Not Loaded",
});


