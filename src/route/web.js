import express from "express";
import homeController from '../controller/homeController'
import multer from 'multer'
import path from 'path'
import { mutateExecOptions } from "nodemon/lib/config/load";
import req from "express/lib/request";
import res from "express/lib/response";

var appRoot = require('app-root-path')

let router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter })
let uploadMultipleFIles = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 5)

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:id', homeController.getDetailPage)
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.get('/edit-user/:id', homeController.getEditPage)
    router.post('/update-user', homeController.postUpdateUser)
    router.get('/upload', homeController.uploadFile)
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)
    router.post("/upload-multiple-images", (req, res, next) => {
        uploadMultipleFIles(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
                res.send('LIMIT_UNEXPECTED_FILE')
            }
            else if (err) {
                res.send(err)
            }
            else {
                next()
            }
        })
    }, homeController.handleUploadMultipleFiles)
    router.get('/about', (req, res) => {
        res.send(`i'm PNV`)
    })

    return app.use('/', router)
}

export default initWebRoute;