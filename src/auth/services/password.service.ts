import * as bcrypt from 'bcrypt';
export class PasswordService {
  private readonly SALT: number = 10;
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT);
  }

  compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
