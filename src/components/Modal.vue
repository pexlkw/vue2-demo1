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
    </div>

</template>

<script>
    import Menu from '@/components/Menu.vue'

    export default {
        name: 'Modal',
        props: ['id'],
    }
</script>
