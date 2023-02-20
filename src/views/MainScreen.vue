<template>
  <div class="background">
    <div>
      <div style="float:right; padding:10px;">
              <img src="../assets/image/creteria.png" style="width:200px">   
      </div>
      <button type="button" class="btn process btn-danger btn-circle btn-xl"
      @click="$router.push('/home');">
        <span class="popup">
          <p>광주 영역A</p>
          <p>작업 진행중</p>
          <p>책임자:안재성</p>
        </span>
      </button>
    </div>

      <button type="button" class="btn complete4 btn-success btn-circle btn-xl">
      <span class="popup">
        <p>광주 영역A</p>
          <p>작업 완료</p>
      </span>
    </button>
    <button type="button" class="btn complete5 btn-success btn-circle btn-xl">
      <span class="popup">
        <p>광주 영역A</p>
          <p>작업 완료</p>
      </span>
    </button>
    <button type="button" class="btn complete1 btn-success btn-circle btn-xl">
      <span class="popup">
        <p>광주 영역B</p>
          <p>작업 완료</p>
      </span>
    </button>
     <button type="button" class="btn complete2 btn-success btn-circle btn-xl">
      <span class="popup">
        <p>광주 영역C</p>
          <p>작업 완료</p>
      </span>
    </button>
    <button type="button" class="btn complete3 btn-success btn-circle btn-xl">
      <span class="popup">
        <p>광주 영역E</p>
          <p>작업 완료</p>
      </span>
    </button>
    <button type="button" class="btn complete6 btn-success btn-circle btn-xl">
      <span class="popup">
        <p>광주 영역D</p>
          <p>작업 완료</p>
      </span>
    </button>
     <button type="button" class="btn complete7 btn-success btn-circle btn-xl">
      <span class="popup">
        <p>광주 영역F</p>
          <p>작업 완료</p>
      </span>
    </button>
    <button type="button" class="btn complete7 btn-success btn-circle btn-xl"
    @click="$router.push('/home');">
      <span class="popup">
        <p>광주 영역F</p>
          <p>작업 완료</p>
      </span>
    </button>
    <button type="button" class="btn complete8 btn-success btn-circle btn-xl">
      <span class="popup">
        <p>광주 영역F</p>
          <p>작업 완료</p>
      </span>
    </button>
    <button type="button" class="btn complete9 btn-success btn-circle btn-xl">
      <span class="popup">
        <p>광주 영역E</p>
          <p>작업 완료</p>
      </span>
    </button>
    <button type="button" class="btn complete10 btn-success btn-circle btn-xl"
    @click="modalOpen = true">
      <span class="popup">
        <p>광주 영역B</p>
          <p>작업 완료!</p>
      </span>
    </button>



    <button type="button" class="btn prepare1 btn-primary btn-circle btn-xl">
      <span class="popup">
        <p>광주 영역C</p>
          <p>작업 예정</p>
      </span>
    </button>
    <button type="button" class="btn prepare2 btn-primary btn-circle btn-xl">
      <span class="popup2">
        <p>광주 영역D</p>
          <p>작업 예정</p>
      </span>
    </button>
    <button type="button" class="btn prepare3 btn-primary btn-circle btn-xl">
      <span class="popup2">
        <p>광주 영역A</p>
          <p>작업 예정</p>
      </span>
    </button>
    <button type="button" class="btn prepare4 btn-primary btn-circle btn-xl">
      <span class="popup2">
        <p>광주 영역F</p>
          <p>작업 예정</p>
      </span>
    </button>
    <button type="button" class="btn prepare5 btn-primary btn-circle btn-xl">
      <span class="popup2">
        <p>광주 영역F</p>
          <p>작업 예정</p>
      </span>
    </button>
    <button type="button" class="btn prepare6 btn-primary btn-circle btn-xl">
      <span class="popup2">
        <p>광주 영역E</p>
          <p>작업 예정</p>
      </span>
    </button>
    <button type="button" class="btn prepare7 btn-primary btn-circle btn-xl">
      <span class="popup2">
        <p>광주 영역E</p>
          <p>작업 예정</p>
      </span>
    </button>
    <button type="button" class="btn prepare8 btn-primary btn-circle btn-xl">
      <span class="popup2">
        <p>광주 영역B</p>
          <p>작업 예정</p>
      </span>
    </button>
    <button type="button" class="btn prepare9 btn-primary btn-circle btn-xl">
      <span class="popup2">
        <p>광주 영역D</p>
          <p>작업 예정</p>
      </span>
    </button>


 <HanJeonAlert 
 v-if="modalOpen"
 :InfoList ="InfoList"
 @close-modal="modalOpen = false">
</HanJeonAlert>
  </div>

</template>

<script>
import HanJeonAlert from "./HanJeonAlert.vue";
export default {
  components: {
    HanJeonAlert,
    
  },
  data() {
    return {
      modalOpen: false,
  
    }
  }
}
</script>

<style>

@keyframes process-effect {
  50% {
    opacity: 0;
  }
}




.btn .popup {
  visibility: hidden;
  width: 150px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.btn .popup2 {
  visibility: hidden;
  width: 150px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}
.btn .popup2::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
.btn:hover .popup2 {
  visibility: visible;
  opacity: 1;
}
.btn .popup::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.btn:hover .popup {
  visibility: visible;
  opacity: 1;
}

.process {
      width: 50px;
			height: 50px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:59%;
      top:40%;     
      animation: process-effect 1s step-end infinite;

}
.complete1 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:73%;
      top:60%;

}
.complete2 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:35%;
      top:35%;

}
.complete3 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:70%;
      top:18%;

}
.complete4 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:60%;
      top:35%;

}
.complete5 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:65%;
      top:40%;

}
.complete6 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:45%;
      top:20%;

}
.complete7 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:23%;
      top:80%;

}
.complete8 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:25%;
      top:60%;

}
.complete9 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:80%;
      top:15%;

}
.complete10 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:74%;
      top:80%;

}

.prepare1 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:30%;
      top:39%;

}
.prepare2 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:43%;
      top:18%;

}
.prepare3 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:63%;
      top:28%;

}
.prepare4 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:30%;
      top:70%;

}
.prepare5 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:29%;
      top:60%;

}
.prepare6 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:85%;
      top:20%;

}
.prepare7 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:87%;
      top:48%;

}
.prepare8 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:80%;
      top:50%;

}
.prepare9 {
      width: 30px;
			height: 30px;
			border-radius: 50px;
      cursor: pointer;
      position:absolute;
      left:50%;
      top:13%;

}



</style>


