class User {
    constructor(id, fullname, username, password, age = undefined) {
        this.id = id;
        this.fullname = fullname;
        this.username = username;
        this.password = password;
        this.age = age;
    }
}

module.exports = User;
