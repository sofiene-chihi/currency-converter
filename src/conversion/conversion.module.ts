import { HttpModule } from 'nestjs-http-promise'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversionController } from './conversion.controller';
import { Conversion } from './conversion.entity';
import { ConversionService } from './conversion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversion]),HttpModule
],
  controllers: [ConversionController],
  providers: [ConversionService]
})
export class ConversionModule {}
