require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const Auth = require("./routes/auth");
const user = require("./routes/user");
const path = require("path");
const post = require("./routes/post");
//mongoose connection
mongoose
  .connect(process.env.CD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("wiss database started");
  })
  .catch((err) => console.log(err));

//initiate
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api", Auth);
app.use("/api", user);
app.use("/api", post);
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("Client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"))
  );
}
app.listen(PORT, () => {
  console.log("wiss server started");
});
