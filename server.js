const express = require('express');
const { static } = express;
const path = require('path');

const app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/students', async(req, res, next)=> {
    try {
      res.send(await Student.findAll(
        { include: [ Campus]}

      ));
    }
    catch(ex){
      next(ex);
    }
  });


  app.get('/api/campuses', async(req, res, next)=> {
    try {
      res.send(await Campus.findAll(
        { include: [ Student]}
      ));
    }
    catch(ex){
      next(ex);
    }
  });

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


  const Sequelize = require('sequelize');
  const { UUID, UUIDV4, STRING } = Sequelize;
  const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/juniordb');


  const Student = conn.define('student', {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4
    },
    name: {
      type: STRING,
      allowNull: false
    }
  });
  
  const Campus = conn.define('campus', {  
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false
  }
    });


Student.belongsTo(Campus);
Campus.hasMany(Student)

 const syncAndSeed = async()=> {
    await conn.sync({ force: true });
    const campuses = ['Blue Mountain State', 'South Harmon Institute of Technology', 'Faber College', 'Dartmouth', 'East Great Falls'];
    const [Blue_Mountain_State, South_Harmon_Institute_of_Technology, Faber_College, Dartmouth, East_Great_Falls] = await Promise.all(campuses.map(campus => Campus.create({ name: campus} )));
    const students = [
      { name: 'Thad', campusId: Blue_Mountain_State.id}, 
      { name: 'Thad', campusId: Blue_Mountain_State.id}, 
      { name: 'Steve', campusId: East_Great_Falls.id}, 
      { name: 'Otter', campusId: Faber_College.id}, 
      { name: 'Bartleby', campusId: South_Harmon_Institute_of_Technology.id}, 
    ];
    await Promise.all(students.map(name => Student.create({ name: name.name, campusId: name.campusId })));
       
  };

init();
