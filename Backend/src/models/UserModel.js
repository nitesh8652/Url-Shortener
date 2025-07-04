import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
      verified:{
         type: Boolean, default: false 
        }, 
    // avatar : {
    //     type:String,
    //     required: false,
    //     default: function(){
    //         return getGravatarUrl(this.email);
    //     }
    // }

})

// userSchema.methods.toJSON = function () {
//     const user = this.toObject();
//     delete user.password;
//     return user;
// };


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.set('toJSON',{
    transform:function(doc,ret){
        delete ret.password;
        delete ret.v;
        return ret
    }
})

// const User = mongoose.model("User", userSchema);
// export default User;

export default mongoose.models.User || mongoose.model("User", userSchema);