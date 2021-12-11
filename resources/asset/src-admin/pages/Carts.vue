<template>
  <q-page padding>
    <Carts source="carts" />
  </q-page>
</template>

<script>
import Carts from "components/Carts";
export default {
  name: "PageCarts",
  components: {Carts},
}
</script>
