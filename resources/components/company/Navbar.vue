<template>
    <b-navbar toggleable="sm" type="dark" variant="info">
        <b-navbar-brand :to="{ name:'home' }">{{ $root.APP }}</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav v-if="links">
                <b-nav-item v-for="link in links" :key="'company-navs-nav-' + link" :to="{ name:snakeCase(link) }" :active="active(snakeCase(link))">{{ link }}</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <template v-slot:button-content><em>{{ $store.getters['PROFILE/name'] }}</em></template>
                    <b-dropdown-item :to="{ name:'profile' }" :active="active('companies')">Profile</b-dropdown-item>
                    <b-dropdown-item :href="$root.LOGOUT">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: "Navbar",
        data(){ return {
            links: require('./../../js/routes/company').links,
        } },
        computed: {
            active(){ return (name) => this.$route.name === name },
            snakeCase(){ return _.snakeCase },
        }
    }
</script>