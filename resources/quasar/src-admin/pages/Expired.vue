<template>
  <q-page padding class="flex flex-center">
    <q-card class="text-negative">
      <q-card-section><strong class="font-weight-bold">Dear Administrator,</strong></q-card-section>
      <q-card-section>
        It seems you have no any active subscriptions exists. <br /><br />
        Please renew a subscription to enjoy seamless experience of this portal<br /><br />
        Sorry for the inconvenience caused.
      </q-card-section>
      <q-card-section>
        <q-btn label="Visit Home" color="primary" :to="{ name:'expired' }" class="full-width"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "PageExpired",
}
</script>
