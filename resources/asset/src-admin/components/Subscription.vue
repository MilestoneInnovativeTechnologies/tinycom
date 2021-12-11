<template>
  <q-card v-if="remain < limit" class="text-negative bg-light text-center" square>
    <q-card-section>
      <div v-if="remain < 0">Your subscriptions expired..<br>Features limited..<br>All services will be stopped soon!!</div>
      <div v-else>
        {{ edition }} Edition - Ony {{ remain }} Day{{ remain > 1 ? 's' : ''}} Remaining!
        <template v-if="remain < alert">
          <br  />Services will be limited if not renewed<template v-if="remain === 0"> by today</template>.
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
    export default {
      name: "Subscription",
      data () { return {
        limit: 15, warn: 7, alert: 3,
        SUBSCRIPTIONS
      } },
      computed: {
        end(){ return _(this.SUBSCRIPTIONS).sort(({ end }) => new Date(end).getTime()).map('end').reverse().first() },
        remain(){ return this.end ? _.floor((new Date(this.end).getTime() - new Date().getTime())/86400000) : 0 },
        edition(){ return _.get(_(this.SUBSCRIPTIONS).find(['status','Current']),['edition','name']) },
      }
    }
</script>
