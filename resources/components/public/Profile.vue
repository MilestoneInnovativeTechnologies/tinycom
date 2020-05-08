<template>
    <section class="profile">
        <div class="card mt-3">
            <div class="card-header"><div class="card-title mb-0">Update</div></div>
            <div class="card-body">
                <input type="text" v-model="name" class="form-control mb-1" placeholder="Name"></input>
                <input type="text" v-model="phone" class="form-control" placeholder="Phone"></input>
            </div>
            <div class="card-footer">
                <i class="mt-2 text-success float-left" v-if="processing">{{ text }}</i>
                <button class="float-right btn btn-success btn-sm" @click="updateProfile">Update</button>
            </div>
        </div>
        <UserCart />
    </section>

</template>

<script>
    export default {
        name: "Profile",
        data(){ return { name:this.$route.params.name,phone:this.$route.params.phone,processing:false,text:'',msg:'Processing... Please wait!!' } },
        methods: {
            updateProfile(){
                this.process();
                if(!this.phone) return this.process('Phone is mandatory fields. Please fill!');
                this.$store.dispatch('USER/update',{ name:this.name,phone:this.phone })
                    .then((R) => _.isString(R) ? this.process(R) : this.process('Updated successfully!!'));
            },
            process(text){ this.processing = true; this.text = text || this.msg }
        },
        watch: {
            processing(val){ if(val) setTimeout(($vm) => $vm.processing = false,5000,this) }
        }
    }
</script>
