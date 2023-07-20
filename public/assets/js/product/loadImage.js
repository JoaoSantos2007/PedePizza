import url from '../url.js';

const loadImg = (imgName) => new Promise((resolve, reject) => {
  try {
    if (!imgName) throw new Error('Img not found!');
    const imgPath = `${url}/uploads/${imgName}`;

    fetch(imgPath).then((res) => {
      res.blob().then((file) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => resolve(img);
      }).catch((err) => {
        throw err;
      }).catch((err) => {
        throw err;
      });
    });
  } catch (err) {
    reject(err);
  }
});

export default loadImg;
