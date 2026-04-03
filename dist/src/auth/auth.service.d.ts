import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly users;
    constructor(jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
