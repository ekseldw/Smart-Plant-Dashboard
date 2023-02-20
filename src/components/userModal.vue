<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ now }}</h5>
          
        </div>
        <div class="modal-body">
        <div class="modal-sidebar">
          <div v-for="(clist,i) in clickList" :key="i" >
            <div style="margin-top:10px"
            @click="now=clist;
            menuOpen= i">
            <i v-if="menuOpen == i" class="bi bi-chevron-right"></i>
              {{ clist }}
            
            </div>
          </div>
          
        </div>
        
        <div v-if="now=='사용자정보'">
          <div class="form-body" style="margin-top: 10px">
            <div class="row" style=" border-left: .5px solid #464d5c;">
              <div class="col-12">
                <div class="form-label-group position-relative controls"></div>
              </div>
           

              <div class="col-12">
                <div class="form-label-group position-relative controls">
                  <label for="sensor_pos">EMail</label>
                  <div class="main-input">
                  <div class="form-control">
                    {{ userinfo.email }}       
                  </div>
                  <div class="form-control-position label-icon">
                      <i class="bi bi-file-person"></i>
                </div>
                </div>
                </div>
              </div>

                 <div class="col-12">
                <div class="form-label-group position-relative controls">
                  <label for="sensor_pos">이름</label>
                  <div class="main-input">
                  <div class="form-control">
                    {{ userinfo.name }}       
                  </div>
                  <div class="form-control-position label-icon">
                        <i class="bi bi-person-fill"></i>
                </div>
                </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative controls">
                  <label for="sensor_pos">Phone</label>
                  <div class="main-input">
                  <div class="form-control">
                    {{ userinfo.phone }}       
                  </div>
                  <div class="form-control-position label-icon">
                      <i class="bi bi-file-person"></i>
                </div>
                </div>
                </div>
              </div>
              

            </div>
          </div>
        </div>

        <div v-if="now=='내 정보 수정'">
          
          <div class="form-body" style="margin-top: 10px">
            <div class="row" style=" border-left: .5px solid #464d5c;">
              <div class="col-12">
                <div class="form-label-group position-relative controls"></div>
              </div>

               <div class="col-12">
                <div class="form-label-group position-relative controls">
                  <label for="sensor_pos">EMail</label>
                  <div class="main-input">
                  <div class="form-control">
                    {{ userinfo.email }}       
                  </div>
                  <div class="form-control-position label-icon">
                      <i class="bi bi-file-person"></i>
                </div>
                </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative controls">
                  <label for="sensor_pos">이름</label>
                  <div class="main-input">
                  <div>
                    <input
                      type="text"
                      class="form-control"
                      name="sensor_contact"
                      placeholder="이름"
                      maxlength="100"
                      v-model="changeUser.name"
                      style="font-size:12px;"
                      required
                    />       
                  </div>
                  <div class="form-control-position label-icon">
                        <i class="bi bi-person-fill"></i>
                </div>
                </div>
                </div>
              </div>

             
              <div class="col-12">
                <div class="form-label-group position-relative controls">
                  <label for="sensor_pos">Phone</label>
                  <div class="main-input">
                  <div>
                    <input
                      type="text"
                      class="form-control"
                      name="sensor_contact"
                      placeholder="전화번호"
                      maxlength="100"
                      v-model="changeUser.phone"
                      style="font-size:12px;"
                      required
                    />      
                  </div>
                  <div class="form-control-position label-icon">
                      <i class="bi bi-file-person"></i>
                </div>
                </div>
                </div>
              </div>

               <div class="col-12">
                <div class="form-label-group position-relative controls">
                  <label for="sensor_pos">비밀번호</label>
                  <div class="main-input">
                  <div>
                   <input
                      type="password" 
                      class="form-control"
                      name="sensor_contact"
                      placeholder="새로운 비밀번호"
                      v-model="changeUser.password"
                      maxlength="100"
                      style="font-size:12px;"
                      required
                    />  
                  </div>
                  <div class="form-control-position label-icon">
                      <i class="bi bi-file-person"></i>
                </div>
                </div>
                </div>
              </div>
              

            </div>
          </div>
        </div>

        </div>
        <div class="modal-footer">
          <button v-if="now=='내 정보 수정'"
            type="button"
            class="btn btn-secondary"
            @click="changeInfo();"
          >
            변경하기
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="$emit('close')"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
        <AlertSuccess
    v-if="alertSuccess"
    @close="alertSuccess=false"
    :action="action"
    ></AlertSuccess>
  </div>
</template>

<script>
import axios from "axios";
import AlertSuccess from "./AlertWindow/alert-success.vue";
export default {
  name: "userModal",
    components: {
        AlertSuccess,
       
    },
  data() {
    return {
      clickList:["사용자정보","내 정보 수정"],
      now:"",
      menuOpen: 0,
      action:"",
      changeUser: { name: "", password: "" , phone:"" },
      alertSuccess: false,

    };
  },
  props: {
    userinfo: Object,
  },
  mounted() {
    
  },
  created() {
    this.setTitle();
  },
  methods: {
    setTitle(){
      this.now = this.clickList[0];
    },
    async changeInfo(){
      this.action="사용자 정보 변경"
       try {
        const res = await axios.post(
          "/api/auth/update",
          {
            id: this.userinfo.id,
            name: this.userinfo.name,
            password: '1',
            phone: '01050369418',
          }
        );
        console.log(res);
        this.alertSuccess = true;
      } catch(err) {
        this.alertFail = true;
        console.log(err);
      }
    }
  },
};
</script>

<style scoped>

.modal-wrapper {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
   
}
.modal-sidebar{
  color: #9fb0d6;
  padding-top: 20%;
  float: left;
  height: 100%;
  width:100px;
  height: flex;
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
  padding: 10px 25px;
  margin-bottom: 20px;
  float: right;
  
}
.modal-content {
  background-color: #1a233a;
}
.modal-footer {
  border-top: #464d5c 0.5px solid;
}
.main-input {
  border: #464d5c 1px solid;
  border-radius: 3px;
  position: relative;
  margin-bottom: 12px;
  width: 100%;
}
.input_box{
  background-color: #1a233a;
  color: #9fb0d6;
}
.form-control {
  background-color: #1a233a;
  color: #9fb0d6;
  border: none;
  font-size: 12px;
  /*font-weight: bold;*/
  margin-left: 20px;
  width: 80%;
  
}
.form-control:focus {
  box-shadow: none;
  background-color: #1a233a;
  color: #9fb0d6;
}
label {
  margin-left: 3px;
  font-size: 10px;
  color: #9fb0d6;
}
.label-icon {
  margin-left: 5px;
  position: absolute;
  left: 4px;
  top: 4px;
  color: #9fb0d6;
  font-size: 0.8rem;
}
select.form-control:not([size]):not([multiple]) {
  height: auto !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input:disabled {
  background-color: rgb(92 101 125 / 52%);
  color: #a1a3a7a1;
}
select:disabled {
  background-color: rgb(92 101 125 / 52%);
  color: #a1a3a7a1;
}
::placeholder {
  color: #a1a3a7a1;
}
::placeholder {
  color: #a1a3a7a1;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #a1a3a7a1;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #a1a3a7a1;
}

.main-input {
  padding: 0;
}
</style>
