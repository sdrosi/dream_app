module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
<<<<<<< HEAD
=======
    },
    userName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
>>>>>>> 6c139a51799124e1378ce3010fdfc4cbe47aa7e7
    }
    });
  
    User.associate = function(models) {
      
      User.hasMany(models.Dream, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  
