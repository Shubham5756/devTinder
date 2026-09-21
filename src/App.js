

const express = require('express');

const app = express();

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