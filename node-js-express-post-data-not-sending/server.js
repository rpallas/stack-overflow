var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Recorder Prototype' });
});

router.post('/save', function(req, res, next) {
    console.log(req.body.thetextarea);
    console.log(req.body);
    console.log("=============================");
    res.render('data', { title: 'Save', textstring: req.body.thetextarea });
});


module.exports = router;
