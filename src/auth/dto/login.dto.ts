import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ 
    description: 'Username or email for authentication',
    example: 'admin',
    minLength: 3,
    maxLength: 50
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ 
    description: 'User password',
    example: 'password123',
    minLength: 6,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
