<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">센싱 장비 관리</h5>
          <button
            type="button"
            class="btn-close btn-close-white close"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-body" style="margin-top:10px">
            <div class="row">
              
              <div class="col-12">
                <div
                  class="form-label-group position-relative has-icon-left controls"
                >
                  <label for="sensor_pos">센서 위치</label>
                  <div class="main-input">
                    <select
                      name="sensor_pos"
                      class="form-control"
                      required
                      v-model="newSensor.sensorPosId"
                      style="font-size:15px;"
                    >
                      <option value="0" hidden>== 위치 선택 ==</option>
                      <option
                        v-for="pos in posList"
                        :key="pos.posId"
                        :value="pos.posId"
                      >
                        {{ pos.posName }}
                      </option>
                    </select>
                    <div class="form-control-position label-icon">
                      <i class="bx bx-shape-polygon"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div
                  class="form-label-group position-relative has-icon-left controls"
                >
                  <label for="sensor_pos">센서 종류</label>
                  <div class="main-input">
                    <select
                      v-model="newSensor.sensorTypeId"
                      name="sensor_type"
                      class="form-control"
                      id="ss_type_select"
                      required
                      style="font-size:15px;"
                    >
                      <option hidden value="0">== 종류 선택 ==</option>
                      <option
                        v-for="type in typeList"
                        :key="type.typeId"
                        v-bind:value="type.typeId"
                      >
                        {{ type.typeName }}
                      </option>
                    </select>
                    <div class="form-control-position label-icon">
                      <i class="bx bx-shape-square"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="sensor_contact">담당자</label>
                  <div class="main-input">
                    <input
                      type="text"
                      class="form-control"
                      name="sensor_contact"
                      placeholder="담당자"
                      maxlength="100"
                      v-model="newSensor.ssContact"
                      style="font-size:15px;"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bx bx-street-view"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="sensor_contact_ext">담당자 내선번호</label>
                  <div class="main-input">
                    <input
                      type="number"
                      class="form-control"
                      name="sensor_contact_ext"
                      placeholder="담당자 내선번호"
                      maxlength="100"
                      v-model="newSensor.ssContactExt"
                      style="font-size:15px;"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bx bx-phone"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="form-label-group position-relative has-icon-left">
                  <label for="sensor_contact_phone">담당자 휴대번호</label>
                  <div class="main-input">
                    <input
                      type="number"
                      class="form-control"
                      name="sensor_constact_phone"
                      placeholder="담당자 휴대번호"
                      maxlength="100"
                      v-model="newSensor.ssContactPhone"
                      style="font-size:15px;"
                    />
                    <div class="form-control-position label-icon">
                      <i class="bx bx-mobile"></i>
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
            class="btn btn-primary"
            @click="$emit('add-new-sensor', newSensor)"
          >
            저장
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      posList: [],
      typeList: [],
      newSensor: {
        sensorPosId: 0,
        sensorTypeId: 0,
        ssContact: "",
        ssContactExt: "",
        ssContactPhone: "",
      },
    };
  },
  created() {
    this.getPosInfo();
    this.getTypeInfo();
  },
  methods: {
    async getPosInfo() {
      try {
        const res = await axios.get(
          "/api/sensor-pos?pageSize=1&paged=true&sort.sorted=true&sort.unsorted=false&unpaged=true"
        );
        this.posList = res.data.data.content;
      } catch (err) {
        console.log(err);
      }
    },
    async getTypeInfo() {
      try {
        const res = await axios.get(
          "/api/sensor-type"
        );
        this.typeList = res.data.data.content;
      } catch (err) {
        console.log(err);
      }
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
}
.modal-header {
  background-color: #272e48;
  color: #9fb0d6;
  border-bottom: #464d5c 0.5px solid;
}
.modal-title {
  font-size: 20px;
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
  font-weight: bold;
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
  font-size: 20px;
  color: #9fb0d6;
}
.label-icon {
  margin-left: 5px;
  position: absolute;
  left: 2px;
  top: 4px;
}
select.form-control:not([size]):not([multiple]) {
  height: auto !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
