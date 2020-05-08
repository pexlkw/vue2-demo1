<template>
    <header>
      <div class="logo-bar">
        <!-- <div class="logo"> LOGO </div> -->
        <img src="//vuejs.org/images/logo.png" alt="" class="logo">
      </div>
      <div class="header text-right">
        <ul>
          <li class="title">權限管理系統</li>
          <li class="notice btn"><i class="fas fa-bell"></i></li>
          <li class="dropdown">
            <div class="dropdown-toggle btn" @click="dropDownEvent('profile')">
              <span v-if="!userInfo.userPic" class="default-img">{{ userInfo.firstText}}</span>
              <img v-else :src="userInfo.userPic" alt="user pic">
              {{ userInfo.userAccount }}
            </div>
            <DropdownMenu
              :isShow="dropDownMenu.isShow.profile">
              <template>
                <div class="text-center">
                  <div v-if="!userInfo.userPic" class="rounded-circle un-img d-inline-block">{{ userInfo.firstText }}</div>
                  <img v-else :src="userInfo.userPic" alt="user pic">
                  <div>{{ userInfo.userAccount }}</div>
                </div>
                <div class="dropdown-divider"></div>
                <span @click="updateDropdownIsShow('profile')">
                  <router-link to="user-profile" class="dropdown-item">
                    <i class="fas fa-user"></i>個人檔案
                  </router-link>
                </span>
                <a href="#" class="dropdown-item"><i class="fas fa-cog"></i>設定</a>
                <a href="#" class="dropdown-item"><i class="fas fa-globe-asia"></i>語言</a>
                <a href="javascript:;" class="dropdown-item" @click="changePwd"><i class="fas fa-lock"></i>變更密碼</a>
                <div class="dropdown-divider"></div>
                <a href="javascript:;" class="dropdown-item" @click="singOut"><i class="fas fa-sign-out-alt"></i>登出</a>
              </template>
            </DropdownMenu>
          </li>
        </ul>
      </div>
      <ChangePassword
        :modalInfo="modalInfo"
        @modalType="updateModalType"
      >
      </ChangePassword>
    </header>
</template>
<script>
import DropdownMenu from '@/components/dropdown/MenuTemp.vue'
export default {
  name: 'Header',
  components: {
    DropdownMenu,
    ChangePassword: () => import('@/components/modal/ChangePassword.vue')
  },
  data () {
    return {
      userInfo: {},
      dropDownMenu: {
        isShow: {
          profile: false,
          notice: false
        }
      },
      modalInfo: {
        isShow: false,
        type: '',
        title: '變更密碼'
      }
    }
  },
  mounted () {
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      if (this.$store.state.user.userInfo !== {}) {
        this.userInfo.userAccount = this.$store.state.user.userInfo.userAccount
        this.userInfo.firstText = this.$store.state.user.userInfo.userAccount.substr(0, 1)
        this.userInfo.pic = this.$store.state.user.userInfo.userPic ? this.$store.state.user.userInfo.userPic : null
      }
    },
    singOut () {
      this.$store.dispatch('SignOut').then(() => {
        this.$router.push({ path: 'Login' })
      });
    },
    dropDownEvent (item) {
      this.dropDownMenu.isShow[item] = !this.dropDownMenu.isShow[item]
    },
    updateDropdownIsShow (item) {
      this.dropDownMenu.isShow[item] = false
    },
    changePwd () {
      this.dropDownEvent('profile')
      this.updateModalType('changePassword')
    },
    updateModalType (type) {
      this.modalInfo.type = type
    }
  }

}
</script>

<style scoped lang="scss">
// header
.logo-bar {
  width: 200px;
  display: inline-block;
  background-color: #2a3f55;
  height: 50px;
  line-height: 50px;
  color: #fff;
  position: fixed;
  top: 0;
  .logo {
    height: 40px;
    width: 40px;
    margin: 5px auto;
    display: block;
  }
}
.header {
  width: calc(100vw - 200px);
  display: inline-block;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  box-shadow: 1px 1px 5px #e0dfdf;
  margin-left: 200px;
  ul {
    position: relative;
  }
  li {
    display: inline-block;
    margin-right: .5em;
    min-width: 40px;
    text-align: center;
    list-style: none;
    &.btn, .btn {
      cursor: pointer;
      &:hover {
        background-color: #e1eae3;
      }
    }
  }
  .title {
    position: absolute;
    left: 10px;
    font-weight: 400;
    font-size: 20px;
  }
  .default-img {
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background-color: rgba(38, 53, 68, 0.2);
    vertical-align: middle;
    margin-right: .2em;
    font-weight: bold;
    text-align: center;
    line-height: 22px;
  }
  .dropdown-toggle {
    cursor: pointer;
  }
  .dropdown-menu {
    min-width: 15rem;
    .fas {
      color: #404E67;
      padding-right: .5em;
    }
    .un-img {
      width: 60px;
      height: 60px;
      background-color: #404E67;
      color: #fff;
      text-align: center;
      font-size: 40px;
      line-height: 60px;
      margin: .5em auto 0;
    }
  }
  .dropdown-item {
    line-height: 1.5;
  }
}
// header end

</style>
