const router = require('express').Router();
const { Campus } = require('../db');

router.get('/', async (req, res, next) => {
  try{
    res.send( await Campus.findAll() )
  }
  catch(ex){
    next(ex)
  }
})


module.exports = router;