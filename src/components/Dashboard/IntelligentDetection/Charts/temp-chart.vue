<template>
  <!--온도-->
  <div class="box">
    <div class="box_title"><i class="bi bi-thermometer-half"></i>   온도
      <i  v-if="!smallView" class="bi bi-caret-down-fill" id="hide_icon" style="float: right"
      @click="smallView=true"
      ></i>
      <i  v-if="smallView" id="hide_icon" class="bi bi-caret-up-fill" style="color: white;"
      @click="smallView=false"
      ></i>
    </div>

    <div v-if="!smallView" class="large_view_content">
    <div id="temp" class="value_text"
    :style="{position: 'absolute', left: '25px', top: '50px', color: color}">
      {{ value }}
      <span style="font-size: 20px; position: relative; left: -7px; color:white;">°C</span>
      </div>

    <div class="vue-thermometer" :class="customClass">
      <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height">
        <g>
          <g id="11">
            <!-- ticks/lines -->
            <path
              v-show="defaultOptions.thermo.ticksEnabled"
              v-for="(tick, index) in ticks"
              :key="index"
              :stroke="defaultOptions.thermo.tickColor"
              :stroke-width="defaultOptions.thermo.tickWidth"
              :stroke-miterlimit="defaultOptions.thermo.tickWidth"
              :id="'12' + index"
              :d="offsetLine(index)"
            />
          </g>
          <!-- Frame round thermo black/white-->
          <circle
            :cx="roundDotPositionX"
            :cy="glassHeight"
            :r="glassWidth * 0.9 + 2"
            :stroke="defaultOptions.thermo.frameColor"
            stroke-width="4"
            :fill="color"
          />
          <rect
            :fill="defaultOptions.thermo.frameColor"
            fill-rule="nonzero"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="4"
            stroke-dashoffset="0"
            ry="16"
            rx="16"
            :y="glassOffset - 2"
            :x="baseXOffset - 2"
            :height="glassHeight + 4"
            :width="glassWidth + 4"
            id="14"
          />
          <rect
            :fill="defaultOptions.thermo.backgroundColor"
            fill-rule="nonzero"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="4"
            stroke-dashoffset="0"
            ry="16"
            rx="16"
            :y="glassOffset"
            :x="baseXOffset"
            :height="glassHeight"
            :width="glassWidth"
            id="15"
          />

          <!-- this is the round buttom thing center of it (red) -->
          <circle
            :cx="roundDotPositionX"
            :cy="glassHeight"
            :r="glassWidth * 0.9"
            :stroke="defaultOptions.thermo.backgroundColor"
            stroke-width="4"
            :fill="color"
          />

          <!-- this is the bar/temp height -->
          <rect
            :fill="color"
            stroke="#000000"
            stroke-width="0"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="4"
            stroke-dashoffset="0"
            ry="8"
            rx="8"
            :x="baseXOffset + 3"
            :y="thermoOffset"
            :width="thermoWidth"
            :height="thermoHeight"
            id="svg_18"
          />
          <!-- this is the temp values -->
          <text
            v-show="defaultOptions.text.textEnabled"
            v-for="(tick, index) in ticks"
            :key="index"
            :id="'svg_19' + index"
            :fill="defaultOptions.text.color"
            :stroke="defaultOptions.text.color"
            stroke-width="0"
            :x="textSpacing"
            :y="offsetText(index)"
            :font-size="defaultOptions.text.fontSize"
            :font-family="defaultOptions.text.fontFamily"
            text-anchor="middle"
            xml:space="preserve"
          >
            {{ tick }}{{ scale }}
          </text>
        </g>
      </svg>
    </div>
    <div id="temp" class="status" :style="{color: color}">
        <span v-html="icon"></span>
        <span style="margin-left: 4px;">{{ status }}</span>
    </div>
    </div>

    <div v-if="smallView" class="small_view_content">
      <div class="small_status" :style="{backgroundColor: color}">
        <div>{{ value }}<span style="font-size: 10px"> °C</span></div>
        <div style="font-weight: lighter;">|</div>
      <div >{{ status }}</div>
    </div>
  </div>

  </div>
  
</template>

<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

const _textOffset = 0.75;

