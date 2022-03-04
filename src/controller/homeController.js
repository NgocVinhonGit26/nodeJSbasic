import { json } from 'body-parser'
import req from 'express/lib/request'
import res from 'express/lib/response'
import pool from '../configs/connectDB'
import multer from 'multer'

let getHomepage = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM `user`')
    return res.render('index.ejs', { dataUser: rows, test: 'abc tring test' })
}

let getDetailPage = async (req, res) => {
    let userId = req.params.id
    let [user] = await pool.execute(`select * from user where id = ?`, [userId])
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body
    await pool.execute(`insert into user (email,address,firstName,lastName)
    values (?, ?, ? ,?)`, [email, address, firstName, lastName])
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let Id = req.body.userId
    console.log('>>> check: ', Id)
    await pool.execute(`delete from user where id = ?`, [Id])
    return res.redirect('/')
}

let getEditPage = async (req, res) => {
    let id = req.params.id
    let [user] = await pool.execute(`select * from user where id = ?`, [id])
    return res.render('update.ejs', { dataUser: user[0] })
}
let postUpdateUser = async (req, res) => {
    console.log(req.body)
    let { firstName, lastName, email, address, id } = req.body

    await pool.execute(`update user set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`,
        [firstName, lastName, email, address, id])
    return res.redirect('/')
}
let uploadFile = async (req, res) => {
    return res.render('uploadFile.ejs')
}

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form


    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }


    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
}

let handleUploadMultipleFiles = async (req, res) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);


}

module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser,
    uploadFile, handleUploadFile, handleUploadMultipleFiles
}