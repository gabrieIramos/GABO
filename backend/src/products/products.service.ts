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
