const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
let pug = require('pug');
const { check , validationResult } = require('express-validator');


const port = 5000 ; 
const urlencoded = bodyParser.urlencoded({extended:false})
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res)=>{
    res.render('index', {title:"KYC Form"})
})

app.post('/submit' , [
   
    check('name', 'Name is required')
    .not().isEmpty(),
    check('name', 'Name must be atleast 5 characters long')
    .isLength({min:5}), 
    check('email', 'Email is required')
    .not().isEmpty(),
    check('email', 'Email must be valid')
    .isEmail(), 
    check('phnumber', 'Phone number is required')
    .not().isEmpty(),
    check('phnumber', 'Phone number must be number')
    .isNumeric(), 
    check('gender', "Gender must be selected")
    .exists(),
    check('hobbies', "Choose at least one option from the hobbies")
    .exists()

]
         ,(req , res) => {
             const all_errors = validationResult(req)
             if(all_errors) {
                 const errors = all_errors.array()
                 console.log(errors)
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

