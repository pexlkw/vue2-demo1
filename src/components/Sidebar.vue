<template>
  <div id="sidebar" class="side-bar">
    <!-- <div class="side-bar__title">Menu ...</div> -->
    <Menu :nav="nav" :isOpen="true" :nowPath="nowPath" />
  </div>
</template>
<script>
import Menu from '@/components/Menu.vue'
export default {
  name: 'Sidebar',
  data () {
    return {
      nowPath: this.$route.path,
      nav: [{
        text: 'Home',
        path: null,
        isOpen: false,
        children: [{
          text: '帳號管理',
          path: '/user-manage',
          children: null
        }, {
          text: '使用者中心',
          path: '/user-profile',
          children: null
        }, {
          text: '權限管理',
          path: '/about',
          children: null
        }]
      }, {
        text: 'About',
        path: '/about',
        isOpen: false,
        children: [{
          text: '帳號管理',
          path: '/user-manage',
          children: null
        }]
      }, {
        text: 'Item1',
        path: '/about',
        isOpen: false,
        children: null
      }, {
        text: 'Item2',
        path: '/about',
        isOpen: false,
        children: null
      }]
    }
  },
  components: {
    Menu
  },
  mounted () {
    this.initOpen();
  },
  methods: {
    initOpen () {
      const isActiveElement = document.querySelector('.is-active');
      isActiveElement.closest('ul').classList.add('is-open');
    }
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
    padding: 0 8px;
    .side-bar__title {
      // padding: .1em .6em;
      font-size: 13px;
    }
  }
</style>
