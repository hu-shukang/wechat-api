import jwt from 'jsonwebtoken';
import { HttpError, TokenPayload } from 'model';
import { Const } from './const.util';

class JwtUtil {
  private key: string = 'HUAajYAWMjWxNAS7ND9gnGbzFJccjdNEdimGJNcL';
  private algorithm: jwt.Algorithm = 'RS256';

  /**
   * Tokenを生成する
   *
   * @param userId ユーザID
   * @returns Token
   */
  public createToken(userId: string): string {
    const payload: TokenPayload = {
      userId: userId,
    };
    const options: jwt.SignOptions = {
      expiresIn: 60 * 60 * 24, // 有効期限1日
      algorithm: this.algorithm,
    };
    return jwt.sign(payload, this.key, options);
  }

  /**
   * Tokenを検証する
   *
   * @param token Token
   * @returns TokenPayload
   */
  public verityToken(token: string | undefined): TokenPayload {
    if (!token) {
      throw new HttpError(Const.HTTP_STATUS_401, Const.ERROR_LOGIN_REQUIRED);
    }
    const options: jwt.VerifyOptions = {
      algorithms: [this.algorithm],
    };
    return jwt.verify(token, this.key, options) as TokenPayload;
  }
}

export const jwtUtil = new JwtUtil();
