import CCTV from "../components/Dashboard/CCTV.vue";
import Home from "../views/Home.vue";
import MainPage from "../views/MainPage.vue";
import Detection from "../components/Dashboard/Detection.vue";
import Monitoring from "../components/Dashboard/Monitoring.vue";
import SensorManage from "../views/SensorManage.vue";
import AlertSettings from "../components/AbnormalDetection/AlertSettings.vue";
import SensorPos from "../components/IoTManage/LocationRegistration1/src/components/MainPage.vue";
import EsopManager from "../components/Esop/EsopManager.vue";
import EsopSimulation from "../components/Esop/EsopSimulation.vue";
import SimulationContent from "../components/Esop/SimulationContent.vue";
import MsgLog from "../components/Esop/MsgLog.vue";
import CheckLog from "../components/Esop/CheckLog.vue";
import PageNotfound from "../views/PageNotFound.vue";
import AbnormalDetectionLog from "../components/AbnormalDetection/AbnormalDetectionLog.vue";
import EditEsopHome from "../components/SOPEditor/EditEsopHome.vue";
import EsopEditor from "../components/SOPEditor/MainPage.vue";
import Login from "../views/Login.vue";
import VueRouter from "vue-router";
import axios from "axios";
import VueCookies from "vue-cookies";
import CCTVSetting from "../components/AbnormalDetection/CCTVSetting";

const routes = [
  {
    path: "/main-page",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { unauthorized: true },
  },
  {
    path: "/cctv",
    name: "CCTV",
    component: CCTV,
  },
  {
    path: "/alertsettings",
    name: "AlertSettings",
    component: AlertSettings,
  },
  {
    path: "/detection",
    name: "Detection",
    component: Detection,
  },

  {
    path: "/monitoring",
    name: "Monitoring",
    component: Monitoring,
  },
  {
    path: "/esop-manager",
    name: "EsopManager",
    component: EsopManager,
  },
  {
    path: "/msg-log",
    name: "MsgLog",
    component: MsgLog,
    meta: { requiresAuth: true },
  },
  {
    path: "/check-log",
    name: "CheckLog",
    component: CheckLog,
  },
  {
    path: "/abnormal-detection-log",
    name: "AbnormalDetectionLog",
    component: AbnormalDetectionLog,
  },
  {
    path: "/edit-esop-home",
    name: "EditEsopHome",
    component: EditEsopHome,
  },
  {
    path: "/esop-editor",
    name: "EsopEditor",
    component: EsopEditor,
  },
  {
    path: "/esop-simulation/",
    name: "EsopSimulation",
    component: EsopSimulation,
  },
  {
    path: "/simulation-content",
    name: "SimulationContent",
    component: SimulationContent,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sensorpos",
    name: "SensorPos",
    component: SensorPos,
  },
  {
    path: "/sensor-manage",
    name: "SensorManage",
    component: SensorManage,
  },
  {
    path: "/cctv-setting",
    name: "CCTVSetting",
    component: CCTVSetting,
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

var router = new VueRouter({
  mode: "history",
  routes,
});

// const getAuth = async (token) => {
//   try {
//     return await axios.get(
//       "http://163.180.117.38:8281/api/auth",
//       {
//           headers: {
//               Authorization: 'Bearer ' + token
//           }
//       }
//     )
//   } catch (err) {
//     alert("토큰 유효성 검사 실패");
//     console.log(err);
//   }
// };

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
        const res = await axios.get("http://163.180.117.38:8281/api/auth", {
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

      // // 토큰의 유효성을 검사함
      // const auth = await getAuth();
      // console.log(auth);
      //   // 토큰이 유효한 경우 (메시지 코드가 400대가 아닌 경우)
      // if (auth.data.code[0] != '4') {
      //     next();
      // // 토큰이 유효하지 않은 경우
      // } else {
      //     alert('로그인 해주세요')
      //     next('/login');
      // }
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

export default router;
