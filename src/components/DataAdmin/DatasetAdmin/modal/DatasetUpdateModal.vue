<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">데이터셋 수정</div>
        </div>
        <div class="modal-body">
          <div class="input">
            <label for="name">Dataset Name</label>
            <input
              type="text"
              id="name"
              autocomplete="off"
              v-model="name"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="update-btn" @click="update">
            저장
          </button>
          <button class="close-btn" @click="close">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["dataset", "userId"],
  data() {
    return {
      name: this.dataset.name,
    };
  },
  methods: {
    ...mapActions("dataset", [
      "FETCH_DATASETS",
      "UPDATE_DATASET",
      "UPDATE_PREDATASET",
    ]),
    close() {
      this.$emit("close");
    },
    update() {
      var originDatasetId = this.dataset.originDatasetId;
      if (originDatasetId == null) {originDatasetId = this.dataset.originDatasetId;}
      this.UPDATE_DATASET({
        originDatasetId: originDatasetId,
        name: this.name,
      }).then(() => {
        this.FETCH_DATASETS({
          userId: this.userId,
        }).then(() => {
          this.$emit("close");
        });
      });
    },
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
  width: 400px;
  margin: 0px auto;
  color: #e8e8e8;
  background-color: #252525;
  border-radius: 7px;
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
  padding: 10px 20px;
  font-size: 15px;
}

.modal-body label {
  font-size: 14px;
  font-weight: 300;
  display: block;
  width: 100%;
  color: #b3b3b3;
  margin: 3px;
  padding-left: 35px;
}
.input {
  margin: 10px 0;
}

input {
  display: block;
  margin: auto;
  height: 18px;
  width: 75%;
  background-color: #1f1f1f;
  border: none;
  color: #e8e8e8;
  padding: 3px 20px;
  outline: 1px #676767a6 solid;
}

.modal-footer {
  display: flex;
  justify-content: right;
  padding: 15px 20px;
  border-top: 0.2px #969696 solid;
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

.update-btn {
  background-color: #3f8ae2;
}
.update-btn:hover {
  background-color: #2f6cb1;
}

.close-btn {
  background-color: #373737;
}
.close-btn:hover {
  background-color: #464646;
}
</style>
