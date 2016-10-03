import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let ImageSchema = new Schema({
  title: {
    type:String, 
    required: true
  },
  owner: { 
    type: String, 
    required: true
  },
  url: { 
    type: String, 
    required: true
  },
  tag: { 
    type: String, 
    required: false, 
    default: null
  },
  stars: {
    type: Number, 
    required: false,
    default: 0,
    min: 0, 
    max: 5,
    get: v => Number(v),
    set: v => Number(v)
  }    
})

module.exports = mongoose.model('Image', ImageSchema);