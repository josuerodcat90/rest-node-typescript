import { Response, Request, Router } from 'express';

import Post from '../models/Post';

class PostRoutes {
	router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	async getPosts(req: Request, res: Response) {
		const posts = await Post.find();
		res.json({ data: posts });
	}

	async getPost(req: Request, res: Response) {
		const { url } = req.params;
		const post = await Post.findOne({ url: url });
		res.json({ data: post });
	}

	async createPost(req: Request, res: Response) {
		const { title, content, url, image } = req.body;
		const newPost = new Post({ title, content, url, image });
		await newPost.save();
		res.json({ data: newPost });
	}

	async updatePost(req: Request, res: Response) {
		const { title, content, image } = req.body;
		const { url } = req.params;
		const updatedPost = await Post.findOneAndUpdate(
			{ url: url },
			{ title, content, image },
			{ new: true }
		);
		res.json({ data: updatedPost });
	}

	async deletePost(req: Request, res: Response) {
		const { url } = req.params;
		await Post.findOneAndDelete({ url: url });
		res.json({ Message: 'Post was deleted.' });
	}

	routes() {
		this.router.get('/', this.getPosts);
		this.router.get('/:url', this.getPost);
		this.router.post('/', this.createPost);
		this.router.put('/:url', this.updatePost);
		this.router.delete('/:url', this.deletePost);
	}
}

const postRoutes = new PostRoutes();

export default postRoutes.router;
