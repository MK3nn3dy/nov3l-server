const fs = require("fs");
require("dotenv").config();

const CHAINSAFE_API_KEY = process.env.CHAINSAFE_API_KEY;

const createMetadata = async (req, res) => {
  // get request body variables:
  const { title, address, cid } = req.body;

  // create URI object
  const NFTURIObject = {
    title: title,
    description: `An NFT to prove ownership of the work with cid ${cid}`,
    image: "ipfs://QmPaZqaN717Qz7KPcD1dNMAxQA7CcYLLfrSwZmwZjJWfz7",
    attributes: {
      cid: cid,
      validitiy:
        "Invalid if the work with the cid referenced contains without permission material copyrighted at an earlier date by another party.",
    },
    animation_url: "ipfs://QmUdLs8TfSDXvFn1yWdhowcfsZRCg9jgyqqUZq519EqWAw",
  };

  // create a filename variable
  let fileName = `${title}-${address}.json`;
  let path = "/NFTURIFolder";

  // string version of URI as "jsonData"
  const jsonData = JSON.stringify(NFTURIObject, null, 2);

  // AWAIT writing the JSON data to a file
  fs.writeFileSync(`${fileName}.json`, jsonData, (err) => {
    if (err) {
      console.error("Error creating JSON file:", err);
      return res.status(500).send("Error creating JSON file");
    }
  });

  // AWAIT reading the created file
  const fileData = fs.readFileSync(`${fileName}.json`);

  // Create a Blob from the file data
  const blobVersion = new Blob([fileData], { type: "application/json" });

  // call IPFS with this blob:
  const formData = new FormData();
  formData.append("file", blobVersion, fileName);
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

  responseObject = await response.json();

  // delete `${fileName}.json` on server
  fs.unlink(`${fileName}.json`);

  // send response object as json
  res.json(responseObject);
};

module.exports = createMetadata;
