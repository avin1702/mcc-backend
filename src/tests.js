// const { DATE } = require("sequelize");

const currentDateTime = new Date()
console.log(currentDateTime.toTimeString().slice(0,8))
// console.log(new Date(currentDateTime.getTime() + 60 * 60 * 1000))