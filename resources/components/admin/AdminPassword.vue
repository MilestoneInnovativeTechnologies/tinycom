<template>
    <section style="height: 100vh">
        <div style="position: relative; top:50%; transform: translateY(-50%); text-align: center; font-family: monospace; width: 50vw; margin: auto">
            <input type="password" name="password" v-model="password" class="form-control text-center" placeholder="New Password">
            <input type="button" name="change" value="Change Password" class="text-center btn btn-block btn-info mt-2" @click.prevent="change">
            <a @click="$router.push({ name:'home' })" href="#" class="mt-4 d-block">Home</a>
        </div>
    </section>
</template>

<script>
    export default {
        name: "AdminPassword",
        data(){ return { password:'' } },
        methods: {
            change(){ this.$store.dispatch('SERVER/password',this.password).finally(() => this.$router.push({ name:'home' })) }
        },
        beforeRouteLeave (to, from, next) {
            this.password = '';
            next()
        }
    }
</script>