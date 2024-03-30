import { IsOptional, IsNumber, IsString } from 'class-validator';

export class PaginationDTO {
 
  @IsNumber()
  page?: number;

  @IsNumber()
  pageSize?: number;

  @IsOptional()
  @IsString()
  searchKeyword?: string;
}
