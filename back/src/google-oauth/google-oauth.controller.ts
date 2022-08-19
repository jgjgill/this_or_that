import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';
import { GoogleOauthService } from './google-oauth.service';
import { LoggedInGuard } from './logged-in.guard';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private readonly googleOauthService: GoogleOauthService) {}

  @Get('login')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req: Request) {
    console.log(req.body.code);
    return { msg: 'google auth' };
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Res() res: Response) {
    res.redirect('http://localhost:3000');
    return { msg: 'ok' };
  }

  @Get('status')
  @UseGuards(LoggedInGuard)
  async user(@Req() req: Request) {
    return { user: req.user };
  }
}
