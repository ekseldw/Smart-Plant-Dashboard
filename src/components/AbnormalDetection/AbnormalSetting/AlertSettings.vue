<template>
  <div>
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />

    <div class="wrapper">
      <div class="table-header">이상 경고 설정</div>

      <div class="table-main">
        <div style="width:100%; height:155px;">
          <div style="float:left;"> 
          <div class="table-main__header">이상 경고 설정</div>
            <div class="table-main__content">
              <div class="table-main__content-intro">
                {{ posName }} 구역의 센서 이상 경고 설정
              </div>

              <div class="dropdown" style="margin: 10px">
                <button
                  class="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  color="#000080"
                >
                  {{ posName }}
                </button>
                <div class="dropdown-menu">
                  <a
                    v-for="pos in ssPosList"
                    :key="pos.posId"
                    class="dropdown-item"
                    @click="selectedPos(pos.posId, pos.posName)"
                  >
                    {{ pos.posName }}
                  </a>
                </div>
              </div>
            </div>
          </div>
            <div style="float:right;">
              <img src="@/assets/image/range.png" style="width:200px">   
            </div>
        </div>
            
              <div
                class="scrollbar"
                style=" overflow-y:auto; height: 60vh; display: flex; justify-content: center; margin: 20px 0px ;"
              >
                <table
                  class="table table-bordered table-hover"
                  style="width: 95%; height:70px; "
                >
                  <thead>
                    <tr>
                      <th style="width: 200px">식별번호</th>
                      <th style="width: 150px">센싱 장비 종류</th>
                      <th>
                        <div
                          style="display: flex; justify-content: space-around"
                        >
                        </div>
                      </th>
                      <th style="width:150px;">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="sensor in ssRangeList" :key="sensor.ssId">
                      <td>{{ sensor.ssCode }}</td>
                      <td>{{ sensor.sensorTypeName }}</td>
                      <td v-if="sensor.rangeType==0">
                        <div class="range" >
                          <span
                            v-for="(block, j) in infoList1"
                            :key="j"
                            class="range-elem1"
                            :style="{backgroundColor: block.color }"
                          >
                           {{ block.status }}
                          </span>
                        </div>
                        <div class="range-text-box1">
                          <span
                            v-for="(value, k) in sensor.range"
                            :key="k"
                            class="range-text"
                            >{{ value }}
                          </span>
                        </div>
                      </td>
                      <td v-else>
                        <div class="range">
                          <span
                            v-for="(block, j) in infoList2"
                            :key="j"
                            class="range-elem2"
                            :style="{ backgroundColor: block.color }"
                          >
                            <!--{{ block.status }}-->
                          </span>
                        </div>
                        <div class="range-text-box2">
                          <span
                            v-for="(value, k) in sensor.range"
                            :key="k"
                            class="range-text"
                            >{{ value }}
                          </span>
                        </div>
                      </td>
                      <td
                        style="
                          vertical-align: middle;
                          padding-right: 0px;
                          padding-left: 0px;
                          text-align: center;
                        "
                      >
                        <a
                          class="btn btn-outline-primary mod-btn"
                          @click="
                            readyToEdit(
                              sensor.range,
                              sensor.ssId,
                              sensor.sensorTypeName,
                              sensor.rangeType,
                            )
                          "
                          ><i class="bx bx-edit"></i> 수정
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
        </div>
      
    </div>
    <SettingModal
      v-if="show"
      @close="show = false"
      @edit-range="editRange"
      :range="range"
      :ssId="ssId"
      :sensorTypeName="sensorTypeName"
      :rangeType ="rangeType"
    ></SettingModal>
  </div>
</template>


<script>
import axios from "axios";
// import { Icon } from "@iconify/vue";
import SettingModal from "@/components/AbnormalDetection/AbnormalSetting/SettingModal";

