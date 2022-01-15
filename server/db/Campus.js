const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/juniordb');
  
  
const Campus = conn.define('campus', {  
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4
  },
  campusName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  campusAddress: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
    });


module.exports = Campus