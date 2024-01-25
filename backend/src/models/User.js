const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    image: String
})

// 비밀번호 암호화

userSchema.pre('save', async function (next){

    let user = this;

    if(user.isModified('password')){ // 패스워드를 수정할 때만
        const salt = await bcrypt.genSalt(10); // 솔트를 생성하고
        const hash = await bcrypt.hash(user.password, salt); // 솔트와 함께 해쉬를 한다
        user.password = hash; // 해쉬된 솔트 비번 넘기기
    }

    next(); // 비밀번호 암호화한 뒤에 다음 작업으로 넘김

})


userSchema.methods.comparePassword = async function(plainPassword){
    
    let user = this;
    
    const match = await bcrypt.compare(plainPassword, user.password); // 해쉬된 비번이랑 매칭
    return match;
}


const User = mongoose.model("User", userSchema);

module.exports = { User };