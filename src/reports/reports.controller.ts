import { Controller, Get } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly mysqlService: MysqlService) {}

  @Get('customers/top-spenders')
  async getTopSpenders() {
    const sql = `
      select 
        c.customer_id, 
        c.name, 
        c.email, 
        c.country, 
        o.total_amount 
      from customers as c
      inner join (
        select 
          a.order_id, 
          b.customer_id, 
          sum(a.quantity * a.unit_price) as total_amount 
        from order_items as a
        inner join orders as b on b.order_id = a.order_id
        group by a.order_id, b.customer_id
      ) as o on o.customer_id = c.customer_id
      order by o.total_amount desc;
    `;
    return this.mysqlService.query(sql);
  }

  @Get('sales/monthly')
  async getMonthlySales() {
    const sql = `
      select 
        p.product_id, 
        p.name, 
        sum(oi.quantity) as quantity_sold, 
        sum(oi.quantity * oi.unit_price) as sales_amount,
        year(o.order_date) as order_year,
        month(o.order_date) as order_month
      from products as p
      inner join order_items as oi on oi.product_id = p.product_id
      inner join orders as o on o.order_id = oi.order_id and (o.status = "Shipped" or o.status = "Delivered")
      group by 
        p.product_id, 
        p.name, 
        year(o.order_date),
        month(o.order_date)
      order by 
        year(o.order_date) desc,
        month(o.order_date) desc;
    `;
    return this.mysqlService.query(sql);
  }

  @Get('products/never-ordered')
  async getProductsNeverOrdered() {
    const sql = `
      select 
        p.product_id, 
        p.name 
      from products as p
      left join order_items as oi on oi.product_id = p.product_id
      where oi.product_id is null
      group by p.product_id;
    `;
    return this.mysqlService.query(sql);
  }

  @Get('orders/average-value-by-country')
  async getAverageValueByCountry() {
    const sql = `
      select 
        c.country, 
        avg(o.order_value) as avg_order_value
      from customers as c
      inner join (
        select 
          b.customer_id,
          sum(a.quantity * a.unit_price) as order_value 
        from order_items as a
        inner join orders as b on b.order_id = a.order_id
        group by a.order_id, b.customer_id
      ) as o on o.customer_id = c.customer_id
      group by c.country
      order by avg_order_value desc;
    `;
    return this.mysqlService.query(sql);
  }

  @Get('customers/frequent-buyers')
  async getFrequentBuyers() {
    const sql = `
      select 
        c.customer_id, 
        c.name, 
        count(o.order_id) as order_count 
      from customers as c
      inner join orders as o on o.customer_id = c.customer_id
      where o.order_id is not null
      group by 
        c.customer_id, 
        c.name
      having count(o.order_id) > 1
      order by order_count desc;
    `;
    return this.mysqlService.query(sql);
  }
}
