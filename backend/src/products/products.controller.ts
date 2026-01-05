import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/enums/role.enum';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('images', 5, { storage: memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Dados do produto e imagens (enviar em multipart/form-data)',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Camisa Oficial 2024' },
        team: { type: 'string', example: 'Brasil' },
        price: { type: 'number', example: 349.9 },
        description: { type: 'string', example: 'Camisa oficial da Seleção Brasileira 2024' },
        isNew: { type: 'boolean', example: true },
        category: { type: 'string', example: 'Seleções' },
        sizes: { type: 'array', items: { type: 'string' }, example: ['P', 'M', 'G', 'GG'] },
        rating: { type: 'number', example: 4.8 },
        stock: { type: 'number', example: 100 },
        images: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Arquivos de imagem do produto',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Criar novo produto (Admin)' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() files?: Express.Multer.File[]) {
    return this.productsService.create(createProductDto, files);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos com filtros opcionais' })
  @ApiQuery({ name: 'category', required: false, description: 'Filtrar por categoria' })
  @ApiQuery({ name: 'team', required: false, description: 'Filtrar por time' })
  @ApiQuery({ name: 'size', required: false, description: 'Filtrar por tamanho (P, M, G, GG)' })
  @ApiQuery({ name: 'search', required: false, description: 'Buscar por nome ou descrição' })
  @ApiQuery({ name: 'isNew', required: false, description: 'Filtrar apenas lançamentos (true/false)' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Preço mínimo' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Preço máximo' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'price_asc, price_desc, ou newest' })
  @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso' })
  findAll(
    @Query('category') category?: string,
    @Query('team') team?: string,
    @Query('size') size?: string,
    @Query('search') search?: string,
    @Query('isNew') isNew?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sortBy') sortBy?: 'price_asc' | 'price_desc' | 'newest',
  ) {
    return this.productsService.findWithFilters({
      category,
      team,
      size,
      search,
      isNew: isNew === 'true' ? true : isNew === 'false' ? false : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sortBy: sortBy || 'newest',
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Produto encontrado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('images', 5, { storage: memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Atualizar dados do produto e substituir imagens (multipart/form-data)',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Camisa Oficial 2024' },
        team: { type: 'string', example: 'Brasil' },
        price: { type: 'number', example: 349.9 },
        description: { type: 'string', example: 'Camisa oficial da Seleção Brasileira 2024' },
        isNew: { type: 'boolean', example: true },
        category: { type: 'string', example: 'Seleções' },
        sizes: { type: 'array', items: { type: 'string' }, example: ['P', 'M', 'G', 'GG'] },
        rating: { type: 'number', example: 4.8 },
        stock: { type: 'number', example: 100 },
        images: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Arquivos de imagem do produto (substitui as existentes)',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Atualizar produto (Admin)' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.productsService.update(id, updateProductDto, files);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar produto (Admin)' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Produto deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adicionar avaliação ao produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 201, description: 'Avaliação adicionada com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  addReview(@Param('id') id: string, @Body() createReviewDto: CreateReviewDto) {
    return this.productsService.addReview(id, createReviewDto);
  }

  @Get(':id/reviews')
  @ApiOperation({ summary: 'Listar avaliações do produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Lista de avaliações retornada com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  getReviews(@Param('id') id: string) {
    return this.productsService.getReviews(id);
  }
}
