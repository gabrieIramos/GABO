import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Review } from './entities/review.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
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

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
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
}
