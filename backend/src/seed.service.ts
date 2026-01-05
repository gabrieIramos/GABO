import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products/entities/product.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async seedProducts() {
    const existingCount = await this.productsRepository.count();
    if (existingCount > 0) {
      console.log('✓ Banco já possui produtos. Seed saltado.');
      return;
    }

    const products: Partial<Product>[] = [
      {
        name: 'Camisa Brasil Home 2024',
        team: 'Brasil',
        price: 349.90,
        images: [
          'https://images.unsplash.com/photo-1571190894029-caa26b1f4c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        ],
        description: 'Camisa oficial da Seleção Brasileira 2024. Tecnologia Dri-FIT, material de alta qualidade.',
        isNew: true,
        category: 'Seleções',
        sizes: ['P', 'M', 'G', 'GG'],
        rating: 4.8,
        stock: 150,
      },
      {
        name: 'Camisa Real Madrid Home 24/25',
        team: 'Real Madrid',
        price: 399.90,
        images: [
          'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        ],
        description: 'Uniforme oficial do Real Madrid. Design clássico branco com detalhes em dourado.',
        isNew: true,
        category: 'Clubes',
        sizes: ['P', 'M', 'G', 'GG'],
        rating: 4.9,
        stock: 120,
      },
      {
        name: 'Camisa Barcelona 24/25',
        team: 'Barcelona',
        price: 389.90,
        images: [
          'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        ],
        description: 'Terceiro uniforme do Barcelona com design moderno e inovador.',
        isNew: false,
        category: 'Clubes',
        sizes: ['P', 'M', 'G', 'GG'],
        rating: 4.6,
        stock: 100,
      },
      {
        name: 'Camisa Manchester City 2024',
        team: 'Manchester City',
        price: 419.90,
        images: [
          'https://images.unsplash.com/photo-1676746424114-56d38af59256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        ],
        description: 'Edição especial Champions League do Manchester City.',
        isNew: true,
        category: 'Clubes',
        sizes: ['P', 'M', 'G', 'GG'],
        rating: 4.7,
        stock: 90,
      },
      {
        name: 'Camisa PSG Home 2024',
        team: 'PSG',
        price: 379.90,
        images: [
          'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        ],
        description: 'Camisa principal do PSG com as cores tradicionais azul e vermelho.',
        isNew: false,
        category: 'Clubes',
        sizes: ['P', 'M', 'G', 'GG'],
        rating: 4.5,
        stock: 110,
      },
      {
        name: 'Camisa Liverpool Away 24/25',
        team: 'Liverpool',
        price: 389.90,
        images: [
          'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        ],
        description: 'Segundo uniforme do Liverpool para a temporada 24/25.',
        isNew: true,
        category: 'Clubes',
        sizes: ['P', 'M', 'G', 'GG'],
        rating: 4.8,
        stock: 95,
      },
      {
        name: 'Camisa Brasil Retrô 2002',
        team: 'Brasil',
        price: 299.90,
        images: [
          'https://images.unsplash.com/photo-1571190894029-caa26b1f4c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        ],
        description: 'Réplica da lendária camisa do pentacampeonato mundial de 2002. Edição limitada.',
        isNew: false,
        category: 'Retrô',
        sizes: ['P', 'M', 'G', 'GG'],
        rating: 5.0,
        stock: 50,
      },
      {
        name: 'Camisa Bayern Munich 2024',
        team: 'Bayern Munich',
        price: 399.90,
        images: [
          'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
          'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        ],
        description: 'Camisa oficial do Bayern de Munique. Vermelho clássico com detalhes modernos.',
        isNew: true,
        category: 'Clubes',
        sizes: ['P', 'M', 'G', 'GG'],
        rating: 4.9,
        stock: 105,
      },
    ];

    for (const productData of products) {
      const product = this.productsRepository.create(productData);
      await this.productsRepository.save(product);
    }

    console.log(`✓ ${products.length} produtos foram inseridos no banco com sucesso!`);
  }
}
