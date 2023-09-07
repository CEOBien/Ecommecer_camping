const fs = require('fs');
const createError = require('http-errors');

module.exports = async function (req, res, next) {
    try {
        if (!req.files || Object.keys(req.files).length === 0)
            throw createError.BadRequest("No files were uploaded.")

        const file = req.files.file;

        if (file.size > 1024 * 1024 * 20) {
            removeTmp(file.tempFilePath)
            throw createError.BadRequest("Size too large." )
        } // 20mb

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            throw createError.BadRequest("File format is incorrect." )
        }
        next()
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}