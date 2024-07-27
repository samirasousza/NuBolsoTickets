export const ImageToBase64 = (imagePath, callback) => {
    fetch(imagePath)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.error('Error converting image to Base64:', error);
      });
  };
  