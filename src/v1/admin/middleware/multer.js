const multer = require('multer')
const path = require('path')

const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log("file===========>",file)
      cb(null, Date.now()+'-'+file.originalname);
  }
});

const upload = multer({ storage :filestorage,
  fileFilter : (req, file, cb) =>{
    var allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb({
            success: false,
            message: 'Invalid file type. Only jpg, png ,jpeg image files are allowed.'
        }, false);
    }
    console.log("file.mimetype============>",file.mimetype)
  }
});

module.exports = upload;