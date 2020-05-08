<template>
  <transition name="fade">
    <div v-if="isShow" class="dropdown-menu dropdown-menu-right show">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MenuTemp',
  props: {
    id: String,
    isShow: Boolean
  }
}
</script>
<style scoped lang="scss">
.fade-enter-active {
  transition: all .4s ease;
}
.fade-leave-active {
  transition: all .2s ease;
}

.fade-enter {
  transform: translateY(-50px);
  opacity: 0;
}

.fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
