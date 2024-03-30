import { IsOptional, IsString } from 'class-validator';

export class PaginationDTO {
 
  @IsString()
  page?: string;

  @IsString()
  pageSize?: string;

  @IsOptional()
  @IsString()
  searchKeyword?: string;
}
