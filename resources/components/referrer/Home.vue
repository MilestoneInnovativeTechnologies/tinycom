<template>
    <b-container class="mt-3" fluid>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div><h5>Hi, {{ $store.getters["PROFILE/name"] }}</h5></div>

        </div>
    </b-container>
</template>

<script>
    export default {
        name: "Home",
    }
</script>