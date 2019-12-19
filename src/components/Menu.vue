<template>
  <ul v-show="isOpen" transition="slide">
    <li
      v-for="(item, i) in nav"
      :key="i">
      <template v-if="!item.children">
        <router-link :to="item.path" class="menu-item">{{ item.text }}</router-link>
      </template>
      <template v-else>
        <a 
          href="javascript:void(0)" 
          class="menu-submenu" 
          :class="{'isOpen': submenuIsOpen}"
          @click="submenuIsOpen = !submenuIsOpen">
            {{ item.text }}
        </a>
        <Menu :nav="item.children" :isOpen="submenuIsOpen"/>
        
      </template>
    </li>
  </ul>
</template>

<script>
import Menu from '@/components/Menu.vue'

export default {
  name: 'Menu',
  props: ['nav', 'isOpen'],
  components: {
    Menu
  },
  data() {
    return {
      submenuIsOpen: false
    }
  }
}
</script>

<style scoped lang="scss">
  ul, li {
      list-style: none;
      padding: 0;
      display: block;
      box-sizing: border-box;
      > a {
        width: 100%;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
        display: inline-block;
        color: white;
        position: relative;
        padding-left: 1em;
        &:hover {
          text-decoration: none;
          background-color: #1e9874;
        }
      }
      .menu-submenu {
        &.isOpen {
          box-shadow: 1px 1px 5px 1px #1e2021;
        }
        & + ul {
          background-color: #375775;
          a {
            padding-left: 2em;
          }
        }
        &:after {
          content: '\0203A';
          position: absolute;
          right: 12px;
          top: 0;
          font-size: 20px;
        }
      }
  }
</style>
