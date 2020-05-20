<template>
    <section class="update d-flex flex-column align-items-center justify-content-center" style="height: 65vh">
        <div class="card flex-grow-0">
            <div class="card-body">
                <h6 class="card-title">Update</h6>
                <input type="text" v-model="name" class="form-control" placeholder="Name">
                <input type="text" v-model="phone" class="form-control my-1" placeholder="Phone">
                <textarea v-model="address" class="form-control" placeholder="Address"></textarea>
                <button class="float-right btn btn-primary btn-sm btn-block mt-1" @click="update">Update</button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Customer",
        props: ['id'],
        data(){ return {
            v_name: '', v_phone: '', v_address: ''
        } },
        computed: {
            customer(){ return this.$store.getters["CUSTOMERS/customer"](this.id) },
            name: {
                get(){ return this.v_name = this.customer.name },
                set(val){ this.v_name = val; }
            },
            phone: {
                get(){ return this.v_phone = this.customer.phone },
                set(val){ this.v_phone = val; }
            },
            address: {
                get(){ return this.v_address = this.customer.address },
                set(val){ this.v_address = val; }
            }
        },
        methods: {
            update(){ this.$store.dispatch('CUSTOMERS/update',{ id:this.id,name:this.v_name,phone:this.v_phone,address:this.v_address }).then(() => this.$router.push({ name:'customers' }) ) }
        },
        beforeRouteUpdate(to,from,next){
            this.$store.dispatch('CUSTOMERS/fetch',this.id);
            next();
        }
    }
</script>