const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== API ROUTES =====
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));

// ===== React Build Path =====
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "portfolio", "build")));

// ===== React Fallback =====
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname1, "portfolio", "build", "index.html"));
});

// ===== PORT =====
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT}`);
});
