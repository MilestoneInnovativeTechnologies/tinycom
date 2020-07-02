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
        <template v-if="remain < limit">
            <hr><p :class="cls">
                <span v-if="remain < 0" class="font-weight-bolder">Your subscriptions expired..<br>Features limited..<br>All services will be stopped soon!!</span>
                <span v-else>
                    {{ edition }} Edition - Ony {{ remain }} Day{{ remain > 1 ? 's' : ''}} Remaining!
                    <template v-if="remain < alert"><br  />Services will be limited if not renewed<template v-if="remain === 0"> by today</template>.</template>
                </span>
            </p>
        </template>
    </div>
</template>

<script>
    export default {
        name: "NavActions",
        data(){ return {
            links: require('./../../js/routes/admin').links,
            SUBSCRIPTIONS, limit:15, warn:7, alert:3
        } },
        computed: {
            end(){ return _(this.SUBSCRIPTIONS).sort(({ end }) => new Date(end).getTime()).map('end').reverse().first() },
            remain(){ return this.end ? _.floor((new Date(this.end).getTime() - new Date().getTime())/86400000) : 0 },
            edition(){ return _.get(_(this.SUBSCRIPTIONS).find(['status','Current']),['edition','name']) },
            cls(){ return ['text-center'].concat(this.remain > this.warn ? 'text-success' : (this.remain > this.alert ? 'text-warning' : 'text-danger')) }
        },
        methods: {
            snakeCase(text){ return _.snakeCase(text) }
        }
    }
</script>
