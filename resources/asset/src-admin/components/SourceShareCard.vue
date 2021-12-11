<template>
  <q-card v-if="source">
    <q-card-section class="q-pb-none">
      <q-input type="textarea" outlined dense style="height: 4rem" :value="url" label="Sharable Link" />
    </q-card-section>
    <q-card-actions class="q-px-md q-gutter-sm">
      <q-btn type="a" push color="primary" label="Share via WhatsApp" :href="whatsapp" target="_blank" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: "SourceShareCard",
  props: ['id'],
  computed: {
    source(){ return this.$store.getters["SOURCES/source"](this.id) },
    phone(){ return this.source.customers.length === 1 ? ('91' + _.get(this.$store.getters["CUSTOMERS/customer"](this.source.customers[0]),'phone')) : ''},
    url(){ return urlParse('SOURCE_LINK',{ uuid:this.source.uuid }) },
    whatsapp(){ return urlParse('WHATSAPP',{ text:this.url,phone:this.phone }) },
  }

}
</script>
