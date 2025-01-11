const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5001;
const connectDb = require("./database/connectDb");
connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require("path");

const botRoute = require("./route/bot.route");

/**
 * for cors policy
 */
const corsOpton = {
  origin: process.env.CLIENT_PORT || "http://localhost:3000",
  method: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
};

app.use(cors(corsOpton));

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "connected successfully",
    data: null,
  });
});

app.use("/bot", botRoute);

app.use("/images", express.static(path.join(__dirname, "images")));
app.listen(PORT, () => {
  console.log(` The server is running on port: ${PORT}`);
});
