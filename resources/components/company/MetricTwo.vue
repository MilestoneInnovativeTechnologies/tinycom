<template>
    <b-jumbotron class="text-center py-3" :header-level="level || 4" :bg-variant="variant || 'info'" :text-variant="color || 'white'" :lead="text || ''">
        <template v-slot:header>
            <b-icon :icon="icon || 'star'" :animation="animation || ''"></b-icon>
            <div><slot></slot></div>
        </template>
    </b-jumbotron>
</template>

<script>
    import { BJumbotron } from 'bootstrap-vue'

    export default {
        name: "MetricTwo",
        components: { BJumbotron },
        props: ['level','variant','icon','animation','color','text']
    }
</script>
