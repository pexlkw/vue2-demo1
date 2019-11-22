<template>
  <div>
    <Header />
    <Sidebar />
    <!-- <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div> -->
    <main class="main">
      <router-view />
    </main>
  
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Header,
    Sidebar
  }
}
</script>
<style scoped lang="scss">
  .main {
    width: calc(100vw - 200px);
    display: inline-block;
    vertical-align: top;
    margin-left: 200px;
    // margin-top: 50px;
  }
  .page-title{
    font-weight: 400;
    &:before {
      content: '';
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: #007bff;
      margin-right: .5em;
    }
}
</style>

