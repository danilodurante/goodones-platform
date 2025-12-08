import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    const result = await this.authService.login(user);

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie('goodones_access', result.accessToken, {
      httpOnly: true,
      secure: false, // in produzione: true con HTTPS
      sameSite: 'lax',
      expires,
    });

    return {
      user: result.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    return {
      user: req.user,
    };
  }
}
