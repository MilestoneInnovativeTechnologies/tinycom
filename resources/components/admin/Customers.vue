<template>
    <section class="sources">
        <div class="modal fade" tabindex="-1" role="dialog" ref="customer_create_modal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">New Customer</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <p class="lead"> Please fill all details</p>
                        <input type="text" v-model="name" class="form-control mb-1" placeholder="Name">
                        <input type="text" v-model="phone" class="form-control mb-1" placeholder="Phone">
                        <textarea v-model="address" class="form-control" placeholder="Address"></textarea>
                    </div>
                    <div class="modal-footer"><button type="button" class="btn btn-info" @click.prevent="create(true)" data-dismiss="modal">Add Customer</button></div>
                </div>
            </div>
        </div>
        <RecordList title="Customers" :records="records" :layout="layout" :limit="15" route="customer" />
        <button v-if="add !== false" class="btn btn-primary btn-block" @click.prevent="create(false)">Add New Customer</button>
    </section>
</template>

<script>
    export default {
        name: "Customers",
        props: ['add'],
        data(){ return {
            layout: { ID:'id',Name:'name',Phone:'phone' },
            name:'', phone: '', address: '',
        } },
        computed: {
            records(){ return this.$store.state.CUSTOMERS.CUSTOMERS }
        },
        methods: {
            create(post){
                if(!post) return $(this.$refs['customer_create_modal']).modal('show');
                if(this.name && this.phone) this.$store.dispatch('CUSTOMERS/create',{ name:this.name,phone:this.phone,address:this.address }).then(() => { this.name = ''; this.phone = '' }) }
        }
    }
</script>