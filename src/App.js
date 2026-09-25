const express = require("express");

const app = express();

// app.get("/test", (req, res, next) => {
//   console.log("first get");
//   //res.send("first response");
//   next();
// });

// app.get("/test", (req, res, next) => {
//   console.log("second get");
//   res.send("second response");
// });

app.use('/test' , (req, res , next)=> {
    console.log('response for the test page');
     
    //res.send('response 1');
     next();

},
(req, res , next)=> {
      next();
    res.send('response 2');

},
(req, res ,next)=> {
    next();
    res.send('response 3');

},
(req, res ,next)=> {
    res.send('response 4');

}
);

// app.get('/example' , (req , res)=>{
//   res.send({userName : 'shubham', sirName : 'Yedage'});
// });

// app.post('/example' , (req , res)=>{
//   res.send('post request sent successfully');
// });

// app.delete('/example' , (req ,res)=>{
//  res.send('message deleted succefully');
// })

// app.use('/test/:userId/:password/:address',(req, res)=> {
//     console.log(req.params)
//     res.send('response for the test page');
// });

// app.use('/app',( req , res)=> {
//     res.send('response for the app page');

// });

// app.use( '/',(req, res)=>{
//     res.send('Hello form the server');
// });

app.listen(4000, () => {
  console.log("server started on port 4000");
});
