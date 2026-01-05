import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Review } from './entities/review.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createProductDto: CreateProductDto, files?: Express.Multer.File[]): Promise<Product> {
    const images = await this.resolveImages(files, createProductDto.images);

    const product = this.productsRepository.create({ ...createProductDto, images });
    return await this.productsRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({
      relations: ['reviews'],
      order: { createdAt: 'DESC' },
    });
  }

  async findWithFilters(filters: {
    category?: string;
    team?: string;
    size?: string;
    search?: string;
    isNew?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price_asc' | 'price_desc' | 'newest';
  }): Promise<Product[]> {
    let query = this.productsRepository.createQueryBuilder('product').leftJoinAndSelect('product.reviews', 'reviews');

    if (filters.category) {
      query = query.where('LOWER(product.category) = LOWER(:category)', { category: filters.category });
    }

    if (filters.team) {
      query = query.andWhere('LOWER(product.team) = LOWER(:team)', { team: filters.team });
    }

    if (filters.search) {
      query = query.andWhere(
        '(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search))',
        { search: `%${filters.search}%` },
      );
    }

    if (filters.isNew !== undefined) {
      query = query.andWhere('product.isNew = :isNew', { isNew: filters.isNew });
    }

    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      const minPrice = Number(filters.minPrice);
      if (!isNaN(minPrice)) {
        query = query.andWhere('product.price >= :minPrice', { minPrice });
      }
    }

    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      const maxPrice = Number(filters.maxPrice);
      if (!isNaN(maxPrice)) {
        query = query.andWhere('product.price <= :maxPrice', { maxPrice });
      }
    }

    // Size filter: check if size exists in the simple-array column (stored as comma-separated text)
    if (filters.size) {
      // Escape special characters for LIKE pattern
      const escapedSize = filters.size.replace(/[%_\\]/g, '\\$&');
      query = query.andWhere(
        "(product.sizes LIKE :sizePattern1 OR product.sizes LIKE :sizePattern2 OR product.sizes LIKE :sizePattern3 OR product.sizes = :exactSize)",
        {
          sizePattern1: `${escapedSize},%`, // P,M,G,GG (tamanho no início)
          sizePattern2: `%,${escapedSize},%`, // M,P,G (tamanho no meio)
          sizePattern3: `%,${escapedSize}`, // M,P,G (tamanho no final)
          exactSize: escapedSize, // Somente esse tamanho (se houver apenas um)
        },
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        query = query.orderBy('product.price', 'ASC');
        break;
      case 'price_desc':
        query = query.orderBy('product.price', 'DESC');
        break;
      case 'newest':
      default:
        query = query.orderBy('product.createdAt', 'DESC');
        break;
    }

    return await query.getMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return product;
  }

  async findByCategory(category: string): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { category },
      relations: ['reviews'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByTeam(team: string): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { team },
      relations: ['reviews'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto, files?: Express.Multer.File[]): Promise<Product> {
    const product = await this.findOne(id);

    const images = await this.resolveImages(files, updateProductDto.images, product.images);

    Object.assign(product, { ...updateProductDto, images });
    return await this.productsRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }

  async addReview(productId: string, createReviewDto: CreateReviewDto): Promise<Review> {
    const product = await this.findOne(productId);
    
    const review = this.reviewsRepository.create({
      ...createReviewDto,
      date: new Date().toISOString().split('T')[0],
      product,
      productId,
    });

    const savedReview = await this.reviewsRepository.save(review);

    // Recalcular rating médio do produto
    const reviews = await this.reviewsRepository.find({ where: { productId } });
    const averageRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;
    product.rating = Math.round(averageRating * 10) / 10;
    await this.productsRepository.save(product);

    return savedReview;
  }

  async getReviews(productId: string): Promise<Review[]> {
    await this.findOne(productId); // Verifica se o produto existe
    return await this.reviewsRepository.find({
      where: { productId },
      order: { createdAt: 'DESC' },
    });
  }

  private async resolveImages(
    files?: Express.Multer.File[],
    dtoImages?: string[],
    currentImages?: string[],
  ): Promise<string[]> {
    if (files?.length) {
      return await this.cloudinaryService.uploadMany(files);
    }

    if (dtoImages?.length) {
      return dtoImages;
    }

    if (currentImages?.length) {
      return currentImages;
    }

    throw new BadRequestException('Pelo menos uma imagem é obrigatória');
  }
}
