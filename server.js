const express = require('express');
const res = require('express/lib/response');
const { static } = express;
const path = require('path');

const app = express();
app.use(express.json());

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
  const { UUID, UUIDV4, STRING, TEXT, DECIMAL } = Sequelize;
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
      unique : true,
    },
    imageURL : {
      type: STRING,
      defaultValue: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    gpa: {
      type: DECIMAL(10,1),
      defaultValue: 4.0,
      validate: {
        min: 0.0,
        max: 4.0,
      }
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
  },
campusImageURL : {
  type: STRING,
  defaultValue: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
},
description: {
type: TEXT
},
  });



Student.belongsTo(Campus);
Campus.hasMany(Student)


const syncAndSeed = async()=> {
  await conn.sync({ force: true });

//schools
const Blue_Mountain_State = await Campus.create({
  campusName: 'Blue Mountain State', 
  campusAddress: '2363 Mountain Rd Hamburg, PA 19526',
  campusImageURL: 'https://cdn3.sportngin.com/attachments/photo/3827/8377/BMS-Goats-Logo.jpg',
  description: 'Blue Mountain State, and its football team, the "Mountain Goats" are not known for their academics '
});
  
  
const South_Harmon_Institute_of_Technology = await Campus.create({
  campusName: 'South Harmon Institute of Technology', 
  campusAddress: '321 UA St, Saint Cloud, MO 65441',
  campusImageURL: 'https://pbs.twimg.com/media/E-D7TbbWQAEYspA.png',
  description: 'Acceptance is just one click away'
});

const Faber_College = await Campus.create({
  campusName: 'Faber College', 
  campusAddress: '400 High St, Dunellen, NJ 08812',
  campusImageURL: 'https://s.abcnews.com/images/Entertainment/nc_animal_house_ll_130725_4x3_992.jpg',
  description: 'Knowledge is Good'
});

const Dartmouth = await Campus.create({
  campusName: 'Dartmouth', 
  campusAddress: '7 Lebanon St. Hanover, NH 03755',
  campusImageURL: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Dartmouth_College_campus_2007-10-20_09.JPG',
  description: 'vox clamantis in deserto'
});

const East_Great_Falls = await Campus.create({
  campusName: 'East Great Falls', 
  campusAddress: '5901 Hall St SE, Grand Rapids, MI 49546',
  campusImageURL: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Great_Falls_High_School_Historic_District_%282013%29_-_Cascade_County%2C_Montana.png',
  description: 'God bless the internet.'
});

//students

const thad = await Student.create({
  name: 'Thad', 
  lastName:'Castle', 
  email:'tcastle1@bms.edu', 
  imageURL : 'https://i.pinimg.com/originals/9b/39/72/9b397209ad34511cb2e5cba3bbd30544.png',
  gpa: 0.2,
  campusId: Blue_Mountain_State.id
});

const alex = await Student.create({
  name: 'Alex', 
  lastName:'Moran', 
  email:'amoran6@bms.edu', 
  imageURL : 'https://pbs.twimg.com/profile_images/514631405423591424/LlWDlHts_400x400.jpeg',
  gpa: 2.8,
  campusId: Blue_Mountain_State.id
});

const steve = await Student.create({ 
  name: 'Steve', 
  lastName:'Stifler',  
  email:'stifler70@hotmail.com', 
  imageURL : 'https://static.wikia.nocookie.net/americanpie/images/b/b7/Images.jpg/revision/latest/scale-to-width-down/175?cb=20120525131526',
  gpa: 2.5,
  campusId: East_Great_Falls.id
});

const otter = await Student.create({ 
  name: 'Otter', 
  lastName:'Stratton', 
  email:'EricStratton@gmail.com', 
  imageURL : 'http://1.bp.blogspot.com/-iC7v3FZzvuk/VToSMQnLqUI/AAAAAAAARLo/gZdqg-ZiWGE/s1600/AnimalHouse-Otter-Defense.jpg',
  gpa: 1.6,
  campusId: Faber_College.id
});

const bartleby = await Student.create({ 
  name: 'Bartleby', 
  lastName: 'Gaines', 
  email:'bgaines1@shit.edu', 
  imageURL : 'https://akns-images.eonline.com/eol_images/Entire_Site/2021717/rs_1024x759-210817125949-1024-Justin-Long-Accepted-LT-81721-shutterstock_editorial_1567277a.jpg?fit=around%7C1024:759&output-quality=90&crop=1024:759;center,top',
  gpa: 4.0,
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
