<template>
    <section class="records">
        <nav class="navbar">
            <h4 v-if="title" class="navbar-brand mb-0">{{ title }}</h4>
            <ul class="pagination pagination-sm justify-content-end mb-0">
                <li class="page-item"><a class="page-link" @click.prevent="page = 1">&laquo;</a></li>
                <li class="page-item "><a class="page-link" v-if="page-1 >= 1" :class="{ disabled:page <= 1 }" @click.prevent="prev">{{ page - 1 }}</a></li>
                <li class="page-item active"><a class="page-link">{{ page }}</a></li>
                <li class="page-item "><a class="page-link" v-if="page+1 <= pages" :class="{ disabled:page >= pages }" @click.prevent="next">{{ page + 1 }}</a></li>
                <li class="page-item"><a class="page-link" @click.prevent="page = pages">&raquo;</a></li>

            </ul>
        </nav>
        <div class="table-responsive">
            <table class="table table-sm">
                <thead><tr><th>#</th><th v-for="(key,head,idx) in layout" :key="'record-list-table-head-index-'+idx">{{ head }}</th><th v-if="route">&nbsp;</th></tr></thead>
                <tbody><tr v-for="(record,idx) in records.slice(start || 0,((start || 0) + (limit || def_limit)))" :key="'record-list-item-index-'+idx">
                    <td>{{ idx+1 }}</td>
                    <td v-for="(key,head,idx) in layout" :key="'record-list-table-head-index-'+idx">{{ content(record,key) }}</td>
                    <td v-if="route"><button @click="$router.push({ name:route,params:{ id:record.id } })" class="btn btn-sm btn-link"><i class="fas fa-angle-double-right"></i></button></td>
                </tr></tbody>
            </table>
        </div>
    </section>
</template>

<script>
    export default {
        name: "RecordList",
        props: ['records','title','limit','layout','truncate','route'],
        data(){ return {
            page: 1,
            def_limit: 5,
        } },
        computed: {
            start(){ return (_.toInteger(this.page) - 1) * _.toInteger(this.limit || this.def_limit) },
            pages(){ return Math.ceil(this.records.length/(this.limit || this.def_limit)); }
        },
        methods: {
            content(record,key){ return _.truncate(_.toString(_.get(record,key)),{ length:this.truncate || 100,separator:'...' }) },
            prev(){ if(-- this.page < 1) this.page = 1; },
            next(){ this.page++ },
        }
    }
</script>