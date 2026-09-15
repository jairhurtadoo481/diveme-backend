const mongoose = require("mongoose");
const tallaSchema = new mongoose.Schema({
  talla: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
}, { _id: false });
const productoSchema = new mongoose.Schema({
  codigo: { type: String, default: "", trim: true },
  codigoModelo: { type: String, default: "", trim: true, index: true },
  sucursal: {
    type: String,
    enum: ["sucursal1", "sucursal2"],
    default: "sucursal1",
  },
  nombre: { type: String, required: true, trim: true },
  modeloBase: { type: String, default: "", trim: true },
  marca: { type: String, required: true, trim: true, default: "Diveme" },
  descripcion: { type: String, default: "" },
  precio: { type: Number, required: true },
  precioPresencial: { type: Number, default: null },
  precioMayorista: { type: Number, default: null },
  precioOferta: { type: Number, default: null },
  ofertaInicio: { type: Date, default: null },
  ofertaFin: { type: Date, default: null },
  categoria: {
    type: String,
    required: true,
    enum: ["hombre", "mujer", "ninios"],
    default: "mujer",
  },
  seccion: {
    type: String,
    required: true,
    enum: ["parte_inferior", "parte_superior", "abrigo", "vestidos_enterizos", "basicos"],
  },
  tipo: {
    type: String,
    required: true,
    enum: [
      "falda", "pantalon_vestir", "jean", "legging", "short", "jogger",
      "blusa", "camisa", "top", "polo",
      "chompa", "casaca", "chaqueta", "blazer", "cardigan", "abrigo_largo",
      "vestido_casual", "vestido_fiesta", "vestido_largo", "enterizo", "mono_corto",
      "pijama", "ropa_deportiva",
    ],
  },
  tallas: [tallaSchema],
  colores: [{ type: String }],
  imagenes: [{ type: String }],
  video: { type: String, default: "" },
  destacado: { type: Boolean, default: false },
  activo: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model("Producto", productoSchema);
