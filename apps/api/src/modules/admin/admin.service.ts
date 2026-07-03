import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(userId: string, createCategoryDto: CreateCategoryDto) {
    const { name, color } = createCategoryDto;
    return await this.prisma.category.create({
      data: {
        name,
        color,
        userId,
      },
    });
  }

  async findAllCategories() {
    return await this.prisma.category.findMany();
  }

  async findOneCategory(id: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category  with ID ${id} not found`);
    }

    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { name, color } = updateCategoryDto;

    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    const dataToUpdate: any = {};
    if (name !== undefined) dataToUpdate.name = name;
    if (color !== undefined) dataToUpdate.color = color;

    if (Object.keys(dataToUpdate).length === 0) {
      throw new NotFoundException(
        `No valid updates provided for category with ID ${id}`,
      );
    }

    return await this.prisma.category.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async removeCategory(id: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
