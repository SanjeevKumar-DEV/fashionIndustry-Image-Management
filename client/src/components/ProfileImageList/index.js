import React from "react";

import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { USER_UPLOADED_IMAGES } from "../../utils/queries";

const ProfileImageList = ({ username }) => {

    const { loading, data } = useQuery(USER_UPLOADED_IMAGES, {
        variables: { username: username },
      });

    if (loading) {
        return <h3>Upload your image Files!</h3>;
      }

      const renderedImageList = data.userImages.images.map((image) => {
        if (image.imageName.split("_").length === 4) {
          let imageSeparated = image.imageName.split("_");
          return {
            id: image._id,
            imageURL: image.imageURL,
            styleCode: imageSeparated[0],
            colourCode: imageSeparated[1],
            imageType: imageSeparated[2],
            imageNumber: imageSeparated[3],
            original_filename: image.imageName,
          };
        }
    });
    
    return (
        <>
          <h3
            className="p-5 display-inline-block"
            style={{ borderBottom: "1px dotted #1a1a1a" }}
          >
            Add Update Delete Your Uploaded Images
          </h3>
          <div className="flex-row my-4">
            {renderedImageList &&
              renderedImageList.map((image) => (
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
                  <div>
                  <button id="deleteThisImage" className="btn btn-lg btn-info m-2" onClick="">Delete</button>
                  <button id="updateThisImage" className="btn btn-lg btn-info m-2" onClick="">Update</button>
                  </div>
                </div>
              ))}
          </div>
          {/* <div >
          <button id="add-Colour-Code" className="btn btn-lg btn-info m-2" onClick={addColourCode}>Add Colour Style Image for Valid Images in Database</button>
          </div> */}
      </>
      );


}

export default ProfileImageList;