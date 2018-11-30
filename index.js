const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const path = require("path");

const AuthAPI = require("./controller/auth/api");
const AuthAccount = require("./controller/auth/account");
const AuthAccess = require("./controller/auth/access");


const Account = require("./controller/account/account");
const Trip = require("./controller/trip/trip");
const Order = require("./controller/order/order");
const Message = require("./controller/message/message");
const TripHost = require("./controller/trip_host/trip_host");
const TripOrder = require("./controller/trip_order/trip_order");
const Payment = require("./controller/payment/payment");

const HelperResponse = require("./controller/helper/response");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(AuthAPI);

const main_db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.ssl || false
});

main_db.connect();

const authAccount = AuthAccount(main_db);
authAccount.populate();
app.use(authAccount.tokenAuth);



const authAccess = AuthAccess(main_db);
app.use(authAccess.checkAccess);

const account = Account(main_db);
app.get("/accounts/:page/:items_per_page", account.getAccounts);
app.get("/account/:id", account.getAccount);
app.post("/account", account.postAccount);
app.patch("/account/:id", account.patchAccount);
app.delete("/account/:id", account.deleteAccount);

const trip = Trip(main_db);
app.get("/trips/:page/:items_per_page", trip.getTrips);
app.get("/trip/:id", trip.getTrip);
app.post("/trip", trip.postTrip);
app.patch("/trip/:id", trip.patchTrip);
app.delete("/trip/:id", trip.deleteTrip);

const order = Order(main_db);
app.get("/orders/:page/:items_per_page", order.getOrders);
app.get("/order/:id", order.getOrder);
app.post("/order", order.postOrder);
app.patch("/order/:id", order.patchOrder);
app.delete("/order/:id", order.deleteOrder);

const message = Message(main_db);
app.get("/messages/:page/:items_per_page", message.getMessages);
app.get("/message/:id", message.getMessage);
app.post("/message", message.postMessage);
app.patch("/message/:id", message.patchMessage);
app.delete("/message/:id", message.deleteMessage);

const trip_host = TripHost(main_db);
app.get("/trip_hosts/:page/:items_per_page", trip_host.getTripHosts);
app.get("/trip_host/:id", trip_host.getTripHost);
app.post("/trip_host", trip_host.postTripHost);
app.patch("/trip_host/:id", trip_host.patchTripHost);
app.delete("/trip_host/:id", trip_host.deleteTripHost);

const trip_order = TripOrder(main_db);
app.get("/trip_orders/:page/:items_per_page", trip_order.getTripOrders);
app.get("/trip_order/:id", trip_order.getTripOrder);
app.post("/trip_order", trip_order.postTripOrder);
app.patch("/trip_order/:id", trip_order.patchTripOrder);
app.delete("/trip_order/:id", trip_order.deleteTripOrder);

const payment = Payment(main_db);
app.get("/payments/:page/:items_per_page", payment.getPayments);
app.get("/payment/:id", payment.getPayment);
app.post("/payment", payment.postPayment);
app.patch("/payment/:id", payment.patchPayment);
app.delete("/payment/:id", payment.deletePayment);

app.all("*", (req, res) => {
  return res.json({ data: "Hello world!" });
});

process.env.PORT = process.env.PORT || 3000;
const port = process.env.PORT;
module.exports = app.listen(port, () => {
  console.log(`Backend server started`);
});