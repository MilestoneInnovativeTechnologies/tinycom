<template>
  <tr>
    <td>{{ id }}</td>
    <td><q-input type="text" dense square outlined v-model="name" style="width: 6rem" :debounce="1000" /></td>
    <td><q-input type="textarea" dense square outlined v-model="description" style="width: 8rem; height: 4rem" :debounce="1000" /></td>
    <td><q-select :options="options" dense square outlined v-model="status" style="width: 4rem;"></q-select></td>
    <td>
      <q-img v-if="image" :src="image" class="rounded-borders" style="height: 4rem; max-width: 8rem" />
      <q-input type="file" dense borderless @input="val => image = val[0]" style="width: 6rem" />
    </td>
  </tr>
</template>

<script>
export default {
  name: "CategoryUpdateRow",
  props: ['id'],
  data(){ return { options: ['Y','N'] } },
  computed: {
    name: {
      get(){ return this.$attrs.name },
      set(name){ this.dispatch({name}) },
    },
    description: {
      get(){ return this.$attrs.description },
      set(description){ this.dispatch({description}) },
    },
    status: {
      get(){ return this.$attrs.status },
      set(status){ this.dispatch({status}) },
    },
    image: {
      get(){ return _.isEmpty(this.$attrs.media) ? null : imageUrl(this.$attrs.media[0]) },
      set(img){ this.changeImage(img) },
    },
  },
  methods: {
    changeImage(image){ this.$store.dispatch('SERVER/serverItemAction',this.formData({ image })) },
    formData(data){ let frmData = new FormData; _.forEach(data,(value,key) => frmData.append(key,value)); return { id:this.id,data:frmData,item:'category',action:'update' } },
    dispatch(data){ this.$store.dispatch('SERVER/serverItemAction',this.formData(data)) }
  }

}
</script>
