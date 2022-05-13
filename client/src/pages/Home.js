import React from "react";
import { useQuery } from "@apollo/client";

import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

import { QUERY_THOUGHTS, QUERY_IMAGE } from "../utils/queries";
import ImageManager from "../components/ImageManager";
import Auth from "../utils/auth";

const Home = () => {
  const { loading, data } = useQuery(QUERY_IMAGE);
  const images = data?.images || [];

  // if (!imageURLList.length) {
  //   return <h3>Upload your image Files!</h3>;
  // }

  return (
    <main>
      <h3>
        Managing your photoshoot images has never been easy but now possible!
      </h3>

      {Auth.loggedIn() ? (
        <div className="flex-row justify-center">
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: "1px dotted #1a1a1a" }}
          >
            <ImageManager test="test" />
          </div>

          {/* <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div> */}
        </div>
      ) : (
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <h4>Historically Uploaded Images</h4>
              <div className="flex-row my-4">
                {images &&
                  images.map((image) => (
                    <div key={image._id} className="col-12 mb-3 pb-3">
                      <div className="p-3 text-light">
                        <h5 className="card-header bg-dark">
                          style={image.style.styleCode} colour=
                          {image.colour.colourCode} filename=
                          {image.imageName} type={image.imageName.split('-')[2]}{" "}
                          upload=
                          {image.imageName.split('-')[3]}
                        </h5>
                        <h5 className="card-header">
                          <img src={image.imageURL} width="100" height="100" />
                        </h5>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Home;
