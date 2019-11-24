<template>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <header>
      <div class="logo-bar">
        <div class="logo"> LOGO </div>
      </div>
      <div class="header text-right">
        <ul>
          <li class="title">權限管理系統</li>
          <li class="notice"> Notice</li>
          <li><span class="default-img">A</span>Admin</li>
          <li>Logout</li>
        </ul>
      </div>
    </header>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      nav: [{
        text: 'Home',
        path: null,
        children: [{
          text: 'Home-1',
          path: '/',
          children: null
        }, {
          text: 'Home-2',
          path: '/about',
          children: null
        }]
      }, {
        text: 'About',
        path: '/about',
        children: null
      }, {
        text: 'Item1',
        path: '/about',
        children: null
      }, {
        text: 'Item2',
        path: '/about',
        children: null
      }]
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
    margin-right: 1em;
    list-style: none;
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
}
// header end

</style>
