import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({required: true, example: "publicschools" })
  @IsString()
  @IsNotEmpty()
  name: string;
}