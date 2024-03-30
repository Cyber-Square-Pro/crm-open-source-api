import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { Country } from './country.schema';
import { Model } from 'mongoose';

@Injectable()
export class CountryService {

  constructor(
    @InjectModel(Country.name) private readonly countryModel: Model<Country>
  ){}

  async findAll(paginationDto: PaginationDTO) {
    try {
      let { page, pageSize, searchKeyword } = paginationDto;
      const aggregationPipeline: any[] = [];
      if (searchKeyword) {
        aggregationPipeline.push({
          $match: {
            $or: [
              { name: { $regex: searchKeyword, $options: 'i' } },
              { iso3: { $regex: searchKeyword, $options: 'i' } },
            ],
          },
        });
      } else {
        aggregationPipeline.push({
          $match: {}
        });
      }
      if (pageSize) {
        const pageSizeValue = Number(pageSize);
        const pageValue = Number(page);
        aggregationPipeline.push(
          { $skip: (pageValue - 1) * pageSizeValue },
          { $limit: pageSizeValue }
        );
      }
      const countries = await this.countryModel.aggregate(aggregationPipeline).exec();
      return { statusCode: HttpStatus.OK, message: 'operation.success', data:countries };
    } catch (error) {
      console.log(error)
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error' };
    }
  }
}
