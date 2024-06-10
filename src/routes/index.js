const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./categorie");
const orderRouter = require("./order");
const orderDetailRouter = require("./orderDetail");
const paymentRouter = require("./payment");
const notificationRouter = require("./notification");

const routes = (app) => {
  app.use("/users", userRouter);
  app.use("/products", productRouter);
  app.use("/categories", categoryRouter);
  app.use("/orders", orderRouter);
  app.use("/orderDetails", orderDetailRouter);
  app.use("/payments", paymentRouter);
  app.use("/notifications", notificationRouter);
};

module.exports = routes;
