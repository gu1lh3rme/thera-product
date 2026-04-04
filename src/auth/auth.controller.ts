import { Controller, Post, Body } from '@nestjs/common';
import { 
  ApiTags, ApiOperation, ApiOkResponse, 
  ApiUnauthorizedResponse, ApiBadRequestResponse, ApiBody
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ 
    summary: 'User authentication', 
    description: 'Authenticate user with email/username and password to get JWT access token' 
  })
  @ApiOkResponse({ 
    description: 'Login successful, JWT token returned',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', description: 'JWT access token' },
        user: { type: 'object', description: 'User information' }
      }
    }
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiBody({ type: LoginDto })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
