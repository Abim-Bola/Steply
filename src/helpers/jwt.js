import jwt from "jsonwebtoken";
import env from '../config/config'

// class Token  {
//     constructor()
//     async decodeToken(payload) {
//             return jwt.verify(payload.token, process.env.JWTSECRET)
//     }
// }

// export default new Token();



const Token = {
    async decodeToken(payload) {
        return jwt.verify(payload, process.env.JWT_SECRET)
},

generateAuthToken: (payload, options) =>{
  const { _id: userId, ...data } = payload;
  const jwtIssuer = env.getEnv().JWT_ISSUER
  const jwtAudience = env.getEnv().JWT_AUDIENCE
  const jwtSecret = env.getEnv().JWT_SECRET

  const token = jwt.sign(
    {
      iss: jwtIssuer,
      aud: jwtAudience,
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 120, // Expires in 120 days
      ...data,
    },
    jwtSecret,
    options
  );

  return token;
}
  };
  export default Token;
  