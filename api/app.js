require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Express server has started on http://localhost:${port}`);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

const cors = require("cors");
app.use(cors()); // 브라우저 CORS 허용
app.use(express.static("public"));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

const Product = require("./models/product");
const router = require("./routes")(app, Product);

// 에러나 예외 발생시 서버 연결 닫기
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});

process.on("uncaughtException", (err) => {
  server.close(() => {
    console.log("HTTP server closed");
  });
});
