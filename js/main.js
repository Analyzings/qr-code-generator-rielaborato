const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if (url === '') {
       alert('Inserisci un URL.');
    } else {
      showSpinner();

      setTimeout(() => {
        hideSpinner();

        generateQRCoode(url, size);

        setTimeout(() => {
          const saveUrl = qr.querySelector('img').src;
          createSaveBtn(saveUrl)
        }, 50);
      }, 1200);
    }
};

const generateQRCoode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    });
};

function showSpinner() {
  document.querySelector("#spinner").style.display = "block";
  document.querySelector("body").classList.add("THIS.exampleHolder");
}

function hideSpinner() {
 document.querySelector("#spinner").style.display = "none";
}

const clearUI = () => {
  qr.innerHTML = '';
  const SaveLink = document.getElementById('save-link');
  if (SaveLink) SaveLink.remove();
}

const createSaveBtn =(saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList = 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5'
  link.href = saveUrl
  link.download = 'qrcode';
  link.innerHTML = 'Salva Immagine'
  document.getElementById('generated').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);