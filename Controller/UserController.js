const { body, validationResult } = require('express-validator');
const apiResponse = require("../Helper/ApiResponse");
const { userModal, articleModal } = require("../Schema/Schema");
const jwt = require("jsonwebtoken");

exports.signgup = [
    body('fullName').notEmpty().withMessage("Full name is require"),
    body('userName').notEmpty().withMessage("User name is require"),
    body('email')
        .notEmpty().withMessage("Email is require")
        .isEmail().normalizeEmail().withMessage("Email invalidate"),
    body('age')
        .isNumeric().withMessage("Age must be a number"),
    body("password")
        .notEmpty().withMessage("Password is require")
        .isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater!"),
    body('confirm')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                return false;
            }
            return true;
        }).withMessage("Password do not match"),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (errors.array().length == 0) { // success
                const newUser = new userModal({
                    fullName: req.body.fullName,
                    userName: req.body.userName,
                    age: req.body.age,
                    email: req.body.email,
                    password: req.body.password,
                    permission: req.body.permission,
                });
                userModal.find({ userName: req.body.userName, email: req.body.email }, (err, arr) => {
                    if (err) {
                        apiResponse.ErrorResponse(res, "Something were wrong");
                    } else {
                        if (arr.length == 0) {
                            newUser.save((err) => {
                                if (err) {
                                    apiResponse.ErrorResponse(res, "Something were wrong");
                                } else {
                                    apiResponse.successResponse(res, "Sign up success");
                                }
                            })
                        } else {
                            apiResponse.validationErrorWithData(res, "User name or email already exist")
                        }
                    }
                })
            } else {// err
                apiResponse.validationErrorWithData(res, errors.array()[0].msg);
            }
        } catch (e) {
            console.log(e.message);
        }
    }
]

exports.login = [
    body('userName').notEmpty().withMessage("User name is require"),
    body('password').notEmpty().withMessage("Password is require"),
    (req, res) => {
        const errors = validationResult(req);
        if (errors.array().length == 0) { //success
            userModal.findOne(req.body, (err, doc) => {
                if (err) {
                    apiResponse.ErrorResponse(res, "Something were wrong")
                } else {
                    const payload = { ...doc };
                    delete payload.password;
                    if (doc) {
                        // Prepare JWT token for authentication
                        const jwtPayload = req.body;
                        const jwtData = {
                            expiresIn: process.env.JWT_TIMEOUT_DURATION,
                        };
                        const secret = process.env.JWT_SECRET;
                        //Generated JWT token with Payload and secret.
                        apiResponse.successResponseWithData(res, "Login success", jwt.sign(jwtPayload, secret, jwtData));
                    } else {
                        apiResponse.validationErrorWithData(res, "User name or password is invalid");
                    }
                }
            })
        } else {
            apiResponse.validationErrorWithData(res, errors.array()[0].msg);
        }
    }
]