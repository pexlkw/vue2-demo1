<template>
  <div class="user-profile">
    <div class="row user-header mb-3">
      <div class="col-12 col-sm-7">
        <div v-if="!$store.state.user.userInfo.userPic"
          class="rounded-circle un-img mr-2 d-inline-block user-img"
          title="更新圖片"
          @click="updatePic">A
          <i class="fas fa-camera upload-profile-pic rounded-circle"></i>
        </div>
        <div v-else class="d-inline-block user-img" @click="updatePic">
          <img class="rounded-circle un-img mr-2 d-inline-block"
            :src="$store.state.user.userInfo.userPic"
            title="更新圖片"
            alt="user image">
          <i class="fas fa-camera upload-profile-pic rounded-circle"></i>
        </div>
        <div class="d-inline-block user-info mt-1">
          <div v-if="!!information">
            <span class="user-name">ADMIN</span>
            <span class="badge badge-success ml-2">
              帳號<template v-if="information.isActive==='Y'">啟用</template>
              <template v-else>停用</template>中
            </span>
          </div>
          <p class="">{{ information.sourceType }} </p>
        </div>
      </div>
      <div class="col-12 col-sm-5 d-flex justify-content-end align-items-center">
        <button class="btn btn-info">修改</button>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <table>
          <template v-for="(item, i) in field" >
            <tr :key="i" v-if="!!item.info.isShow">
              <td class="text-right pt-2">{{item.label}}：</td>
              <td class="pt-2" v-if="item.value==='isActive'">
                <template v-if="information.isActive==='Y'">啟用</template>
                <template v-else>停用</template>
              </td>
              <td v-else class="pt-2">{{ information[item.value] || '尚無資料' }}</td>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <UploadUserPic :modalInfo="modalInfo" @modalType="updateModalType"/>
  </div>
</template>

<script>
import FilderInfo from '@/assets/json/userManage/filderInfo.json'
export default {
  name: 'UserProfile',
  components: {
    UploadUserPic: () => import('@/components/modal/UploadUserPic.vue')
  },
  data () {
    return {
      information: {},
      field: FilderInfo,
      modalInfo: {
        isShow: false,
        type: false,
        title: '更新個人圖片'
      }
    }
  },
  mounted () {
    const params = {
      userId: 1
    }
    this.getData(params)
  },
  methods: {
    getData (parems) {
      this.$apiUtils.get('/authuser/getAuthUser', parems, resp => {
        this.information = Object.assign({}, resp)
      })
    },
    updatePic () {
      this.modalInfo.type = true
    },
    updateModalType (type) {
      this.modalInfo.type = type
    }
  }
}
</script>
<style scoped lang="scss">
.user-profile {
  padding: 1.5em;
  position: relative;
  .un-img {
    width: 60px;
    height: 60px;
    background-color: #404E67;
    color: #fff;
    text-align: center;
    font-size: 40px;
    line-height: 60px;
    box-shadow: 2px 4px 14px 0 rgba(0,0,0,.4);
  }
  .user-header {
    .user-info {
      height: 60px;
      vertical-align: top;
      margin-left: 1em;
      .user-name {
        font-size: 20px;
        font-weight: 400;
      }
      p {
        font-size: 14px;
        margin: 0;
        color: #375775;
      }
    }
  }
}
</style>
