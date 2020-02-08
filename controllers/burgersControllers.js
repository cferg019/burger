var express = require('express');

var db = require('../models')

var router = express.Router();
var burger = require('../models/burger.js');

// get route -> index
router.get('/', function (req, res) {
    res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
    db.Burger.findAll({ raw: true }).then(function(burgers) {
        console.log('got these burgers back', burgers)
        res.render('index', { burger_data: burgers });
    });
});

// post route -> back to index
router.post('/burgers/create', function (req, res) {
    db.Burger.create({
        name: req.body.name,
        devoured: false
    }).then(function(burger) {
        console.log('created burger', burger);
        res.redirect('/');
    })
});

// put route -> back to index
router.put('/burgers/:id', function (req, res) {
    db.Burger.update({
        devoured: true
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(burger) {
        res.sendStatus(200);
    })
});

module.exports = router;
