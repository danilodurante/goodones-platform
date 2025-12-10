import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // ⚠️ Qui gestiamo entrambe le possibili property:
    const hash =
      (user as any).password_hash !== undefined &&
      (user as any).password_hash !== null &&
      (user as any).password_hash !== ''
        ? (user as any).password_hash
        : (user as any).passwordHash;

    if (!hash) {
      // Logghiamo il problema per debugging
      console.error('No password hash found for user', {
        id: (user as any).id,
        email: (user as any).email,
        user,
      });
      // Errore 500 lato API (meglio di far esplodere bcrypt)
      throw new InternalServerErrorException('User password not configured');
    }

    const match = await bcrypt.compare(password, hash);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
