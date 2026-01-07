import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('addresses')
@Controller('addresses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo endereço' })
  @ApiResponse({ status: 201, description: 'Endereço criado com sucesso' })
  async create(@Request() req, @Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(req.user.id, createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar endereços do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de endereços retornada com sucesso' })
  async findAll(@Request() req) {
    return this.addressesService.findAllByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar endereço por ID' })
  @ApiResponse({ status: 200, description: 'Endereço encontrado' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.addressesService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar endereço' })
  @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  async update(@Param('id') id: string, @Request() req, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(id, req.user.id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar endereço' })
  @ApiResponse({ status: 200, description: 'Endereço deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.addressesService.remove(id, req.user.id);
  }
}
