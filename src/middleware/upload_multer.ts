import multer from "multer"
import path from "path"
import fs from "fs"


export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const __dirname = path.resolve();
            const userId = req.session.userid; // Assuming you store user ID in the session
            if (!userId) {
                return cb(null, "User ID not found in session");
            }
            const userUploadsDir = path.join(__dirname, userId.toString());

            // Create a user-specific directory if it doesn't exist
            if (!fs.existsSync(userUploadsDir)) {
                fs.mkdirSync(userUploadsDir);
            }
            cb(null, userUploadsDir);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname + "-" + Date.now() + ".jpg")
        }
    })
}).single("file")

export default upload