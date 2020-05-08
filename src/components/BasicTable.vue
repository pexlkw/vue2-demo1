<template>
  <div class="basic-table">
    <!-- {{ table }} -->
    <template v-if="!table">
      <!-- 資料尚未取得時 (ajax 尚未回來) -->
      <div class="d-flex justify-content-center">
        <div class="spinner-border m-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </template>

    <!-- ajax 回來 success -->
    <template v-else-if="table.status === 'success'">
      <!-- {{checkedAll}} {{ checkedValue }} -->
      <div class="btn-group toolbar" role="group">
        <button
          v-if="checkedValue.length > 0"
          type="button"
          class="btn btn-info"
          @click="openModel"
        >刪除</button>
        <button type="button" class="btn btn-info" @click="openModelType('add')">新增</button>
      </div>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th v-if="config.multipleCheckboxes" class="checkbox-column">
              <input type="checkbox" id="checkedAll" v-model="checkedAll" @change="selectedAll" />
            </th>
            <template v-for="(itemField, i) in config.fieldInfo">
              <th :key="i" v-if="itemField.isShow">{{ itemField.label }}</th>
            </template>
            <th v-if="config.buttonAction" class="action-column">Action</th>
          </tr>
        </thead>
        <tbody v-if="table.content.length > 0">
          <tr v-for="(item, i) in table.content" :key="i">
            <td v-if="config.multipleCheckboxes">
              <input
                type="checkbox"
                name="tableCheckbox"
                :value="item[config.key]"
                v-model="checkedValue"
                @change="selected"
              />
            </td>
            <template v-for="(field, index) in config.fieldInfo">
              <td :key="index" v-if="field.isShow">{{ item[field.value] }}</td>
            </template>
            <td v-if="config.buttonAction" class="action-column">
              <div class="btn-group btn-group-sm" role="group">
                <button
                  v-for="(btnItem, index) in config.buttonAction"
                  :key="index"
                  type="button"
                  class="btn btn-secondary"
                  :data-type="btnItem"
                >
                  <i class="fas"
                  :class="{'fa-pen': btnItem === 'edit', 'fa-trash-alt': btnItem === 'delete', 'fa-copy': btnItem === 'copy', 'fa-eye': btnItem === 'view'}"
                  @click="openModelType(btnItem, item[config.key])"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>

        <!-- 沒有資料時 -->
        <tbody v-else>
          <tr class="no-data">
            <td :colspan="config.fieldInfo.length" class="text-center">
              <p class="m-5">no data</p>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 頁數 -->
      <div class="row" v-if="config.pageType === 'pagination'">
        <div class="col-xs-12 col-sm-12 col-md-5">共 {{ table.totalElements }} 筆</div>
        <div class="col-xs-12 col-sm-12 col-md-7">
          <ul class="pagination justify-content-end">
            <li
              class="page-item"
              :class="{'disabled': table.pageable.pageNumber === 0}"
              @click="setParem('page', table.pageable.pageNumber-1)">
              <a class="page-link" href="javascript:void(0)" tabindex="-1">Previous</a>
            </li>
            <li
              v-for="(item, i) in table.totalPages"
              class="page-item"
              :key="i"
              :class="{'active': table.pageable.pageNumber === i}"
            >
              <a class="page-link" href="javascript:void(0)" @click="setParem('page', i)">{{ i+1 }}</a>
            </li>
            <li class="page-item" :class="{'disabled': table.totalPages === table.pageable.pageNumber+1}">
              <a class="page-link" href="javascript:void(0)" @click="setParem('page', table.pageable.pageNumber+1)">Next</a>
            </li>
          </ul>
        </div>
      </div>
    </template>

    <!-- ajax回傳回來失敗時 -->
    <template v-else-if="table.status !== 'success'">
      <div class="text-center">{{ table.message }}</div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'BasicTable',
  props: ['table', 'config'],
  components: {
    // Modal
  },
  data () {
    return {
      checkedAll: false, // 全選 true/false
      checkedArr: [],
      checkedValue: [], // checkboxs 選中的
      deleteAction: 'deleteAction',
      tableData: this.table
    };
  },
  methods: {
    selectedAll () {
      this.checkedValue = [];
      let getKey = this.config.key;
      if (this.checkedAll) {
        for (let prop in this.table.content) {
          this.checkedValue.push(this.table.content[prop][getKey]);
        }
      }
    },
    selected () {
      this.checkedAll = false;
    },
    openModelType (type, id) {
      this.$emit('modelType', type, id);
    },
    setParem (type, parems) {
      let getParem = {};
      switch (type) {
        case 'page':
          getParem = {
            'page': parems
          }
          break;
      }
      this.$emit('conditionParem', getParem);
    }
  }
};
</script>

<style scoped lang="scss">
.table {
  font-size: 13px;
  .checkbox-column {
    width: 15px;
  }
  .action-column {
    width: 100px;
    padding: 0 12px;
    vertical-align: middle;
  }
}
.no-data {
  &:hover {
    background-color: transparent;
  }
}
.toolbar {
  display: block;
  text-align: right;
  margin-bottom: 0.5em;
}
</style>
