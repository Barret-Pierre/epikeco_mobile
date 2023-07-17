export interface IUser {
  id: number;
  email: string;
}

export interface IComment {
  id: number;
  comment: string;
  createdAt: string;
  createdBy?: {
    email: string;
  };
}

export interface IPost {
  id: number;
  content: string;
  createdAt: string;
  comments?: IComment[];
  createdBy?: {
    email: string;
  };
}
