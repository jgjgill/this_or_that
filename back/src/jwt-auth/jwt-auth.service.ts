import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user) {
    const payload = { name: user.name, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
