import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Head from "next/dist/shared/lib/head";

const image = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ));

  const uploadImage = async (event) => {
    const file = event.target.file;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", image);
  };

  console.log(files);
  return (
    <div className="items-center w-full text-center min-h-screen mx-auto py-2 bg-midNight justify-center">
      <div className="App">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="text-center mt-20 px-20 py-32 border-8 border-dashed rounded-xl mx-auto w-1/2 bg-white">
            <p className="  font-semibold text-3xl ">
              Drop or Browse Images Here
            </p>
          </div>
          <p className="text-4xl text-white font-semibold mt-8 text-center items-center justify-center">
            Preview:
          </p>
        </div>
        <div className="mt-8 justify-center items-center">{images}</div>
        <button className="bg-green hover:bg-green-500 text-midNight font-bold py-2 px-4 rounded">
          Upload Image!
        </button>
      </div>
    </div>
  );
};

export default image;
