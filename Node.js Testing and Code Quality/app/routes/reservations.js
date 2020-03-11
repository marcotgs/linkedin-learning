var express = require('express');
var router = express.Router();
const reservations = require('../lib/reservations');
const Reservation = require('../lib/schema/reservation');
const logger = require('../lib/logger');
const logMeta = 'nadia:route:reservations';

router.get('/', function(req, res, next) {
  res.render('reservations');
});

router.post('/', function(req, res, next) {
  const reservation = new Reservation(req.body);
  reservations.create(reservation)
    .then(reservationId => res.render('reservations', {
      success: true,
      reservationId
    }))
    .catch(err => {
      logger(`${err.message} ${JSON.stringify(req.body)}`, logMeta);
      res.status(400).render('reservations', {
        errors: [
          err.message
        ],
        success: false,
        submission: req.body
      });
    })
});

module.exports = router;
