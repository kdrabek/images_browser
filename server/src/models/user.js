import mongoose from 'mongoose';
import passportLocalMoongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

// hash and salt fields for password are added by passport-local-mongoose
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  }
}); 

UserSchema.plugin(passportLocalMoongoose, {
  usernameField: 'email'
});

export default mongoose.model('User', UserSchema);