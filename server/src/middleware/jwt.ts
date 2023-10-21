import jwt from "jsonwebtoken";
import ConfigKeys from "../common/config";
interface Payload {
  email: string;
  role: string;
  id:string;
}

const jwtAuthentication = () => {
  const generateToken = (payload: Payload) => {
    const token = jwt.sign(payload, ConfigKeys.JWT_SECRET, { expiresIn: "3d" });
    return token;
  };

  const verifyToken = (token: string) => {
    return jwt.verify(token, ConfigKeys.JWT_SECRET);
  };

  return {
    generateToken,
    verifyToken,
  };

};

export default jwtAuthentication;
