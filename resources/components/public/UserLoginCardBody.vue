<template>
    <div class="card-body">
        <h6 class="card-title">Login</h6>
        <input type="text" v-model="phone" class="form-control" placeholder="Phone"></input>
        <button class="float-right btn btn-primary btn-sm btn-block mt-1" @click.prevent="proceed">Proceed</button>
        <i class="mt-2 text-info" v-if="processing">{{ text }}</i>
    </div>
</template>

<script>
    export default {
        name: "UserLoginCardBody",
        data(){ return { name:'',phone:'',processing:false,text:'',msg:'Processing... Please wait!!' } },
        methods: {
            proceed(){
                this.process();
                if(!this.phone) return this.process('Phone is mandatory fields. Please fill!');
                this.$store.dispatch('USER/login',{ name:this.name,phone:this.phone });//.then(() => this.$router.push({ name:'home' }))
            },
            process(text){ this.processing = true; this.text = text || this.msg }
        },
        computed: {
            user(){ return this.$store.state.USER.USER },
        },
        watch: {
            processing(val){ if(val) setTimeout(($vm) => $vm.processing = false,5000,this) }
        }
    }
</script>