export default {
  name: "temp-chart",

  props: {
    min: {
      type: Number,
      default: 0,
      required: false,
    },
    max: {
      type: Number,
      default: 100,
      required: false,
    },
    scale: {
      type: String,
      default: "°C",
      required: false,
    },
    options: {
      type: Object,
      required: false,
    },
    customClass: {
      type: String,
      required: false,
    },

    ssId: Number,
    infoList: Array
  },
  created() {
    this.defaultOptions = {
      text: {
        color: "#c8d9f8",
        fontSize: 10,
        textAdjustmentY: 3,
        fontFamily: "Arial",
        textEnabled: true,
      },
      thermo: {
        color: this.color,
        backgroundColor: "#fcf9f9",
        frameColor: "#1a233a10",
        ticks: 5,
        ticksEnabled: true,
        tickColor: "#c8d9f8",
        tickWidth: "1",
      },
      layout: {
        height: 280,
        width: 60,
      },
    };
  },
  mounted() {
    if (this.options !== null && this.options !== undefined) {
      this.mergeDefaultOptionsWithProp(this.options);
    }
    this.connect();
  },
  beforeDestroy() {
    this.disconnect();
    clearInterval(this.timer);
  },
  data() {
    return {
      smallView: false,
      defaultOptions: Object,
      value: 0,
      color: "#5a8dee",
      icon: "<i class='bi bi-emoji-laughing-fill'></i>",
      status: "안전",
    };
  },
  computed: {
    baseXOffset() {
      return this.defaultOptions.layout.width / 5;
    },
    width() {
      return this.defaultOptions.layout.width;
    },
    height() {
      return this.defaultOptions.layout.height;
    },
    textSpacing() {
      return this.width * _textOffset;
    },
    tickStep() {
      return (
        Math.abs(this.max - this.min) / (this.defaultOptions.thermo.ticks - 1)
      );
    },
    ticks() {
      let ticks = [];
      let maxValue = this.max;
      for (let i = 0; i < this.defaultOptions.thermo.ticks - 1; i++) {
        ticks.push(Math.round(maxValue));
        maxValue -= this.tickStep;
      }
      ticks.push(this.min);
      return ticks;
    },
    thermoWidth() {
      return this.defaultOptions.layout.width / 6;
    },
    glassWidth() {
      return this.defaultOptions.layout.width / 6 + 6;
    },
    tickWidth() {
      return Math.ceil(this.defaultOptions.layout.width / 12);
    },
    glassOffset() {
      return this.defaultOptions.layout.height * 0.02;
    },
    glassHeight() {
      let height = this.defaultOptions.layout.height * 0.55;
      while (this.defaultOptions.layout.height - height < 30) {
        height -= 1;
      }
      return height;
    },
    tickStepSize() {
      return this.glassHeight / this.defaultOptions.thermo.ticks;
    },
    thermoOffset() {
      let offset = Math.ceil(this.glassHeight - this.thermoHeight);
      return this.glassOffset + offset;
    },
    level() {
      return Math.ceil(((this.value - this.min) * 100) / (this.max - this.min));
    },
    thermoHeight() {
      return (
        this.level * (this.glassHeight / 100) +
        ((100 - this.level) / 100) * this.glassHeight * 0.075
      );
    },
    roundDotPositionX() {
      return this.baseXOffset + this.glassWidth * 0.5;
    },
    roundDot() {
      return (
        "m74.829132," +
        this.glassHeight +
        "a33.41457,32 0 1 1 -66.829132,0a33.41457,32 0 1 1 66.829132,0z"
      );
    },
  },


  methods: {
    connect() {
      const serverURL = "/ws";
      var socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);

      this.stompClient.connect(
        // headers
        {},
        // connetCallback
        (frame) => {
          // 현재 보여지는 화면의 데이터값 가져오기
            this.connected = true;
            console.log("Socket Connection Success", frame);
            // subscribe(destination, callback)
            this.stompClient.subscribe(
              "/send/" + this.ssId,
              (res) => {
                console.log("Sub Message.", res.body);
                console.log(JSON.parse(res.body).inputData);
                // sensorState : ex) 심각 -> 4
                // ["안전","관심","주의","경고","심각"]
                const state = JSON.parse(res.body).sensorState;
                this.value = JSON.parse(res.body).inputData;
                this.color = this.infoList[state].color;
                this.icon = this.infoList[state].icon;
                this.status = this.infoList[state].status;
              }
            );
          },
        // errorCallback
        (error) => {
          console.log("Socket Connection Fail", error);
          this.connected = false;
        }
      );
      this.infSend();
    },

    infSend() {
      setInterval(this.send, 2000);
    },

    send() {
        //console.log("send : " + sensor.ssId);
        if (this.stompClient && this.stompClient.connected) {
          const msg = {
            ssId: this.ssId,
          };
          this.stompClient.send(
            "/receive/" + this.ssId,
            JSON.stringify(msg),
            {}
          );
        }
    },

    disconnect() {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
        console.log("Disconnected");
      }
    },

    mergeDefaultOptionsWithProp: function (options) {
      var result = this.defaultOptions;
      for (var option in options) {
        if (options[option] !== null && typeof options[option] === "object") {
          for (var subOption in options[option]) {
            if (
              options[option][subOption] !== undefined &&
              options[option][subOption] !== null
            ) {
              result[option][subOption] = options[option][subOption];
            }
          }
        } else {
          result[option] = options[option];
        }
      }
    },
    offsetText(index) {
      let base =
        this.tickStepSize / this.defaultOptions.thermo.ticks +
        this.glassOffset +
        this.defaultOptions.text.textAdjustmentY;
      let offset = index * this.tickStepSize;
      return Number(offset) + Number(base);
    },
    offsetLine(index) {
      let base =
        this.tickStepSize / this.defaultOptions.thermo.ticks + this.glassOffset;
      let offsetY = index * this.tickStepSize;
      let length =
        index % 2 === 0
          ? "l" + Math.ceil(this.tickWidth * 1.4)
          : "l" + Math.ceil(this.tickWidth + this.tickWidth);
      offsetY = Number(offsetY) + Number(base) + length;
      let offsetX =
        "m" + Number(this.defaultOptions.layout.width * 0.4) + ".121861,";
      return offsetX + offsetY + ".121853,0"; // todo this fix x offset
    },
  },

  watch: {
    options: function (val) {
      if (val !== null && val !== undefined) {
        this.mergeDefaultOptionsWithProp(val);
      }
    },
  },
};
</script>

<style>
#temp {
  color: v-bind(color)
}

.vue-thermometer {
  position: relative;
  left: 60px;
}
</style>