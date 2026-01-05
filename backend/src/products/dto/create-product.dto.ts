import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, Min, Max, ArrayMinSize } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Camisa Oficial 2024' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Brasil' })
  @IsString()
  team: string;

  @ApiProperty({ example: 349.90 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ example: 'Camisa oficial da Seleção Brasileira 2024' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isNew?: boolean;

  @ApiProperty({ example: 'Seleções' })
  @IsString()
  category: string;

  @ApiProperty({ example: ['P', 'M', 'G', 'GG'] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  sizes: string[];

  @ApiPropertyOptional({ example: 4.8 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
