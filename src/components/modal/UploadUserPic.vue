<template>
  <transition name="fade">
    <ModalTemp id="changePassword" v-if="!!modalIsShow">
      <template v-slot:header>
        <h5>{{ modalInfo.title }}</h5>
      </template>
        <div class="upload-user-pic input-group mb-3">
          <div class="custom-file">
            <input type="file"
              class="custom-file-input"
              id="inputGroupFile01"
              ref="userPic"
              @change="getPicInfo">
            <label class="custom-file-label" for="inputGroupFile01" data-text="瀏覽">{{ picName || '選擇檔案'}}</label>
          </div>
        </div>
        <div class="prview-pic user-pic text-center rounded-circle">
          <img v-if="!!picPreview" :src="picPreview" alt="" class="rounded-circle">
        </div>
      <template v-slot:footer>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="handleClose">取消</button>
        <button type="button" class="btn btn-primary" @click="handleSave">確認</button>
      </template>
    </ModalTemp>
  </transition>
</template>

<script>
// import $ from 'jquery';
import ModalTemp from '@/components/modal/ModalTemp.vue'

export default {
  name: 'UploadUserPic',
  props: {
    modalInfo: Object
  },
  components: {
    ModalTemp
  },
  data () {
    return {
      getModalInfo: this.modalInfo,
      picPreview: null,
      picName: null
    }
  },
  computed: {
    modalIsShow () {
      return this.modalInfo.type
    }
  },
  methods: {
    getPicInfo () {
      let file = this.$refs.userPic.files[0]
      this.picPreview = URL.createObjectURL(file)
      console.log(this.picPreview)
    },
    handleSave () {
      this.getModalInfo = Object.assign({}, this.modalInfo);
    },
    handleClose () {
      this.getModalInfo.type = false
      this.$emit('modalType', false)
    }
  }
}
</script>
