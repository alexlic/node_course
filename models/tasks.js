module.exports = (sequelize, DataType) => {
  const Tasks = sequelize.define('Tasks', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    done: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
  return Tasks
}
