<template>
    <section class="home">
        <div class="card my-2"><div class="card-body"><Orders /></div></div>
        <div class="card my-2"><div class="card-body"><Sources :add="false" /></div></div>
        <div class="card my-2"><div class="card-body"><LiveCustomers /></div></div>
        <div class="card my-2"><div class="card-body"><LiveCarts /></div></div>
    </section>
</template>

<script>
    export default {
        name: "AdminHome",
    }
</script>