import { IsString, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateAddressDto } from 'src/resources/address/dto/update-address.dto';
import { UpdateOrganizationDto } from 'src/resources/organization/dto/update-organization.dto';

export class UpdateSchoolDto {
  @ApiProperty({ example: 'Active', description: 'Status of the school', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ example: '08:00', description: 'Start time of the school', required: false })
  @IsString()
  @IsOptional()
  startTime?: string;

  @ApiProperty({ example: '14:00', description: 'End time of the school', required: false })
  @IsString()
  @IsOptional()
  endTime?: string;

  @ApiProperty({ example: 'Morning', description: 'Shift of the school', required: false })
  @IsString()
  @IsOptional()
  shift?: string;

  @ApiProperty({ example: true, description: 'Does the school have a projector?', required: false })
  @IsBoolean()
  @IsOptional()
  hasProjector?: boolean;

  @ApiProperty({ example: false, description: 'Does the school have laptops?', required: false })
  @IsBoolean()
  @IsOptional()
  hasLaptop?: boolean;

  @ApiProperty({ type: UpdateAddressDto, description: 'Updated address of the school', required: false })
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  @IsOptional()
  address?: UpdateAddressDto;

  @ApiProperty({ type: UpdateOrganizationDto, description: 'Updated organization associated with the school', required: false })
  @ValidateNested()
  @Type(() => UpdateOrganizationDto)
  @IsOptional()
  organization?: UpdateOrganizationDto;
}
