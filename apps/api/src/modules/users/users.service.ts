import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const nome = String(createUserDto.name);
    const email = String(createUserDto.email);
    const senha = String(createUserDto.password);

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        name: nome,
        email: email,
        passwordHash: senha,
      },
    });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: string) {
    await this.findOne(id);
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }

  async me(id: string) {
    await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      role: user.role,
    };
  }
}
