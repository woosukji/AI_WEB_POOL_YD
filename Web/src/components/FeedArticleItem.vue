<template>
  <v-card hover>
    <!-- 타이틀 영역 -->
    <v-img v-if="articleHasMainImage"
           :src="itemData.articleMainImageUrl"
           aspect-ratio="2.5"
           class="pa-2 white--text align-end">
      <div class="feed-image-darken-overlay"></div>

      <v-layout row
                align-center>
        <img :src="itemData.authorProfileImageUrl"
              aspect-ratio="1"
              style="width: 64px; border-radius: 100%;" />

        <v-layout column
                  justify-start>
          <v-card-title>{{ itemData.articleTitle }}</v-card-title>
          <v-card-subtitle>{{ itemData.authorName }}</v-card-subtitle>
        </v-layout>
      </v-layout>
    </v-img>
    <v-layout v-else
              row
              align-center>
      <img :src="itemData.authorProfileImageUrl"
            style="width: 64px; border-radius: 100%;" />

      <v-layout column
                justify-start>
        <v-card-title>{{ itemData.articleTitle }}</v-card-title>
        <v-card-subtitle>{{ itemData.authorName }}</v-card-subtitle>
      </v-layout>
    </v-layout>
    <!-- -->

    <!-- 콘텐츠(텍스트) 영역 -->
    <v-card-text>{{ itemData.articleContent }}</v-card-text>
    <!-- -->

    <div>{{ uploadDateAgo }}</div>
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
  background: rgba(0, 0, 0, 0.25);
  z-index: -1;
}
</style>
