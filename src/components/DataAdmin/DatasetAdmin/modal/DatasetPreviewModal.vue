<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">데이터셋 열람</div>
          <div class="description">
            상위 20행의 데이터를 열람할 수 있습니다.
          </div>
        </div>
        <div class="modal-body">
          <div class="name">{{ dataset.name }}</div>
          <Spinner v-if="isLoading" class="spinner" />
          <div class="preview-table-container">
          <DatasetDrawTable
            v-if="!isLoading"
            @turnoffSpiner="turnoffSpiner"
            :path="path"
          />
        </div>
        </div>
        <div class="modal-footer">
          <button class="close-btn" @click="close">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/DataAdmin/common/Spinner";
import DatasetDrawTable from "@/components/DataAdmin/common/DatasetDrawTable";


import { mapActions } from "vuex";
export default {
  props: ["dataset"],
  components: {
    Spinner,
    DatasetDrawTable,
  },
  data() {
    return {
      isLoading: true,
      path:"",
    };
  },
  methods: {
    ...mapActions("dataset", ["CREATE_PREVIEW_DATA", "PREVIEW_DATA"]),
    close() {
      this.$emit("close");
    },
    getData() {
      this.PREVIEW_DATA({
        preDatasetId: this.dataset.preDatasetId,
      })
      .then((res) => {
        this.path = res.data.miniDatasetPath;
        this.isLoading=false;
      });
    },
    turnoffSpiner(){
      this.isLoading = false;
    }, 
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 800px;
  margin: 0px auto;
  color: #e8e8e8;
  background-color: #252525;
  border-radius: 7px;
  position: relative;
}

.modal-header {
  background-color: #2c2c2c;
  border-radius: 10px 10px 0 0;
  padding: 15px;
  border-bottom: 0.2px #969696 solid;
  font-size: 18px;
}

.description {
  font-size: 15px;
  color: #e8e8e8c2;
  font-weight: 300;
}

.modal-body {
  padding: 15px 20px;
}
.name {
  font-size: 17px;
  padding-left: 10px;
  padding-bottom: 10px;
  color: #3f8ae2;
}
.preview-table-container {
  display: flex;
  justify-content: center;
  height: 230px;
}

.modal-footer {
  display: flex;
  justify-content: right;
  align-items: center;
  position: absolute;
  padding: 0px 20px;
  bottom: 0px;
  right: 0px;
  width: 100%;
  border-top: 0.2px #969696 solid;
  box-sizing: border-box;
  height: 50px;
}

.modal-footer button {
  width: 60px;
  height: 30px;
  font-size: 17px;
  margin: 0 5px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  cursor: pointer;
  transition: all 0.5s;
}

.delete-btn {
  background-color: #3f8ae2;
}
.delete-btn:hover {
  background-color: #2f6cb1;
}

.close-btn {
  background-color: #373737;
}
.close-btn:hover {
  background-color: #464646;
}
.spinner {
  margin-top: 20px;
}
</style>
