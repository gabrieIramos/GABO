import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Calcular total
    const totalPrice = createOrderDto.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );

    // Criar pedido
    const order = this.ordersRepository.create({
      userId: createOrderDto.userId,
      totalPrice,
      shippingAddress: createOrderDto.shippingAddress,
      shippingCity: createOrderDto.shippingCity,
      shippingState: createOrderDto.shippingState,
      shippingZipCode: createOrderDto.shippingZipCode,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.ordersRepository.save(order);

    // Criar itens do pedido
    const orderItems = createOrderDto.items.map(item =>
      this.orderItemsRepository.create({
        ...item,
        orderId: savedOrder.id,
        subtotal: item.unitPrice * item.quantity,
      }),
    );

    await this.orderItemsRepository.save(orderItems);

    return await this.findOne(savedOrder.id);
  }

  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.find({
      relations: ['items', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['items', 'user'],
    });

    if (!order) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    return order;
  }

  async findByUser(userId: string): Promise<Order[]> {
    return await this.ordersRepository.find({
      where: { userId },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    return await this.ordersRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.ordersRepository.remove(order);
  }

  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    return await this.ordersRepository.find({
      where: { status },
      relations: ['items', 'user'],
      order: { createdAt: 'DESC' },
    });
  }
}
