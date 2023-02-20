<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">센서 데이터 그래프 </div>

    <div class="table-main" style="height: fit-content">
      <div>
        <div class="table-main__header">센서 데이터 그래프</div>

        <div>
          <div class="table-main__content">
            <div class="table-main__content-intro">구역을, 및 기간을 선택해주세요</div>

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
                      @click="getPosSensor(pos.posId);
                      currPeriod = periodList[0];
                      currPos = { posName: pos.posName, posId: pos.posId };"
                    >
                      {{ pos.posName }}
                    </a>
                  </div>
                </div>
              

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
              </div>

              <div class = "table-wrapper scrollbar" style="overflow-y:auto; height: 60vh;">
                <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
                  <div  v-for="(sensor, index) in sensorList" :key=index style=" margin:10px;" >
                    <div v-bind:id= sensor.ssType.typeName  v-bind:ref= sensor.ssType.typeId>
                    
                    </div>
                     <!--div v-else  class="empty-data">
                  <div>데이터가 존재하지 않습니다.</div>
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
  name: "EsopManager",
  data() {
    return {
        currPos: { posName: "전체", posId: 0 },
        posList: [],
        sensorList: [],
        sensorLength: 0,
        dataList: [],
        ssIdList:[],
        sensorRange: [],
        rangeList: [],
        currPeriod: { periodId: 0, periodName: "기간 선택", start: new Date(), end: new Date() },
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
    
    };
  },
  components:{
      
  },
  created() {
    this.getSensorPos();
    this.setPeriod();
    this.getCurrStartEndString();
    
  },
  mounted(){ 
  
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
    getCurrStartEndString() {
      this.startDate = this.getYYYYMMDD(this.currPeriod.start);
      this.endDate = this.getYYYYMMDD(this.currPeriod.end);
      
      this.getData();
    },

    async getSensorPos() { // 구역 리스트 얻기
      try {
        const res = await axios.get(
          "/api/sensor-pos"
        );
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
          "/api/sensor-manage?posId=" + posId
        );
        this.sensorList =[];
        this.sensorList = res.data.data.content;
        this.sensorLength = this.sensorList.length;
        console.log(this.sensorList)
         
        this.getData();
      } catch (err) {
        console.log(err);
      }
    },

    async getData(){
      for(var sensor of this.sensorList){
      
              try{
                const res = await axios.post(
                  "/api/sensor-data/v2",
                  {
                    endTime:this.endDate,
                    sensorManageId:sensor.ssId,
                    sensorPositionId:this.currPos.posId,
                    startTime:this.startDate,
                  }
                );
                this.dataList=[];
                this.dataList= res.data.data;
                
                this.getGraph(sensor);
               

                
              }catch (err) {
              console.log(err);
              }
            }
        
       
    },
    async getGraph(sensor){
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
                    title: 'Date',
                  }, 
          }

          if(this.dataList.length!==0){
             const df = new DataFrame(this.dataList)
          //console.log(this.dataList);
            if(this.dataList[0].rangeType == 0){
              df.rename({"rlev1":"관심" ,"rlev2":"주의" , "rlev3":"경고" ,"rlev4":"심각" ,"inputData":"데이터"},{inplace:true})
              df.drop({columns:["typeId","typeName","posId","ssId","rangeType"], inplace: true})
              df.drop({columns:["rlev5","rlev6","rlev7","rlev8"], inplace: true})
              df.setIndex({column:"createdAt", inplace:true})
              df.drop({columns:["createdAt"],inplace:true})
              let df2 = df.loc({columns: ["심각","경고","주의","관심","데이터"]})
              df2.plot(sensor.ssType.typeName).line({layout})
            
            }
            else{
              df.rename({"rlev1":"심각1" ,"rlev2":"경고1" , "rlev3":"주의1" ,"rlev4":"관심1"},{inplace:true})
              df.rename({"rlev5":"관심2" ,"rlev6":"주의2" , "rlev7":"경고2" ,"rlev8":"심각2","inputData":"데이터"},{inplace:true})
              df.drop({columns:["typeId","typeName","posId","ssId","rangeType"], inplace: true})
              df.setIndex({column:"createdAt", inplace:true})
              df.drop({columns:["createdAt"],inplace:true})
              let df2 = df.loc({columns: ["심각2","경고2","주의2","관심2","관심1","주의1","경고1","심각1","데이터"]})
              df2.plot(sensor.ssType.typeName).line({layout})
            
            }
          }
          else{
            let empty = []
            const df = new DataFrame(empty)
            df.plot(sensor.ssType.typeName).line({layout})
          }
         
    }

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

</style>
