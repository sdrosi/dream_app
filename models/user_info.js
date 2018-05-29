module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
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
    }
    // },
    // userName:{
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // password: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // }
    });
  
    User.associate = function(models) {
      
      User.hasMany(models.Dream, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  
