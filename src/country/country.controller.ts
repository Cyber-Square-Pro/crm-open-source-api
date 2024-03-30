import { Controller, Get, Query } from '@nestjs/common';
import { CountryService } from './country.service';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDTO) {
    return this.countryService.findAll(paginationDto);
  }
}
