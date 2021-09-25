import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from "./file/file.module"
import { HolidayModule } from './holidays/holiday.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot:"/uploads"
    }),
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    MongooseModule.forRoot(process.env.MONGO_INFO),
    
    GraphQLModule.forRoot({
        context: ({req}) => ({...req}),
        fieldResolverEnhancers: ['interceptors'],
        autoSchemaFile: 'schema.gql', 
        cors: true,
    }),
    HolidayModule,
    UserModule,
    AuthModule,
    FileModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}


