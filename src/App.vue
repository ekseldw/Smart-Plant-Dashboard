<template>
  <div class="main-container">
    <SideBar></SideBar>
    <div class="contents">
      <div class="main-contents">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: {
    SideBar: SideBar,
    
  },
  methods: {},
};
</script>

<style>
@import url("https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css");

html,
body {
  font-family: "NanumSquareLight";
  font-family: "NanumSquare";
  font-family: "NanumSquareBold";
  font-family: "NanumSquareExtraBold";
  font-family: "NanumSquareAcb";
  font-family: "NanumSquareAceb";
  font-family: "NanumSquareAcl";
  font-family: "NanumSquareAcr";
  margin: 0;
  height: 100%;
}

.main-container {
  display: flex;
  flex-direction: row;
  width: calc(100%-230px);
  height: 100%;
}

.wrapper {
  margin: 10px;
}

.table-main {
  height: fit-content;
  min-height: 600px;
  margin: 20px;
  background-color: #272e48;
  color: #bdd1f8;
  border-radius: 9px;
  padding-bottom: 30px;
}

.table-main__header {
  padding: 20px;
  font-size: 20px;
  width: 500px;
}

.table-main td {
  font-size: 15px;
}

.contents {
  order: 2;
  width: 100%;
  overflow: hidden;
  background-color: #1a233a;
}

.header {
  width: 100%;
  height: 40px;
  background-color: #1a233a;
}

.header-left {
  padding-top: 13px;
  padding-left: 13px;
}

.main-contents {
  height: 100%;
  background-color: #1a233a;
  /* flex-direction: column; */
}

.footer {
  width: 100%;
  background-color: #1a233a;
  height: 40px;
  margin: 0 auto;
  text-align: right;
  padding-right: 15px;
}

.menu1 {
  color: #66cfcf;
  font-weight: bold;
  padding-left: 20px;
  font-size: 1rem;
}

.menu2 {
  font-size: 0.85rem;
  margin: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
}

.scrollbar::-webkit-scrollbar {
    width: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
}

.scrollbar::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Nanum Gothic", sans-serif;
  height: 100%;
  color: #2c3e50;
}
</style>
