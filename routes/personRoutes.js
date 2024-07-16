const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
 

// post route to add a person
router.post('/' ,  async(req,res)=>{
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


router.get('/', async(req, res)=>{
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

router.get('/person/:workType', async(req,res)=>{
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


// update 

router.put('/:id' ,async (req,res)=>{
          try{
                const personId = req.params.id; // extract the id form the url parameter
                const updatedPersonData = req.body; // updated data from the person

                const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
                  new: true, // return the upadted document
                  runValidators: true, // Run mongoose validtions
                })
                if(!response){
                      return res.status(404).json({error: 'perosn not found'})
                }
                console.log('response fetched');
                res.status(200).json(response);
                }catch{
                  console.log(error);
                  res.status(500).json({error:'internal server error'})
                }
})

router.delete('/:id'  ,async (req,res)=>{
        try{
            const personId = req.params.id;
            const response = await Person.findByIdAndDelete(personId);

            if(!response){
              return res.status(404).json({error: 'perosn not found'})
        }
        console.log('data deleted');
        res.status(200).json({message: ' person deleted successfully'});
        }
        catch{
          console.log(error);
          res.status(500).json({error:'internal server error'})
        }
})



module.exports = router;