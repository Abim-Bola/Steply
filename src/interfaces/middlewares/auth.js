import User from "infra/database/models/user";
import Unauthorized from "interfaces/errors/Unauthorized";
import { asValue, Lifetime } from "awilix";
import container  from "container";
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
         try {
            const user = await this.getUser(req);
            if (!user) {
                throw new Unauthorized("Not allowed access to this resource");
            }
            container.register({
                currentUser: asValue(user),
              });
            req.user = user;
            next(); 
         } catch (error) {
          throw error
         }
            
    }
}

export default new Authentication({ User });