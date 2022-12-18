import React, { useState } from "react";

function UploadButton() {
  const REST_URL = process.env.REACT_APP_API_LURL;
  const HASH = process.env.REACT_APP_SERVER_APIKEY;

  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    // const file = event.target.files[0];
    // const reader = new FileReader();

    // reader.onloadend = () => {
    //   setImage(reader.result);
    // };

    // reader.readAsDataURL(file);
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    console.log("fetching...");

    fetch(REST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "hash": HASH ,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => handleData(data))
      .catch((error) => console.error(error));
  };

  const handleData = (data) => {
    console.log("feched ✔");

    console.log(data);
  };

  return (
    <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
      <input name="image" type="file" onChange={handleChange} />
      <button type="submit" title="Upload">Upload</button>
    </form>
  );
}

export default UploadButton;
