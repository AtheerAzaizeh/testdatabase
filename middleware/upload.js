const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "profilePicture") {
            cb(null, 'uploads/profile_pictures/');
        } else if (file.fieldname === "certificateFile") {
            cb(null, 'uploads/certificates/');
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;