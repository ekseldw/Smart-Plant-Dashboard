<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">센서 데이터 기록 </div>

    <div class="table-main" style="height: fit-content">
      <div>
        <div class="table-main__header">센서 데이터 기록</div>

        <div>
          <div class="table-main__content">
            <div class="table-main__content-intro">구역, 센서 종류 및 기간을 선택해주세요</div>

            <div>

              <div class="filters-wrapper">
              <!-- 구역 선택 -->
              <div class="dropdown" style="margin: 10px">
                <button
                  class="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  color="#000080"
                >
                  {{ currPos.posName }}
                </button>
                <div class="dropdown-menu">
                  <a
                    v-for="pos in posList"
                    :key="pos.posId"
                    class="dropdown-item"
                    @click="
                      currSsType = { ssTypeName: '모든 센서', ssTypeId: 0, ssId:0 };
                      getData();
                      getPosSensor(pos.posId);
                      
                      currPos = { posName: pos.posName, posId: pos.posId };
                    "
                  >
                    {{ pos.posName }}
                  </a>
                </div>
              </div>      

              <!-- 센서 종류 선택 -->
              
              <div class="dropdown" style="margin: 10px">
                <button
                  class="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  color="#000080"
                >
                  {{ currSsType.ssTypeName }}
                </button>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item"
                    @click="
                      currSsType = { ssTypeName: '모든 센서', ssTypeId: 0, ssId:0 };
                      getData();
                    "
                    >모든 센서</a
                  >
                  <!-- 전체 구역인 경우 -->
                  <!--div v-if= "currPos.posId===0">
                    <a
                      v-for="ssType in sensorList"
                      :key="ssType.typeId"
                      class="dropdown-item"
                      @click="
                        currSsType = { ssTypeName: ssType.typeName, ssTypeId: ssType.typeId };
                        getDataLog;
                      "
                    >
                      {{ ssType.typeName }}
                    </a>
                  </div-->
                  <!-- 전체 구역이 아닌 경우 -->
                  <div>
                    <a
                      v-for="ssType in sensorList"
                      :key="ssType.ssType.typeId"
                      class="dropdown-item"
                      @click="
                        currSsType = { ssTypeName: ssType.ssType.typeName, ssTypeId: ssType.ssType.typeId, ssId: ssType.ssId };
                        getData();
                      "
                    >
                      {{ ssType.ssType.typeName }}
                    </a>
                  </div>
                </div>
              </div>

              <div class="period-filter-wrapper">
              <!-- 기간 선택 -->
              <div class="dropdown" style="margin: 10px">
                <button
                  class="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  color="#000080"
                >
                  {{ currPeriod.periodName }}
                </button>
                <div class="dropdown-menu">
                  <a
                    v-for="period in periodList"
                    :key="period.periodId"
                    class="dropdown-item"
                    @click="
                      currPeriod = period;
                      getCurrStartEndString();
                      
                    "
                  >
                    {{ period.periodName }}
                  </a>
                </div>
              </div>
              
                <!-- 사용자 지정 기간 -->
                <div class="user-period-wrapper">
                  <div class="use-period">
                    <div>시작</div>
                    <input
                    type="date"
                    v-model="startDate.date"
                    :disabled="currPeriod.periodId !== 7"
                    />
                    <!--input 
                    type="time"
                    v-model="startDate.time"
                    :disabled="currPeriod.periodId !== 7"
                    -->
                  </div>
                  <div class="use-period">
                    <div>끝</div>
                    <input
                    type="date" 
                    v-model="endDate.date"
                    :disabled="currPeriod.periodId !== 7"
                    />
                    <!--input
                    type="time" 
                    v-model="endDate.time"
                    :disabled="currPeriod.periodId !== 7"
                    -->
                  </div>
                </div>

                <button
                class="btn btn-secondary"
                style="margin-left: 1rem;"
                :disabled="currPeriod.periodId !== 7"
                @click="
                getStartEndDate();
                filterTypePeriod()
                "
                >
                  조회하기
                </button>
              </div>
              </div>
                <div v-if="sensorDataLogList.length===0" class="empty-data">
                  <div>데이터가 존재하지 않습니다.</div>
                  <div class="empty-icon"><i class="bi bi-x-circle"></i></div>
                </div>
                <div v-else class="scrollbar" style="overflow-y:auto; height:60vh;">
                <table
                  class="table table-bordered table-hover"
                  style="width: 95%; height:70px;"
                >
                  <thead>
                    <tr>
                      <th>날짜</th>
                      <th>시간</th>
                      <th>위치</th>
                      <th>종류</th>
                      <th>데이터 값</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(sensorData,i) in sensorDataLogList" in :key="i">
                      <td>
                        {{ sensorData.createdAt.split('T')[0].substring(0,10) }}
                        <!-- substring(5) -->
                      </td>
                      <td>
                        {{ sensorData.createdAt.split('T')[0].substring(10,19)}}
                        <!-- substring(0, 5) -->
                      </td>
                      <td>{{ currPos.posName }}</td>
                      <td>
                        {{ sensorData.typeName }}
                      </td>
                      <td>{{ sensorData.inputData }}</td>
                      <td
                        :style="{
                          color: statusList[sensorData.sensorState].color,
                        }"
                      >
                        {{ statusList[sensorData.sensorState].name }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li>다음</li>
        </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EsopManager",
  data() {
    return {
      currPos: { posName: "전체", posId: 0 },
      // currSsType: { ssTypeName: "센서 종류 선택", ssTypeId: 0 , ssId:0 },
      currSsType: { ssTypeName: "모든 센서", ssTypeId: 0, ssId: 0 },
      currPeriod: { periodId: 0, periodName: "기간 선택", start: new Date(), end: new Date() },
      posList: [],
      sensorList: [],
      posSensorDataLogList: [],
      sensorDataLogList: [],
      startDate: "",
      endDate: "", 
      periodList: [
          { periodId: 0, periodName: "오늘" },
          { periodId: 1, periodName: "어제" },
          { periodId: 2, periodName: "최근 7일" },
          { periodId: 3, periodName: "최근 30일" },
          { periodId: 4, periodName: "이번달" },
          { periodId: 5, periodName: "지난달" },
          { periodId: 6, periodName: "모든 기간" },
          
        ],
      statusList: [
        { status: 0, name: "안전", color: "#5a8dee" },
        { status: 1, name: "관심", color: "#39da8a" },
        { status: 2, name: "주의", color: "#fdce41" },
        { status: 3, name: "경고", color: "#fdac41" },
        { status: 4, name: "심각", color: "#ff5b5c" },
      ],
      totalPages: [],
      blockscale : 10,
      currPage :1,
    };
  },
  created() {
    //this.clearSensorData();
    this.setPeriod();
    this.getSensorPos();
    this.getCurrStartEndString();
    
    //this.getAllSensor();
  },
  methods: {
    getYYYYMMDD(d) { // date를 string으로
      return new Date(d.getTime()-(d.getTimezoneOffset()*60*1000)).toISOString().split('T')[0];
    },

    getTime(d) { // time을 string으로
      return new Date(d.getTime()-(d.getTimezoneOffset()*60*1000)).toISOString().split('T')[1].substr(0, 5);
    },

        setPeriod() { // 오늘을 기준으로 기간의 start와 end를 정함
      var today = new Date();
      var t_year = today.getFullYear();
      var t_month = today.getMonth();
      var t_date = today.getDate();

      for (var period of this.periodList) {
        var start = new Date();
        var end = new Date();
        start.setHours(0, 0, 0, 0);

        switch (period.periodId) {
        case 0: // 오늘
          break;
        case 1: // 어제
          start.setDate(t_date - 1);
          end = new Date(t_year, t_month, t_date - 1, 23, 59);
          break;
        case 2: // 최근 7일
          start.setDate(t_date - 7);
          break;
        case 3: // 최근 30일
          start.setDate(t_date - 30);
          break;
        case 4: // 이번달
          start = new Date(t_year, t_month, 1);
          break;
        case 5: // 저번달
          start = new Date(t_year, t_month - 1, 1);
          end = new Date(t_year, t_month, 0, 23, 59);
          break;
        case 6:
          start="2000-01-01";
          end ="2300-12-31";
          break
        }
        period.start = new Date(start);
        period.end = new Date(end);
       
        
      }
    },
    async getSensorPos() { // 구역 리스트 얻기
      try {
        const res = await axios.get(
          "/api/sensor-pos"
        );
        this.posList = res.data.data.content;
        this.currPos.posName = res.data.data.content[0].posName;
        this.currPos.posId = res.data.data.content[0].posId;
        this.getSensor();
        
      } catch (err) {
        console.log(err);
      }
    },

    /*
    async getAllSensor() { // 존재하는 모든 센서 종류
      try {
        const res = await axios.get(
          "/api/sensor-type"
        );
        this.sensorList = res.data.data.content;
      } catch (err) {
        console.log(err)
      }
    },
    */
    async getSensor() { // 구역별 존재하는 센서
      try {
        const res = await axios.get(
          "/api/sensor-manage?posId=" + this.currPos.posId
        );
        this.sensorList =[]
        this.sensorList = res.data.data.content;
        
      } catch (err) {
        console.log(err);
      }
    },
    async getPosSensor(posId) { // 구역별 존재하는 센서
      try {
        const res = await axios.get(
          "/api/sensor-manage?posId=" + posId
        );
        this.sensorList =[]
        this.sensorList = res.data.data.content;
        
      } catch (err) {
        console.log(err);
      }
    },

    async getData(){
      if(this.currSsType.ssId==0){
        this.getPosDataLog();
      }
      else if(this.currSsType.ssId !==0){
        this.getSensorDataLog();
      }
    },
    
    
    async getPosDataLog() {
      try {

        const res = await axios.post(
          "/api/sensor-data/v3",
          {
            endTime:this.endDate,
            sensorManageId:0,
            sensorPositionId:this.currPos.posId,
            startTime:this.startDate,
          }
        );
        this.sensorDataLogList=[];
        this.sensorDataLogList = res.data.data;
      
      } catch (err) {
        console.log(err);
      }
    },
     async getSensorDataLog() {
      try {

        const res = await axios.post(
          "/api/sensor-data/v2",
          {
            endTime:this.endDate,
            sensorManageId:this.currSsType.ssId,
            sensorPositionId:this.currPos.posId,
            startTime:this.startDate,
          }
        );
        this.sensorDataLogList=[];
        this.sensorDataLogList = res.data.data;

        //this.posSensorDataLogList = templist;
        //this.currSsType = { ssTypeName: "모든 센서", ssTypeId: 0 } // 센서 종류 필터링 초기화
        //this.filterTypePeriod(); // 센서 종류 및 기간 필터링
      } catch (err) {
        console.log(err);
      }
    },
    /*
      async getSensorDataLog(posId=1) {
      try {
        this.posSensorDataLogList=[];
        const res = await axios.get(
          "/api/sensor-data?posId=" + posId 
        );
        this.getPosSensor(); // 해당 구역의 센서를 받아옴
        this.posSensorDataLogList=[];
        this.posSensorDataLogList = res.data.data;
        console.log(this.posSensorDataLogList,"!!!!")
      
        this.totalPages = res.data.data.totalPages;
        //this.posSensorDataLogList = templist;
        this.currSsType = { ssTypeName: "모든 센서", ssTypeId: 0 } // 센서 종류 필터링 초기화
        this.filterTypePeriod(); // 센서 종류 및 기간 필터링
      } catch (err) {
        console.log(err);
      }
    },
    */
    async clearSensorData() {
      try {
        await axios.delete("/api/sensor-data/clear");
      } catch (err) {
        console.log(err);
      }
    },

    // 센서 타입, 기간 필터링 기능
    filterTypePeriod() {
      var currPeriodId = this.currPeriod.periodId;
      var currTypeId = this.currSsType.ssTypeId;

      console.log(this.currSsType.ssTypeId);
      console.log(this.posSensorDataLogList[0]);

      // 전체 기간을 조회하는 경우
      if (currPeriodId === 0) {
        // 모든 센서를 조회하려는 경우
        if (currTypeId === 0) {
          this.sensorDataLogList = this.posSensorDataLogList;
        } else { // 특정 센서를 조회하려는 경우
          this.sensorDataLogList = this.posSensorDataLogList.filter(function(alarmLog) {
            //alert(alarmLog.sensorManage.ssType.typeId);
            return (alarmLog.sensorManage.ssId === currTypeId)
          })
        }
      }

      // 특정 기간을 조회하려는 경우
      else {
        var startDate = this.currPeriod.start;
        var endDate = this.currPeriod.end;

        this.sensorDataLogList = this.posSensorDataLogList.filter(function(alarmLog) {
          var logDate = new Date(alarmLog.createdAt);
          if (currTypeId === 0) { // 모든 센서를 조회하려는 경우
            return (startDate <= logDate && logDate <= endDate)
          } else { // 특정 센서를 조회하려는 경우
            return (alarmLog.sensorManage.ssId === currTypeId) && (startDate <= logDate && logDate <= endDate)
          }
        })
      }
    },


     getCurrStartEndString() {
      this.startDate = this.getYYYYMMDD(this.currPeriod.start);
      this.endDate = this.getYYYYMMDD(this.currPeriod.end);
      
      this.getData();
    },

  },
};
</script>

<style scoped>

.table-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: auto;
  height: 600px;
}

.filters-wrapper {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}

.period-filter-wrapper {
  display: flex;
  margin-left: auto;
}

.user-period-wrapper {
  display: flex;
  flex-direction: row;
}

.use-period {
  margin: 0px 10px;
}

.empty-data {
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  font-size: 30px;
  text-align: center;
}

.empty-icon {
  font-size: 60px;
  margin-top: 20px;
}

.alarm-log-header {
  background-color: #00000020;
}

</style>
