const { check } = require("express-validator");


exports.signUpValidation = [
    check('firstName','First name is required').not().notEmpty(),
    check('lastName','Last name is required').not().notEmpty(),
    check('email','please enter a valid email').isEmail().normalizeEmail({gmail_remove_dots:true}),
    check('password','password is required').isLength({min:6})

]