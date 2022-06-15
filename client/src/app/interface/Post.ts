interface likes {
  _id: string;
  name: string;
}

export interface Post {
  _id: string;
  author: {
    _id: string;
    name: string;
  };
  body: string;
  comments: [];
  likes: likes[];
  privacy: 'public' | 'private';
  createdAt: string;
  updatedAt: string;
}
