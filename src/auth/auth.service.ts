import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // NOTE: Hardcoded credentials for demo purposes only.
  // In production, replace with a proper user repository and password hashing (e.g., bcrypt).
  private readonly users = [
    { id: 1, username: 'admin', password: 'admin123' },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const user = this.users.find(
      (u) => u.username === loginDto.username && u.password === loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
