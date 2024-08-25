import { config } from 'dotenv';
import { Address } from 'src/resources/address/entities/address.entity';
import { Organization } from 'src/resources/organization/entities/organization.entity';
import { School } from 'src/resources/school/entities/school.entity';
import { DataSourceOptions } from 'typeorm';

config();

export const COMMON_MESSAGE = {
  SERVER_IS_UP: `Server is up and running`,
  SUCCESSFULLY_CREATED: (entityName: string) => {
    return `${entityName} created successfully`;
  },
  SUCCESSFULLY_UPDATED: (entityName: string) => {
    return `${entityName} updated successfully`;
  },
  SUCCESSFULLY_DELETED: (entityName: string) => {
    return `${entityName} deleted successfully`;
  },
  SUCCESSFULLY_GET: (entityName: string) => {
    return `${entityName} fetched successfully`;
  },
};

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.TYPE_ORM_DATABASE_HOST,
  port: +process.env.TYPE_ORM_DATABASE_PORT,
  username: process.env.TYPE_ORM_DATABASE_USERNAME,
  password: process.env.TYPE_ORM_DATABASE_PASSWORD,
  database: process.env.TYPE_ORM_DATABASE_NAME,
};

export const TypeORMEntities = [School, Organization, Address];
