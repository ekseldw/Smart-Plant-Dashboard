<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            센싱 장비 위치 신규 등록
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white close"
            aria-label="Close"
            @click="$emit('close-add-modal')"
          ></button>
        </div>
        <form @submit.prevent="onSubmit" v-if="editing===true" id="add-pos-modal">
          <div class="modal-body">
            <div class="form-body" style="margin-top:10px">
              <div class="row">
                <div class="col-12">
                  <div
                    class="form-label-group position-relative has-icon-left controls"
                  >
                    <label for="pos_name">위치 이름</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control"
                        name="pos_name"
                        placeholder="위치이름"
                        minlength="1"
                        maxlength="100"
                        v-model="newPos.posName"
                        required
                        style="font-size:15px;"
                      />
                      <div class="form-control-position label-icon">
                        <i class="bx bx-grid-alt"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    class="form-label-group position-relative has-icon-left controls"
                  >
                    <label for="pos_name">식별 코드</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control"
                        name="pos_name"
                        placeholder="식별 코드"
                        minlength="1"
                        maxlength="100"
                        v-model="newPos.posCode"
                        required
                        style="font-size:15px;"
                      />
                      <div class="form-control-position label-icon">
                        <i class="bx bx-grid-alt"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-label-group position-relative has-icon-left">
                    <label for="pos_dtl">위치 상세</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control"
                        name="pos_dtl"
                        placeholder="위치 상세"
                        maxlength="100"
                        v-model="newPos.posDtl"
                        required
                        style="font-size:15px;"
                      />
                      <div class="form-control-position label-icon">
                        <i class="bx bx-comment-detail"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-label-group position-relative has-icon-left">
                    <label for="pos_dtl">조감도 이미지</label>
                    <div class="main-input">
                      <input
                        autocomplete="off"
                        type="file"
                        class="form-control"
                        id="position-img"
                        placeholder="조감도 이미지"
                        maxlength="100"
                        style="font-size:15px; margin-left:0px;                      "
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-primary"
              @click="
                submitForm();
                $emit('add-new-pos', newPos);
                $emit('close-add-modal');
              "
            >
              위치 등록
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="$emit('close-add-modal')"
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPos: { posName: "", posDtl: "", posCode: "" },
      editing: true,
    };
  },
  methods: {
    submitForm: () => {
      var form = document.getElementById("add-pos-modal");
      document.body.appendChild(form);
    }
  }
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
</style>
