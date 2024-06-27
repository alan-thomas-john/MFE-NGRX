const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');



  app.use(bodyParser.json());
  app.use(cors());

  app.use('/auth', authRoutes);
  

  // app.post('/login',(req,res) => {
  //   const{email,password}= req.body;

  //   const user = users.find(u => u.email === email && u.password === password)

  //   if (user) {
  //       res.status(200).send({ message: 'Login successful' });
  //     } else {
  //       res.status(401).send({ message: 'Invalid username or password' });
  //     }
  // });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });