<template>
  <transition name="fade">
    <ModalTemp id="deleteBox" v-if="!!modalIsShow">
      <template v-slot:header>
        <h5>{{ modalInfo.title }}</h5>
      </template>
      <p>您是否確定要刪除此項目？</p>
      <template v-slot:footer>
        <button type="button" class="btn btn-secondary" @click="handleClose" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="handleSave">確認</button>
      </template>
    </ModalTemp>
  </transition>
</template>

<script>
// import $ from 'jquery';
import ModalTemp from '@/components/modal/ModalTemp.vue'

export default {
  name: 'Delete',
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
      return !!(this.modalInfo.type && this.modalInfo.type === 'delete');
    }
  },
  methods: {
    handleSave () {
      this.getModalInfo = Object.assign({}, this.modalInfo);
      const complateAction = (statusMsg, className) => {
        this.handleClose()
        this.$openAlertMsg(statusMsg, className)
      }
      this.$apiUtils.post(this.getModalInfo.actionUrl, '', resp => {
        complateAction('刪除成功', 'alert-success')
        this.$emit('static', 'success')
      }, resp => {
        complateAction('刪除失敗', 'alert-danger')
      });
    },
    handleClose () {
      this.getModalInfo.type = ''
      this.$emit('modalType', '')
    }
  }
}
</script>
