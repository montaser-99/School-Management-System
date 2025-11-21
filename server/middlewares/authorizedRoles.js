const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) 
            return res.status(401).json({ success: false, message: "Please authenticate" });

        if (!roles.includes(req.user.role)) 
            return res.status(403).json({ success: false, message: "Access denied" });

        next();
    };
};

export default authorizedRoles;
