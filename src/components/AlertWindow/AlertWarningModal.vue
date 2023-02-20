<template>
  <div class="modal-wrapper">
    <div class="modal-dialog"  style="margin-top: 150px;">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-body" style="margin-top:10px">
            <div style="text-align: right;" class="row">
                <i
                @click="
                $emit('close-warning-modal')" 
                id="close-modal" 
                class="bi bi-x"
                ></i>
            </div>
            
            <div style="display: flex; flex-direction: column; align-items: center">
            <div class="row" style="text-align: center;">
                <h4 style="color: white; font-weight: bold;">
                    <div style="padding-bottom: 15px;">{{ warningInfo.posName }} 구역에서</div>
                    <div>{{ warningInfo.typeName }} 센서가
                        <span :style="{color: warningInfo.color}">{{ warningInfo.status }}</span>
                        상태입니다.</div>
                </h4>
                <span id="status" :style="{color: warningInfo.color}"
                v-html="warningInfo.icon"></span>
            </div>

          <div class="warning-button-wrapper">
            <button style="width: 350px;" type="button" class="btn btn-dark"
            @click="$emit('close-warning-modal');
            ">
                닫기
            </button>
          </div> 
          </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: "AlertWarningModal",
    data() {
        return {
            btnClass: "",
            btnColor: "yellow",
            alertClose :0,

        }
    },
    props: {
        warningInfo : Object,
    },
    created(){
      this.alertSound();
    },
    methods:{
      
      async alertSound(){
        var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        var osc, gn;
        osc = audioCtx.createOscillator() // 오실레이터 생성
        osc.type = "sine" // 그래프 타입 설정 (sine(기본값), saw, triangle 등)
        osc.frequency.value = 440 // 주파수(Hz) 입력
        gn = audioCtx.createGain() // 게인노드 생성
        osc.connect(gn) // 오실레이터와 게인노드 연결
        gn.connect(audioCtx.destination)
        osc.start() // 오실레이터 스타트(음 재생)
// 1초간 재생 후 페이드아웃하면서 정지 (마지막의 튀는 음을 방지하기 위함)
      setTimeout(function() {
        gn.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.04)
        }, 3000)

      },
      

      },
    }
    

</script>
<style>
.warning-button-wrapper {
  width: 350px;
  display: flex;
  justify-content: center;
  margin: 10px;
}


#status {
    font-size: 80px;
}
#close-modal {
  float: right;
  color: #c8d9f8;
  font-size: 30px;
}
</style>