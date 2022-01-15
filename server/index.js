const {db } = require('db');

const app = require('./app')

const init = async()=> {
    try {
      await syncAndSeed();
      const port = process.env.PORT || 8000;
      app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
      console.log(ex);
    }
  }



  init();