<template>
  <div class="side-bar">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
    />
    <div class= "view">
    <div class = "scrollBlind scrollbar" style="overflow-y:scroll; height:95vh;">
      
      <div 
        class="home"
        @click="
          $router.push('/');
          menuOpen = 0;
        "
      >
      <i class="bi bi-globe2"></i>
        Smart Cafeteria
      </div>
      
      <div class="menu">
        <div class="menu1">
          <i class="bi bi-display"></i>
          대시보드
        </div>
        <div class="menu2" style="cursor: pointer">
          <p
            @click="
              $router.push('/home');
              menuOpen = 1;
            "
          >
            <i v-if="menuOpen == 1" class="bi bi-chevron-right"></i> 지능형
            이상감지
          </p>
          <p
            @click="
              $router.push('cctv');
              menuOpen = 2;
            "
          >
            <i v-if="menuOpen == 2" class="bi bi-chevron-right"></i> CCTV
            영상인식
          </p>
        </div>
      </div>

      <div class="menu">
        <div class="menu1">
          <i class="bi bi-gear"></i>
          IoT 관리
        </div>
        <div class="menu2" style="cursor: pointer">
          <p
            @click="
              $router.push('/sensor-manage');
              menuOpen = 3;
            "
          >
            <i v-if="menuOpen == 3" class="bi bi-chevron-right"></i> 센서 관리
          </p>

          <p
            @click="
              $router.push('/sensorpos');
              menuOpen = 4;
            "
          >
            <i v-if="menuOpen == 4" class="bi bi-chevron-right"></i> 센서 위치
            등록
          </p>

          <p
            @click="
              $router.push('cctv-setting');
              menuOpen = 5;
            "
          >
            <i v-if="menuOpen == 5" class="bi bi-chevron-right"></i> CCTV 설정
          </p>
        </div>
      </div>

      <div class="menu">
        <div class="menu1">
          <i class="bi bi-clipboard-check"></i>
          e-SOP 관리
        </div>
        <div class="menu2" style="cursor: pointer">
          <p @click="openEsopSimulation">
            <i v-if="menuOpen == 6" class="bi bi-chevron-right"></i> e-SOP 수행
          </p>
          <p @click="openEsopEditor">
            <i v-if="menuOpen == 7" class="bi bi-chevron-right"></i> e-SOP
            에디터
          </p>
          <!-- SOP 수행 이력 메뉴 -->
          <p
            @click="
              $router.push('/esop-manager');
              menuOpen = 8;
            "
          >
            <i v-if="menuOpen == 8" class="bi bi-chevron-right"></i> 담당자 관리
          </p>
          <p
            @click="
              $router.push('/msg-log');
              menuOpen = 9;
            "
          >
            <i v-if="menuOpen == 9" class="bi bi-chevron-right"></i> 문자메시지 기록
          </p>
          <p
            @click="
              $router.push('/check-log');
              menuOpen = 10;
            "
          >
            <i v-if="menuOpen == 10" class="bi bi-chevron-right"></i> SOP 수행 이력
          </p>
        </div>
      </div>

      <div class="menu">
        <div class="menu1">
          <i class="bi bi-exclamation-triangle"></i>
          이상 감지 관리
        </div>
        <div class="menu2" style="cursor: pointer">
          <p
            @click="
              $router.push('/alertsettings');
              menuOpen = 11;
            "
          >
            <i v-if="menuOpen == 11" class="bi bi-chevron-right"></i> 이상 경고
            설정
          </p>
          <p
            @click="
              $router.push('/abnormal-detection-log');
              menuOpen = 12;
            "
          >
            <i v-if="menuOpen == 12" class="bi bi-chevron-right"></i> 이상 감지 이력
          </p>
          <p
            @click="
              $router.push('/sensor-data-log');
              menuOpen = 13;
            "
          >
            <i v-if="menuOpen == 13" class="bi bi-chevron-right"></i> 센서 데이터 기록
          </p>
          <p
            @click="
              $router.push('/sensor-data-graph');
              menuOpen = 14;
            "
          >
            <i v-if="menuOpen == 14" class="bi bi-chevron-right"></i> 센서 데이터 그래프
          </p>
          <p
            @click="openMLOps"
          >
            <i v-if="menuOpen == 15" class="bi bi-chevron-right"></i> MLOps Studio
          </p>
        </div>
      </div>
    </div>
      <!--div class="user-info-wrapper">
      <div v-if="!loggedIn" class="user-info">
        <div class="goto-login"
        @click="$router.push('/')"
        ><i class="bi bi-lock"></i> 로그인 해주세요</div>
      </div>
      <div v-if="loggedIn" class="user-info">
      <div @click="usermodal = true"><i class="bi bi-person-circle"></i> {{ currUser }}</div>
        <div @click="askToLogOut = true">
          <i class="bi bi-box-arrow-right"></i>
          로그아웃
        </div>
      </div>

    </div-->

    </div>
    <!--userModal
      v-if="usermodal"
      @close="usermodal = false"
      :userinfo="userinfo">
    </userModal>
    <AskToLogOut
      v-if="askToLogOut"
      @close="askToLogOut = false"
      @log-out="logOut()"
    ></AskToLogOut-->
  </div>
