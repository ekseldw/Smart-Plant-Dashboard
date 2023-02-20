<template>
  <div class="table-container">
    <table
      v-if="Object.keys(this.data).length !== 0"
    >
      <thead>
        <!--<th>
          {{ this.data.dateTimeColumn }}
        </th>-->
        <th
          v-for="(col, i) in data.column"
          :key="i"
        >
          {{ col.name }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(row, i) in data.data" :key="i">
          <!--<td class="datetime-td">
            {{ row.date }}
          </td>-->
          <td
            v-for="(col, j) in data.column"
            :key="j"
          >
            {{ row[col.name] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["path"],
  components: {
  },
  data() {
    return {
      data: {
        "column":[],
        "data":[],
      },
    };
  },
  methods: {
    turnoffSpiner() {
      this.$emit("turnoffSpiner");
    },
    async EditTable(blob){
      var txt = await blob.text();
      var split_line = txt.split('\n');

      // Create Columns
      var columns = split_line[0].replace('\r', '').split(',')
      columns.forEach((col)=>{
        this.data["column"].push({
          "name":col, "type":typeof(col)
        });
      })

      var datas = split_line.slice(1, 51);
      //Create Datas
      
      datas.forEach((row)=>{
        var dump = {};
        row = row.replace('\r', '').split(',');
        
        for (var i=0;i<row.length;i++){
          dump[columns[i]] = row[i]
        }
        this.data["data"].push(dump);
      })
      this.turnoffSpiner();
    },
    drawTable(){
      console.log(this.path);
      
      if (this.path == null){
        this.path = "http://data.icnslab.net/datasets/mini/catfish_with_na.csv"  
      }
      else{
        this.path = this.$store.state.baseURL +'/'+ this.path;
      }
      
      fetch(this.path)
        .then((res) => {
          this.EditTable(res);
        });
    },
  },
  created() {
    this.drawTable();
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  height: 600px;
  overflow: auto;
  border: 2px solid #545454;
}
table {
  width:100%;
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  font-size: 16px;
  border: 2px solid #545454;
  justify-content: center;
}
th {
  height: 35px;
  padding: 0 10px;
  border: 1.5px solid #545454;
  font-size: 15px;
  font-weight: 400;
  background-color: #2c2c2c;
  border-top: none;
}
th:first-child {
  border-right: none;
}
td {
  border: 1px solid #353535;
  height: 30px;
}
</style>