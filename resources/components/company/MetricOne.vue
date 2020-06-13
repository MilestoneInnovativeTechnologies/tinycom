<template>
    <div class="d-flex align-items-center justify-content-between">
        <b-img left :src="img" width="64" class="mr-3"></b-img>
        <div class="text-right flex-grow-1">
            <h2 :class="'mb-0 text-' + variant">{{ count }}</h2>
            <h5 :class="'mb-0 text-' + variant">{{ text }}</h5>
        </div>
        <div class="ml-2" v-if="to"><b-icon @click="$router.push({ name:to })" :variant="variant" icon="arrow-bar-right"></b-icon> </div>
    </div>
</template>

<script>
    import { VBHover } from 'bootstrap-vue'
    Vue.directive('b-hover', VBHover)

    export default {
        name: "MetricOne",
        props: ['img','count','text','variant','to'],
        methods: {
            hover(status,{ target }){ console.log(status,target); },
        }
    }
</script>