<template>
    <ul class="navbar-nav">
        <router-link v-if="!user" :to="{ name:'profile' }" tag="li" class="nav-item"><a class="nav-link btn btn-light m-0 p-2">Login</a></router-link>
        <li v-else-if="profile" class="nav-item"><a class="btn btn-light" href="/user/logout"><i class="fas fa-sign-out-alt mr-1"></i> Logout</a></li>
        <router-link v-else :to="{ name:'profile' }" tag="li" class="nav-item"><a>{{ name }}</a></router-link>
    </ul>
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
        }
    }
</script>