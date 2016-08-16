var router = require('express').Router();
router.route('/').get(function(req, res){
  res.render(404);
});

module.exports = router;
