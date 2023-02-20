<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">사용자 정보</h5>
          <button
            type="button"
            class="btn-close btn-close-white close"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-body" style="margin-top: 10px">
            <div class="row">
              <div class="col-12">
                <div class="form-label-group position-relative controls"></div>
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
        <div class="modal-footer">
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
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "userModal",
  data() {
    return {

    };
  },
  props: {
    userinfo: Object,
  },
  mounted() {
    
  },
  created() {
    
  },
  methods: {
    
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
