<template>
  <q-page padding>
    <q-card flat v-if="user">
      <q-card-section>
        <div class="text-h6">Profile Update</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="name" label="Name" color="primary" autofocus />
        <q-input v-model="phone" label="Phone" color="primary" type="number" />
      </q-card-section>

      <q-card-actions>
        <div class="text-negative text-center full-width" v-if="text">{{ text }}</div>
        <q-btn color="primary" label="Back to Shop" padding="sm lg" :to="{ name:'home' }" /><q-space />
        <q-btn color="primary" label="Update" padding="sm lg" :loading="processing" @click="update" />
      </q-card-actions>

    </q-card>
    <q-card flat v-else>
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="phone" label="Phone" color="primary" autofocus type="number" />
      </q-card-section>

      <q-card-actions align="right">
        <div class="text-caption q-mr-md" v-if="text">{{ text }}</div>
        <q-btn color="primary" label="Login" padding="sm lg" :loading="processing" @click="login" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageProfile',
  data(){
    let name = _.get(this.$store.state.USER,['USER','name']);
    let phone = _.get(this.$store.state.USER,['USER','phone']);
    return {
      name, phone,
      processing: false, text: '',
      msg: 'Processing... Please wait!!'
    } },
  methods: {
    login(){
      this.processing = true;
      if(!this.phone) {
        this.text = 'Phone is mandatory fields. Please fill!';
        this.processing = false;
        return;
      }
      this.$store.dispatch('USER/login',{ phone:this.phone }).then((data) => {
        this.name = _.get(data,'name');
        this.phone = _.get(data,'phone');
        this.processing = false; this.text = '';
      })
    },
    update(){
      this.processing = true;
      if(!this.phone) {
        this.text = 'Phone is mandatory fields. Please fill!'
        this.processing = false;
        return;
      }
      this.$store.dispatch('USER/update',{ name:this.name,phone:this.phone })
        .then((data) => {
          if(_.isString(data)) this.process(data)
          else this.text = 'Updated successfully!!'
          setTimeout(() => { this.text = '' },2000);
          this.processing = false;
        });
    },

    logout(){ location.href = location.origin + '/user/logout' }
  },
  computed: {
    user(){ return this.$store.state.USER.USER },
  },
  beforeDestroy() { this.processing = false; },
  watch: {
    processing(val){ if(val) setTimeout(($vm) => $vm.processing = false,5000,this) }
  }
}
</script>
