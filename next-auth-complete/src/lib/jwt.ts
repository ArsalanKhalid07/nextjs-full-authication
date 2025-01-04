import jwt , { JwtPayload } from "jsonwebtoken";


interface signOption {
    expireIn: string | number;
}

const default_signOption: signOption = {
    expireIn: "1d"
} 

export const signJwt = (payload:JwtPayload,option: signOption = default_signOption) => {
    const secretKey = process.env.JWT_SIGNIN_Key!;
    const token = jwt.sign(payload,secretKey);
    return token;
}

export const verifyJwt = (token: string) => {
    try {
        const secretKey = process.env.JWT_SIGNIN_Key!;
        const decode = jwt.verify(token,secretKey);
        return decode as JwtPayload;
    }
    catch(e) {
        console.error(e);
        return null;
    }

}