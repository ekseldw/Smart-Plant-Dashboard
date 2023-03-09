import CCTV from "../components/Dashboard/CCTVDetection/CCTV.vue";
import Home from "../views/Home.vue";
import Detection from "@/components/Dashboard/IntelligentDetection/Detection.vue";
import SensorManage from "@/components/IoTManage/SensorAdmin/SensorManage.vue";
import AlertSettings from "../components/AbnormalDetection/AbnormalSetting/AlertSettings.vue";
import SensorPos from "../components/IoTManage/SensorPosRegister/LocationRegistration1/src/components/MainPage.vue";
import EsopManager from "../components/EsopManage/Esop/EsopManager.vue";
import EsopMainPage from "../components/EsopManage/Esop/EsopMainPage.vue";
import Simulation from "@/components/EsopManage/Esop/Simulation.vue";
import MsgLog from "@/components/EsopManage/MsgLog.vue";
import SimulationLog from "@/components/EsopManage/SimulationLog.vue";
import PageNotfound from "../views/PageNotFound.vue";
import AbnormalDetectionLog from "../components/AbnormalDetection/AbnormalDetectionLog.vue";
//import EditEsopHome from "../components/SOPEditor/EditEsopHome.vue";
import EsopEditor from "../components/EsopManage/SOPEditor/MainPage.vue";
//import Login from "../views/Login.vue";
//import loginTest from "../views/loginTest.vue";
import VueRouter from "vue-router";
//import axios from "axios";
//import VueCookies from "vue-cookies";
import CCTVSetting from "../components/IoTManage/CCTVSetting/CCTVSetting.vue";
import SensorDataLog from "../components/AbnormalDetection/SensorDataLog.vue"
//import loginStore from "./login";
import SensorGraph from "../components/AbnormalDetection/SensorGraph.vue"
import MainScreen from "../views/MainScreen.vue"


const routes = [
  
  {
    path: "/",
    name: "Home",
    component: MainScreen,
    //meta: { unauthorized: true },
  },
  {
    path: "/cctv",
    name: "CCTV",
    component: CCTV,
    //meta: { requiresAuth: true }
  },
  {
    path: "/alertsettings",
    name: "AlertSettings",
    component: AlertSettings,
    //meta: { requiresAuth: true }
   
  },
  {
    path: "/detection",
    name: "Detection",
    component: Detection,
    //meta: { requiresAuth: true }
  },

  {
    path: "/esop-manager",
    name: "EsopManager",
    component: EsopManager,
    //meta: { requiresAuth: true }
  },
  {
    path: "/msg-log",
    name: "MsgLog",
    component: MsgLog,
    //meta: { requiresAuth: true },
  },
  {
    path: "/check-log",
    name: "CheckLog",
    component: SimulationLog,
    //meta: { requiresAuth: true }
  },
  {
    path: "/abnormal-detection-log",
    name: "AbnormalDetectionLog",
    component: AbnormalDetectionLog,
    //meta: { requiresAuth: true }
  },
  /*
  {
    path: "/edit-esop-home",
    name: "EditEsopHome",
    component: EditEsopHome,
    //meta: { requiresAuth: true }
  },
  */
  {
    path: "/esop-editor",
    name: "EsopEditor",
    component: EsopEditor,
    //meta: { requiresAuth: true }
  },
  {
    path: "/esop-simulation/",
    name: "EsopSimulation",
    component: EsopMainPage,
    //meta: { requiresAuth: true }
  },
  {
    path: "/simulation",
    name: "Simulation",
    component: Simulation,
    //meta: { requiresAuth: true }
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
    //meta: { requiresAuth: true }
  },
  {
    path: "/sensorpos",
    name: "SensorPos",
    component: SensorPos,
    //meta: { requiresAuth: true }
  },
  {
    path: "/sensor-manage",
    name: "SensorManage",
    component: SensorManage,
    //meta: { requiresAuth: true },
  },
  {
    path: "/cctv-setting",
    name: "CCTVSetting",
    component: CCTVSetting,
    //meta: { requiresAuth: true }
  },
  {
    path: "/sensor-data-log",
    name: "SensorDataLog",
    component: SensorDataLog,
    //meta: { requiresAuth: true }
  },
  {
    path: "/sensor-data-graph",
    name: "SensorGraph",
    component: SensorGraph,
    //meta: { requiresAuth: true }
  },


  {
    path: "/*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: PageNotfound,
  },
];

/*
var router = new VueRouter({
  mode: "history",
  routes,
});
*/

/*
router.beforeEach(async (to, from, next) => {
  if (to.fullPath == "/login") {
    return next();
  }
  // 1) 권한이 필요한 페이지인 경우
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let token = VueCookies.get("token"); // 토큰을 받아옴
    if (token != null) {
      // 토큰이 있는 경우
      try {
        // 토큰의 유효성을 검사함
        const res = await axios.get("/api/auth", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(res);
        // A. 토큰이 유효한 경우 (메시지 코드가 400대가 아닌 경우)
        if (res.data.code[0] != "4") {
          next();
          // B. 토큰이 유효하지 않은 경우
        } else {
          alert("로그인 해주세요");
          next("/login");
        }
      } catch (err) {
        alert("토큰 유효성 검사 실패");
        console.log(err);
      }
    } else {
      alert("로그인 해주세요");
      next("/login");
    }
  }
  // 2) 권한이 필요하지 않은 페이지인 경우
  else {
    next();
  }
});
*/

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  // 1번 해결 로컬스토리지 체크
  const loggedIn = localStorage.getItem("user");

  // 2번 해결 requiresAuth 체크
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 로그인 상태가 아니면 '/' 여기로 보내버린다.
    if (!loggedIn) {
      alert("로그인 해주세요");
      next("/");
      return;
    }
    next();
  }
  // requiresAuth가 false일때 즉, 권한이 필요 없는 페이지 일때
  next();
});



export default router;
