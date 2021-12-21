import jwt from "jsonwebtoken";

require("dotenv").config();

// class Token  {
//     constructor()
//     async decodeToken(payload) {
//             return jwt.verify(payload.token, process.env.JWTSECRET)
//     }
// }

// export default new Token();


const Token = {
    async decodeToken(payload) {
        return jwt.verify(payload, process.env.JWTSECRET)
}
  };
  export default Token;
  