<template>
  <transition name="fade">
    <ModalTemp id="changePassword" v-if="!!modalIsShow">
      <template v-slot:header>
        <h5>{{ modalInfo.title }}</h5>
      </template>
        <form action="" name="dataAction">
          <div class="form-group row">
            <label for="userAccount" class="col-sm-3 col-form-label is-required">舊密碼</label>
            <div class="col-sm-9"><input type="password" id="passwordOld" class="form-control" ref="passwordOld"></div>
          </div>
          <div class="form-group row">
            <label for="userAccount" class="col-sm-3 col-form-label is-required">新密碼</label>
            <div class="col-sm-9"><input type="password" id="passwordNew" class="form-control" ref="passwordNew"></div>
          </div>
          <div class="form-group row">
            <label for="userAccount" class="col-sm-3 col-form-label is-required">確認新密碼</label>
            <div class="col-sm-9"><input type="password" id="passwordConfirm" class="form-control"></div>
          </div>
        </form>
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
  name: 'ChangePassword',
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
      return !!this.modalInfo.type
    }
  },
  methods: {
    handleSave () {
      this.getModalInfo = Object.assign({}, this.modalInfo);
      const params = {
        userId: this.$store.state.user.userInfo.userId,
        passwordOld: this.$refs.passwordOld.value,
        passwordNew: this.$refs.passwordNew.value
      }
      const complateAction = (statusMsg, className) => {
        this.handleClose()
        this.$openAlertMsg(statusMsg, className)
      }
      this.$apiUtils.post('/authuser/changeUserPassword', params, resp => {
        complateAction(resp, 'alert-success')
      }, resp => {
        complateAction('變更失敗', 'alert-danger')
      });
    },
    handleClose () {
      this.getModalInfo.type = ''
      this.$emit('modalType', '')
    }
  }
}
</script>
