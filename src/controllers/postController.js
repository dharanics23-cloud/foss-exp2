// In-memory post store (replace with a database in a real application)
let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post.', author: 1 },
    { id: 2, title: 'Second Post', content: 'This is the second post.', author: 1 },
];

exports.getAllPosts = (req, res) => {
    res.json(posts);
};

exports.getPostById = (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
};

exports.createPost = (req, res) => {
    const { title, content } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        author: req.user.id
    };
    posts.push(newPost);
    res.status(201).json(newPost);
};

exports.updatePost = (req, res) => {
    const { title, content } = req.body;
    const post = posts.find(p => p.id === parseInt(req.params.id));

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is the author of the post
    if (post.author !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to update this post' });
    }

    post.title = title;
    post.content = content;

    res.json(post);
};

exports.deletePost = (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));

    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const post = posts[postIndex];

    // Check if the user is the author of the post
    if (post.author !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }

    posts.splice(postIndex, 1);

    res.status(204).send();
};
