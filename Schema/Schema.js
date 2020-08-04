const mongoose = require('./../DataBase/DataBase');

const userSchema = new mongoose.Schema({
    fullName: String,
    userName: String,
    age: Number,
    email: String,
    password: String,
    permission: String,
});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    categoryId: String,
});

const categorySchema = new mongoose.Schema({
    name: String,
});

module.exports = {
    userModal: mongoose.model("Users", userSchema),
    articleModal: mongoose.model("Articles", articleSchema),
    categoryModal: mongoose.model("Categories", categorySchema),
}

