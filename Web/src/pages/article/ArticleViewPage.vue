<template>
  <div>{{ $route.params.id }}</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ArticleViewPage extends Vue {

}
</script>
