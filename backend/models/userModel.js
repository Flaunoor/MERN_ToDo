const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema


const useSchema = new Schema({
    
    email:{
        type:String,
        required : true,
        unique:true
    },
    password:{
        type:String,
        required:true

    }

})

// static sign up method
useSchema.statics.signup = async function (email, password){

    // validation ( validate user input) _____________
    if(!email || !password){
        throw Error('all fields must be filled ')
    }

    if(!validator.isEmail(email)){
        throw Error('Not a valid email')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('password is not strong enough')
    }
    //_______________________________________________End



    //check if the email already exist in th db
    const exists = await this.findOne({ email })
    if(exists){
        throw Error('Email already in use')
    }
    //________________________________________End

    // hashing password with bcrypt
       // salt is a random string of caracters added to the password
    const salt =  await bcrypt.genSalt(10) 
    const hash = await bcrypt.hash(password, salt)
    //________________________________________

    // sign up user
    const user = await this.create({ email, password:hash })
    return user

}
//_____________________________________________________________


//static login method
useSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('all fields must be filled ')
    }
    const user = await this.findOne({ email })
    if(!user){
        throw Error('incorrect email')
    }

    const match = await bcrypt.compare(password , user.password)

    if(!match){
        throw Error('incorrect password')
    }

    return user

}

module.exports = mongoose.model('User', useSchema)