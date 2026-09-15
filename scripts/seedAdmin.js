require("dotenv").config();
const crypto = require("crypto");
const mongoose = require("mongoose");
const Usuario = require("../models/Usuario");

async function main() {
  const email = process.argv[2];
  const nombre = process.argv[3] || "Administrador";
  const password = process.argv[4] || crypto.randomBytes(9).toString("base64").replace(/[+/=]/g, "x");

  if (!email) {
    console.error("Uso: node scripts/seedAdmin.js <email> [nombre] [password]");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existente = await Usuario.findOne({ email });
  if (existente) {
    console.log(`Ya existe un usuario con el email ${email} (rol: ${existente.rol})`);
    await mongoose.disconnect();
    process.exit(0);
  }

  const admin = await Usuario.create({ nombre, email, password, rol: "admin" });
  console.log("Admin creado correctamente:");
  console.log(`  email:    ${admin.email}`);
  console.log(`  password: ${password}`);
  console.log("Guarda esta contraseña ahora, no se volverá a mostrar.");

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
