import "dotenv/config"
import { DataSource } from "typeorm"
import { User } from "./entitites/user.entity"

const AppDataSource =
	process.env.NODE_ENV === 'test'
		? new DataSource({
				type: 'sqlite',
				database: ':memory:',
				entities: ["src/**/*.entity{.ts,.js}"],
				synchronize: true
		  })
		: new DataSource({
				type: 'postgres',
				host: 'localhost',
				port: 5432,
				username: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB,
				logging: true,
				synchronize: false,
				entities: ["src/**/*.entity{.ts,.js}"],
				migrations: ['./src/migrations/*.ts'],
		  })

export default AppDataSource