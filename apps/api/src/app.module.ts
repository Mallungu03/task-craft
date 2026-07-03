import { Module } from '@nestjs/common';
import { PrismaModule } from './config/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [PrismaModule, UsersModule, AdminModule],
})
export class AppModule {}
