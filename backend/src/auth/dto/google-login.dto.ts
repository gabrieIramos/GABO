import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleLoginDto {
  @ApiProperty({ description: 'ID Token retornado pelo Google Identity Services' })
  @IsString()
  idToken: string;
}
