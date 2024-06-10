const express = require("express");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const { sequelize, connect } = require("./config/connection");

const app = express();
const port = process.env.PORT || 5000;

connect();

// app.use(morgan('dev'));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:3002"],
//     // methods: ["POST", "GET"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:3002", "http://localhost:3001"];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());

routes(app);

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Susses" });
});

// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ Error: "you not authenticated" });
//   } else {
//     jwt.verify(token, "jwt-secret-key", (err, decoded) => {
//       if (err) {
//         return res.json({ Error: "token not key" });
//       } else {
//         req.name = decode.name;
//         next();
//       }
//     });
//   }
// };

// app.post("/", verifyUser, (req, res) => {
//   return res.json({ Status: "susses", name: req.name });
// });

// app.post("/login", (req, res) => {
//   const sql = "select * from login where email = ?";
//   db.query(sql, [req.body.email], (err, data) => {
//     if (err) return res.json({ Error: "login err" });
//     if (data.length > 0) {
//       bcrypt.compare(req.body.password, data[0].password, (err, response) => {
//         if (err) return res.json({ Error: "Pass err" });
//         if (response) {
//           const name = data[0].name;
//           const token = jwt.sign({ name }, "jwt-secret-key", {
//             expiresIn: "1d",
//           });
//             res.cookie('token',token);
//           return res.json({ Status: "suss" });
//         } else {
//           return res.json({ Error: "Password not matched" });
//         }
//       });
//     } else {
//       return res.json({ Error: "no emaill existed" });
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Backend CodeLearn listening on http://localhost:${port}`);
});
