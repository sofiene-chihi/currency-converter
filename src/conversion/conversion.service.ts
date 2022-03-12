import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversion } from './conversion.entity';
import { CreateConversionDto } from './Dto/CreateConversion.dto';

@Injectable()
export class ConversionService {

    constructor(
        @InjectRepository(Conversion) private conversionRepository: Repository<Conversion>,
      ) {}
    
    //   async createConversion(conversion: CreateConversionDto): Promise<Conversion> {
    //   }
}
