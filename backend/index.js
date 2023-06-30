const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

// local imports
// routers
const chainsafeRouter = require("./routes/ChainsafeRoutes.js");

// create app
const app = express();

// variables
const PORT = process.env.NOV3LPORT || 9001;

// middleware
app.use(cors());
app.use(express.json());

// multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// listen
app.listen(PORT, () => {
  console.log(`Scrypto local backend now listening on port: ${PORT}`);
});

// routes
app.use("/api/v1/chainsafe", chainsafeRouter);
