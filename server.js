const express = require('express')
const app = express();

const db=require('./db.js')


 const Person = require('./models/person');
 const MenuItem = require('./models/MenuItem');


 const bodyParser = require('body-parser');
 app.use(bodyParser.json());// req.body


 app.get('/', function (req, res) {
  res.send('welcome to my hotel how can i help your ')
 })

// post route to add a person
 app.post('/person' ,  async(req,res)=>{
        try{
        const data = req.body  // assuming the request body contains the person data

        // create a new person document using the mongoose model
        const newPerson = new Person(data);

       // save the new person to the database
       const response  = await newPerson.save();
       console.log('data saved');
      res.status(200).json(response);
        }
        catch(err){
          console.log(err);
          res.status(500).json({error: ' internal server error'});
        }
     })

     // to Get method to get the person
 app.get('/person', async(req, res)=>{
     try{
      const data  = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
     }
     catch(err){
       console.log(err);
      res.status(500).json({error: ' internal server error'});
   }
  })


 // post route to add a menu
app.post('/menu' ,  async (req,res)=>{
    try{
     const data = req.body 
     const newMenu = new MenuItem(data);
    const response  = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response); 
     }    
    catch(err){
       console.log(err);
        res.status(500).json({error: ' internal server error'});
     }
    })

// Get method to get the menu
   app.get('/menu', async(req,res)=>{
    try{
      const data = await MenuItem.find()
      console.log('data fetched');
     res.status(200).json(data);
     }
     catch(err){
     console.log(err);
     res.status(500).json({error: ' internal server error'});
  }
 })

 app.get('/person/:workType', async(req,res)=>{
        try{
             const workType = req.params.workType;
             if(workType=='chef'|| workType=='manger'||workType=='waiter'){
                const response = await Person.find({work: workType});
                console.log('response fetched');
                res.status(200).json(response);
             }else{
                  res.status(404).json( {error: 'inavlid work'});
             }
            }
             catch(err){
                 console.log(err);
                 res.status(500).json({error:'internal server error'})
             }
 })

 // import the router files

 const personRoutes = require('./routes/personRoutes');
 // use the router
 app.use('/person',personRoutes);

 // import the router files
 const meunItemRoutes = require('./routes/menuItemRoutes');
 // use the router
 app.use('/menu', meunItemRoutes);
app.listen(3000,()=>{
  console.log("listening on  port 3000");
})