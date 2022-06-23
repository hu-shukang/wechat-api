import { jwtUtil } from '../index';

describe('jwt-util', () => {
  it('create token', () => {
    const token = jwtUtil.createToken('abc');
    const payload = jwtUtil.verityToken(token);
    console.log(JSON.stringify(payload));
  });
});
