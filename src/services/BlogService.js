export const BASE_URL = 'http://localhost:8081';

const BlogService = {
    getPosts: (maxPostsPerPage, currentPage, searchQuery) => fetch(`${BASE_URL}/posts?_expand=user&_page=${currentPage}&_limit=${maxPostsPerPage}${searchQuery}`),
    getPostsByUserId: (userId, maxPostsPerPage, currentPage, searchQuery) => fetch(`${BASE_URL}/posts?_expand=user&userId=${userId}&_page=${currentPage}&_limit=${maxPostsPerPage}${searchQuery}`),
    getPostById: (blogId) => fetch(`${BASE_URL}/posts/${blogId}`),
    getPostsByAuthorName: (maxPostsPerPage, currentPage, authorName) => fetch(`${BASE_URL}/users?&_page=${currentPage}&_limit=${maxPostsPerPage}${authorName}`),
    posts: {
        create: (post) => fetch(`${BASE_URL}/posts`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            }),
        update: (id, post) => fetch(`${BASE_URL}/posts/${id}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    title: post.title,
                    body: post.body
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        delete: (id) => fetch(`${BASE_URL}/posts/${id}`, { method: 'DELETE' }),
    },
    updateLike: (postId, likes) => fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(likes)
    })


}

export default BlogService;