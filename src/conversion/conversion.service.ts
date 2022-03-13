import { HttpService } from 'nestjs-http-promise'
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversion } from './conversion.entity';
import { CreateConversionDto } from './Dto/CreateConversion.dto';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

@Injectable()
export class ConversionService {

  currency_api = `http://api.currencylayer.com/live?access_key=${process.env.CURRENCY_API_SECRET}&currencies=CHF,EUR`

    constructor(
      private readonly httpService: HttpService,
        @InjectRepository(Conversion) private conversionRepository: Repository<Conversion>
      ) {}

      async getConversions(user:any): Promise<Conversion[]> {
        return await this.conversionRepository.find({
          user: user.userId
        });
      }

      async createConversion(conversion: CreateConversionDto, user:any): Promise<Conversion> {
        const newConversion: Conversion = this.conversionRepository.create({
          ...conversion,
          user: user.userId
        });

        const result = await this.convert(conversion.currencyFrom,conversion.currencyTo,conversion.amountInitial)
        newConversion.amountResult = result?result:-1
        return await this.conversionRepository.save(newConversion);
      }

      convert= async (from,to,amount): Promise<number|void>=>{

      let quotes = null

      return await this.httpService.get(this.currency_api).then((res)=>{
          quotes = res.data.quotes
        switch(from) {
            case "USD":
              if(to=="EUR")
                return amount*(quotes.USDEUR)
              
              else if (to=="CHF")
                return amount*(quotes.USDCHF)
            case "EUR":
              if(to=="USD"){
                return amount*(1/(quotes.USDEUR))
              }
              else if (to=="CHF")
                return amount*((1/(quotes.USDEUR))*quotes.USDCHF)
            case "CHF":
              if(to=="USD")
                return amount*(1/(quotes.USDCHF))
              else if (to=="EUR")
                return amount*((1/(quotes.USDCHF))*quotes.USDEUR)
            default : 
              throw new BadRequestException("Only these currencies are available : EUR, USD, CHF")
            }
        })
      }
}
