<template>
  <div>
    <q-card class="q-py-md">
      <q-card-actions>
        <q-btn :loading="loading" push color="primary" class="full-width" label="confirm order" @click="confirm" />
      </q-card-actions>
      <q-card-actions align="center">
        <q-btn :loading="loading" flat label="cancel" text-color="negative" @click="cancel(null)" />
        <q-btn :loading="loading" flat label="update from server" text-color="warning" />
      </q-card-actions>
    </q-card>
    <q-dialog v-model="prompt" persistent>
      <q-card>
        <q-card-section><div class="text-h6">Reason</div></q-card-section>
        <q-card-section class="q-pt-none"><q-input dense v-model="reason" autofocus /></q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Submit" v-close-popup @click="cancel(reason)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section><div class="text-h6">Error</div></q-card-section>
        <q-card-section class="q-pt-none">{{ error }}</q-card-section>
        <q-card-actions align="right"><q-btn flat label="OK" color="primary" v-close-popup /></q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import formData from "./../assets/formData";
export default {
  name: "OrderActionCard",
  props: ['id'],
  data(){ return {
    loading: false,
    prompt: false, alert: false,
    reason: '', error: ''
  } },
  methods: {
    confirm(){
      this.loading = true;
      this.$store.dispatch('CARTS/confirm',this.id).then(({ error,message }) => {
        this.loading = false;
        if(!error) return this.$router.push({ name:'bill',params:{ id:this.id } })
        this.error = message; this.alert = true;
      })
    },
    cancel(reason){
      this.prompt = false;
      if(!reason) return this.prompt = true;
      this.$store.dispatch('CARTS/cancel',formData.obj({ id:this.id,reason })).then(({ error,message }) => {
        this.loading = false;
        if(!error) this.$router.push({ name:'orders' })
      })
    },
    fetch(){
      this.$store.dispatch('CARTS/fetch',this.id)
    }
  }
}
</script>
