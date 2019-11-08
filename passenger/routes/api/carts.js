const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Cart Schema
const Cart = require("../../models/Cart");

// Load product schema
const Product = require("../../models/Product");

// Test
router.get("/test", (req, res) => res.json({ msg: "Cart works" }));

// Add to cart
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const items = {};
    items.user = req.user.id;
    items.total = parseInt(req.body.total, 10);
    const products = {
      name: req.body.name,
      price: req.body.price,
      count: req.body.count
    };

    Cart.findOne({ user: req.user.id })
      .then(item => {
        if (item) {
          Cart.findOneAndUpdate(
            { user: req.user.id },
            { $set: items, $push: { products: products } },
            { new: true }
          )
            .then(item => res.json(item))
            .catch(err => res.json(err));
        } else {
          items.products = products;
          Cart.findOne({ user: req.user.id }).then(item => {
            new Cart(items)
              .save()
              .then(item => res.json(item))
              .catch(err => res.json(err));
          });
        }
      })
      .catch(err => res.json(err));
  }
);

// Disply items from cart
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Cart.find({ user: req.user.id })
      .then(item => {
        if (!item) {
          res.status(404).json({ msg: "Cart is Empty" });
        } else {
          res.json(item);
        }
      })
      .catch(err => res.json(err));
  }
);

// Clear cart
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Cart.remove({ user: req.user.id })
      .then(item => {
        res.status(200).json(item);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);

module.exports = router;
