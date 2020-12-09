module.exports = (db) => {
    let middlewareObj = {}
    const user = db.user

    middlewareObj.isLoggedIn = function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        res.status(401).json({
            error: "Login Required"
        })
    }
    
    middlewareObj.userOwnership = function(req, res, next){
        if(req.isAuthenticated()){
            user.findById(req.params.id, function(err, foundUser){
                if(req.params.id == req.user.id){
                    next();
                } else{
                    res.status(401).json({
                        error: "You are not the owner of this account!"
                    })
                }
            })
        }
        else{
            res.status(401).json({
                error: "Login Required!"
            })
        }
    }



    return middlewareObj
}