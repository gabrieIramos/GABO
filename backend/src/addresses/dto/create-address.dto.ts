import { IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiPropertyOptional({ example: 'Casa' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @MinLength(1)
  recipient: string;

  @ApiProperty({ example: 'Rua Example' })
  @IsString()
  @MinLength(1)
  street: string;

  @ApiProperty({ example: '123' })
  @IsString()
  @MinLength(1)
  number: string;

  @ApiPropertyOptional({ example: 'Apto 45' })
  @IsOptional()
  @IsString()
  complement?: string;

  @ApiProperty({ example: 'Centro' })
  @IsString()
  @MinLength(1)
  district: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  @MinLength(1)
  city: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  @MinLength(2)
  state: string;

  @ApiProperty({ example: '01234-567' })
  @IsString()
  @MinLength(8)
  zip: string;
}
