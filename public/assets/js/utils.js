const url = `${window.location.protocol}//${window.location.host}`;

function navigate(path) {
  const newUrl = url + path;

  window.location.assign(newUrl);
}

export {
  url, navigate,
};
