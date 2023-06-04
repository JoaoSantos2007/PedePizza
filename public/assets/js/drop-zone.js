const reader = new FileReader();
const upload = $('#inputFile');
const dropZone = $('.drop-zone');
let pizzaIMG;

function handleDropZoneEvents() {
  upload.on('dragenter', () => {
    dropZone.addClass('dragging');
  });

  upload.on('dragleave', () => {
    dropZone.removeClass('dragging');
  });

  upload.on('dragdrop', () => {
    onFile();
  });

  upload.on('change', () => {
    onFile();
  });
}

function onFile() {
  const file = upload.prop('files')[0];
  pizzaIMG = file;

  const image = URL.createObjectURL(file);
  showImage(image);

  reader.readAsText(file);
  reader.onload = (event) => {
    const { result } = event.target;
  };
}

function showImage(image) {
  $('.drop-zone__main').addClass('hidden');
  $('.uploadedImage').addClass('show');
  $('.uploadedImage').attr('src', image);
}

export { handleDropZoneEvents, pizzaIMG };