export default {
  name: "AlertSettings",
  data() {
    return {
      range: [],
      ssId: 0,
      posId: 0,
      posName: "",
      sensorTypeName: "",
      rangeType:0,
      infoList1: [
       
        { color: "#5a8dee", status: "안전", textcolor: '#FFFFFF' },
        { color: "#39da8a", status: "관심", textcolor: '#FFFFFF' },
        { color: "#fdce41", status: "주의", textcolor: '#FFFFFF' },
        { color: "#fdac41", status: "경고", textcolor: '#FFFFFF' },
        { color: "#ff5b5c", status: "심각", textcolor: '#FFFFFF' },
      ],
      infoList2: [
        { color: "#ff5b5c", status: "심각", textcolor: '#FFFFFF' },
        { color: "#fdac41", status: "경고", textcolor: '#FFFFFF' },
        { color: "#39da8a", status: "주의", textcolor: '#FFFFFF' },
        { color: "#00cfdd", status: "관심", textcolor: '#FFFFFF' },
        { color: "#5a8dee", status: "안전", textcolor: '#FFFFFF' },
        { color: "#00cfdd", status: "관심", textcolor: '#FFFFFF' },
        { color: "#39da8a", status: "주의", textcolor: '#FFFFFF' },
        { color: "#fdac41", status: "경고", textcolor: '#FFFFFF' },
        { color: "#ff5b5c", status: "심각", textcolor: '#FFFFFF' }
      ],
      show: false,
      ssRangeList: [],
      ssPosList: [],
    };
  },
  components: {
    SettingModal,
    
  },
  mounted() {
    this.getPosInfo();
    this.getRangeInfo();
  },
  methods: {
    selectedPos(posId, posName) {
      this.getRangeInfo(posId);
      this.posName = posName;
    },
    readyToEdit(range, ssId, sensorTypeName, rangeType) {
      this.range = range;
      this.ssId = ssId;
      this.sensorTypeName = sensorTypeName;
      this.show = true;
      this.rangeType = rangeType;
    },
    showEdit(sensor) {
      this.sensor = sensor;
      this.show = true;
    },

    async getPosInfo() {
      try {
        const res = await axios.get(
          "/api/sensor-pos?pageSize=1&paged=true&sort.sorted=true&sort.unsorted=false&unpaged=true"
        );
        this.ssPosList = res.data.data.content;
        this.posName=this.ssPosList[0].posName;
        
      } catch (err) {
        console.log(err);
      }
    },
    async getRangeInfo(posId = 1) {
      this.ssRangeList = [];
      try {
        const res = await axios.get(
          "/api/sensor-range?posId=" +
            posId 

        ); 
         
        for (var item of res.data.data.content) {
          var temp = {};
          temp.ssId = item.ssId;
          temp.sensorTypeName = item.sensorTypeName;
          temp.sensorPosId = item.sensorPosId;
          temp.ssCode = item.ssCode;
          temp.range = [];
          temp.rangeType =item.rangeType;
          if(temp.rangeType==0){
            temp.range.push(item.rlev1);
            temp.range.push(item.rlev2);
            temp.range.push(item.rlev3);
            temp.range.push(item.rlev4);
          }
          else{
            temp.range.push(item.rlev1);
            temp.range.push(item.rlev2);
            temp.range.push(item.rlev3);
            temp.range.push(item.rlev4);
            temp.range.push(item.rlev5);
            temp.range.push(item.rlev6);
            temp.range.push(item.rlev7);
            temp.range.push(item.rlev8);

          }
          this.ssRangeList.push(temp);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async editRange(newSensor) {
      console.log(newSensor);
      try {
        const res = await axios.put(
          "/api/sensor-range/" + newSensor.ssId,
          {
            rangeType: newSensor.rangeType,
            rlev1: newSensor.range[0],
            rlev2: newSensor.range[1],
            rlev3: newSensor.range[2],
            rlev4: newSensor.range[3],
            rlev5: newSensor.range[4],
            rlev6: newSensor.range[5],
            rlev7: newSensor.range[6],
            rlev8: newSensor.range[7],
          }
           
        );
        this.show = false;
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scpoe>
.range {
  width: 100%;
  height: 10px;
  background-color: aqua;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
}

.range-elem1 {
  width: 20%;
  height: 20px;
  color: white;
}
.range-elem2 {
  width: 12%;
  height: 20px;
  font-size: 15px;
  font-weight: bold;
  color: black;
}

.range-text-box1 {
  margin-left: 20%;
  margin-right: 20%;
  display:flex;
  justify-content: space-between;
 
}

.range-text-box2 {
  margin-left:11%;
  margin-right:11%;
  display:flex;
  justify-content: space-between;
  font-size: 15px;
}

.range-text {
  color: white;
  font-size: 15px;
  font-weight: bold;
}

.wrapper {
  margin: 10px;
}

.table-main__header{
  width:300px ;
}
.table-header {
  color: #727e8c;
  font-size: 20px;
}
.table {
  color: #464d5c;
}

.table-main__content {
  margin: 0 20px;
  color: #8a99b5;
}
.table-main__content-intro {
  color: #8a99b5;
  width:300px;
}
table {
  text-align: center;
}
.table.table-bordered th {
  border: 2px solid #464d5c;
  color: #bdd1f8;
  font-size: 15px;
}
tbody td,
.table tbody th {
  border-color: #464d5c;
  color: #8a99b5;
  font-size: 20px;
  font-weight: bold;
}
thead > tr,
tfoot > tr {
  height: 60px;
  vertical-align: middle;
}
.mod-btn {
  margin-right: 5px;
}
.btn-outline-danger,
.mod-btn {
  color: white;
}
.bx {
  color: #7c8ba6;
}
.table-hover:hover tbody tr:hover td {
  color: white;
  background-color: #244a63;
}
nav {
  border: none;
}
.btn-primary {
  background-color: #5a8dee !important;
  font-weight: 600;
  border: #5a8dee 1px solid;
}
.page-link {
  border: #7c8ba6 2px solid;
  color: #7c8ba6;
  background-color: #1a233a;
}
.cur-page {
  background-color: #5a8ded;
  color: white;
}
</style>
