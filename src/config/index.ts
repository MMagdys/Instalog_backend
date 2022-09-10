import * as dotenv from 'dotenv';

dotenv.config();


export default {
    port: +(process.env.PORT || 3000),
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    postgresUrl: process.env.POSTGRES_URL || 'postgres://postgres:P@ssw0rd@localhost:5432/instalog',
};