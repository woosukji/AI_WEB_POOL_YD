interface IFeedItem {
  index: number,
  authorProfileImageUrl: string,
  authorName: string,
  uploadDate: Date,
  articleTitle: string,
  articleContent: string,
  articleMainImageUrl?: string,
}

export default IFeedItem;
