const express = require("express")
const router = express.Router()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User")
const { default: axios } = require("axios")

router.post('/signup',async(req,res)=>{
    try {
        const {username,password} = req.body

        const existingUser = await User.findOne({username})

        if(existingUser){
            return res.status(401).json({message:"이미 존재하는 사용자 입니다"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({
            username,
            password:hashedPassword
        })

        await user.save()

        res.status(201).json({message:"회원가입이 완료 되었습니다 "})
    } catch (error) {
        res.status(500).json({message:"서버 오류 발생"})
        
    }
})

router.post('/login',async(req,res)=>{
    try {
        const {username,password} = req.body

        const user = await User.findOne({username}).select("+password")

        if(!user) return res.status(401).json({message:"사용자 없음"})
        if(!user.isActive) return res.status(401).json({message:"비활성계정"})
        
        const isMatch = await bcrypt.compare(password,user.password)
        
        if(!isMatch){
            user.failedLoginAttempts+=1
            user.lastLoginAttempt=new Date()
            if(user.failedLoginAttempts>=5){
                user.isActive=true
                await user.save()
                res.status(401).json({message:"비밀번호 5회 이상 오류, 계정이 잠겼습니다"})
            }
            await user.save()
            return res.status(401).json({
                message:"비밀번호가 틀렸습니다",failedAttemp:failedLoginAttempts+"번 틀림"
            })
            
        }

        user.failedLoginAttempts=0
        user.lastLoginAttempt=new Date()
        user.isLoggedIn = true

        try {
            const {data}=await axios.get("https://api.ipify.org?format=json")
            if(data?.ip) user.ipAddress=data.ip
        } catch (error) {
            console.error("IP주소 조회 실패")
        }
        await user.save()

        const token = jwt.sign(
            {
                userId:user._id,
                username:user.username,
                role:"admin"
            },
            process.env.JWT_SECRET,
            {expiresIn:"24h"}
        )
        
        

        const userWithoutPassword = user.toObject()
        delete userWithoutPassword.password

        return res.status(200).json({
            message:"로그인 성공",
            token,
            user:userWithoutPassword
        })

    } catch (error) {
        console.error(error)
        return res.status(401).json({message:"로그인 실패"})
    }

})

router.post('/logout',async(req,res)=>{
    try {
        const token = req.cookies.token
        
        if(!token){
            return res.status(400).json({message:'이미 로그아웃된 상태입니다'})
        }
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET) //유효성 검증
            const user = await User.findById(decoded.userId)
            
            if(user){
                user.isLoggedIn=false
                await user.save()
            }
        } catch (error) {
            console.log("토큰 검증 오류",error)
        }
        
        res.clearCookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict',
        })
    } catch (error) {
        console.log("로그아웃 중 서버오류",error)
    }
})

router.get('/users',async(req,res)=>{
    try {
        
        const users= await User.find().sort({createdAt:-1})
        
        return res.status(201).json({message:"전체 유저 가져오기 성공"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"서버오류"})
    }
})
router.delete('/delete/:userId',async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.userId)

        if(!user){
            return res.status(404).json({message:'사용자를 찾을 수 없습니다.'})
        }
        
        return res.status(201).json({message:'사용자 삭제 성공.'})


        res.clearCookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict',
        })
    } catch (error) {
        console.log("로그아웃 중 서버오류",error)
    }
})

module.exports=router