const express = require('express');

const router = express.Router();
const {registerUser,loginUser} = require("../../controllers/usersController");
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log(req.url,'  ::Time: ', Date.now())
    next()
  })


router.get('/:id/:name',(req,res)=>{
    res.send(req.params);
   
});
router.get('/',(req,res)=>{
  const{id, name}= req.query;
  res.json(req.query);
 
});
router.post('/register-user',registerUser)

router.post('/login-user', loginUser)

module.exports= router;