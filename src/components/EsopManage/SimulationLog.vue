<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">임무 수행 기록 </div>

    <div class="table-main" style="height: fit-content">
      <div>
        <div class="table-main__header">임무 수행 기록</div>

        <div>
          <div class="table-main__content">
            <div class="table-main__content-intro">상황, 레벨 및 기간을 선택해주세요</div>
            <div class="filters-wrapper">

              <div class="dropdown" style="margin: 10px">
                <button
                  class="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  color="#000080"
                >
                  {{ currSituation.situationName }}
                </button>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item"
                    @click="getSituationLog();
                    currSituation={ situationName:'전체 상황', situationId:0 }">
                  전체 상황
                  </a>
                  <a
                    v-for="situation in situationList"
                    :key="situation.id"
                    class="dropdown-item"
                    @click="getSituationLog();
                    currSituation = { situationName:situation.name, situationId:situation.id };"
                 >
                  {{ situation.name }}
                  </a>
                </div>
              </div>

              <div class="dropdown" style="margin: 10px">
                <button
                  class="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  color="#000080"
                >
                  {{ currLevel.levelName }}
                </button>
                <div class="dropdown-menu">
                  <a
                    v-for="(level,i) in levelList"
                    :key="(i+1)"
                    class="dropdown-item"
                    @click="getSituationLog();
                    currLevel = { levelName:level, levelId:(i) };"
                 >
                  {{ level }}
                  </a>
                </div>
              </div>    

            </div>
          </div>
        </div>
        <div v-if="checkLogList.length===0" class="empty-data">
                  <div>데이터가 존재하지 않습니다.</div>
                  <div class="empty-icon"><i class="bi bi-x-circle"></i></div>
                </div>
        <div v-else class="scrollbar" style="width: 100%; display: flex; justify-content: center; overflow-y:auto; height:60vh;">
        <table class="table table-bordered table-hover" style="width: 95%; height:70px;">
          <thead>
            <tr>
              <th>내용</th>
              <th>관리자</th>
              <th>상황</th>
              <th>레벨</th>
              <th>체크 날짜</th>
              <th>체크 시간</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="checkLog in checkLogList" in :key="checkLog.id">
            <td>{{ checkLog.text }}</td>
            <td>{{ checkLog.user }}</td>
            <td>{{ checkLog.situation }}</td>
            <td>{{ levelList[checkLog.level] }}</td>
            <td>{{ checkLog.createdAt.split('T')[0].substring() }}</td>
            <td>{{ checkLog.createdAt.split('T')[1].substring(0,8) }}</td>
          </tr>
          </tbody>
        </table>
        </div>

      </div>
    </div> 
    <nav aria-label="Page navigation example" style="float: right">
          <ul class="pagination">
             <li v-if="button==0" class="page-item disabled">
              <a class="page-link previous">Previous</a>
            </li>
            <li v-else class="page-item">
              <a class="page-link" @click="button += -1">Previous</a>
            </li>
            <li
              v-for="i in pageList[button]"
              :key="i"
              @click="getSituationLog(i - 1)"
              class="page-item"
            >
              <span class="page-link" autocomplete="off">{{ i }}</span>
            </li>
            <li v-if="button==(LastPage-1)" class="page-item disabled">
              <a class="page-link">Next</a>
            </li>
            <li v-else class="page-item">
              <a class="page-link" @click="button +=1">Next</a>
            </li>
          </ul>
        </nav>
  </div>
</template>

<script>

import axios from "axios";

export default{
  name: "CheckLog",
  data() {
    return {
      // currSituation: { situationName: "상황", situationId:0 },
      currSituation: { situationName: "전체 상황", situationId:0 },
      situationList: [],
      situationLogList: [],
      levelList: [ "전체 단계","관심", "주의", "경고", "심각" ],
      // currLevel: { levelName:"단계", levelId:0 },
      currLevel: { levelName:"전체 단계", levelId:0 },
      checkLogList:[],
      totalPages: [],
      pageList: [],
      button :0,
      LastPage:0,

    }
  },
  created(){
    this.getSituationList();
    this.getSituationLog();
    //this.getCheckLog();
  },
  methods:{
    async getSituationList(){
      try{
        const res = await axios.get(
          "/api/situation"
        );
        this.situationList = res.data.data;
      } catch (err){
        console.log(err);
      }
    },
    async getSituationLog(page = 0){
      try{
        const res = await axios.get(
          "api/e-sop/check-log?page="+page+"&size=30&sort=createdAt,DESC"
        )
        const templist = res.data.data.content;
        this.totalPages = res.data.data.totalPages;
        
      
        if(this.currSituation.situationId == 0 && this.currLevel.levelId ==0){
          this.checkLogList =[];
          for(var lst of templist){
            this.checkLogList.push(lst);
            this.setPage();    
          }
          //this.checkLogList = templist;
          
        }
        else if (this.currSituation.situationId !== 0 && this.currLevel.levelId ==0){
          this.checkLogList =[];
          for(var list of templist){
            if(list.situation == this.currSituation.situationName){
              this.checkLogList.unshift(list);
            }
          }
          this.filterPage();
        }
        else if (this.currSituation.situationId == 0 && this.currLevel.levelId !==0){
          this.checkLogList =[];
          for(var slist of templist){
            if(slist.level == this.currLevel.levelId) {
               this.checkLogList.unshift(slist);
            }
          }
        }
        else if (this.currSituation.situationId !== 0 && this.currLevel.levelId !==0){
          this.checkLogList =[];
          for(var tlist of templist){
            if(tlist.level == this.currLevel.levelId && tlist.situation ==this.currSituation.situationName){
               this.checkLogList.unshift(tlist);
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    async setPage(){
      var page = [];
      var result = [];
      for(var i=0; i< this.totalPages; i++){
        page.push(i+1)
      }
      for(var n=0; n<this.totalPages; n+= 5){
        result.push(page.slice(n,n+5))
      }
      this.pageList = result
      this.LastPage = result.length
    
    },
    async filterPage(){
      // var pagenum = this.checkLogList.length/30
      // alert(pagenum)
    }
  }
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
