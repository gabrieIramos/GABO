export interface Product {
  id: string;
  name: string;
  team: string;
  price: number;
  images: string[];
  description: string;
  isNew: boolean;
  category: string;
  sizes: string[];
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Camisa Oficial 2024',
    team: 'Brasil',
    price: 349.90,
    images: [
      'https://images.unsplash.com/photo-1571190894029-caa26b1f4c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    ],
    description: 'Camisa oficial da Seleção Brasileira 2024. Tecnologia Dri-FIT que mantém você seco e confortável. Material reciclado sustentável.',
    isNew: true,
    category: 'Seleções',
    sizes: ['P', 'M', 'G', 'GG'],
    rating: 4.8,
    reviews: [
      {
        id: 'r1',
        author: 'João Silva',
        rating: 5,
        comment: 'Produto de excelente qualidade. Chegou antes do prazo!',
        date: '2026-01-02'
      },
      {
        id: 'r2',
        author: 'Maria Santos',
        rating: 4,
        comment: 'Linda camisa, só o tamanho veio um pouco grande.',
        date: '2025-12-28'
      }
    ]
  },
  {
    id: '2',
    name: 'Jersey Home 24/25',
    team: 'Real Madrid',
    price: 399.90,
    images: [
      'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    ],
    description: 'Camisa oficial do Real Madrid para a temporada 24/25. Design clássico branco com detalhes em dourado.',
    isNew: true,
    category: 'Champions League',
    sizes: ['P', 'M', 'G', 'GG'],
    rating: 4.9,
    reviews: [
      {
        id: 'r3',
        author: 'Carlos Pereira',
        rating: 5,
        comment: 'Perfeita! Qualidade premium.',
        date: '2026-01-01'
      }
    ]
  },
  {
    id: '3',
    name: 'Camisa Third 2024',
    team: 'Barcelona',
    price: 389.90,
    images: [
      'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    ],
    description: 'Terceiro uniforme do Barcelona com design moderno e inovador. Tecnologia de ventilação avançada.',
    isNew: false,
    category: 'Clubes Europeus',
    sizes: ['P', 'M', 'G', 'GG'],
    rating: 4.6,
    reviews: []
  },
  {
    id: '4',
    name: 'Jersey Champions Edition',
    team: 'Manchester City',
    price: 419.90,
    images: [
      'https://images.unsplash.com/photo-1676746424114-56d38af59256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    ],
    description: 'Edição especial Champions League do Manchester City. Design exclusivo celebrando conquistas europeias.',
    isNew: true,
    category: 'Champions League',
    sizes: ['P', 'M', 'G', 'GG'],
    rating: 4.7,
    reviews: []
  },
  {
    id: '5',
    name: 'Camisa Home 2024',
    team: 'PSG',
    price: 379.90,
    images: [
      'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    ],
    description: 'Camisa principal do PSG com as cores tradicionais azul e vermelho. Design elegante e moderno.',
    isNew: false,
    category: 'Clubes Europeus',
    sizes: ['P', 'M', 'G', 'GG'],
    rating: 4.5,
    reviews: []
  },
  {
    id: '6',
    name: 'Jersey Away 24/25',
    team: 'Liverpool',
    price: 389.90,
    images: [
      'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    ],
    description: 'Segundo uniforme do Liverpool para a temporada 24/25. Design diferenciado com tecnologia anti-transpirante.',
    isNew: true,
    category: 'Premier League',
    sizes: ['P', 'M', 'G', 'GG'],
    rating: 4.8,
    reviews: []
  },
  {
    id: '7',
    name: 'Camisa Retro 2002',
    team: 'Brasil',
    price: 299.90,
    images: [
      'https://images.unsplash.com/photo-1571190894029-caa26b1f4c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    ],
    description: 'Réplica da lendária camisa do pentacampeonato mundial de 2002. Edição limitada comemorativa.',
    isNew: false,
    category: 'Retrô',
    sizes: ['P', 'M', 'G', 'GG'],
    rating: 5.0,
    reviews: []
  },
  {
    id: '8',
    name: 'Jersey Home 2024',
    team: 'Bayern Munich',
    price: 399.90,
    images: [
      'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    ],
    description: 'Camisa oficial do Bayern de Munique. Vermelho clássico com detalhes modernos. Qualidade alemã.',
    isNew: true,
    category: 'Clubes Europeus',
    sizes: ['P', 'M', 'G', 'GG'],
    rating: 4.9,
    reviews: []
  }
];

export const featuredProducts = products.filter(p => p.isNew).slice(0, 6);
