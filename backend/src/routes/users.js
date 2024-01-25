const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Product } = require('../models/Product');
const { Payment } = require('../models/Payment');
const { auth } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const async = require('async');

 
// 유저 인증체크

router.get('/auth', auth, async (req, res) => {

    return res.status(200).json({
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    })

})


// 회원가입 유저정보 저장

router.post('/register', async (req, res, next) => {

    try{
        const user = new User(req.body);
        await user.save();
        return res.sendStatus(200);

    } catch(error){
        next(error);
    }


})


// 로그인 요청

router.post('/login', async (req, res, next) => {
// frontend에서 req.body로 받아온 값 =  email, password
    try{
        // 회원가입이 된 데이터가 있는 유저인지부터 체크한다
        const user = await User.findOne({ email: req.body.email});
        if(!user){
            return res.status(400).send("Auth failed. email not found");
        }
        // 비밀번호가 맞는지 체크한다
        const isMatch = await user.comparePassword(req.body.password)
        if(!isMatch){ // 매치한 비밀번호가 맞지 않으면 에러 처리
            return res.status(400).send("Wrong password");
        }

        // 페이로드에 유저 아이디 넣어준다

        const payload = {
            userId: user._id.toHexString()
        }
        //토큰생성 후에 유저와 토큰 데이터 응답으로 보내주기

     const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
        return res.json({ user, accessToken })
        
    } catch(error){
        next(error);
    } 

})

// 로그아웃

router.post('/logout', auth, async(req, res, next) => {
    try{

        return res.sendStatus(200);

    } catch(error){
        next(error)
    }
})

// 로그인된 상태에서 구입할 상품 장바구니에 넣기

router.post('/cart', auth, async (req, res, next) => {

    try{

        // 제일 먼저 User Collection에 해당 유저의 정보 가져온다
        const userInfo = await User.findOne({_id: req.user._id})

        // User Collection에서 가져온 cart에 지금 넣으려는 상품이 들어있는지 확인

        let duplicate = false;
        
        userInfo.cart.forEach((item) => {
            if(item.id === req.body.productId ){
                duplicate = true;
            }
        })

        // cart안에 이미 있던 상품이라면

        if(duplicate){

            const user = await User.findOneAndUpdate(
                { _id: req.user._id, "cart.id":req.body.productId },
                { $inc: {"cart.$.quantity": 1}},
                { new:true}
            )
             return res.status(201).send(user.cart);   
        } else {    // cart안에 담아있지 않은 상품이라면
            const user = await User.findOneAndUpdate(
                {_id: req.user._id},
                {
                    $push: {
                        cart: {
                            id:req.body.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true }
            )
             return res.status(200).send(user.cart);   
        }
    
     
    }catch(error){
        next(error);
    }
})


// 장바구니 상품 삭제하기

router.delete('/cart', auth, async(req, res) => {

    try{
        // 장바구니 페이지에서 지우려고 했던 상품 지워주기

        const userInfo = await User.findOneAndUpdate(
            {_id: req.user._id},
            {
                "$pull":
                    {"cart" : {"id": req.query.productId}}
            },
            { new: true}
        )

            const cart = userInfo.cart;
            const array = cart.map(item => {
                return item.id;
            })

            // proudct collection에서 현재 남아있는 상품들의 정보를 가져온다
            //productIds = ['32423423423', '345345345345345345', '345345345345345'] 이 형식으로 바꿔주기
            
            const productInfo =  await Product
            .find({_id:{$in:array}})
            .populate('writer')

            return res.status(200).json({
                productInfo,
                cart
            })

    }catch(error){

        next(error);
    
    }

})


// 결제

router.post('/payment', auth, async (req, res) => {

    // user collection의 History 필드에 간단한 결제 정보 넣기

    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: new Date().toISOString(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentID: item._id,
            // paymentID: crypto.randomUUID()
        })
    })

    // Payment Collection 안에 결제한 정보들 넣어주기

    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    transactionData.product = history;


    // user collection

    await User.findOneAndUpdate(
        {_id : req.user._id},
        {
            $push : { history : { $each : history }}, 
            $set : { cart: [] }
        
        }
    )

    // payment collection

        const payment = new Payment(transactionData);
        const paymetDoc = await payment.save();
        

        let product = [];
        paymetDoc.product.forEach(item => {
            product.push({id:item.id, quantity:item.quantity})
        })

        async.eachSeries(product, async(item) => {
            await Product.updateOne(
                {_id: item.id },
                {
                    $inc: {
                        "sold" : item.quantity
                    }
                }
            )
        },
        (err) => {
            if(err) return res.status(500).send(err);
            return res.sendStatus(200);
        }
     )

})

module.exports = router;