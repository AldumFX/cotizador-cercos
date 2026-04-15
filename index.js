const express = require("express");
const fs = require("fs");
const PDFDocument = require("pdfkit");

const app = express();
app.use(express.json());
app.use("/pdfs", express.static("pdfs"));

app.get("/", (req, res) => {
  res.send("Servidor activo 🚀");
});

app.post("/cotizar", (req, res) => {
  const { nombre, telefono, metros } = req.body;

  const total = metros * 1500;

  const filePath = `pdfs/cotizacion_${telefono}.pdf`;

  const doc = new PDFDocument({
    size: [1080, 1920],
    margin: 50
  });

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(40).text("MULTICERCOS", { align: "center" });
  doc.moveDown();

  doc.text(`Cliente: ${nombre}`);
  doc.text(`Tel: ${telefono}`);
  doc.text(`Metros: ${metros}`);

  doc.moveDown();
  doc.fontSize(30).text(`TOTAL: $${total} MXN`, {
    align: "right"
  });

  doc.end();

  res.json({
    mensaje: "Cotización generada",
    url: `https://TU_APP.onrender.com/${filePath}`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo"));
