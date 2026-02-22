import jwt from "jsonwebtoken";

export const ACCESS_EXPIRES = 60 * 15; // 15 minutes
export const REFRESH_EXPIRES = 60 * 60 * 24 * 7; // 7 days

export function signAccessToken(userId: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET");
  return jwt.sign({ sub: userId, type: "access" }, secret, {
    expiresIn: ACCESS_EXPIRES,
  });
}

export function signRefreshToken(userId: string) {
  const secret = process.env.JWT_REFRESH_SECRET ?? process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_REFRESH_SECRET or JWT_SECRET");
  return jwt.sign({ sub: userId, type: "refresh" }, secret, {
    expiresIn: REFRESH_EXPIRES,
  });
}

export function verifyRefreshToken(token: string) {
  const secret = process.env.JWT_REFRESH_SECRET ?? process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_REFRESH_SECRET or JWT_SECRET");
  return jwt.verify(token, secret) as {
    sub: string;
    type: string;
    iat?: number;
    exp?: number;
  };
}

export function verifyAccessToken(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET");
  return jwt.verify(token, secret) as {
    sub: string;
    type: string;
    iat?: number;
    exp?: number;
  };
}

export default null;
