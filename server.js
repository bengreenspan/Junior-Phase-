const express = require('express');
const res = require('express/lib/response');
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

  app.post('/api/students', async(req, res, next)=> {
    try {
      res.status(201).send(await Student.create(req.body));
    }
    catch(ex){
      next(ex);
    }
  });

  app.delete('/api/students/:id', async(req, res, next)=> {
    try {
      const student = await Student.findByPk(req.params.id);
      await student.destroy();
      res.status(204);
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

  app.post('/api/campuses', async(req, res, next)=> {
      try {
        res.status(201).send(await Campus.create(req.body));
      }
    catch(ex){
      next(ex);
    }
  });

  app.delete('/api/campuses/:id', async(req, res, next)=> {
    try {
      const campus = await Campus.findByPk(req.params.id);
      await campus.destroy();
      res.status(204);
    }
    catch(ex){
      next(ex);
    }
  });

  app.use((err, req, res, next)=> {
    res.status(500).send({error: err})
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
      // allowNull: false,
      // validate: {
      //   notEmpty: true,
      // },
    },
    lastName: {
      type: STRING,
      // allowNull: false,
      // validate: {
      //   notEmpty: true,
      // },
    },
    email: {
      type: STRING,
      // allowNull: false,
      // validate: {
      //   notEmpty: true,
      //   isEmail: true,
      // },
      unique : true
    }
});

  
const Campus = conn.define('campus', {  
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
},
campusName: {
  type: STRING,
  // allowNull: false,
  // validate: {
  //   notEmpty: true,
  // },
  // unique : true
},
campusAddress: {
    type: STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
    // unique : true
  }
  });



Student.belongsTo(Campus);
Campus.hasMany(Student)


const syncAndSeed = async()=> {
  await conn.sync({ force: true });

//schools
const Blue_Mountain_State = await Campus.create({
  campusName: 'Blue Mountain State', 
  campusAddress: '100 penn'
});
  
  
const South_Harmon_Institute_of_Technology = await Campus.create({
  campusName: 'South Harmon Institute of Technology', 
  campusAddress: 'test2'
});

const Faber_College = await Campus.create({
  campusName: 'Faber College', 
  campusAddress: 'testting testy'
});

const Dartmouth = await Campus.create({
  campusName: 'Dartmouth', 
  campusAddress: 'test a a check'
});

const East_Great_Falls = await Campus.create({
  campusName: 'East Great Falls', 
  campusAddress: 'checking'
});

//students

const thad = await Student.create({
  name: 'Thad', 
  lastName:'Castle', 
  email:'tcastle1@bms.edu', 
  campusId: Blue_Mountain_State.id
});

const alex = await Student.create({
  name: 'Alex', 
  lastName:'Moran', 
  email:'amoran6@bms.edu', 
  campusId: Blue_Mountain_State.id
});

const steve = await Student.create({ 
  name: 'Steve', 
  lastName:'Stifler',  
  email:'stifler70@hotmail.com', 
  campusId: East_Great_Falls.id
});

const otter = await Student.create({ 
  name: 'Otter', 
  lastName:'Stratton', 
  email:'EricStratton@gmail.com', 
  campusId: Faber_College.id
});

const bartleby = await Student.create({ 
  name: 'Bartleby', 
  lastName: 'Gaines', 
  email:'bgaines1@shit.edu', 
  campusId: South_Harmon_Institute_of_Technology.id
});
};



//  const syncAndSeed = async()=> {
//     await conn.sync({ force: true });
//     const campuses = ['Blue Mountain State', 'South Harmon Institute of Technology', 'Faber College', 'Dartmouth', 'East Great Falls'];
//     const [Blue_Mountain_State, South_Harmon_Institute_of_Technology, Faber_College, Dartmouth, East_Great_Falls] = await Promise.all(campuses.map(campus => Campus.create({ name: campus} )));
//     const students = [
//       { name: 'Thad', campusId: Blue_Mountain_State.id}, 
//       { name: 'Alex', campusId: Blue_Mountain_State.id}, 
//       { name: 'Steve', campusId: East_Great_Falls.id}, 
//       { name: 'Otter', campusId: Faber_College.id}, 
//       { name: 'Bartleby', campusId: South_Harmon_Institute_of_Technology.id}, 
//     ];
//     await Promise.all(students.map(name => Student.create({ name: name.name, campusId: name.campusId })));
       
//   };

init();
