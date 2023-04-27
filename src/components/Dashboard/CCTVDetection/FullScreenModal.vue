<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">CCTV</div>
        <div class="modal-body" v-bind:key="this.childCanvasId">
          <div class="cctv-header">
            {{ this.posName }}
          </div>
          <div class="cctv-box">
            <canvas :id="this.childCanvasId"></canvas>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            aria-label="Close"
            v-on:click="$emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import JSMpeg from "jsmpeg";
export default {
  name: "FullScreenModal",
  props: ["childCanvasId", "childWebsocketURL", "posName"],  
  data() {
    return {};
  },
  mounted() {
    console.log("modal CCTV on");
    this.webSocketStreaming();
  },
  beforeDestroy() {
    this.disconnect2();
  },

  methods: {
    webSocketStreaming: function () {
      console.log(this.childWebsocketURL);
      console.log(this.childCanvasId);
      console.log(this.posName);

      this.url2 = new WebSocket(this.childWebsocketURL);
      this.url2.addEventListener("open", ()=>{
        console.log("send connect message socket : "+String(11));
        this.url2.send("client number of connection : "+String(11));
      });
      var msg2 = document.getElementById(this.childCanvasId);
      let listen = this.url2;
      listen.addEventListener('message', (event)=>{
        let ctx2 = msg2.getContext("2d");
        let image = new Image();
        image.src = window.URL.createObjectURL(event.data);
        image.addEventListener("load", (e) =>{
          console.log(e);
          ctx2.drawImage(image, 0, 0, msg2.width, msg2.height);
          window.URL.revokeObjectURL(image.src);
        });
      });
    },
    disconnect2: function () {
      this.url2.close(1000);
    },
  },
};
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-content: center;
}
.modal-dialog {
  max-width: 700px;
  margin: 30px auto;
}
.modal-dialog {
  position: fixed;
  top: 2%;
  left: calc((100% - 700px) / 2);
  width: 100%;
}
.modal-header {
  background-color: #272e48;
  color: #9fb0d6;
  border-bottom: #464d5c 0.5px solid;
}

.modal-title {
  font-size: 15px;
  font-weight: bold;
}
.modal-body {
  padding: 10 auto;
}
.modal-content {
  background-color: #1a233a;
}
.modal-footer {
  border-top: #464d5c 0.5px solid;
}
.cctv-box {
  display: flex;
  justify-content: center;
}
.cctv-header {
  padding: 10px 0px;
  color: #9fb0d6;
  font-size: 25px;
}
canvas {
  width: 640px;
  height: 480px;
  margin: 0 auth;
}
</style>
