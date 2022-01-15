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
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    }
});

module.exports = Student