<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">전처리 데이터 리스트</div>
          <div class="description">
            원본 데이터셋에서 파생된 전처리 데이터 리스트를 확인할 수 있습니다.
          </div>
        </div>
        <div class="modal-body">
          <Spinner v-if="isLoading" class="spinner" />
          <div
            class="table-container"
            v-if="!isLoading"
          >
            <table>
              <thead>
                <th>데이터셋</th>
                <th>Action</th>
              </thead>
              <tbody>
                <template v-for="dataset in Predatasets" >
                  <tr
                      :key="dataset.id"
                      v-if="dataset.datasetType < 2"
                  >
                    <td class="name">{{ dataset.name }}</td>
                    <td class="action">
                      <button
                        class="show-btn"
                        @click="openDatasetPreviewModal(dataset)"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-table"
                        />전처리 데이터 확인
                      </button>
                      <!--<button
                        class="add-data-btn"
                        @click="openDatasetAddDataModal(dataset)"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-plus"
                        />데이터 추가
                      </button>-->
                      <button
                        class="edit-btn"
                        @click="openPreDatasetUpdateModal(dataset)"
                      >
                        <font-awesome-icon icon="fa-solid fa-pen" />
                        수정
                      </button>
                      <button
                        class="delete-btn"
                        @click="openPreDatasetDeleteModal(dataset)"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-trash-can"
                        />삭제
                      </button>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button class="close-btn" @click="close">
            닫기
          </button>
        </div>
      </div>
    </div>
    <PreDatasetUpdateModal
      v-if="showPreDatasetUpdateModal"
      @close="closePreDatasetUpdateModal"
      :dataset="SelectedDataset"
      :userId="userId"
    />
    <DatasetDeleteModal
      v-if="showPreDatasetDeleteModal"
      @close="closePreDatasetDeleteModal"
      :dataset="SelectedDataset"
    />
    <DatasetPreviewModal
      v-if="showDatasetPreviewModal"
      @close="closeDatasetPreviewModal"
      :dataset="SelectedDataset"
    />
  </div>
</template>

<script>
//import Spinner from "@/components/common/Spinner";
import DatasetDeleteModal from "@/components/DataAdmin/DatasetAdmin/modal/DatasetDeleteModal";
import PreDatasetUpdateModal from "@/components/DataAdmin/DatasetAdmin/modal/PreDatasetUpdateModal";
import DatasetPreviewModal from "@/components/DataAdmin/DatasetAdmin/modal/DatasetPreviewModal";

import { mapActions } from "vuex";
export default {
  props: ["dataset"],
  components: {
    //Spinner,
    DatasetDeleteModal,
    PreDatasetUpdateModal,
    DatasetPreviewModal,
  },
  data() {
    return {
      isLoading: true,
      Predatasets: [],
      showPreDatasetUpdateModal: false,
      showPreDatasetDeleteModal: false,
      showDatasetPreviewModal: false,
      SelectedDataset: [],
    };
  },
  methods: {
    ...mapActions("dataset", ["FETCH_PREDATASETS", "FETCH_DATASETS"]),
    close() {
      this.$emit("close");
    },
    getData() {
      this.FETCH_PREDATASETS({
        originDatasetId: this.dataset.originDatasetId,
      }).then((res) => {
        if(res.data.length <= 0){this.close();}
        this.isLoading = false;
        this.Predatasets = res.data.slice(1, );
        this.Predatasets.push(res.data[0]);
        console.log(this.Predatasets);
        this.Predatasets[this.Predatasets.length-1].name += "(Original)";
      });
    },
    openPreDatasetUpdateModal(dataset) {
      this.SelectedDataset = dataset;
      this.showPreDatasetUpdateModal = true;
    },
    closePreDatasetUpdateModal() {
      this.showPreDatasetUpdateModal = false;
      this.getData();
    },
    openPreDatasetDeleteModal(dataset) {
      this.SelectedDataset = dataset;
      this.showPreDatasetDeleteModal = true;
    },
    closePreDatasetDeleteModal() {
      this.getData();
      this.showPreDatasetDeleteModal = false;
    },
    openDatasetPreviewModal(dataset) {
      this.SelectedDataset = dataset;
      this.showDatasetPreviewModal = true;
    },
    closeDatasetPreviewModal() {
      this.showDatasetPreviewModal = false;
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
  height: 600px;
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
  color: #3f8ae2;
}
.table-container {
  display: flex;
  justify-content: center;
  height: calc(100% - 30px);
  width: calc(100% - 20px);
  margin-top: 10px;
}
table {
  justify-content: center;
  color: #e8e8e8;
  font-weight: 300;
  text-align: center;
  font-size: 16px;
  border-collapse: separate;
  border-spacing: 0;
  display: block;
  overflow: auto;
}
th {
  position: sticky;
  top: 0px;
  height: 35px;
  border: 1.5px solid #545454;
  font-size: 17px;
  font-weight: 400;
  background-color: #2c2c2c;
  width: 300px;
}
th:first-child {
  border-right: none;
}
td {
  border: 1.5px solid #353535;
  border-top: none;
  height: 60px;
  
}
td:first-child {
  border-right: none;
}
.name {
  min-width: 200px;
}
.action {
  padding: 0 20px;
  min-width: 450px;
}
.action button {
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
  margin: 5px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 5px;
  font-size: 15px;
}
button svg {
  margin-right: 6px;
}
.show-btn {
  border: 1px solid rgb(157, 157, 157);
  color: rgb(157, 157, 157);
}
.add-data-btn {
  border: 1px solid rgb(76, 135, 90);
  color: rgb(76, 135, 90);
}
.edit-btn {
  border: 1px solid rgb(48, 119, 181);
  color: rgb(48, 119, 181);
}
.edit-btn svg {
  margin-right: 2px;
}
.delete-btn {
  color: rgb(206, 54, 54);
  border: 1px solid rgb(206, 54, 54);
}
.action button:hover {
  background-color: rgba(181, 181, 181, 0.065);
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
