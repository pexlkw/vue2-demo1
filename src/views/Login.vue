<template>
  <div class="login">
    <div class="card">
        <h1>LOGIN <span>BETA</span></h1>
        <form >
            <div class="form-group text-left">
              <label for="exampleInputEmail1 ">帳號</label>
              <input ref="userAccount" type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">請輸入你的E-mail.</small>
            </div>
            <div class="form-group text-left">
              <label for="exampleInputPassword1">密碼</label>
              <input ref="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div id="formFooter" class="text-right">
              <a class="underlineHover" href="#">Forgot Password?</a>
            </div>
            <button type="button" class="btn btn-success" @click="handleLogin">Submit</button>
        </form>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      redirect: null
    }
  },
  methods: {
    handleLogin () {
      this.sendEvent();
    }, // login click event
    // validEvent () {}, // 檢核
    sendEvent () {
      const params = {
        userAccount: this.$refs.userAccount.value, // 'ADMIN'
        password: this.$refs.password.value // 'welcome1'
      }
      this.$store.dispatch('Login', params).then(() => {
        this.$router.push(this.$route.query.redirect || '/user-manage'); // 回到上一頁或是首頁
      });
    },
    errorCallback () {

    }
  }
}
</script>

<style lang="scss">
.login {
  background: url('../assets/login_background1.jpg') no-repeat center;
  height: 100vh;
  // padding-top: 2em;
  h1 {
    span {
        display: inline-block;
        padding: 0 .2em;
        background-color: #28a745;
        color: #fff;
        font-size: 20px;
        vertical-align: middle;
    }
  }
  .card {
    width: 360px;
    height: 360px;
    padding: 2em;
    margin: auto;
    background-color: rgba($color: #fff, $alpha: .9);
    border-bottom: 6px solid #28a745;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  label {
    margin-bottom: 0;
    margin-left: 2px;
  }
}
</style>
