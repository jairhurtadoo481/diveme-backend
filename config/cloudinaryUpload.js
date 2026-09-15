const cloudinary = require("./cloudinary");
const streamifier = require("streamifier");

const subirArchivo = (buffer, carpeta, resourceType) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: carpeta, resource_type: resourceType },
      (error, resultado) => {
        if (error) return reject(error);
        resolve(resultado);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

const subirImagen = (buffer, carpeta = "diveme/productos") =>
  subirArchivo(buffer, carpeta, "image");

const subirVideo = (buffer, carpeta = "diveme/productos") =>
  subirArchivo(buffer, carpeta, "video");

module.exports = { subirImagen, subirVideo };
