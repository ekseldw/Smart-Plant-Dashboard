<template>
  <div class="wrapper">
    <link
      href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"
      rel="stylesheet"
    />
    <div class="table-header">
      담당자 관리 
    </div>

    <div class="table-main" style="height: fit-content">
      <div>
        <div class="table-main__header">담당자 관리</div>

        
        <div>
          <div class="table-main__content">
            <div class="table-main__content-intro">
              구역을 선택해주세요
            </div>

            <div>
              <div class="filters-wrapper">
              <div class="dropdown" style="margin: 10px;">
                <button
                  class="btn  btn-primary  dropdown-toggle"
                  data-toggle="dropdown"
                  color="#000080"
                >
                  {{ currPos.posName }}
                </button>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item"
                    @click="getPosManager();
                    currPos={ posName: '전체', posId: 0 }"
                  >전체</a>
                  <a
                    v-for="pos in posList"
                    :key="pos.posId"
                    class="dropdown-item"
                    @click="getPosManager(pos.posId);
                    currPos={posName: pos.posName, posId: pos.posId };"
                  >
                    {{ pos.posName }}
                  </a>
                </div>
              </div>
              <div style="margin-left:auto;">
              <button
                type="button"
                class="btn btn-primary"
                style="margin: 10px; float:right"
                @click="showAddModal=true"
              >
                신규 등록
              </button>
              </div>
              </div>
              <div class="scrollbar" style="width: 100%; display: flex; justify-content: center; overflow-y:auto; height:60vh;">
              <table class="table table-bordered table-hover" style="width: 95%; height:70px;">
                <thead>
                  <tr>
                    <th style="width:300px;">위치 이름</th>
                    <th style="width:200px;">담당자</th>
                    <th style="width:100px;">관련 단계</th>
                    <th style="width:300px;">핸드폰 번호</th>
                    <th>이메일 주소</th>
                    <th style="width: 175px">ACTION</th>
                  </tr>
                </thead>
                <tbody >
                  <tr v-for="manager in managerList" :key="manager.Id">
                    <td>{{ manager.posName }}</td>
                    <td>{{ manager.name }}</td>
                    <td>{{ manager.level }}</td>
                    <td>{{ manager.phone }}</td>
                    <td>{{ manager.email }}</td>
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
                        @click="showEditModal=true;
                        currManager=manager;"
                        ><i class="bx bx-edit"></i> 수정
                      </a>

                      <a
                        class="btn btn-outline-danger tr_data_del"
                        @click="askToDelete=true; deleteManagerId = manager.id"
                        ><i class="bx bx-trash"></i> 삭제</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
                
              </div>
            </div>
          <AddManagerModal
            v-if="showAddModal"
            @close-add-modal="showAddModal=false"
            @add-new-manager="addManager"
            :posList="posList"
          ></AddManagerModal>
          <EditManagerModal
            v-if="showEditModal"
            @close-edit-modal="showEditModal=false"
            @edit-manager="editManager"
            :posList="posList"
            :currManager="currManager"
          >
          </EditManagerModal>
          <AskToDelete
            v-if="askToDelete"
            @close="askToDelete=false"
            @delete="deleteManager()"
          ></AskToDelete>
          <AlertSuccess
            v-if="alertSuccess"
            @close="alertSuccess=false"
            :action="action"
          ></AlertSuccess>
          <AlertFail
            v-if="alertFail"
            @close="alertFail=false"
            :action="action"
          ></AlertFail>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Icon } from "@iconify/vue";
import AddManagerModal from "./AddManagerModal.vue";
import EditManagerModal from "./EditManagerModal.vue";
import AskToDelete from "@/components/AlertWindow/ask-to-delete.vue";
import AlertSuccess from "@/components/AlertWindow/alert-success.vue";
import AlertFail from "@/components/AlertWindow/alert-fail.vue";
import axios from "axios"

export default {
  name: "EsopManager",
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      currPos: { posName: "전체", posId: 0 },
      posList: [],
      managerList: [],

      action: "",
      alertSuccess: false,
      alertFail: false,
      askToDelete: false,
      deleteManagerId: 0,
      currManager: {},
    }
  },
  created() {
    this.getSensorPos();
    this.getManager();
  },
  methods: {
    async getSensorPos() {
      try {
        const res = await axios.get(
          "/api/sensor-pos"
        );
        this.posList = res.data.data.content;
        console.log(this.posList);
        
      } catch(err) {
        console.log(err);
      }
    },

    async getPosManager(posId=1) {
      try {
        const res = await axios.get(
          "/api/contact?posId=" + posId
        );
        this.managerList = res.data.data.content;
        console.log(this.managerList)
      } catch(err) {
        console.log(err);
      }
    },
    async getManager() {
      try {
        const res = await axios.get(
          "/api/contact"
        );
        this.managerList = res.data.data.content;
        console.log(this.managerList)
      } catch(err) {
        console.log(err);
      }
    },

    async addManager(manager) {
      this.action = "등록"
      try {
        const res = await axios.post(
          "/api/contact",
          {
            email: manager.email,
            level: manager.level,
            name: manager.name,
            phone: manager.phone,
            posId: manager.posId,
          }
        );
        this.reloadManager();
        console.log(res);
        this.alertSuccess = true;
      } catch(err) {
        this.alertFail = true;
        console.log(err);
      }
    },

    async editManager(manager) {
      this.action = "수정"
      try {
        console.log(manager);
        const res = await axios.put(
          "/api/contact/" + manager.id,
          {
            email: manager.email,
            level: manager.level,
            name: manager.name,
            phone: manager.phone,
            posId: manager.posId
          }
        );
        console.log(res);
        this.reloadManager();
        this.alertSuccess = true;
      } catch(err) {
        this.alertFail = true;
        console.log(err);
      }
    },

    async deleteManager() {
      this.action = "삭제"
      try {
        const res = await axios.delete(
          "/api/contact/" + this.deleteManagerId
        );
        console.log(res);
        this.reloadManager();
        this.alertSuccess = true;
      } catch(err) {
        this.alertFail = true;
        console.log(err);
      }
    },
    reloadManager() {
      
      if (this.currPos.posId === 0) {
          this.getManager();
        } else {
          this.getPosManager(this.currPos.posId);
        }
    }

  },
  components: {
    
    AddManagerModal,
    EditManagerModal,
    AskToDelete,
    AlertSuccess,
    AlertFail,
  },
};
</script>

<style>
.filters-wrapper {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}
</style>
