import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlService } from './mysql/mysql.service';
import { ReportsController } from './reports/reports.controller';

@Module({
  imports: [],
  controllers: [AppController, ReportsController],
  providers: [AppService, MysqlService],
})
export class AppModule {}
