<template>
    <ModalTemp id="actionBox" v-if="!!modalIsShow">
      <template v-slot:header>
        <h5>{{ modalInfo.title }}</h5>
      </template>
      <form name="dataAction">
        <template v-for="(field, index) in modalInfo.fieldInfo">
          <div class="form-group row" :key="index" v-if="field.value!=='userId'">
            <label :for="field.value" class="col-sm-3 col-form-label" :class="{'is-required': field.info.required}">
              <template v-if="field.value!=='userId'">{{ field.label }}</template>
            </label>
            <div v-if="getModalInfo.type!=='view'" class="col-sm-9">
              <input v-if="field.info.type==='input'" type="text" class="form-control" :id="field.value" v-model="getModalInfo.detal[field.value]">
              <input v-else-if="field.info.type==='password'" type="password" class="form-control" :id="field.value" v-model="getModalInfo.detal[field.value]">
              <textarea v-else-if="field.info.type==='textarea'" type="password" class="form-control" :id="field.value" v-model="getModalInfo.detal[field.value]"></textarea>
              <select v-else-if="field.info.type==='lov'" class="form-control" :id="field.value" v-model="getModalInfo.detal[field.value]">
                <option>請選擇</option>
                <template v-for="(item, i) in field.info.item">
                  <option :key="i" :value="item.key"> {{ item.value }}</option>
                </template>
              </select>
              <template v-else-if="field.info.type==='rediobutton'">
                <div v-for="(item, i) in field.info.item" :key="i" class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" :name="field.value" :value="item.key" :id="(field.value+i)">
                  <label class="form-check-label" :for="(field.value+i)">{{ item.value }}</label>
                </div>
              </template>
            </div>
            <div v-else class="col-sm-9 col-form-label text-view">
              <span> {{ getModalInfo.detal[field.value] || '-' }}</span>
            </div>
          </div>
        </template>
      </form>
      <template v-slot:footer>
        <button type="button" class="btn btn-secondary" @click="handleClose">取消</button>
        <button v-if="modalInfo.type==='view'" type="button" class="btn btn-primary" @click="goEdit">修改</button>
        <button v-else type="button" class="btn btn-primary" @click="handleSave">確認</button>
      </template>
    </ModalTemp>
</template>

<script>
import ModalTemp from '@/components/modal/ModalTemp.vue'

export default {
  name: 'Edit',
  props: {
    modalInfo: Object
  },
  components: {
    ModalTemp
  },
  data () {
    return {
      getModalInfo: this.modalInfo
    }
  },
  computed: {
    modalIsShow () {
      return !!(this.modalInfo.type && this.modalInfo.type !== 'delete')
    }
  },
  methods: {
    handleSave () { // 新增和修改
      this.getModalInfo = Object.assign({}, this.modalInfo);
      const complateAction = (statusMsg, className) => {
        this.handleClose()
        this.$openAlertMsg(statusMsg, className)
      }
      this.$apiUtils.post(this.getModalInfo.actionUrl, this.getModalInfo.detal, resp => {
        complateAction(`${this.getModalInfo.title}成功`, 'alert-success')
        this.$emit('static', 'success')
      }, resp => {
        complateAction(`${this.getModalInfo.title}失敗`, 'alert-danger')
      });
    },
    handleClose () {
      this.getModalInfo.type = ''
      this.$emit('modalType', '')
    },
    goEdit () {
      this.getModalInfo.type = 'edit'
    }
  }
}
</script>
