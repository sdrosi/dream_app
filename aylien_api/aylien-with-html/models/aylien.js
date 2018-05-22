module.exports = function(sequelize, DataTypes) {
    var Aylien = sequelize.define("Aylien", {
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      polarity: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "neutral"
      }
    });
    return Aylien;
  };