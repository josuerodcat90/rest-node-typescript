import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import indexRoutes from './routes/indexRoutes';
import postRoutes from './routes/PostRoutes';
import userRoutes from './routes/UserRoutes';

class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
	}

	config() {
		///DataBase
		const URI = process.env.MONGODB_URI || 'mongodb://localhost/typescript-node';
		mongoose
			.connect(URI, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log('>>>MongoDB Atlas Connected<<< ');
			});
		///Settings
		this.app.set('port', process.env.PORT || 4000);
		///Middlewares
		this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(cors());
	}

	routes() {
		this.app.use(indexRoutes);
		this.app.use('/api/posts', postRoutes);
		this.app.use('/api/users', userRoutes);
	}

	start() {
		this.app.listen(this.app.get('port'), () => {
			console.log(`>>>Server running at port ${this.app.get('port')}<<<`);
		});
	}
}

const server = new Server();

server.start();
