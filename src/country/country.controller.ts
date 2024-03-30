import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CountryService } from './country.service';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { TokenGuard } from 'src/common/guard/token.guard';

@Controller('country')
@UseGuards(new TokenGuard('access'))
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDTO) {
    return this.countryService.findAll(paginationDto);
  }
}
