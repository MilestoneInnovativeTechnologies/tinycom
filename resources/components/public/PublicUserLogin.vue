<template>
    <section class="login d-flex flex-column align-items-center justify-content-center" style="height: 65vh">
        <div class="card flex-grow-0">
            <div class="card-body">
                <h6 class="card-title">Login</h6>
                <input type="text" v-model="phone" class="form-control" placeholder="Phone"></input>
                <button class="float-right btn btn-primary btn-sm btn-block mt-1" @click="proceed">Login</button>
            </div>
            <hr class="hr-or">
            <div class="card-body">
                <h6 class="card-title">Register</h6>
                <input type="text" v-model="name" class="form-control mb-1" placeholder="Name"></input>
                <input type="text" v-model="phone" class="form-control" placeholder="Phone"></input>
                <button class="float-right btn btn-primary btn-sm btn-block mt-1" @click="proceed">Register</button>
            </div>
        </div>
        <i class="mt-2 text-info" v-if="processing">{{ text }}</i>
    </section>
</template>

<script>
    export default {
        name: "PublicUserLogin",
        data(){ return { name:'',phone:'',processing:false,text:'',msg:'Processing... Please wait!!' } },
        methods: {
            proceed(){
                this.process();
                if(!this.phone) return this.process('Phone is mandatory fields. Please fill!');
                this.$store.dispatch('USER/login',{ name:this.name,phone:this.phone }).then(() => this.$router.push({ name:'home' }))
            },
            process(text){ this.processing = true; this.text = text || this.msg }
        },
        watch: {
            processing(val){ if(val) setTimeout(($vm) => $vm.processing = false,5000,this) }
        }
    }
</script>