import { Body, Controller, Post } from '@nestjs/common';
import { Conversion } from './conversion.entity';
import { ConversionService } from './conversion.service';
import { CreateConversionDto } from './Dto/CreateConversion.dto';

@Controller('conversion')
export class ConversionController {

  constructor(private readonly conversionService: ConversionService) {}

//   @Post('convert')
//   createConversion(@Body() createConversionDto: CreateConversionDto): Promise<Conversion> {
//     return this.conversionService.createConversion(createConversionDto);
//   }
}
