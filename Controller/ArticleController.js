const { body, validationResult } = require('express-validator');
const apiResponse = require("../Helper/ApiResponse");
const { articleModal, userModal } = require("../Schema/Schema");
const jwt = require("jsonwebtoken");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

exports.getAllArticle = [
    (req, res) => {
        articleModal.find({}, (err, arr) => {
            apiResponse.successResponseWithData(res, "success", arr);
        })
    }
]

exports.addArticle = [
    body('title').notEmpty().withMessage("Title is require"),
    body('content').notEmpty().withMessage("Content is require"),
    body('categoryId').notEmpty().withMessage("CategoryId is require"),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (errors.array().length == 0) { // success
                const newArticle = new articleModal({
                    title: req.body.title,
                    content: req.body.content,
                    categoryId: req.body.categoryId,
                });
                newArticle.save((err) => {
                    if (err) {
                        apiResponse.ErrorResponse(res, "Something were wrong");
                    } else {
                        apiResponse.successResponse(res, "Add article success");
                    }
                })
            } else {
                apiResponse.validationErrorWithData(res, errors.array()[0].msg);
            }
        } catch (e) {
            console.log(e.message);
        }
    }
]

exports.deleteArticle = [
    (req, res) => {
        articleModal.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                return apiResponse.ErrorResponse(res, err);
            } else {
                return apiResponse.successResponse(res, "Article delete Success.");
            }
        })
    }
]

exports.editArticle = [
    body('title').notEmpty().withMessage("Title is require"),
    body('content').notEmpty().withMessage("Content is require"),
    body('categoryId').notEmpty().withMessage("CategoryId is require"),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (errors.array().length == 0) { // success
                const newArticle = new articleModal({
                    title: req.body.title,
                    content: req.body.content,
                    categoryId: req.body.categoryId,
                });
                newArticle.save((err) => {
                    if (err) {
                        apiResponse.ErrorResponse(res, "Something were wrong");
                    } else {
                        apiResponse.successResponse(res, "Add article success");
                    }
                })
            } else {
                // validate success
                apiResponse.validationErrorWithData(res, errors.array()[0].msg);
            }
        } catch (e) {
            console.log(e.message);
            throw e.message;
        }
    }
]