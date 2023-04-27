<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="vue-virtual-scroller/dist/vue-virtual-scroller.css"/>
    <div class="table-header">CCTV 영상인식</div>
    <!-- 새로 수정 -->
    <div class="scrollbar table-wrapper" v-on:scroll.passive='handleScroll'>
    
          <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
            <div class="cctv-main" v-for="item in cctvList" v-bind:key="item.cctvId">
              <div class="cctv-main__header">{{ item.posName }}</div>
              <canvas
                class="cctv-view"
                :id="item.posName" 
                width=320
                height=240
                style="width: 320px; height: 240px"
              >
              </canvas>
              <div>
                <button
                  class="btn btn-primary cctv-show-btn"
                  @click="
                    fullScreenModal = true;
                    canvasId = item.posName + 'modal';
                    posName = item.posName;
                    websocketUrl = item.websocketURL;
                    disconnectState = true;
                    [disconnect()];
                  "
                >
                  Click
                </button>
              </div>
            </div>
          </div>
     
      </div>
      <!-- -->
    <FullScreenModal
      v-if="fullScreenModal"
     
      :childCanvasId="canvasId"
      :childWebsocketURL="websocketUrl"
      :posName="posName"

       @close="
        fullScreenModal = false;
        disconnectState = false;
      "
    />
  </div>
</template>

<script>
// import { Icon } from "@iconify/vue";
// import JSMpeg from "jsmpeg";
import axios from "axios";
import FullScreenModal from "@/components/Dashboard/CCTVDetection/FullScreenModal";
//import eventBus from "../../cctveventbus"; 새로 주석처리함
export default {
  name: "CCTV",

  components: {
    FullScreenModal,
  },
  data() {
    return {
      posList: [],
      fullScreenModal: false,
      currId: "",
      cctvList: [],
      cctvListLength: 0,
      elements: [],
      url: [],
      canvasView: [],
      disconnectState: false,
      fireWarning : false,
      fireWarningInfo : {detectionUrl: '', posName: ''},
      fullScreenInfo : {canvasId: '', websocketurl: '', posName: ''},
      presentPage: 0,
    };
  },
  created() {
    this.getCCTVInfo();
    console.log("get CCTV Info");
    document.addEventListener('scroll', this.handleScroll);
    //this.fireDetection();
  },
  updated() {
    console.log("get Websocket");
    this.getWebsocketVideo();
  },
  beforeDestroy() {
    this.disconnect();
    document.removeEventListener('scroll',this.handleScroll);
    //clearInterval(this.fireDetectionPolling);
  },

  methods: {
    async getCCTVInfo() {
      try {
        const res = await axios.get(
          "/api/cctv"
        );
        //"/api/cctv?pageSize=1&paged=true&sort.sorted=true&sort.unsorted=false&unpaged=true"
        this.cctvList = res.data.data.content;
        this.cctvListLength = this.cctvList.length;
        console.log(this.cctvList)
        //this.getCCTVElement();
      } catch (err) {
        console.log(err);
      }
    },
    handleScroll: function(event){  // view only 4 video 
      var eventPage = parseInt(event.target.scrollTop / 1000);
      if(this.presentPage != eventPage){
        console.log("page changed");
        this.presentPage = eventPage;
        document.body.scrollIntoView({behavior:'smooth'}); 
      }
    },
    getWebsocketVideo: function() {
      // console.log('ws://211.226.15.58:'+String(this.cctvList[0].abnormalWebsocketUrl))
      console.log('ws://115.90.76.67:'+String(this.cctvList[0].abnormalWebsocketUrl))
      if(this.disconnectState == false) {
        for(let i = 0; i < this.cctvListLength; i++) {
          // this.url[i] = new WebSocket('ws://211.226.15.58:'+String(this.cctvList[i].abnormalWebsocketUrl));
          this.url[i] = new WebSocket('ws://115.90.76.67:'+String(this.cctvList[i].abnormalWebsocketUrl));
        }
        for(let i = 0; i < this.cctvListLength; i++) {
          let listen = this.url[i];
          this.canvasView[i] = document.getElementById(this.cctvList[i].posName);
          listen.addEventListener('message', (event)=>{
            let ctx = this.canvasView[i].getContext("2d");
            let image = new Image();
            image.src = window.URL.createObjectURL(event.data);
            image.addEventListener("load", () =>{
              ctx.drawImage(image, 0, 0, this.canvasView[i].width, this.canvasView[i].height);
              window.URL.revokeObjectURL(image.src);
            });
          });
        }
      }
    },
    disconnect: function () {
      let length = this.cctvListLength;
      for (let i = 0; i < length; i++) {
        this.url[i].close(1000);
      }
    },

    disconnectedState: function(){
      if(this.disconnectState === false){
        this.disconnectState = true;
      }
      else{
        this.disconnectState = false;
      }
    }
  },
};
</script>

<style>
.scroller {
  height: 100%;
}
.wrapper {
  margin: 10px;
}
.table-header {
  color: #727e8c;
  font-size: 20px;
}
.table-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  height: 80vh;
}

.cctv-view {
  margin: 0 10%;
}
.cctv-main {
  margin: 20px;
  background-color: #272e48;
  color: #a9c7f0;
  border-radius: 9px;
  width: 400px;
  height: 380px;
  float: left;
  position: relative;
}
.cctv-main__header {
  padding: 10px 20px;
  font-size: 20px;
  border-bottom: #464d5c 0.5px solid;
  margin-bottom: 20px;
}

.cctv-show-btn {
  position: absolute;
  right: 2%;
  margin: 10px;
}
</style>
