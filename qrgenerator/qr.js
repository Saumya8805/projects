const textInput = document.getElementById("text");
const sizeSelect = document.getElementById("size");
const generateBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download");
const message = document.getElementById("message");
const qrBox = document.getElementById("qrcode");

function generateQR() {
    message.textContent = "";
    qrBox.innerHTML = "";
    downloadBtn.classList.add("hidden");

    const text = textInput.value.trim();

    if (text === "") {
        message.textContent = "Please enter some text or a link.";
        return;
    }

    // The library comes from the internet. Check that it loaded.
    if (typeof QRCode === "undefined") {
        message.textContent = "QR library did not load. Please check your internet and refresh.";
        return;
    }

    const size = Number(sizeSelect.value);

    try {
        new QRCode(qrBox, {
            text: text,
            width: size,
            height: size,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
        downloadBtn.classList.remove("hidden");
    } catch (error) {
        message.textContent = "Text is too long for a QR code. Please use shorter text.";
    }
}

function downloadQR() {
    const canvas = qrBox.querySelector("canvas");
    const image = qrBox.querySelector("img");

    let imageData = "";

    if (canvas) {
        imageData = canvas.toDataURL("image/png");
    } else if (image) {
        imageData = image.src;
    }

    if (imageData === "") {
        message.textContent = "Generate a QR code first.";
        return;
    }

    const link = document.createElement("a");
    link.href = imageData;
    link.download = "qrcode.png";
    link.click();
}

generateBtn.addEventListener("click", generateQR);
downloadBtn.addEventListener("click", downloadQR);

textInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        generateQR();
    }
});
