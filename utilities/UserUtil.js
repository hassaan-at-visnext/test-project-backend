

class UserUtil {
    static updateUserData (user) {
        if(!user){
            return user;
        }

        delete user.password;
        return user;
    }
}

module.exports = UserUtil;