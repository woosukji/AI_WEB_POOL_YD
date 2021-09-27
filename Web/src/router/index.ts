import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import NonLoginLandingPage from "@/pages/NonLoginLandingPage.vue";
import RegisterPage from "@/pages/account/RegisterPage.vue";
import AccountMyPage from "@/pages/account/AccountMyPage.vue";
import ArticleViewPage from "@/pages/article/ArticleViewPage.vue";
import MainFeedPage from "@/pages/feed/MainFeedPage.vue";
import SearchPage from "@/pages/feed/SearchPage.vue";
import PoolPage from "@/pages/pool/PoolPage.vue";
import PoolFeedPage from "@/pages/pool/PoolFeedPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Landing page for non-login user",
    component: NonLoginLandingPage,
  },

  /* Feed related routes */
  {
    path: "/feed",
    name: "Main feed page",
    component: MainFeedPage,
  },
  {
    path: "/search",
    name: "Search page",
    component: SearchPage,
  },

  /* Account related routes */
  {
    path: "/register",
    name: "Account registration page",
    component: RegisterPage,
  },
  {
    path: "/me",
    name: "Account profile/information page",
    component: AccountMyPage,
  },

  /* Article related routes */
  {
    path: "/article/:id",
    name: "Unified article view page",
    component: ArticleViewPage,
  },

  /* "POOL" related routes */
  {
    path: "/pool",
    name: "POOL feed & management page",
    component: PoolFeedPage,
  },
  {
    path: "/pool/:id",
    name: "Individual POOL page",
    component: PoolPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
