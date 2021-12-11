<template>
  <div :class="cls">
    <q-btn dense class="q-px-sm q-py-xs" size="sm" label="Back" icon="reply_all" color="warning" :to="to" />
  </div>
</template>

<script>
export default {
  name: "BackButton",
  props: ['right','to'],
  computed: {
    cls(){ return this.right !== undefined ? ['text-right'] : ['text-left'] }
  }
}
</script>
