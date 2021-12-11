<template>
  <RecordList :records="customers" :layout="columns" row_key="id" :limit="limit || 25" :back="source" route="customer" />
</template>

<script>
    import RecordList from "components/RecordList";
    export default {
      name: "Customers",
      components: {RecordList},
      props: ['limit','filter','source'],
        data(){ return {
          columns: [{ name:'serial',field:'id',label:'#',format: (idx) => idx },{ name:'name',field:'name',label:'Name', align:'left' },{ name:'phone',field:'phone',label:'Phone' }],
            layout: { ID:'id',Name:'name',Phone:'phone' },
            name:'', phone: '', address: '',
        } },
        computed: {
          records(){ return _.values(this.$store.state.CUSTOMERS.CUSTOMERS) },
          customers(){ return this.filter ? _.filter(this.records,({ name,phone,address }) => _.includes([name,phone,address].join(' ').toLowerCase(),_.toLower(this.filter))) : this.records }
        },
        methods: {
            create(post){
                if(!post) return $(this.$refs['customer_create_modal']).modal('show');
                if(this.name && this.phone) this.$store.dispatch('CUSTOMERS/create',{ name:this.name,phone:this.phone,address:this.address }).then(() => { this.name = ''; this.phone = '' }) }
        }
    }
</script>
