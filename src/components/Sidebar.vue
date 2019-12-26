<template>
  <div id="sidebar" class="side-bar">
    <!-- <div class="side-bar__title">Menu ...</div> -->
    <Menu :nav="nav" :isOpen="true" />
  </div>
</template>
<script>
import Menu from '@/components/Menu.vue'
export default {
  name: 'Sidebar',
  data () {
    return {
      nav: [{
        text: 'Home',
        path: null,
        children: [{
          text: '帳號管理',
          path: '/datatable',
          children: null
        }, {
          text: '權限管理',
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
  },
  components: {
    Menu
  }
}
</script>

<style scoped lang="scss">
  .side-bar {
    display: inline-block;
    width: 200px;
    height: calc(100vh - 50px);
    background-color: #2a3f55;
    overflow: auto;
    color: #fff;
    position: fixed;
    top: 50px;
    .side-bar__title {
      // padding: .1em .6em;
      font-size: 13px;
    }
  }
</style>
