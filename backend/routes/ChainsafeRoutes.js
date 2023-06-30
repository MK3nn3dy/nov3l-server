// imports
const express = require("express");
require("dotenv").config();
const multer = require("multer");

// controller imports
const uploadPDFFile = require("../controllers/UploadPDF");
const downloadPDFFile = require("../controllers/DownloadPDF");
const createMetadata = require("../controllers/CreateMetadata");

// create router
const router = express.Router();

// multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- chainsafe interaction endpoints --- //

// upload a script
router.post("/scripts/upload", upload.single("file"), uploadPDFFile);

// download a single script
router.get("/scripts/download/:chainsafeId", downloadPDFFile);

// create and upload metadata
router.post("/scripts/createmetadata", createMetadata);

module.exports = router;
