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
    <DeleteModal
      :modalInfo="modalInfo"
      @static="searchAction"
      @modalType="updateModalType">
    </DeleteModal>
    <EditModal
      :modalInfo="modalInfo"
      @static="searchAction"
      @modalType="updateModalType">
    </EditModal>
  </div>
</template>

<script>
// @ is an alias to /src
import BasicTable from '@/components/BasicTable.vue'
import DeleteModal from '@/components/modal/Delete.vue'
import EditModal from '@/components/modal/Edit.vue'
import TableFilderInfo from '@/assets/json/userManage/filderInfo.json'

export default {
  name: 'UserManage',
  components: {
    BasicTable,
    DeleteModal,
    EditModal
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
        type: '', // add, edit, view
        title: ''
      },
      tabsInfo: {
        // tabs 設定
        item: ['帳號維護', '所屬群組', '所屬組織'],
        isActive: 0
      },
      actionForm: {}
    };
  },
  mounted () {
    this.conditionParems = {
      page: 0,
      size: 10,
      sort: 'empNo,desc'
    }
    this.getData(this.conditionParems)
  },
  methods: { // /api/authuser/editUser
    getData (parems) { // page=0&size=10&sort=empNo,desc
      this.$apiUtils.get('/authuser/getAuthUserList', parems, resp => {
        // 接收成功
        this.table = Object.assign({}, resp);
        this.table.status = resp.status ? resp.status : 'success'
      });
    },
    openModelType (type, id) {
      this.modalInfo.id = (id) || null
      this.modalInfo.fieldInfo = TableFilderInfo
      this.modalInfo.actionUrl = '/authuser/saveUser'
      const getDetal = () => {
        const params = {
          userId: id
        }
        this.$apiUtils.get('/authuser/getAuthUser', params, resp => {
          this.modalInfo.detal = resp
          for (let prop in this.modalInfo.detal) {
            if (!this.modalInfo.detal[prop]) delete this.modalInfo.detal[prop]
          }
          if (type === 'copy') delete this.modalInfo.detal.userId
          this.modalInfo.type = type
        })
      }
      switch (type) {
        case 'delete':
          this.modalInfo.title = '刪除'
          this.modalInfo.type = type
          this.modalInfo.actionUrl = `/authuser/deleteAuthUser?userId=${id}`
          break
        case 'edit':
          this.modalInfo.title = '修改'
          getDetal()
          break
        case 'add':
          this.modalInfo.title = '新增'
          this.modalInfo.type = type
          this.modalInfo.detal = {}
          break
        case 'view':
          this.modalInfo.title = '瀏覽'
          getDetal()
          break
        case 'copy':
          this.modalInfo.title = '複制'
          getDetal()
          break
      }

      if (type !== 'delete' && type !== 'add') {
        //
      }
    },
    updateModalType (type) {
      this.modalInfo.type = type
    },
    searchAction (getParem) {
      const parems = (getParem === 'success') ? this.conditionParems : Object.assign({}, this.conditionParems, getParem)
      this.getData(parems)
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
