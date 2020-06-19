import { Response, Request, Router } from 'express';

import User from '../models/User';

class UserRoutes {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public async getUsers(req: Request, res: Response): Promise<void> {
		const users = await User.find();
		res.json({ data: users });
	}

	public async getUser(req: Request, res: Response): Promise<void> {
		const { userId } = req.params;
		const user = await User.findById(userId);
		res.json({ data: user });
	}

	public async createUser(req: Request, res: Response): Promise<void> {
		const newUser = new User(req.body);
		await newUser.save();
		res.json({ data: newUser });
	}

	public async updateUser(req: Request, res: Response): Promise<void> {
		const { userId } = req.params;
		const updatedUser = await User.findOneAndUpdate({ _id: userId }, req.body, { new: true });
		res.json({ data: updatedUser });
	}

	public async deleteUser(req: Request, res: Response): Promise<void> {
		const { userId } = req.params;
		await User.findByIdAndDelete(userId);
		res.json({ Message: 'User was deleted succesfully.' });
	}

	routes() {
		this.router.get('/', this.getUsers);
		this.router.get('/:userId', this.getUser);
		this.router.post('/', this.createUser);
		this.router.put('/:userId', this.updateUser);
		this.router.delete('/:userId', this.deleteUser);
	}
}

const userRoutes = new UserRoutes();

export default userRoutes.router;
