const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Order model
const Order = require("../../models/Order");

// Test
router.get("/test", (req, res) => {
  res.json({ msg: "Orders works" });
});

// Post order
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newOrder = {};
    newOrder.user = req.user.id;
    newOrder.cart = req.body.cart;
    newOrder.restaurant = req.body.restaurant;
    newOrder.phone = req.body.phone;
    newOrder.seat = req.body.seat;
    newOrder.desc = req.body.desc;

    Order.findOne({ user: req.user.id })
      .then(order => {
        new Order(newOrder)
          .save()
          .then(order => res.json(order))
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  }
);

// Disply Orders
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Order.find()
      .populate("user", "name")
      .populate("cart", "total products")
      .then(order => {
        if (!order) {
          res.status(404).json("No orders yet");
        }
        res.json(order);
      })
      .catch(err => {
        res.json(err);
      });
  }
);

module.exports = router;
