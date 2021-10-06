<template>
  <div>
    <feed-article-item v-for="item in feedItems"
      class="my-4"
      :key="item.index"
      :itemData="item" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FeedArticleItemComponent from "@/components/FeedArticleItem.vue";
import IFeedItem from "@/interfaces/IFeedItem";

@Component({
  components: {
    FeedArticleItem: FeedArticleItemComponent,
  },
})
export default class MainFeedPage extends Vue {
  get feedItems(): Array<IFeedItem> {
    return [
      {
        index: 1,
        authorProfileImageUrl: "https://picsum.photos/seed/one1/200",
        authorName: "글 작성자 1",
        uploadDate: new Date(Date.now() - Math.random() * 10000),
        articleTitle: "글 제목 1",
        articleContent: "이곳에 HTML!",
        articleMainImageUrl: "https://picsum.photos/seed/one2/600/200",
        commentCount: Math.floor(Math.random() * 50),
        likesCount: Math.floor(Math.random() * 200),
      },
      {
        index: 2,
        authorProfileImageUrl: "https://picsum.photos/seed/two1/200",
        authorName: "글 작성자 2",
        uploadDate: new Date(Date.now() - (Math.random() * 500000 + 10000)),
        articleTitle: "글 제목 2",
        articleContent: "메인 이미지가 없는 피드 아이템!",
        commentCount: Math.floor(Math.random() * 50),
        likesCount: Math.floor(Math.random() * 200),
      },
      {
        index: 3,
        authorProfileImageUrl: "https://picsum.photos/seed/three1/200",
        authorName: "글 작성자 3",
        uploadDate: new Date(Date.now() - (Math.random() * 10000000 + 510000)),
        articleTitle: "글 제목 3",
        articleContent: "메인 이미지가 있어요",
        articleMainImageUrl: "https://picsum.photos/seed/three2/600/200",
        commentCount: Math.floor(Math.random() * 50),
        likesCount: Math.floor(Math.random() * 200),
      },
    ];
  }
}
</script>
