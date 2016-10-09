import mongoose from 'mongoose';
import passportLocalMoongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}); 

UserSchema.plugin(passportLocalMoongoose, {
  usernameField: 'email'
});

export default mongoose.model('User', UserSchema);