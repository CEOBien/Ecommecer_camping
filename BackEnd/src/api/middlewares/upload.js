const config = require("../../../config/config.js").config;
const multer = require("multer");
require("dotenv").config();

const appCreateStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + process.env.UPLOADED_FOLDER + "/apps");
  },
  filename: function (req, file, callback) {
    const appId = req.appId;
    let endName = undefined;
    if (file.mimetype === "image/jpeg" || file.mimetype == "image/jpg") {
      endName = "jpg";
    } else if (file.mimetype == "image/png") {
      endName = "png";
    }
    const fileName = `${appId}_${new Date().getTime()}.${endName}`;
    // console.log('name :', `${appId}_${new Date().getTime()}.${endName}`)
    callback(null, fileName);
  },
});
const moduleCreateStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + process.env.UPLOADED_FOLDER + "/modules");
  },
  filename: function (req, file, callback) {
    const moduleId = req.moduleId;
    let endName = undefined;
    if (file.mimetype === "image/jpeg" || file.mimetype == "image/jpg") {
      endName = "jpg";
    } else if (file.mimetype == "image/png") {
      endName = "png";
    }
    const fileName = `${moduleId}_${new Date().getTime()}.${endName}`;
    // console.log('name :', `${moduleId}_${new Date().getTime()}.${endName}`)
    callback(null, fileName);
  },
});
const appUpdateStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + process.env.UPLOADED_FOLDER + "/apps");
  },
  filename: function (req, file, callback) {
    console.log(req);
    const appId = req.params.id;
    let endName = undefined;
    if (file.mimetype === "image/jpeg" || file.mimetype == "image/jpg") {
      endName = "jpg";
    } else if (file.mimetype == "image/png") {
      endName = "png";
    }
    const fileName = `${appId}_${new Date().getTime()}.${endName}`;
    // console.log('name :', `${appId}_${new Date().getTime()}.${endName}`)
    callback(null, fileName);
  },
});
const moduleUpdateStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + process.env.UPLOADED_FOLDER + "/modules");
  },
  filename: function (req, file, callback) {
    console.log(req);
    const appId = req.params.id;
    let endName = undefined;
    if (file.mimetype === "image/jpeg" || file.mimetype == "image/jpg") {
      endName = "jpg";
    } else if (file.mimetype == "image/png") {
      endName = "png";
    }
    const fileName = `${appId}_${new Date().getTime()}.${endName}`;
    // console.log('name :', `${appId}_${new Date().getTime()}.${endName}`)
    callback(null, fileName);
  },
});

const orgCreateStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + process.env.UPLOADED_FOLDER + "/orgs");
  },
  filename: function (req, file, callback) {
    const orgId = req.orgId;
    let endName = undefined;
    if (file.mimetype === "image/jpeg" || file.mimetype == "image/jpg") {
      endName = "jpg";
    } else if (file.mimetype == "image/png") {
      endName = "png";
    }
    const fileName = `${orgId}_${new Date().getTime()}.${endName}`;
    // console.log('name :', `${orgId}_${new Date().getTime()}.${endName}`)
    callback(null, fileName);
  },
});
const orgUpdateStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + process.env.UPLOADED_FOLDER + "/orgs");
  },
  filename: function (req, file, callback) {
    console.log(req);
    const appId = req.params.id;
    let endName = undefined;
    if (file.mimetype === "image/jpeg" || file.mimetype == "image/jpg") {
      endName = "jpg";
    } else if (file.mimetype == "image/png") {
      endName = "png";
    }
    const fileName = `${appId}_${new Date().getTime()}.${endName}`;
    // console.log('name :', `${appId}_${new Date().getTime()}.${endName}`)
    callback(null, fileName);
  },
});

const userCreateStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + process.env.UPLOADED_FOLDER + "/users");
  },
  filename: function (req, file, callback) {
    const userId = req.userId;
    let endName = undefined;
    if (file.mimetype === "image/jpeg" || file.mimetype == "image/jpg") {
      endName = "jpg";
    } else if (file.mimetype == "image/png") {
      endName = "png";
    }
    const fileName = `${userId}_${new Date().getTime()}.${endName}`;
    // console.log('name :', `${userId}_${new Date().getTime()}.${endName}`)
    callback(null, fileName);
  },
});
const userUpdateStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + process.env.UPLOADED_FOLDER + "/users");
  },
  filename: function (req, file, callback) {
    // console.log(req);
    const appId = req.params.id;
    let endName = undefined;
    if (file.mimetype === "image/jpeg" || file.mimetype == "image/jpg") {
      endName = "jpg";
    } else if (file.mimetype == "image/png") {
      endName = "png";
    }
    const fileName = `${appId}_${new Date().getTime()}.${endName}`;
    // console.log('name :', `${appId}_${new Date().getTime()}.${endName}`)
    callback(null, fileName);
  },
});
// const updateExcelFileStorage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "./" + process.env.UPLOADED_FOLDER + "/excelFiles")
//   },
//   filename: function (req, file, callback) {
//     console.log(req)
//     const appId = req.params.id
//     let endName = undefined
//     if (file.mimetype === "image/jpeg" || file.mimetype == "image/jpg") {
//       endName = "jpg"
//     } else if (file.mimetype == "image/png") {
//       endName = "png"
//     }
//     const fileName = `${appId}_${new Date().getTime()}.${endName}`
//     // console.log('name :', `${appId}_${new Date().getTime()}.${endName}`)
//     callback(null, fileName)
//   },
// })
const uploadExcelFileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + process.env.UPLOADED_FOLDER + "/excelFiles");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname); // make a unique file name
  },
});
const uploadPDFFileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + process.env.UPLOADED_FOLDER + "/pdfFiles");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const uploadFileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + process.env.UPLOADED_FOLDER + "/files");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const uploadIconApp = multer({
  storage: appCreateStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png and .jpg formats are allowed!"));
    }
  },
});
const uploadIconModule = multer({
  storage: moduleCreateStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png and .jpg formats are allowed!"));
    }
  },
});
const uploadUpdateIconApp = multer({
  storage: appUpdateStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png and .jpg formats are allowed!"));
    }
  },
});
const uploadUpdateIconModule = multer({
  storage: moduleUpdateStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png and .jpg formats are allowed!"));
    }
  },
});

const uploadUpdateIconOrg = multer({
  storage: orgUpdateStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png and .jpg formats are allowed!"));
    }
  },
});
const uploadIconOrg = multer({
  storage: orgCreateStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png and .jpg formats are allowed!"));
    }
  },
});
const uploadAvatarUser = multer({
  storage: userCreateStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png and .jpg formats are allowed!"));
    }
  },
});

const uploadUpdateAvatarUser = multer({
  storage: userUpdateStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png and .jpg formats are allowed!"));
    }
  },
});

const uploadExcelFile = multer({
  storage: uploadExcelFileStorage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
  fileFilter: (req, file, cb) => {
    if (!/[^\u0000-\u00ff]/.test(file.originalname)) {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
    }
    // console.log("file.mimetype: ", file.mimetype)
    if (
      file.mimetype === "application/vnd.ms-excel" ||
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .xls and .xlsx formats are allowed!"));
    }
  },
});
const uploadPDFFile = multer({
  storage: uploadPDFFileStorage,
  fileFilter: (req, file, cb) => {
    if (!/[^\u0000-\u00ff]/.test(file.originalname)) {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
    }
    console.log("file.mimetype: ", file.mimetype);
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .pdf formats are allowed!"));
    }
  },
});
const uploadFile = multer({
  storage: uploadFileStorage,
  fileFilter: (req, file, cb) => {
    if (!/[^\u0000-\u00ff]/.test(file.originalname)) {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
    }
    // console.log("file.mimetype: ", file.mimetype);
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/heif" ||
      file.mimetype === "image/*" ||
      file.mimetype === "text/csv" ||
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/vnd.ms-excel" ||
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype ===
      "application/vnd.openxmlformatsofficedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("Only .pdf, .xls, .xlsx, .png and .jpg formats are allowed!")
      );
    }
  },
});
module.exports = {
  uploadIconApp,
  uploadUpdateIconApp,
  uploadIconModule,
  uploadUpdateIconModule,
  uploadIconOrg,
  uploadUpdateIconOrg,
  uploadAvatarUser,
  uploadUpdateAvatarUser,
  uploadExcelFile,
  uploadPDFFile,
  uploadFile,
  // sendUpload: sendUpload,
};
