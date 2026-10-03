const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();
const bcrypt = require("bcrypt");
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


app.delete("/signup", async (req, res) => {
  const userId = req.body.id;
  try {
    const id = await User.findByIdAndDelete(userId);
    res.send(id);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/signup", async (req, res) => {
  const userId = req.body.id;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["PHOTOuRL", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    const result = await User.findByIdAndUpdate(userId, data);
    // consol.log(result)
    res.send(result);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
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
