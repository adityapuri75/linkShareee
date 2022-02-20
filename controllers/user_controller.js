
const Link = require('../models/links');
const User = require('../models/user');

module.exports.view = function(req, res){
    return res.render("create");
}

module.exports.signIn = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect(`create`);
    }
    return res.render("login");
}

module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.render('create');
    }
    return res.render("signup");
}

module.exports.createSession = function(req, res){
    console.log('Login Sucessfully');
    return res.redirect('/');
}

module.exports.create = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
         console.log('error runnning user finding query'); 
         return;  
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error runnning user finding query'); 
                    return;  
                   }
                   return res.redirect('/');
            })
        }else{
            return res.redirect('back');  
        }
    })

}

module.exports.createprofile = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            return res.render('create');
        }
        if(user){
            user.title = req.body.title;
            user.imgUrl = req.body.imgUrl;
            user.description = req.body.description;
            user.save(()=>{
                res.render('view', {
                    title: req.body.title,
                    imgUrl: req.body.imgUrl,
                    description: req.body.description
                });
            })
        }
    })

}

module.exports.createlink = async function(req, res){
    try{
 let user  =   await  User.findById(req.user.id)
   
    let link =  await Link.create(req.body)
        await user.links.push(link);
        await user.save();
        req.flash('Success', 'Link Published');
        return res.redirect('/');
    }catch(err){
        console.log(err);
    }
}


module.exports.destroylink = async function(req, res){
 let link =   await Link.findById(req.params.id);

    if(link.user==req.user.id){
        let user = link.user;
        link.remove();
         User.findByIdAndUpdate(user, {$pull:{links:req.params.id}}, function(err, userr){
            req.flash('error', 'Link Deleted');
            return res.redirect('back');
        });
    }
}