import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";

const ImagePick = ({ image, setImage }) => {
  const [images, setImages] = useState([]);
  const onChange = (imageList, addUpdateIndex) => {
    var listUrl = [];
    imageList.map((item) => {
      listUrl.push(item.data_url);
    });
    setImage(listUrl);
    setImages(imageList);
  };

  useEffect(() => {
    var listUrl = Array.from(image);
    images.map((item) => {
      listUrl.push(item.data_url);
    });
    setImage(listUrl);
  }, [setImages]);

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={10}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button
              class="default-btn"
              type="button"
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Upload image
            </button>

            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button
                    class="default-btn"
                    type="button"
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </button>
                  <button
                    class="default-btn"
                    type="button"
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImagePick;
