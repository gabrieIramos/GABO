import { IsArray, IsString, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 'Camisa Oficial 2024' })
  @IsString()
  productName: string;

  @ApiProperty({ example: 'Brasil' })
  @IsString()
  productTeam: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  productImage: string;

  @ApiProperty({ example: 'M' })
  @IsString()
  size: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 349.90 })
  @IsNumber()
  @Min(0)
  unitPrice: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  userId: string;

  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({ example: 'Rua Example, 123' })
  @IsString()
  shippingAddress: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  shippingCity: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  shippingState: string;

  @ApiProperty({ example: '01234-567' })
  @IsString()
  shippingZipCode: string;
}
