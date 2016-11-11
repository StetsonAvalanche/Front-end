var ChatroomModel = require('../models/chatroom.js'); 

// findOne retrieves a chatroom with the associated id 
function findOne(callback) {
	ChatroomModel.find({id: id}, callback);
}

// updates current chatroom; creates one if it doesn't exist
function update(chatroom, callback) {
  ChatroomModel.update({id: chatroom.id}, chatroom, {upsert: true}, callback);
}

// insertOne inserts a chatroom into the db
function insertOne(chatroom, callback) {
  ChatroomModel.create(chatroom, callback);
}

exports.findOne = findOne;
exports.insertOne = insertOne;
exports.update = update;