<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <router-link id="nav-title-text" :to="homeRouteUrl">{{ $store.state.appName }}</router-link>
      </v-toolbar-title>

      <v-spacer />

      <!-- # 비로그인 사용자용 네비바 아이콘 -->
      <v-menu offset-y v-if="!loginState.loggedIn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs">
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="testLogin">
            <!-- TODO: 로그인 폼 메뉴 팝업 or 모달 다이얼로그 -->
            <span>(테스트용 로그인)</span>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- # -->

      <!-- # 로그인 사용자용 네비바 아이콘 -->
      <v-menu v-if="loginState.loggedIn" offeset-y min-width="250px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item class="py-3" to="/me">
            <v-layout align-center>
              <img src="https://picsum.photos/200" style="width: 64px; height: 64px; border-radius: 100%;" />

              <v-layout class="ml-3" column>
                <span class="text-h6">{{ loginState.userName }}</span>
                <span>{{ loginState.userId }}</span>
              </v-layout>
            </v-layout>
          </v-list-item>

          <!-- <v-list-item to="/logout"> -->
          <v-list-item @click="testLogout">
            <v-icon>mdi-logout</v-icon>
            <span>로그아웃</span>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- # -->
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component
export default class App extends Vue {
  /* 임시 로그인 상태 오브젝트 */
  loginState = {
    loggedIn: true,
    userId: "사용자 ID",
    userName: "사용자 이름",
  };

  /* 앱 전역 $route 변경 감시 훅 */
  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(): void {
    // 로그인 상태에 따른 라우트
    //   - 비로그인 사용자는 랜딩페이지 이외 접근 권한이 없어
    //     하위 페이지 접근 시도 시 무조건 랜딩페이지(/)로
    //     이동합니다.
    //   - 로그인 사용자는 주 페이지가 피드페이지(/feed)입니다.
    //     로그인 상태에서 랜딩페이지 접근 시도 시 피드페이지로
    //     이동합니다.
    if (!this.loginState.loggedIn && this.$route.path !== "/") {
      this.$router.replace("/");
    } else if (this.loginState.loggedIn && this.$route.path === "/") {
      this.$router.replace("/feed");
    }
  }

  /* 앱 전역 created 훅 */
  created(): void {
    // 로그인 상태에 따른 라우트 설정을 한번 더 실행하여 "확인사살"합니다.
    this.onUrlChange();
  }

  /* homeRouteUrl 게더 */
  get homeRouteUrl(): string {
    // 네비바 제목 클릭 시 이동할 주 페이지 라우트를 로그인 상태에 따라 다르게 설정합니다.
    return this.loginState.loggedIn ? "/feed" : "/";
  }

  testLogin(): void {
    this.loginState.loggedIn = true;
    this.$router.push("/feed");
  }

  testLogout(): void {
    this.loginState.loggedIn = false;
    this.$router.push("/");
  }
}
</script>
