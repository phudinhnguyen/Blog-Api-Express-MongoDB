var express = require('express');
var router = express.Router();
const { getAllArticle, addArticle, deleteArticle, editArticle } = require("../Controller/ArticleController");

router.get('/getAll', getAllArticle);
router.post("/", addArticle);
router.delete("/:id", deleteArticle);
router.put("/:id", editArticle);

module.exports = router;