const connection = require('../config/connection');
const { Thoughts, Users, Reactions } = require('../models');

const userlist = [
    { username: "coolguy", email: "lotsofnumbers@gmail.com" },
    { username: "sadman", email: "lotsofletters@gmail.com" },
    { username: "whatadude", email: "lotsofcharacters@gmail.com" },
];

const thoughtslist = [
    { thoughtText: "This is a cool thought.", username: "coolguy" },
    { thoughtText: "Feeling sad today.", username: "sadman" },
    { thoughtText: "What a great day!", username: "whatadude" },
];

const reactionslist = [
    { reactionBody: "Agree!", username: "coolguy" },
    { reactionBody: "Sending you positive vibes.", username: "sadman" },
    { reactionBody: "Awesome!", username: "whatadude" },
];

connection.once("open", async () => {
    // Inserts users
    await Users.collection.insertMany(userlist);

    // Get user IDs to associate thoughts and reactions
    const users = await Users.find();
    const userIds = users.map(user => user._id);

    // Associate thoughts with users
    const thoughtsWithUsers = thoughtslist.map((thought, index) => ({
        ...thought,
        username: userlist[index].username,
        user: userIds[index], 
    }));
    
    // Inserts thoughts
    await Thoughts.collection.insertMany(thoughtsWithUsers);

    // Associates reactions with the corresponding thoughts and users. 
    const reactionsWithThoughtsAndUsers = reactionslist.map((reaction, index) => ({
        ...reaction,
        username: userlist[index].username,
        user: userIds[index], // Associate reaction with user
        thought: thoughtsWithUsers[index]._id, // Associate reaction with thought
    }));

    // Insert reactions
    await Reactions.collection.insertMany(reactionsWithThoughtsAndUsers);

    // Logs data
    const data = await Users.find().populate('thoughts').populate({
        path: 'thoughts',
        populate: { path: 'reactions' }
    });
    
    console.log(data);
    process.exit(0);
});