<template>
  <v-card hover>
    <!-- 타이틀 영역 -->
    <v-img v-if="articleHasMainImage"
           :src="itemData.articleMainImageUrl"
           dark
           aspect-ratio="2.5"
           class="pa-3 align-end">
      <div class="feed-image-darken-overlay"></div>

      <v-layout class="ml-0" row align-center>
        <img :src="itemData.authorProfileImageUrl"
              aspect-ratio="1"
              style="width: 64px; border-radius: 100%;" />

        <v-layout column justify-start>
          <v-card-title>{{ itemData.articleTitle }}</v-card-title>
          <v-card-subtitle>By {{ itemData.authorName }}</v-card-subtitle>
        </v-layout>
      </v-layout>
    </v-img>
    <v-layout v-else class="ml-3" row align-center>
      <img :src="itemData.authorProfileImageUrl"
            style="width: 64px; border-radius: 100%;" />

      <v-layout column justify-start>
        <v-card-title>{{ itemData.articleTitle }}</v-card-title>
        <v-card-subtitle>By {{ itemData.authorName }}</v-card-subtitle>
      </v-layout>
    </v-layout>
    <!-- -->

    <!-- 콘텐츠(텍스트) 영역 -->
    <v-card-text class="feed-item-content" v-html="itemData.articleContent"></v-card-text>
    <!-- -->

    <!-- 카드 하단 영역 -->
    <v-card-actions>
      <v-layout class="pa-4" row justify-space-around>
        <span class="mx-2"><v-icon>mdi-reply</v-icon> {{ itemData.commentCount }}</span>
        <span class="mx-2"><v-icon>mdi-heart</v-icon> {{ itemData.likesCount }}</span>
        <v-spacer />
        <span class="mx-2 text--disabled"><v-icon>mdi-clock-outline</v-icon> {{ uploadDateAgo }}</span>
      </v-layout>
    </v-card-actions>
    <!-- -->
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { format } from "timeago.js";
import { Prop } from "vue-property-decorator";
import IFeedItem from "@/interfaces/IFeedItem";

@Component
export default class FeedArticleItem extends Vue {
  @Prop({ required: true }) itemData!: IFeedItem;

  get articleHasMainImage(): boolean {
    if (this.itemData.articleMainImageUrl) {
      return true;
    }
    return false;
  }

  get uploadDateAgo(): string {
    return format(this.itemData.uploadDate, "ko");
  }
}
</script>

<style lang="scss" scoped>
.feed-image-darken-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.33);
  z-index: -1;
}

.feed-item-content {
  max-height: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
