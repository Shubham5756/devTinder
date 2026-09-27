const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();


app.use(express.json());
app.post("/signup", async(req, res) => {
console.log(req);


  // const user = new User (req.body);
  // await user.save();
    res.send("user added successfully");
});

connectDB()
  .then(() => {
    console.log("database connection established...");
    app.listen(4000, () => {
      console.log("server started on port 4000");
    });
  })
  .catch((err) => {
    console.error("database cannot be connected...");
  });

// app.use('/', (err , req ,res ,next, )=> {
//   if(err){
//     res.status(500).send('page is not found');
//   }
// })

// app.get('/getUserData' , (req , res)=>{
//   try{
//   throw new error('ddfvfbbn');
//   res.send('user data sent');
// }
//  catch(err){
//    res.status(500).send('page is ........');
//  }
// } )

// app.use("/test", (req, res, next) => {
//   console.log("first get");
//   //res.send("first response");
//   next();
// });

// app.get("/test", (req, res, next) => {
//   console.log("second get");
//   res.send("second response");
// });

// app.use('/test' , (req, res , next)=> {
//     console.log('response for the test page');

//     //res.send('response 1');
//      next();

// },
// (req, res , next)=> {
//       next();
//     res.send('response 2');

// },
// (req, res ,next)=> {
//     next();
//     res.send('response 3');

// },
// (req, res ,next)=> {
//     res.send('response 4');

// }
// );

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
