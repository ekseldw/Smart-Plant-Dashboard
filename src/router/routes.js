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
  // 1) ????????? ????????? ???????????? ??????
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let token = VueCookies.get("token"); // ????????? ?????????
    if (token != null) {
      // ????????? ?????? ??????
      try {
        // ????????? ???????????? ?????????
        const res = await axios.get("/api/auth", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(res);
        // A. ????????? ????????? ?????? (????????? ????????? 400?????? ?????? ??????)
        if (res.data.code[0] != "4") {
          next();
          // B. ????????? ???????????? ?????? ??????
        } else {
          alert("????????? ????????????");
          next("/login");
        }
      } catch (err) {
        alert("?????? ????????? ?????? ??????");
        console.log(err);
      }
    } else {
      alert("????????? ????????????");
      next("/login");
    }
  }
  // 2) ????????? ???????????? ?????? ???????????? ??????
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
  // 1??? ?????? ?????????????????? ??????
  const loggedIn = localStorage.getItem("user");

  // 2??? ?????? requiresAuth ??????
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // ????????? ????????? ????????? '/' ????????? ???????????????.
    if (!loggedIn) {
      alert("????????? ????????????");
      next("/");
      return;
    }
    next();
  }
  // requiresAuth??? false?????? ???, ????????? ?????? ?????? ????????? ??????
  next();
});



export default router;
