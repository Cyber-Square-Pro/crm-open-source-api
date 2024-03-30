import { IsOptional, IsString } from 'class-validator';

export class PaginationDTO {
 
  @IsString()
  page?: number | string;

  @IsString()
  pageSize?: number | string;

  @IsOptional()
  @IsString()
  searchKeyword?: string;
}
