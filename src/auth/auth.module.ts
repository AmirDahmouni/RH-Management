import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/user.model';



@Module({
    imports: [MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
    ])
    ],
    providers: [AuthService, JwtStrategy]

})
export class AuthModule { }