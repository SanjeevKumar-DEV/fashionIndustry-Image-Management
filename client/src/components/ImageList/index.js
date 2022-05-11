import React from "react";
// test now with invalid

const ImageList = ({ imageURLList = [] }) => {
  if (!imageURLList.length) {
    return <h3>Upload your image Files!</h3>;
  }
  let invalidImageList = [];
  const validImageListWithUndefined = imageURLList.map((image) => {
    if (image.original_filename.split("_").length === 4) {
      let imageSeparated = image.original_filename.split("_");
      return {
        id: image.id,
        imageURL: image.imageURL,
        styleCode: imageSeparated[0],
        colourCode: imageSeparated[1],
        imageType: imageSeparated[2],
        imageNumber: imageSeparated[3],
        original_filename: image.original_filename,
      };
    }
    else {
      invalidImageList.push(image);
    }
  });
  console.log(validImageListWithUndefined);
  const validImageList = validImageListWithUndefined.filter((image) => {
    if (image === "undefined") {
    } else {
      return image;
    }
  });
  console.log(validImageList);
  console.log(invalidImageList);
  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: "1px dotted #1a1a1a" }}
      >
        Valid Uploaded Images
      </h3>
      <div className="flex-row my-4">
        {validImageList &&
          validImageList.map((image) => (
            <div key={image.id} className="col-12 mb-3 pb-3">
              <div className="p-3 text-light">
                <h5 className="card-header bg-dark">
                  style={image.styleCode} colour={image.colourCode} filename=
                  {image.original_filename} type={image.imageType} upload=
                  {image.imageNumber}
                </h5>
                <h5 className="card-header">
                  <img src={image.imageURL} width="100" height="100" />
                  {/* <span style={{ fontSize: '0.825rem' }}>
                    {image.original_filename}
                  </span> */}
                </h5>
                {/* <p className="card-body">{image.original_filename}</p> */}
              </div>
            </div>
          ))}
      </div>
    <h3
      className="p-5 display-inline-block"
      style={{ borderBottom: "1px dotted #1a1a1a" }}
    >
      Invalid Not Uploaded Images
    </h3>
    <div className="flex-row my-4">
      {invalidImageList &&
        invalidImageList.map((image) => (
          <div key={image.id} className="col-12 mb-3 pb-3">
            <div className="p-3 text-light">
              <h5 className="card-header bg-dark">
                filename={image.original_filename}
              </h5>
              <h5 className="card-header">
                <img src={image.imageURL} width="100" height="100" />
                {/* <span style={{ fontSize: '0.825rem' }}>
                  {image.original_filename}
                </span> */}
              </h5>
              {/* <p className="card-body">{image.original_filename}</p> */}
            </div>
          </div>
        ))}
    </div>
  </>
  );
};

export default ImageList;
