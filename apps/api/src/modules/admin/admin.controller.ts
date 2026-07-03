import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AdminService } from './admin.service';

@Controller('categories')
export class AdminController {
  constructor(private readonly categoriesService: AdminService) {}

  @Post()
  create(@Param('id') id: string, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(id, createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOneCategory(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.removeCategory(id);
  }  
}
