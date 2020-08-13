const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3900;


app.get('/', (req, res) =>{
    res.json({
        message : 'Welcome to the API'
    })
})

app.post('/post', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (error, authData)=>{       
        if(error){
            res.sendStatus(403);
        }
        else
        {
            res.json({
                message : 'Post Created', authData
            })

        }

    })
   
})

app.post('/login', (req, res) =>{
    const user ={
        id : 1,
        username :'Suman',
        email : 'Suman@123.com'
    }
    jwt.sign({user}, 'secretkey', (err, token)=>{
        if(err){
            res.send('Not authrorized')
        }
        res.json({
            token
        })
    })
})

function verifyToken(req, res, next){
       if (typeof req.headers.authorization !== 'undefined') {
        const bearer = req.headers.authorization.split(' ');
        const bearertoken = bearer[1];
        req.token = bearertoken; 
        next();       
      }
      else
      {
        res.sendStatus(403);
      }  
     
}
app.listen(port, ()=> console.log(`Server is listening on port ${port}`));