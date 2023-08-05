const reader = new FileReader();
const inputFile = document.querySelector('#inputFile');
const dropZone = document.querySelector('.dropzone');

function getFile() {
  const file = inputFile.files[0];
  return file;
}

function showImage(image) {
  document.querySelector('.dropzone__main').classList.add('dropzone__main--hidden');

  const uploadedImage = document.querySelector('.dropzone__image');
  uploadedImage.classList.add('dropzone__image--show');
  uploadedImage.src = image;
}

function onFile() {
  const file = getFile();

  const image = URL.createObjectURL(file);
  showImage(image);

  reader.readAsText(file);
}

function handleDropZoneEvents() {
  inputFile.addEventListener('dragenter', () => {
    dropZone.classList.add('dropzone--dragging');
  });

  inputFile.addEventListener('dragleave', () => {
    dropZone.classList.remove('dropzone--dragging');
  });

  inputFile.addEventListener('dragdrop', () => {
    onFile();
  });

  inputFile.addEventListener('change', () => {
    onFile();
  });
}

export { handleDropZoneEvents, getFile };
