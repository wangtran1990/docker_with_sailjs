// Store code able to active one time only per user

module.exports = {
  attributes : {
    id : {
      type : Sequelize.UUID,
      primaryKey : true
    },
    key : {
      type : Sequelize.STRING
    },
    type : {
      type : Sequelize.STRING
    },
    describe : {
      type : Sequelize.STRING
    },
    value : {
      type : Sequelize.TEXT
    },
    createdAt : {
      type : Sequelize.DATE
    },
    updatedAt : {
      type : Sequelize.DATE
    },
    createdBy : {
      type : Sequelize.STRING
    },
    updatedBy : {
      type : Sequelize.STRING
    }
  },
  options : {
    tableName : 'constants'
  }
};
