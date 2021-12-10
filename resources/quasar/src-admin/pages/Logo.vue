<template>
  <q-page padding>
    <q-card>
      <img :src="logo">
      <q-card-section>
        <q-form ref="logo-form">
          <q-input type="file" name="image" id="image" borderless />
          <q-btn class="full-width" label="Upload" push color="primary" @click="submit" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "PagePassword",
  data(){ return { logo:URL.LOGO } },
  methods: {
    submit(){
      this.$store.dispatch('SERVER/serverItemAction',{ data:new FormData(this.$refs['logo-form'].$el),item:'company',action:'logo' })
        .then(url => {
          if(!url) return;
          this.logo = url; let mime = 'image/' + _.last(url.split('.'));
          if(document.getElementById('link-icon')){
            document.getElementById('link-icon').setAttribute('href',url);
            document.getElementById('link-icon').setAttribute('type',mime);
          }
          if(document.getElementById('link-short-icon')){
            document.getElementById('link-short-icon').setAttribute('href',url);
            document.getElementById('link-short-icon').setAttribute('type',mime);
          }
        })
    }
  },
}
</script>
