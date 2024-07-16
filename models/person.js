const mongoose = require('mongoose');

// define the person schema

const personSchema = new mongoose.Schema({
         name:{
            type:String,
            required: true,
         },
         age:{
            type:Number,
         },
         work:{
            type: String,
            enum:['chef','waiter','manger'],
            required: true
         },
          mobile:{
            type:String,
            required:true
          },
          email:{
              type:String,
              reuqired: true,
              unique: true
          },
          addres:{
            type:String
          },
          salary:{
            type:Number,
            reuired:true
          },
        });

    // create person model
    const Person = mongoose.model('Person',personSchema);
    module.exports = Person