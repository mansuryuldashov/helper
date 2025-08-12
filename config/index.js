const config = {
    port: process.env.PORT || 5000,
    secret: process.env.JWT_SECRET || "",
    expireIn: process.env.JWT_EXPIRE_IN || "0s",
};

module.exports = config;
