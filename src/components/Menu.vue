<template>
  <ul v-show="isOpen" transition="slide">
    <li
      v-for="(item, i) in nav"
      :key="i"
      class="menu-item">
      <template v-if="!item.children">
        <router-link :to="item.path" class="menu-item" active-class="is-active">{{ item.text }}</router-link>
      </template>
      <template v-else>
        <a
          href="javascript:void(0)"
          class="menu-submenu"
          :class="{'isOpen': submenuIsOpen}"
          @click="clickEvent">
          {{ item.text }}
        </a>
        <Menu :nav="item.children" />
      </template>
    </li>
  </ul>
</template>

<script>
import Menu from '@/components/Menu.vue'

export default {
  name: 'Menu',
  props: ['nav', 'isOpen', 'nowPath'],
  components: {
    Menu
  },
  data () {
    return {
      submenuIsOpen: false
    }
  },
  methods: {
    clickEvent (e) {
      const triggerElement = e.target.nextElementSibling.classList;
      if (triggerElement.contains('is-open')) {
        triggerElement.remove('is-open');
      } else {
        triggerElement.add('is-open');
      }
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
        transition: all .5s;
        width: 100%;
        height: 40px;
        line-height: 40px;
        vertical-align: middle;
        display: inline-block;
        color: #b2c7af;
        position: relative;
        padding-left: 1em;
        &:hover {
          text-decoration: none;
          color: white;
          background-color: #233547;
        }
      }
      .is-active {
        background-color: #1e9874;
        color: white;
        &:hover {
          background-color: #1e9874;
        }
      }
      .is-open {
        display: block !important;
      }
      .menu-item {
        border-radius: 5px;
      }
      .menu-submenu {
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
