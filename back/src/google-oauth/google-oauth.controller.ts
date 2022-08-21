import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { JwtAuthService } from 'src/jwt-auth/jwt-auth.service';
import { GoogleOauthGuard } from './google-oauth.guard';
import { LoggedInGuard } from './logged-in.guard';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('login')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req: Request) {
    return { msg: 'google auth' };
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    if (req.session) {
      res.redirect(this.configService.get('CLIENT_URL'));
    } else {
      res.redirect(this.configService.get('LOGIN_URL'));
    }
  }

  @Get('logout')
  @UseGuards(LoggedInGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    console.log(req.cookies);
    req.session.destroy(() => {
      console.log('session destroy');
    });
    console.log('logout');
  }

  @Get('status')
  @UseGuards(LoggedInGuard)
  async user(@Req() req: Request) {
    return { user: req.user };
  }
}
