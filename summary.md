Authentication Endpoints
1. Register a New User

Method: POST
URL: http://localhost:3000/api/auth/register
Body (raw, JSON):
{
    "username": "testuser",
    "password": "password123"
}
2. Login and Get a Token

Method: POST
URL: http://localhost:3000/api/auth/login
Body (raw, JSON):
{
    "username": "testuser",
    "password": "password123"
}
Note: Copy the token from the response body. You'll need it for the authenticated routes below.
Post Endpoints
1. Get All Posts

Method: GET
URL: http://localhost:3000/api/posts
2. Get a Single Post

Method: GET
URL: http://localhost:3000/api/posts/1
3. Create a New Post (Requires Auth)

Method: POST
URL: http://localhost:3000/api/posts
Headers:
Authorization: Bearer YOUR_JWT_TOKEN (paste the token you copied)
Body (raw, JSON):
{
    "title": "My Postman Post",
    "content": "This is a post from Postman!"
}
4. Update a Post (Requires Auth)

Method: PUT
URL: http://localhost:3000/api/posts/1
Headers:
Authorization: Bearer YOUR_JWT_TOKEN
Body (raw, JSON):
{
    "title": "Updated Title",
    "content": "This content has been updated."
}
5. Delete a Post (Requires Auth)

Method: DELETE
URL: http://localhost:3000/api/posts/1
Headers:
Authorization: Bearer YOUR_JWT_TOKEN
