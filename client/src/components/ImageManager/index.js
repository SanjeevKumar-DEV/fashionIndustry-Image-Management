import React, { useState, useRef } from "react";

import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

import ImageList from "../ImageList";

const ImageManager = (props) => {
  const [myUploadedImage, setMyUploadedImage] = useState("");
  const imageURLList = useRef([]);
  const [triggerRender, setTriggerRender] = useState(false);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "pim-assets",
    },
  });
  // cld.image returns a CloudinaryImage with the configuration set.
  let myImage = cld.image("v1651560530/fhjbdqhsgp6v56sjq8k2.jpg");

  var myWidget = window.cloudinary?.createUploadWidget(
    {
      cloudName: "pim-assets",
      uploadPreset: "pim-asset-upload",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        imageURLList.current.push({
          id: Math.floor(Math.random() * 100000000 + 1),
          imageURL: result.info.url,
          original_filename: result.info.original_filename,
        });
        console.log(imageURLList);
        setTriggerRender(Math.floor(Math.random() * 100000000 + 1));
      }
    }
  );

  const uploadFiles = async (event) => {
    event.preventDefault();
    myWidget.open();
  };

  // const startProcessing = async (event) => {
  //   event.preventDefault();
  //   setTriggerRender(true);

  // }

  // The URL of the image is: https://res.cloudinary.com/demo/image/upload/sample

  // Render the image in a React component.
  return (
    <div>
      {/* <AdvancedImage cldImg={myImage} /> */}
      {/* <div><img src={myUploadedImage} width="500" height="600" />
      </div> */}

      <div>
        <ImageList imageURLList={imageURLList.current} render={triggerRender} />
        <button
          id="upload_widget"
          className="cloudinary-button btn btn-lg btn-info m-2"
          onClick={uploadFiles}
        >
          Upload files
        </button>
      </div>

      {/* <div className="col-12 mb-3 pb-3"> */}
      {/* <button id="add-Colour-Code" className="cloudinary-button" onClick={startProcessing}>Start Processing</button> */}
      {/* </div> */}
    </div>
  );
};

export default ImageManager;
