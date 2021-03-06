module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    });
  
    User.associate = function(models) {
      
      User.hasMany(models.Dream, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  
