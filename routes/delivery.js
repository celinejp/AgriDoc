// Import required modules
const express = require('express');
const router = express.Router();
const Delivery = require('../models/delivery');
const { verify } = require('../middleware/jwt_token');

router.use(verify);

// Create a new delivery
router.post('/add', (req, res) => {
  const { name, address1, address2, city, pincode } = req.body;

  const newDelivery = new Delivery({
    name,
    address1,
    address2,
    city,
    pincode,
    user:req.id,
  });

  newDelivery.save()
    .then(delivery => res.json(delivery))
    .catch(err => console.log(err));
});

// Get all deliveries
router.get('/get', (req, res) => {
  Delivery.find()
    .populate('user')
    .exec((err, deliveries) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.json(deliveries);
    });
});

// Get a specific delivery by ID
router.get('/get/:id', (req, res) => {
  Delivery.findById(req.params.id)
    .populate('user')
    .exec((err, delivery) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.json(delivery);
    });
});

module.exports = router;
