const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
let pug = require('pug');
const { body , check , validationResult } = require('express-validator');


const port = 5000 ; 
const urlencoded = bodyParser.urlencoded({extended:false})
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res)=>{
    res.render('index', {title:"KYC Form"})
})

app.post('/submit' , [
    check('name', 'Name must be atleast 5 characters long')
    .exists()
    .isLength({min:5}), 
    check('email', 'Email must be valid')
    .exists()
    .isEmail()
    .normalizeEmail(), 
    check('phnumber', 'Phone number must be number')
    .exists()
    .isNumeric(), 
    check('gender', "Gender must be selected")
    .exists(),
    check('hobbies', "Choose at least one option from the hobbies")
    .exists()

]
         ,(req , res) => {
             const all_errors = validationResult(req)
             if(!all_errors.isEmpty()) {
                 const errors = all_errors.array()
                 res.render('index', {
                     errors
                 })
             }else{
                 res.render('index', {
                     success:"You form have been submitted and will be reviewed soon"
                 })
             }
    

    
})

app.listen(port , () => console.log(`App listening on port ${port}`))

