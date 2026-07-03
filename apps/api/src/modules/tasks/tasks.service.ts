import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const { title, content, priority, dueDate } = createTaskDto;
    return await this.prisma.task.create({
      data: {
        title,
        content,
        priority,
        dueDate,
        authorId: userId,
      },
    });
  }

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async findOne(id: string) {
    const existingTask = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const { title, content, priority, dueDate } = updateTaskDto;

    const existingTask = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const dataToUpdate: any = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (content !== undefined) dataToUpdate.content = content;
    if (priority !== undefined) dataToUpdate.priority = priority;
    if (dueDate !== undefined) dataToUpdate.dueDate = dueDate;

    if (Object.keys(dataToUpdate).length === 0) {
      throw new NotFoundException(
        `No valid updates provided for task with ID ${id}`,
      );
    }

    return await this.prisma.task.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    const existingTask = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return await this.prisma.task.delete({
      where: { id },
    });
  }

  async completeTask(taskId: string, authorId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { author: true },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const author = task?.author;
    if (author?.id !== authorId) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    const completedTask = task.completed ? false : true;
    return await this.prisma.task.update({
      where: { id: taskId },
      data: { completed: completedTask },
    });
  }
}
