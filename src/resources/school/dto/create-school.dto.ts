import { IsString, IsNotEmpty, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from 'src/resources/address/dto/create-address.dto';
import { CreateOrganizationDto } from 'src/resources/organization/dto/create-organization.dto';

export class CreateSchoolDto {
  @ApiProperty({ example: 'Greenwood High', description: 'Name of the school', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Active', description: 'Status of the school', required: true })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: '08:00', description: 'Start time of the school', required: true })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '14:00', description: 'End time of the school', required: true })
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({ example: 'Morning', description: 'Shift of the school', required: true })
  @IsString()
  @IsNotEmpty()
  shift: string;

  @ApiProperty({ type: CreateAddressDto, description: 'Address of the school', required: true })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ApiProperty({ type: CreateOrganizationDto, description: 'Organization associated with the school', required: true })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateOrganizationDto)
  organization: CreateOrganizationDto;

  @ApiProperty({ example: true, description: 'Does the school have a projector?', required: false })
  @IsBoolean()
  hasProjector: boolean;

  @ApiProperty({ example: false, description: 'Does the school have laptops?', required: false })
  @IsBoolean()
  hasLaptop: boolean;
}
