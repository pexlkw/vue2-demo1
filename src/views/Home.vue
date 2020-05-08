<template>
  <div>
    <Header />
    <Sidebar />
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'home',
  components: {
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
