import React from "react";
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { ADD_COLOUR_WITH_CODE, ADD_STYLE_WITH_CODE, ADD_IMAGE, UPSERT_COLOUR_WITH_CODE, ADD_STYLE_CODE_COLOUR_IF_NOT_PRESENT  } from '../../utils/mutations';
import { QUERY_COLOUR_BY_COLOUR_CODE } from "../../utils/queries";
// test now with invalid test test test test test test test test test test test

const ImageList = ({ imageURLList = [], render }) => {

  // const [addColour, { colourError}] = useMutation(ADD_COLOUR_WITH_CODE);
  const [addColour, { colourError }] = useMutation(UPSERT_COLOUR_WITH_CODE);
  // const [addStyle, { styleError }] = useMutation(ADD_STYLE_WITH_CODE);
  const [addStyle, { styleError }] = useMutation(ADD_STYLE_CODE_COLOUR_IF_NOT_PRESENT);
  const [addImage, { imageError }] = useMutation(ADD_IMAGE);

  const [getExistingColourId, { loading, data } ] = useLazyQuery(QUERY_COLOUR_BY_COLOUR_CODE);

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

//   let counter = 1;
//   if (counter === 1)
//   {
//   addColour({
//     variables: {colourCode : 200000001}
//   });
//   // console.log(data);
//   counter++
// }
  const addImageData = async (event, image, styleId, colourId) => {
    event.preventDefault();
    try {
      const { data } = await addImage({
        variables : {
          imageName: image.original_filename, 
          imageURL: image.imageURL, 
          style: styleId, 
          colour: colourId
        }
      })
      console.log(data);
    }
    catch (event) {
      console.log(event);
      console.log(imageError);
    }

  };
  
  const addStyleCode = async (event, image, colourId) => {
    event.preventDefault();
    try {
      const { data } = await addStyle({
        variables: {
          styleCode : parseInt(image.styleCode),
          colours : [colourId]
        }
      });
      console.log(data);
      addImageData(event, image, data.addStyleWithStyleCodeIfNotPresent._id, colourId);

    }
    catch (event) {
      console.error(event);
      console.error(styleError);
    }
  }
  
  const addColourCode = (event) => { 
    event.preventDefault();
    validImageList.map( async (image) => {
      console.log("Image : ");
      console.log(image);
      // const { data } = await getExistingColourId({variables: {colourCode : parseInt(image.colourCode)}});
      // console.log(data);
      // while(loading) {
        
      // }
      // if(data.getColourCode === null)
      // {
        try {
          const { data } = await addColour({
            variables: {colourCode : parseInt(image.colourCode)}
          });
          console.log(data);
          addStyleCode(event, image, data.addColourWithColourCodeNotPresent._id);
        } catch (event) {
          console.error(event);
          console.error(colourError);
        }

      // }
      // else {
      //   // 
      //   addStyleCode(event, image, data.getColourCode._id);
      // }
    
    console.log(image);
    return image;
    //window.location.reload();

  });
}
  
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
                </h5>
              </div>
            </div>
          ))}
      </div>
      <div >
      <button id="add-Colour-Code" className="cloudinary-button" onClick={addColourCode}>Add Colour Style Image for Valid Images in Database</button>
      </div>
    <h3
      className="p-5 display-inline-block"
      style={{ borderBottom: "1px dotted #1a1a1a" }}
    >
      Invalid Images Not Uploaded
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
              </h5>
            </div>
          </div>
        ))}
    </div>
  </>
  );
};

export default ImageList;
