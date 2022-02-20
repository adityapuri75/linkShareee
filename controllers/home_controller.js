const User = require('../models/user');

module.exports.home = async function(req, res){
    if (req.isAuthenticated()){
       let user = await User.findById(req.user.id);
        
            await user.populate({
                path: 'links',
            });
            if(user && user.title){
            return res.render('view',{
                title: user.title,
                description: user.description,
                imgUrl: user.imgUrl,
                user: user
            });
        }else{
            return res.render('create');
        }
                
        
    }
    return res.render("login");
}


module.exports.company = async function(req, res){
    try{
        let user = await User.findOne({title:req.params.title});
         if(user){
            await user.populate({
                path: 'links',
            });
            return res.render('viewgen',{
                title: user.title,
                description: user.description,
                imgUrl: user.imgUrl,
                links: user.links
            });
         }else{
            req.flash('error', 'Page not avilable');
            //  console.log('not found');
             return res.render('error');
         }
    }catch(err){
        console.log(err);
        return res.redirect('/');
    }
        
             
                 
}