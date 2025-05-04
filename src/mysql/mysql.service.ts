import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class MysqlService implements OnModuleInit {
  private connection: mysql.Connection;

  async onModuleInit() {
    // This method is called once the host module has been initialized.
    this.connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      // Use the default port for MySQL if not specified
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async query(sql: string, params?: any[]) {
    const [results] = await this.connection.execute(sql, params);
    return results;
  }
}
