<template>
  <div class="data-table">
    <section class="card form">
      <div class="card-body">
        <h5 class="card-title page-title">帳號管理</h5>
        <form>
          <div class="form-group row">
            <div class="col-sm-6">
              <label for="name">帳號</label>
              <input type="text" class="form-control" id="userAccount" />
            </div>
            <div class="col-sm-6">
              <label for="idNo">名稱</label>
              <input type="text" class="form-control" id="displayName" />
            </div>
            <!-- <div class="col-sm-6">
              <label for="deparment">部門</label>
              <select class="custom-select" id="deparment">
                <option selected>Open this select menu</option>
                <option value="1">業務部</option>
                <option value="2">工程部</option>
                <option value="3">人事部</option>
              </select>
            </div> -->
          </div>
          <div class="btn-box text-center">
            <button class="btn btn-primary" type="button">submit</button>
          </div>
        </form>
      </div>
    </section>
    <section class="card">
      <div class="card-body">
        <BasicTable
          :table="table"
          :config="config"
          @modelType="openModelType"
          @conditionParem="searchAction" />
      </div>
    </section>
    <!-- model content: add/edit/view -->
    <Modal id="dataAction" v-if="modalInfo.isShow">
      <template v-slot:header>
        <h5>新增</h5>
      </template>
      <div>test</div>
      <template v-slot:footer>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary">確認</button>
      </template>
    </Modal>
  </div>
</template>

<script>
// @ is an alias to /src
import BasicTable from '@/components/BasicTable.vue';
import Modal from '@/components/Modal.vue';
// import axios from 'axios';
import $ from 'jquery';
import TableFilderInfo from '@/assets/json/dataTable/filderInfo.json';
// import { apiUtils } from '@/assets/js/utils/apiUtils'; // ajax

export default {
  name: 'Datatable',
  components: {
    BasicTable,
    Modal
  },
  data () {
    return {
      table: null,
      config: {
        // table 設定
        multipleCheckboxes: true, // boolean
        buttonAction: ['view', 'copy', 'edit', 'delete'], // array(edit, delete, view) or null
        pageType: 'pagination', // pagination or autoload 頁數呈現
        key: 'userId',
        fieldInfo: TableFilderInfo, // 欄位名稱,
        searchApiPath: '/authuser/getAuthUserList?size=10',
        condition: null
      },
      conditionParems: null,
      modalInfo: {
        // popup 設定
        isShow: false,
        type: 'add' // add, edit, view
      },
      tabsInfo: {
        // tabs 設定
        item: ['帳號維護', '所屬群組', '所屬組織'],
        isActive: 0
      }
    };
  },
  mounted () {
    this.conditionParems = {
      page: 0,
      size: 10,
      sort: 'empNo,desc'
    }
    this.getData(this.conditionParems);
  },
  methods: {
    getData (parems) { // page=0&size=10&sort=empNo,desc
      this.$apiUtils.get('/authuser/getAuthUserList', parems, resp => {
        // 接收成功
        this.table = Object.assign({}, resp);
        this.table.status = resp.status ? resp.status : 'success';
      });
    },
    openModelType (type) {
      this.modalInfo.isShow = true;
      this.modalInfo.type = type;
    },
    searchAction (getParem) {
      const parems = Object.assign({}, this.conditionParems, getParem);
      this.getData(parems);
    }
  },
  updated () {
    if (this.modalInfo.isShow) {
      $('#dataAction').modal('show')
    }
  }
}
</script>

<style scoped lang="scss">
.data-table {
  padding: 1em;
  .table {
    font-size: 13px;
  }
}
.card {
  margin-bottom: 0.5em;
}
.form {
  font-size: 13px;
  label {
    margin-bottom: 0;
  }
  .col-sm-6 {
    margin-bottom: 0.5em;
  }
}
</style>
