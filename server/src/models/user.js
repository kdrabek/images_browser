import mongoose from 'mongoose';
import passportLocalMoongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
}); 

UserSchema.plugin(passportLocalMoongoose, {
  usernameField: 'email'
});

export default mongoose.model('User', UserSchema);