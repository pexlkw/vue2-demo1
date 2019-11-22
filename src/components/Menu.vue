<template>
    <nav class="nav">
        <ul>
            <li 
                v-for="(item, i) in nav"
                :key="i">
                <template v-if="!item.children">
                    <router-link :to="item.path">{{ item.text }}</router-link>
                </template>
                <template v-else>
                    <a href="javascript:void(0)">{{ item.text }}</a>
                    <Menu :nav="item.children" />
            </template>
            </li>
        </ul>
    </nav>
</template>

<script>
    import Menu from '@/components/Menu.vue'

    export default {
        name: 'Menu',
        props: ['nav'],
        components: {
            Menu
        }
    }
</script>

<style scoped lang="scss">
ul, li {
    list-style: none;
}
</style>