</template>

<script>
//import axios from "axios";
//import VueCookies from "vue-cookies";
//import userModal from "./userModal.vue"
//import AskToLogOut from "../views/AskToLogOut.vue";
import EventBus from "../eventbus";
import { authComputed } from "../vuex/helpers.js";

export default {
  name: "SideBar",
  computed: {
    ...authComputed
  },
  
  data() {
    return {
      menuOpen: 0,
      
      
    };
  },
  created() {
    //this.getUserInfo();
  },
  mounted() {
    EventBus.$on("log-in-success", () => {
      this.getUserInfo();
 
    });
  },
  beforeDestroy() {
    EventBus.$off("log-in-success");
    
  },
  methods: {
    openEsopSimulation() {
      console.log("hello")
      let routeData = this.$router.resolve({ path: "/esop-simulation" });
      // let routeData = this.$router.resolve({ path: "/esop-editor"});
      window.open(routeData.href);
    },

    openEsopEditor() {
      let routeData = this.$router.resolve({ path: "/esop-editor" });
      // let routeData = this.$router.resolve({ path: "/esop-editor"});
      window.open(routeData.href);
    },

    openMLOps(){
      window.open("http://163.180.117.186:8081/");
    },
    /*
    async getUserInfo() {
      let token = VueCookies.get("token");
      if (token != null) {
        try {
          const res = await axios.get("/api/auth", {
            headers: {
              Authorization: "Bearer " + token,
            }
          });
          console.log(res.data.data.email);
          this.currUser.email = res.data.data.email;
          this.currUser.name = res.data.data.name;
          this.logIn = true;
          console.log(this.currUser);
        } catch (err) {
          console.log(err);
        }
      } else {
        this.logIn = false;
      }
    },
    */

    logOut() {
      this.$store.dispatch("logout");
    },
  },
  components: {
    //AskToLogOut,
    //userModal,
  },
};
</script>

<style>
.user-info-wrapper {
  width: 90%;
  height: 30px;
  background-color: rgb(48 59 90 / 45%);
  line-height: 30px;
  padding: 0px 10px;
  border-radius: 20px;
  position: absolute;
  right: 5%;
  bottom: 12px;
}
.user-info {
  display: flex;
  vertical-align: middle;
  justify-content: space-between;
}

.bi-box-arrow-right:hover {
  cursor: pointer;
}

.view {
  order: 1;
  float: left;
  width: 240px;
  height: 100vh;
  background-color: #1a233a;
  color: #c8d9f8;
  text-align: left;
  padding: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 8px 13px 20px 5px rgb(9 21 42 / 66%);
}
.scrollBlind{
  width:260px;
  height: 100vh;
  overflow-y:scroll;
}

.home {
  color: #517bcd;
  padding: 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}
p {
  transition: all 0.5s;
  font-size: 0.85rem;
}

p:hover {
  color: #517bcd;
  padding-left: 0.1rem;
}

.goto-login {
  cursor: pointer;
}
</style>
