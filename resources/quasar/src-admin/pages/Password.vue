<template>
  <q-page padding class="flex flex-center column">
    <q-input type="password" dense v-model="password" outlined label="New Password" />
    <q-btn label="Change Password" class="q-mt-xs" color="primary" :loading="loading" @click="change" />
  </q-page>
</template>

<script>
export default {
  name: "PagePassword",
  data(){ return {
    password: '', loading: false
  } },
  methods: {
    change(){
      this.loading = true;
      this.$store.dispatch('SERVER/password',this.password)
        .then(() => {
          this.loading = false;
          this.password = '';
          this.$router.push({ name:'home' })
        })
    }
  },
}
</script>
