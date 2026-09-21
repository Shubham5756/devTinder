

const express = require('express');

const app = express();


app.get('/example' , (req , res)=>{
  res.send({userName : 'shubham', sirName : 'Yedage'});
});

app.post('/example' , (req , res)=>{
  res.send('post request sent successfully');
});

app.delete('/example' , (req ,res)=>{
 res.send('message deleted succefully');
})

app.use('/test',(req, res)=> {
    res.send('response for the test page');
});

app.use('/app',( req , res)=> {
    res.send('response for the app page');

});


app.use( '/',(req, res)=>{
    res.send('Hello form the server');
});
 


app.listen(4000, ()=> {
    console.log('server started on port 4000');
});