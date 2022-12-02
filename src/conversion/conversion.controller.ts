import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Conversion } from './conversion.entity';
import { ConversionService } from './conversion.service';
import { CreateConversionDto } from './Dto/CreateConversion.dto';

@Controller('conversion')
export class ConversionController {
  constructor(private readonly conversionService: ConversionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('convert')
  createConversion(
    @Body() createConversionDto: CreateConversionDto,
    @Request() req,
  ): Promise<Conversion> {
    return this.conversionService.createConversion(
      createConversionDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  history(@Request() req): Promise<Conversion[]> {
    console.log(req.user);
    return this.conversionService.getConversions(req.user);
  }
}
