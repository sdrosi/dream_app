module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      
      firstName: {
          type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userName:{
        type: Datatypes.STRING,
        allowNull: false
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false
    }
    });
  
    User.associate = function(models) {
      
      Author.hasMany(models.Dream, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  