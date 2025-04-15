const User = require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signUp = async(req,res)=>{

    try{
        let{username,password,email} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to Wanderlust!");
            res.redirect('/listing')
        })

    }catch(err){
        req.flash("error",err.message);
        res.redirect('/signup')
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}


module.exports.login =  async(req,res)=>{
    req.flash("success","welcome back to wanderlust!");
    if(res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl);
    }else{
        res.redirect('/listing');
    }
}

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","you are logged out");
        res.redirect('/listing');
    });
}