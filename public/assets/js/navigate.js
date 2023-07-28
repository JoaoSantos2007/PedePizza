import url from './url.js';

function navigate(path) {
  if (path === '.') {
    window.location.reload();
  }

  const newUrl = url + path;
  window.location.assign(newUrl);
}

export default navigate;
