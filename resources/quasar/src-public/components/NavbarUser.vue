<template>
  <q-btn v-if="!user && !profile" flat unelevated label="Login" :to="{ name:'profile' }" />
  <q-btn v-else-if="!user && profile" flat unelevated label="Back to Shop" :to="{ name:'home' }" />
  <q-btn v-else-if="user && profile" flat unelevated label="Logout" @click="logout" />
  <q-btn v-else flat unelevated :label="name" :to="{ name:'profile' }" />
</template>

<script>
    export default {
        name: "NavbarUser",
        computed: {
            user(){ return this.$store.state.USER.USER; },
            name(){ return _.get(this.user,'name') },
            phone(){ return _.get(this.user,'phone') },
            login(){ return this.$route.name === 'login' },
            profile(){ return this.$route.name === 'profile' },
        },
      methods: {
        logout(){ location.href = location.origin + '/user/logout' }
      }
    }
</script>
