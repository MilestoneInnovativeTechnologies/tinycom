<template>
    <dl>
        <dt><b-icon v-if="icon" :icon="icon" class="mr-1"></b-icon>{{ title }}</dt>
        <dd><slot></slot></dd>
    </dl>
</template>

<script>
    export default {
        name: "Detail",
        props: ['title'],
        computed: {
            icon(){ return _.get(this.$attrs,'icon',null) }
        }
    }
</script>