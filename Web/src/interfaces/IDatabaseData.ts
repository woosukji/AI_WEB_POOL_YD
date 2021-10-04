export interface IUserDisplay {
  /* 뷰 표시용을 겸한 사용자 최소 정보 */
  id: string,
  username: string,
  profileImageUrl: string,
}

export interface IUser extends IUserDisplay {
  /* 사용자 전체 정보 */
  createdAt: Date,
  confirmed: boolean,
  blocked: boolean,
  followings: Array<IUserDisplay>,
  followers: Array<IUserDisplay>,
  publishedPostIds: Array<number>,
  likedPostIds: Array<number>,
}

export interface IComment {
  /* 댓글 정보 */
  id: string,
  createdAt: Date,
  updatedAt: Date,
  author: Array<IUserDisplay>,
  content: string,
}

export interface IPost {
  /* 글 정보 */
  id: string,
  createdAt: Date,
  updatedAt: Date,
  author: IUserDisplay,
  title: string,
  content: string,
  comments: Array<IComment>,
  commentsCount: number,
  likes: Array<IUserDisplay>,
  likesCount: number,
}
