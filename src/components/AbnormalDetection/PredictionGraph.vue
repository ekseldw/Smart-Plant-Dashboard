<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">데이터 예측 그래프 </div>

    <div class="table-main" style="height: fit-content">
      <div>
        <div class="table-main__header">데이터 예측 그래프</div>

        <div>
          <div class="table-main__content">
            <div class="table-main__content-intro">구역을, 및 기간을 선택해주세요</div>

            <div>

                <div class="d-flex flex-wrap justify-content-between">

                  <div class="dropdown mr-auto p-2" style="margin: 10px">
                  <!-- 구역 선택 -->
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
                        @click="getPosSensor(pos.posId);
                        currPos = { posName: pos.posName, posId: pos.posId };"
                      >
                        {{ pos.posName }}
                      </a>
                    </div>
                    
                  </div>
                  <div class="p-2">
                    <div class="form-check form-switch" title="해당 변수를 예측하기 위해 활용된 모든 변수를 표시할지 결정합니다">
                        <input class="form-check-input" type="checkbox" role="switch" id="switchShowOnlyOutVariable" v-model="showOnlyTarget">
                        <label class="form-check-label" for="flexSwitchCheckDefault">결과변수만 표시</label>
                    </div>
                    <div class="form-check form-switch" title="'관심', '주의', '경고', '심각' 단계를 표시합니다">
                        <input class="form-check-input" type="checkbox" role="switchShowSensorRange" id="dg" v-model="showSensorRange">
                        <label class="form-check-label" for="dg">상태 경계값 표시</label>
                    </div>
                  </div>
              </div>

              <div class = "table-wrapper scrollbar" style="overflow-y:auto; height: 60vh;">
                <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
                  <div  v-for="(sensor, index) in sensorList" :key=index style=" margin:10px;" >
                    <div v-bind:id= sensor.ssType.typeName  v-bind:ref= sensor.ssType.typeId>
                    
                    </div>
                     <!--div v-else  class="empty-data">
                  <div>예측 값이 존재하지 않습니다.</div>
                  <div class="empty-icon"><i class="bi bi-x-circle"></i></div>
                </div-->
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { DataFrame } from "danfojs";
export default {
  name: "PredictionGraph",
  data() {
    return {
        currPos: { posName: "전체", posId: 0 },
        posList: [],
        sensorList: [],
        ssIdList:[], 
        rlevMap: {},
        showOnlyTarget: true,
        showSensorRange: false,
        dfMap: {},
        source: new EventSource('/prediction/stream')
    }
  },
  components:{
      
  },
  watch: {
    showOnlyTarget: function () {
      console.log("showOnlyTarget changed! : ", this.showOnlyTarget);
      this.showGraph()
    },
    showSensorRange: function () {
      console.log("showSensorRange changed! : ", this.showSensorRange)
      this.showGraph()
    } 
  },
  created() {
    this.getSensorPos();   
  },
  mounted(){ 
    // source = new EventSource('/prediction/stream');
    this.source.addEventListener('message', (e) => {
        console.log("new event dispatched")
        var data = JSON.parse(e.data.substring(2, e.data.length - 1));
        
        this.createGraph(data);
    });
  },
  beforeDestroy () {
    this.source.close();
  },
  methods: {
    showGraph() {
      this.sensorList.forEach(sensor => {
        if (sensor.ssId in this.dfMap){
            const layout = {
                    title:{
                      text: sensor.ssType.typeName,
                      x: 0
                    },
                    legend: {
                    bgcolor: "#fcba03",
                    bordercolor: "#444",
                    borderwidth: 1,
                    font: { family: "Arial", size: 10, color: "#fff" }
                    },
                    xaxis: {
                      title: 'Timestamp',
                    }, 
          }
          var columns = []
          if(!this.showOnlyTarget && this.showSensorRange){
            columns = this.dfMap[sensor.ssId].columns;
          }
          else if(this.showOnlyTarget && this.showSensorRange){
            columns = [sensor.ssType.typeName, '예측', '관심', '주의', '경고', '심각']
          }
          else if(this.showOnlyTarget && !this.showSensorRange){
            columns = [sensor.ssType.typeName, '예측']
          }
          else{
            columns = this.dfMap[sensor.ssId].columns.filter(legend => !(['관심', '주의', '경고', '심각'].includes(legend)))
          }
          console.log("Changed columns: ", columns)
          this.dfMap[sensor.ssId].plot(sensor.ssType.typeName).line({config: {columns: columns}, layout})
        }
      })
    },
    async getSensorPos() { // 구역 리스트 얻기
      try {
        const res = await axios.get(
          "/api/sensor-pos", {
  timeout: 5000
}
        )
        this.posList = res.data.data.content;
        this.currPos.posName = res.data.data.content[0].posName;
        this.currPos.posId = res.data.data.content[0].posId;
        this.getPosSensor(this.currPos.posId);
      } catch (err) {
        console.log(err);
      }
    },
    async getPosSensor(posId) { // 구역별 존재하는 센서
      
      try {
        
        const res = await axios.get(
          "/api/sensor-manage?posId=" + posId, {
  timeout: 5000
}
        );
        this.sensorList =[];
        this.sensorList = res.data.data.content;
        this.dfMap = {}
        this.ssIdList = this.sensorList.map(sensor => sensor.ssId) // # todo
        this.sensorList.forEach(sensor => this.getRangeInfo(sensor.ssId))
        this.sensorList.forEach(sensor => this.getLatestPrediction(sensor.ssId))
      } catch (err) {
        console.log(err);
      }
    },
    async getRangeInfo(ssId) {
            try {
            const res = await axios.get(
                "/api/sensor-range/" + ssId
            )
            const result = res.data.data;
            this.rlevMap[ssId] = {"관심": result.rlev1,"주의": result.rlev2, "경고": result.rlev3, "심각": result.rlev4}
            } catch(err) {
            console.log(err);
            }
        },
    async getLatestPrediction(ssId) {  // 가장 최신 예측(서버 캐시) 조회
      axios.get(
          "/prediction/" + ssId + "/latest", {
  timeout: 5000
}
      )
      .then(res => {
        this.createGraph(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getSensorById(id){
        var sensor = this.sensorList.find(sensor => sensor.ssId == parseInt(id))
        return sensor
    },
    createGraph(data) {
        var sensor = this.getSensorById(data.y_hat.variables[0].id)
          var obj_data = {}

          //x
          var extensions = Array(data.y_hat.timestamps.length).fill(null)
          for (var x of data.x.variables){
            var x_sensor = this.getSensorById(x.id)
            obj_data[x_sensor.ssType.typeName] = x.values.concat(extensions)
          }
          // y
          var  y_extensions = Array(data.x.timestamps.length).fill(null)
          obj_data["예측"] = y_extensions.concat(data.y_hat.variables[0].values)
          obj_data["예측"][data.x.variables[0].values.length - 1] = obj_data[sensor.ssType.typeName][data.x.variables[0].values.length - 1]
          // timestamps
          obj_data['timestamp'] = data.x.timestamps.concat(data.y_hat.timestamps)
          obj_data['timestamp'] = obj_data['timestamp'].map(timestamp => new Date(new Date(timestamp).toLocaleString('en-US', {timeZone: 'UTC'})));
          obj_data["관심"] = Array(obj_data["timestamp"].length).fill(this.rlevMap[parseInt(sensor.ssId)]["관심"]);
          obj_data["주의"] = Array(obj_data["timestamp"].length).fill(this.rlevMap[parseInt(sensor.ssId)]["주의"]);
          obj_data["경고"] = Array(obj_data["timestamp"].length).fill(this.rlevMap[parseInt(sensor.ssId)]["경고"]);
          obj_data["심각"] = Array(obj_data["timestamp"].length).fill(this.rlevMap[parseInt(sensor.ssId)]["심각"]);
          
          var df = new DataFrame(obj_data)
          df.setIndex({column:"timestamp", inplace:true})
          df.drop({columns:["timestamp"],inplace:true})
          this.dfMap[sensor.ssId] = df
          this.showGraph();
    },
  }
}

</script>

<style>

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

.form-check {
  margin-bottom: 0;
}

.form-check-label{
  padding-left: 0;
}
</style>

