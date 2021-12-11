<template>
  <div class="fit row no-wrap items-center content-start">
    <div class="col-grow" style="overflow: auto"><q-input outlined :value="value" clearable @input="$emit('input',$event)" dense placeholder="Search.."><template v-slot:prepend><q-icon name="search" /></template></q-input></div>
    <div>&nbsp;&nbsp;&nbsp;</div>
    <div class="" style="overflow: auto"><q-btn :label="action || 'NEW'" color="primary" @click="$emit(action || 'new')" /></div>
  </div>

</template>

<script>
export default {
  name: "SearchAndAction",
  props: ['value','action']
}
</script>
