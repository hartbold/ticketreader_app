import React, { useState } from 'react';

function UploadButton() {

  const url = process.env.REACT_APP_API_LURL;

  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('hash', process.env.SERVER_APIKEY);
    formData.append('image', image);

    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <input type="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadButton;

