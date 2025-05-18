// filepath: simplyinvite-showcase-page/backend/index.js
const express = require("express");
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Backend rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor backend ouvindo na porta ${PORT}`);
});
