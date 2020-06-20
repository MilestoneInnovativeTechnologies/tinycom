<template>
    <div class="d-flex justify-content-around align-items-center flex-column" style="height: 75vh;">
        <p class="lead text-danger" style="width: 75vw;">
            <strong class="font-weight-bold">Dear Administrator,</strong><br /><br />
            It seems you have no any active subscriptions exists. <br /><br />
            Please renew a subscription to enjoy seamless experience of this portal<br /><br />
            Sorry for the inconvenience caused.
            <a @click.prevent="$router.push({ name:'expired' })" href="#" class="btn btn-block btn-outline-primary mt-2"> Visit Home </a>
        </p>
    </div>
</template>

<script>
    export default {
        name: "ExpiredHome"
    }
</script>