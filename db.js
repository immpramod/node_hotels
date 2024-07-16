const mongoose=require('mongoose')

const url='mongodb://localhost:27017/hotels'
mongoose.connect(url);
const db=mongoose.connection

db.on('connected',()=>{
  console.log('connected')
})

db.on('error',(err)=>{
  console.log(err)
})

db.on('disconnected',()=>{
  console.log('disconnected')
})

module.exports=db
