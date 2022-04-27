const fs = require("fs");

function convertToBase64(extension, uri) {
    if (extension === ".jpg" || extension === ".jpeg") {
        return uri.replace(/^data:image\/jpeg;base64,/, "");
    } else if (extension === ".png") {
        return uri.replace(/^data:image\/png;base64,/, "");
    }
}

function convertImageBase64(imagePath, extension) {
    let base64String = "";

    if (extension === ".jpg" || extension === ".jpeg") {
        base64String = "data:img/jpeg;base64,";
    } else if (extension === ".png") {
        base64String = "data:img/png;base64,";
    }

    imagePath = fs.readFileSync(imagePath, "base64");

    imagePath = base64String.concat(imagePath);

    return imagePath;
}

module.exports = {
    convertToBase64,
    convertImageBase64
}