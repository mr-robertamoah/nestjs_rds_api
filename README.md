# NestJS RDS API

This project is a NestJS-based API server that provides various reports from a MySQL database. The API exposes endpoints to retrieve customer, sales, product, and order reports.

## API Endpoints

All endpoints are prefixed with `/reports`.

- `GET /reports/customers/top-spenders`  
  Returns a list of customers who have spent the most, including their customer ID, name, email, country, and total amount spent.

- `GET /reports/sales/monthly`  
  Returns monthly sales data per product, including product ID, name, quantity sold, sales amount, year, and month.

- `GET /reports/products/never-ordered`  
  Returns a list of products that have never been ordered.

- `GET /reports/orders/average-value-by-country`  
  Returns the average order value grouped by customer country.

- `GET /reports/customers/frequent-buyers`  
  Returns customers who have made more than one order, including their customer ID, name,and order count.

- `*`
  Returns a json in the form provided below:
  `{"message":"Cannot METHOD url","error":"Not Found","statusCode":404}`.
  Where `METHOD` is the request method and `url` is the request url.
  
## Environment Variables

The application requires the following environment variables to connect to the RDS MySQL database:

- `DB_HOST` - The hostname or IP address of the MySQL server.
- `DB_PORT` - The port number of the MySQL server (default is 3306).
- `DB_USER` - The MySQL username.
- `DB_PASSWORD` - The MySQL user password.
- `DB_NAME` - The name of the MySQL database to connect to.

These variables can be set in a `.env` file at the root of the project. You can simply rename .env.example file and edit the values of the variables.

## Running the Project Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`.

## Using Docker

The API is available as a Docker image on Docker Hub.

### Pull the Docker Image

```bash
docker pull mrrobertamoah/nestjs_rds_api:latest
```

### Run the Docker Container

```bash
docker run -d -p 3000:3000 --name mrrobertamoah/nestjs_rds_api \
  -e DB_HOST=your_db_host \
  -e DB_PORT=3306 \
  -e DB_USER=your_db_user \
  -e DB_PASSWORD=your_db_password \
  -e DB_NAME=your_db_name \
  mrrobertamoah/nestjs_rds_api:latest
```

or

Create a .env file populated with the necessary environment variabl and use the command below

```bash
docker run -d -p 3000:3000 --name mrrobertamoah/nestjs_rds_api \
  --env-file .env \
  mrrobertamoah/nestjs_rds_api:latest
```

Replace the environment variable values with your actual database credentials.

The API will be accessible at `http://localhost:3000` or `http://your-server-ip:3000`.

## License

This project is licensed under the MIT License.
