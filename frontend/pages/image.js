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
  console.log(files);
  return (
    <div className="min-h-screen  mx-auto py-2 bg-midNight">
      <div className="App">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="text-center mt-20 px-20 py-32 border-8 border-dashed rounded-xl mx-auto w-1/2 bg-white">
            <p className="  font-semibold text-3xl ">
              Drop or Browse Images Here
            </p>
          </div>
          <p className="text-4xl text-white font-semibold mt-8 text-center">
            Preview:
          </p>
        </div>
        <div className=" mt-8">{images}</div>
      </div>
    </div>
  );
};

export default image;
