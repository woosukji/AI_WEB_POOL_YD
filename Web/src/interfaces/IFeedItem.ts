export default interface IFeedItem {
  index: number,
  authorProfileImageUrl: string,
  authorName: string,
  uploadDate: Date,
  articleTitle: string,
  articleContent: string,
  articleMainImageUrl?: string,
  commentCount: number,
  likesCount: number,
  likedByAccount: boolean,
} // eslint-disable-line semi
