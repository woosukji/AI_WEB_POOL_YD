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
        uploadDate: new Date(Date.now() - 1000),
        articleTitle: "글 제목 1",
        articleContent: "이곳에 마크다운 Raw 문자열!",
        articleMainImageUrl: "https://picsum.photos/seed/one2/600/200",
      },
      {
        index: 2,
        authorProfileImageUrl: "https://picsum.photos/seed/two1/200",
        authorName: "글 작성자 2",
        uploadDate: new Date(Date.now() - 75000),
        articleTitle: "글 제목 2",
        articleContent: "메인 이미지가 없는 피드 아이템!",
      },
      {
        index: 3,
        authorProfileImageUrl: "https://picsum.photos/seed/three1/200",
        authorName: "글 작성자 3",
        uploadDate: new Date(Date.now() - 289000),
        articleTitle: "글 제목 3",
        articleContent: "메인 이미지가 있어요",
        articleMainImageUrl: "https://picsum.photos/seed/three2/600/200",
      },
    ];
  }
}
</script>
