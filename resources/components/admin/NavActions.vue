<template>
    <div class="navbar-collapse nav_actions bg-light px-3" style="height: 0vh">
        <div class="row mt-2">
            <div class="col">
                <ul class="navbar-nav">
                    <router-link v-for="(link,idx) in links" v-if="!(idx % 2)" :key="['nav','link',idx].join('-')" :to="{ name:snakeCase(link) }" tag="li" class="mb-1"><a class="nav-link btn btn-info">{{ link }}</a></router-link>
                </ul>
            </div>
            <div class="col">
                <ul class="navbar-nav">
                    <router-link v-for="(link,idx) in links" v-if="(idx % 2)" :key="['nav','link',idx].join('-')" :to="{ name:snakeCase(link) }" tag="li" class="mb-1"><a class="nav-link btn btn-info">{{ link }}</a></router-link>
                </ul>
            </div>
        </div>
        <hr>
        <div class="d-flex justify-content-around">
            <a href="/admin/login" class="text-center d-block">Logout</a> |
            <a href="#" @click.prevent="$router.push({ name: 'password' })" class="text-center d-block">Change Password</a> |
            <a href="#" @click.prevent="$router.push({ name: 'logo' })" class="text-center d-block">Change Logo</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavActions",
        data(){ return {
            links: require('./../../js/routes/admin').links,
        } },
        methods: {
            snakeCase(text){ return _.snakeCase(text) }
        }
    }
</script>