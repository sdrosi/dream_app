module.exports = function(sequelize, DataTypes) {
    var Dream = sequelize.define("Dream", {
      moodFeeling: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dreamstoryAnecdote: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      privacySetting: {
        type: DataTypes.STRING,
        defaultValue: true
      }
    });
  
    Dream.associate = function(models) {
      
      Dream.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Dream;
  };
  