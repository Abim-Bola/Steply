import User from "infra/database/models/user";
import Unauthorized from "interfaces/errors/Unauthorized";
import  Token  from "helpers/jwt";

class Authentication {
    constructor({ User }) {
        this.User = User;
        console.log(this)
    }

     async getUser(req) {
            if (!req.headers.authorization) {
                return null;
            }
            const authorizationHeader = req.headers.authorization;
            const requestToken = authorizationHeader.split("Bearer").pop().trim();
            const payload = await Token.decodeToken(requestToken);
            const user = await this.User.findById(payload.sub);
            return user;
    }
     async userLoggedin(req, res, next) {
            const user = await this.getUser(req);
            if (!user) {
                throw new Unauthorized("Not allowed access to this resource");
            }
            req.user = user;
            next();
    }
}

export default new Authentication({ User });