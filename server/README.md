# Express Social Media App

## Routes

- [x] register/create user
- [x] login
- [x] logout
- [x] get user
- [x] get all users
- [x] update user
- [x] create post
- [x] delete post
- [x] update post
- [x] get all posts (includes followed peoples private posts)
- [x] get all posts of followed people
- [x] get all posts of user
- [x] get post
- [x] like post
- [x] unlike post
- [x] comment on post
- [x] delete comment
- [x] get all comments // inside post
- [x] follow/unfollow user
- [ ] email verification

## Route Connections

- [x] get user profile

  - [x] if follower then get all posts
    - [x] id, body, likes, comments count, timestamps
  - [x] if not follower then get public posts
    - [x] id, body, likes, comments count, timestamps
  - [x] user followers
    - [x] name, id
  - [x] user followings
    - [x] name, id
  - [ ] option to follow/unfollow

- [x] get single post
  - [x] author, id, body, timestamps
  - [x] comments
    - author, id, body, timestamps
  - [x] likes
    - name, id
  - [ ] option to like/unlike

## Additional Options

- inside single post, if author then option to delete post
- inside single post, option to comment
- inside single post, option to delete comment

> **Note:**
> Kind of done: Mon Feb 14 2022
