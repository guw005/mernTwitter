const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const passport = require('passport');

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// app.get("/", (req, res) => {
//   const user = new user({
//     handle: "jim",
//     email: "jim@jim.jim",
//     password: "jimisgreat123"
//   })
//   user.save()
//   res.json


// })

// app.get("/", (req, res) => {
//     res.send("Hello a/A!!!");
// });
app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users)
app.use("/api/tweets", tweets)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));