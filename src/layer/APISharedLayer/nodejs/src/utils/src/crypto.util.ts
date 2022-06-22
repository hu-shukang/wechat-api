import crypto from 'crypto';
import { v4 } from 'uuid';

export class CryptoUtil {
  private algorithm = 'sha256';

  public hash(data: string): string {
    return crypto.createHash(this.algorithm).update(data, 'utf8').digest('hex');
  }

  public id(): string {
    return v4();
  }
}
