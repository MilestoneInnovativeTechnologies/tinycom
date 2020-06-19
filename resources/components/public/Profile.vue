<template>
    <section class="profile">
        <div class="card mt-4" v-if="user">
            <div class="card-header"><div class="card-title mb-0">Update</div></div>
            <div class="card-body">
                <span class="text-muted">Name</span>
                <input type="text" v-model="name" class="form-control mb-2" placeholder="Name">
                <span class="text-muted">Phone</span>
                <input type="text" v-model="phone" class="form-control" placeholder="Phone">
            </div>
            <div class="card-footer">
                <i class="mt-2 text-success float-left" v-if="processing">{{ text }}</i>
                <button class="float-right btn btn-success btn-sm" @click="updateProfile" :disabled="disabled">Update</button>
            </div>
        </div>
        <div class="card mt-3" v-else>
            <UserLoginCardBody />
        </div>
        <UserCart />
    </section>
</template>

<script>
    export default {
        name: "Profile",
        data(){ return { v_name:'',v_phone:'',processing:false,text:'',msg:'Processing... Please wait!!',disabled:false } },
        methods: {
            updateProfile(){
                this.process(); if(!this.phone) return this.process('Phone is mandatory fields. Please fill!');
                this.disabled = true;
                this.$store.dispatch('USER/update',{ name:this.v_name,phone:this.v_phone })
                    .then((R) => {
                        if(_.isString(R)) this.process(R)
                        else this.process('Updated successfully!!')
                        this.disabled = false;
                    });
            },
            process(text){ this.processing = true; this.text = text || this.msg }
        },
        computed: {
            user(){ return this.$store.state.USER.USER },
            name: {
                get(){ return this.v_name = this.user.name },
                set(val){ this.v_name = val },
            },
            phone: {
                get(){ return this.v_phone = this.user.phone },
                set(val){ this.v_phone = val },
            }
        },
        watch: {
            processing(val){ if(val) setTimeout(($vm) => $vm.processing = false,5000,this) }
        }
    }
</script>
