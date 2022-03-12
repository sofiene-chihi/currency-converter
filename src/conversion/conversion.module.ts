import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversionController } from './conversion.controller';
import { Conversion } from './conversion.entity';
import { ConversionService } from './conversion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversion])],
  controllers: [ConversionController],
  providers: [ConversionService]
})
export class ConversionModule {}
