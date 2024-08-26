import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  
  @ApiProperty({ required: true, example: "Nehar Kot" })
  @IsString()
  @IsNotEmpty()
  town: string;

  @ApiProperty({ required: true, example: "Barkhan" })
  @IsString()
  @IsNotEmpty()
  tehsil: string;

  @ApiProperty({ required: true, example: "Barkhan" })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({ required: true, example: "Balochistan" })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ required: true, example: "address-1" })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ required: true, example: 29.79 })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ required: true, example: 69.47 })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
