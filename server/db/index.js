const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/juniordb');
const Student = require('./Student');
const Campus = require('./Campus');

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

syncAndSeed();

module.exports = {
    conn, 
    syncAndSeed, 
    models: {
        Student,
        Campus
    }
}