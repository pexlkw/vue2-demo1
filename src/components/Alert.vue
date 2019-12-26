<template>
  <div class="alert">{{ alertMsg }}</div>
</template>

<script>
  export default {
  name: 'Alert',
  props: ['alertMsg'],
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