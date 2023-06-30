require("dotenv").config();

// variables
const CHAINSAFE_API_KEY = process.env.CHAINSAFE_API_KEY;

// function to upload PDF
const uploadPDFFile = async (req, res) => {
  const file = req.file.buffer;
  const path = req.body.path;
  const fileName = req.body.fileName;

  // Send file data to Chainsafe's API
  const formData = new FormData();
  formData.append("file", new Blob([file]), fileName);
  formData.append("path", path);

  let response = await fetch(
    "https://api.chainsafe.io/api/v1/bucket/ff65fe1f-c820-4f5c-badf-5e5ecf041bec/upload",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CHAINSAFE_API_KEY}`,
      },
      body: formData,
    }
  );

  // We need to send this pdf's
  responseObject = await response.json();
  res.json(responseObject);
};

module.exports = uploadPDFFile;
