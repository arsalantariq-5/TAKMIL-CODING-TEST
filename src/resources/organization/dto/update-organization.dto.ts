import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateOrganizationDto {
  @ApiProperty({ required: false, example: "publicschools" })
  @IsString()
  @IsOptional()
  name?: string;
}
