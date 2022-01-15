const router = require('express').Router();
const { Student } = require('../db');

router.get('/', async (req, res, next) => {
  try{
    res.send( await Student.findAll() )
  }
  catch(ex){
    next(ex)
  }
})



module.exports = router;