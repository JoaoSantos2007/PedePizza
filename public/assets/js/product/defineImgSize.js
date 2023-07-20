const defineImgSize = (img) => {
  const windowWidth = window.innerWidth;

  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;

  // define ideal Width
  let idealWidth;
  if (windowWidth > 768) {
    idealWidth = windowWidth * 0.5;
  } else {
    idealWidth = windowWidth * 0.95;
  }

  // calculate ideal Height
  const idealHeight = (idealWidth * imgHeight) / imgWidth;

  return ({ idealWidth, idealHeight });
};

export default defineImgSize;
