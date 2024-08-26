import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {

  @ApiProperty({ example: "Nehar Kot", description: 'Town of the address', required: false })
  town?: string;

  @ApiProperty({ example: "Barkhan", description: 'Tehsil of the address', required: false })
  tehsil?: string;

  @ApiProperty({ example: "Barkhan", description: 'District of the address', required: false })
  district?: string;

  @ApiProperty({ example: "Balochistan", description: 'State of the address', required: false })
  state?: string;

  @ApiProperty({ example: "address-1", description: 'Detailed address information', required: false })
  address?: string;

  @ApiProperty({ example: 29.79, description: 'Latitude of the location', required: false })
  latitude?: number;

  @ApiProperty({ example: 69.47, description: 'Longitude of the location', required: false })
  longitude?: number;
}
