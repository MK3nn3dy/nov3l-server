require("dotenv").config();
const winston = require("winston");

// variables
const CHAINSAFE_API_KEY = process.env.CHAINSAFE_API_KEY;

// setup winston
const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});

// function to download file
const downloadPDFFile = async (req, res) => {
  // get chainsafeId from URL
  const { chainsafeId } = req.params;

  // request path object:
  let downloadPDFBody = {
    path: `/scripto_scripts/${chainsafeId}`,
  };

  try {
    let response = await fetch(
      "https://api.chainsafe.io/api/v1/bucket/ff65fe1f-c820-4f5c-badf-5e5ecf041bec/download",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CHAINSAFE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(downloadPDFBody),
      }
    );

    let blob = await response.blob();

    res.type(blob.type);

    blob.arrayBuffer().then((buf) => {
      res.send(Buffer.from(buf));
    });
  } catch (error) {
    logger.info("An error occured in the downloadPDFFile function");
    logger.info("Winston logger worked. The error was: ");
    logger.info(error);
    console.log("The error caught was:", error);
  }
};

module.exports = downloadPDFFile;
