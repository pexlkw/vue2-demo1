<template>
  <div class="modal" tabindex="-1" role="dialog" :id="id">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <slot name="header"></slot>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
    <div class="modal-backdrop show"></div>
  </div>
</template>

<script>

export default {
  name: 'ModalTemp',
  props: ['id']
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
