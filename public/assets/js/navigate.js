import url from './url.js';

function navigate(path) {
  const newUrl = url + path;

  window.location.assign(newUrl);
}

export default navigate;
