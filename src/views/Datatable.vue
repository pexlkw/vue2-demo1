<template>
  <div class="data-table">
    <section class="card form">
      <div class="card-body">
        <h5 class="card-title page-title">帳號管理</h5>
        <form>
          <div class="form-group row">
            <div class="col-sm-6">
              <label for="name">姓名</label>
              <input type="text" class="form-control" id="name" placeholder="Example input">
            </div>
            <div class="col-sm-6">
              <label for="idNo">員工編號</label>
              <input type="text" class="form-control" id="idNo" placeholder="Example input">
            </div>
            <div class="col-sm-6">
              <label for="deparment">部門</label>
              <select class="custom-select" id="deparment">
                <option selected>Open this select menu</option>
                <option value="1">業務部</option>
                <option value="2">工程部</option>
                <option value="3">人事部</option>
              </select>
            </div>
          </div>
          <div class="btn-box text-center">
            <button class="btn btn-primary" type="button">submit</button>
          </div>
        </form>
      </div>
    </section>
    <section class="card">
      <div class="card-body">
        <BasicTable :table="table" :config="config" @modelType="openModelType" />
      </div>
    </section>
    <!-- model content: add/edit/view -->
    <Modal id="dataAction" v-if="modalInfo.isShow">
      <template v-slot:header><h5>新增</h5></template>
      <div>
        test
      </div>
      <template v-slot:footer>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary">確認</button>
      </template>
    </Modal>
  </div>
</template>

<script>
// @ is an alias to /src
import BasicTable from '@/components/BasicTable.vue'
import Modal from '@/components/Modal.vue'
import axios from "axios"
import $ from 'jquery'
import TableFilderInfo from '@/assets/json/dataTable/filderInfo.json'

export default {
  name: "Datatable",
  components: {
    BasicTable,
    Modal
  },
  data() {
    return {
      table: null,
      config: { // table 設定
        multipleCheckboxes: true, // boolean
        buttonAction: ['view','copy','edit', 'delete'], // array(edit, delete, view) or null
        pageType: 'pagination', // pagination or autoload 頁數呈現
        key: 'userId',
        fieldInfo: TableFilderInfo, // 欄位名稱
      },
      modalInfo: { // popup 設定
        isShow: false,
        type: 'add', // add, edit, view
      },
      tabsInfo: { // tabs 設定
        item: ['帳號維護', '所屬群組','所屬組織'],
        isActive: 0,
      }
    };
  },
  mounted() {
    this.getInitData();
  },
  methods: {
    getInitData() {
      let path = '//77bed619.ngrok.io';
      axios
        .get(`${path}/api/authuser/getAuthUserList?page=0&size=10&sort=empNo,desc`)
        .then(res => {
          this.table = Object.assign({}, res.data);
          this.table.status = (res.data.status) ? res.data.status : 'success';
        })
        .catch(err => {
          alert('網路發生錯誤');
          console.log(err);
        });
    },
    openModelType(type) {
      this.modalInfo.isShow = true;
      this.modalInfo.type = type;
    },
    tabsAction() {

    }
  },
  updated() {
    if (this.modalInfo.isShow) {
        $('#dataAction').modal('show');
      }
  }
};
</script>

<style scoped lang="scss">

.data-table {
  padding: 1em;
  .table {
    font-size: 13px;
  }
}
.card {
  margin-bottom: .5em;
}
.form {
    font-size: 13px;
    label {
      margin-bottom: 0;
    }
    .col-sm-6 {
      margin-bottom: .5em;
    }
}
</style>