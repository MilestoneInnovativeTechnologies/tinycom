<template>
  <q-page padding>
    <q-card flat v-if="user">
      <q-card-section><div class="text-h6">Profile Update</div></q-card-section>
      <q-card-section class="q-pt-none q-gutter-sm">
        <q-input v-model="name" label="Name" color="primary" autofocus outlined />
        <q-input v-model="phone" label="Phone" color="primary" type="number" outlined />
      </q-card-section>
      <q-card-actions class="q-mt-sm q-px-md">
        <q-btn color="primary" label="Back to Shop" padding="sm lg" :to="{ name:'home' }" /><q-space />
        <q-btn color="primary" label="Update" padding="sm lg" :loading="processing" @click="update" />
      </q-card-actions>

      <ProfileAddress class="q-mt-md" :id="$store.state.USER.USER.id" @updating="updating = $event" />

      <q-btn v-if="!updating && !create" label="New Address" class="float-right q-px-sm q-mt-md q-mr-md" dense size="md" color="primary" @click="create = !create" />
      <div style="clear: both">&nbsp;</div>


    </q-card>
    <q-card flat v-else>
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="phone" label="Phone" color="primary" autofocus type="number" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Login" padding="sm lg" :loading="processing" @click="login" />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="create">
      <ProfileAddressNew @created="create = !create" />
    </q-dialog>

    <q-dialog v-model="alert" @hide="text = ''">
      <q-card>
        <q-card-section><div class="text-h6">Alert</div></q-card-section>
        <q-card-section class="q-pt-none">{{ text  }}</q-card-section>
        <q-card-actions align="right"><q-btn flat label="OK" color="primary" v-close-popup /></q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import ProfileAddress from "components/ProfileAddress";
import ProfileAddressNew from "components/ProfileAddressNew";
export default {
  name: 'PageProfile',
  components: {ProfileAddressNew, ProfileAddress},
  data(){
    let name = _.get(this.$store.state.USER,['USER','name']);
    let phone = _.get(this.$store.state.USER,['USER','phone']);
    return {
      name, phone, updating: false,
      processing: false, text: '', alert: false, create: false,
      msg: 'Processing... Please wait!!'
    } },
  methods: {
    login(){
      this.processing = true;
      if(!this.phone) {
        this.text = 'Phone is mandatory fields. Please fill!';
        this.processing = false; this.alert = true;
        return;
      }
      this.$store.dispatch('USER/login',{ phone:this.phone }).then((data) => {
        this.name = _.get(data,'name');
        this.phone = _.get(data,'phone');
        this.processing = false; this.alert = false;
      })
    },
    update(){
      this.processing = true;
      if(!this.phone) {
        this.text = 'Phone is mandatory fields. Please fill!'
        this.processing = false; this.alert = true;
        return;
      }
      this.$store.dispatch('USER/update',{ name:this.name,phone:this.phone })
        .then((data) => {
          this.text = _.isString(data) ? data : 'Updated successfully!!'
          this.processing = false; this.alert = true;
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
