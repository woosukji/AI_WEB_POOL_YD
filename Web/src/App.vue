<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <router-link id="nav-title-text" :to="homeRouteUrl">{{ $store.state.appName }}</router-link>
      </v-toolbar-title>

      <v-spacer />

      <v-tabs v-if="loginState.loggedIn" right optional icons-and-text>
        <v-tab to="/feed">피드 <v-icon>mdi-card-text</v-icon></v-tab>
        <v-tab to="/discover">탐색 <v-icon>mdi-compass</v-icon></v-tab>
        <v-tab to="/pool">풀 <v-icon>mdi-approximately-equal-box</v-icon></v-tab>
      </v-tabs>

      <!-- # 비로그인 사용자용 네비바 아이콘 -->
      <v-menu v-if="!loginState.loggedIn"
              :close-on-content-click="false"
              offset-y
              min-width="250px"
              transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-on="on" v-bind="attrs">
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <div>
              <v-list-item-title class="mt-3 text-h6">로그인</v-list-item-title>

              <v-form v-model="loginFormValidated" class="mt-4" ref="loginForm">
                <v-text-field v-model="loginFormId"
                              :rules="loginFormIdRules"
                              label="ID"
                              clearable
                              required />
                <v-text-field v-model="loginFormPassword"
                              :append-icon="loginFormPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[(value) => !!value || '비밀번호를 입력해주세요.']"
                              :type="loginFormPasswordShow ? 'text' : 'password'"
                              @click:append="loginFormPasswordShow = !loginFormPasswordShow"
                              label="비밀번호"
                              clearable
                              required />
                <v-btn :disabled="!loginFormValidated" class="my-2" type="submit" color="success">로그인</v-btn>
              </v-form>
            </div>
          </v-list-item>

          <v-list-item @click="testLogin">
            <!-- TODO: 로그인 폼 메뉴 팝업 or 모달 다이얼로그 -->
            <span>(테스트용 로그인)</span>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- # -->

      <!-- # 로그인 사용자용 네비바 아이콘 -->
      <v-menu v-else
              offeset-y
              min-width="250px"
              transition="slide-y-transition">
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
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component
export default class App extends Vue {
  /* 로그인 폼 멤버 */
  loginFormValidated = false;
  loginFormId = "";
  loginFormIdRules: Array<(value: string) => boolean | string> = [
    (value) => !!value || "ID를 입력해주세요.",
    (value) => (value && /^[a-zA-Z.]+$/.test(value)) || "ID는 영문자 및 마침표(.)만 사용할 수 있습니다.",
    (value) => (value && !/\.$/.test(value)) || "ID의 마지막 문자로 마침표(.)를 사용할 수 없습니다.",
    (value) => {
      const regExExec = /\.{2,}/.exec(value);

      if (value && regExExec) {
        if (regExExec.index > 0) {
          return "마침표(.) 문자는 연속으로 입력할 수 없습니다.";
        }
      }

      return true;
    },
  ];
  loginFormPassword = "";
  loginFormPasswordShow = false;

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

<style lang="scss">
.v-app-bar > .v-toolbar__content {
  margin: auto;
  max-width: 1000px;
}

.v-tabs {
  width: auto !important;
}
</style>
