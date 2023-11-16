const connection = require('../config/connection')
const { Thoughts, Users } = require('../models')

var userlist = [
    { username: "happyman", 
    email: "happyman@gmail.com" },

    { username: "sadman", 
    email: "sadman@gmail.com" },
]

connection.once("open", async()=> {
    await Users.collection.insertMany(userlist)
    var data = await Users.find()
    console.log(data)
    process.exit(0)
})