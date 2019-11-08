const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load products
const Product = require("../../models/Product");

// Testing
router.get("/test", (req, res) => {
  res.json({ msg: "Products works" });
});

// Display products according to PNR
router.get(
  "/:query",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.find({ number: req.params.query })
      .then(pdt => {
        if (!pdt) {
          res.status(404).json({ msg: "Check your PNR" });
        }
        res.json(pdt);
      })
      .catch(err => res.status(404).json(err));
  }
);

// Disply products by id
router.get(
  "/pdt/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then(pdt => {
        if (!pdt) {
          res.status(404).json({ msg: "Product not found" });
        }
        res.json(pdt);
      })
      .catch(err => res.status(404).json(err));
  }
);

// router.get(
//   "/:query",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const num = parseInt(req.params.query,10)
//     Product.aggregate([
//       {
//         $match: {
//           number: { $regex: req.params.query, $options: "i" }
//         }
//       }
//     ])
//       .then(pdt => {
//         if (pdt.length > 0) {
//           res.json(pdt);
//         } else {
//           res.json("sorry..");
//         }
//       })
//       .catch(err => res.status(404).json({ msg: "Not found" }));
//   }
// );

// Disply all products
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Product.find({ number: 12345 })
      .then(pdt => {
        if (!pdt) {
          return res.status(404).json("No products found");
        }
        res.json(pdt);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
