// server.js
const express = require("express");
const cors = require("cors");
const menuRoutes = require("./routes/menu");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoutes);

app.listen(8080, () => {
    console.log("✅ Backend running on http://localhost:8080");
});
