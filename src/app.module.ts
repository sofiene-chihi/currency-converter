import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConversionModule } from './conversion/conversion.module';
import { Conversion } from './conversion/conversion.entity';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sofiene',
      database: 'currency_converter',
      entities: [User,Conversion],
      synchronize: true,
    }),
    UserModule,
    ConversionModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
