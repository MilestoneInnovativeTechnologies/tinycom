<template>
    <section class="source-detail">
        <div class="card col-lg-3 m-lg-auto" v-if="source">
            <div class="card-body px-0">
                <h5 class="card-title"><strong>{{ source.title }}</strong></h5>
                <p class="card-text">{{ source.desc }}</p>
            </div>
            <h4 class="card-title mt-3"><strong>Items</strong></h4>
            <ul class="list-group list-group-flush" v-if="source.items">
                <li class="list-group-item px-0" v-for="(item,idx) in source.items" :key="'source-detail-item-index-'+idx">
                    <dl class="row mb-0"><dt class="col-8">{{ item.name }}</dt><dd class="col-4 mb-0 text-right">{{ item.price }}</dd></dl>
                </li>
            </ul>
            <h4 class="card-title mt-3"><strong>Other Details</strong></h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item px-0" v-for="(key,head,idx) in layout" :key="'source-detail-index-'+idx"><dl class="row mb-0"><dt class="col">{{ head }}</dt><dd class="col mb-0 text-right">{{ source[key] }}</dd></dl></li>
            </ul>
        </div>
        <div class="card col-lg-3 m-lg-auto mt-3" v-if="source">
            <div class="card-body">
                <div class="card-title">Extend expire time from now<span class="text-success float-right" v-show="ext_notify%2"><i class="fas fa-check-double fa-fw"></i> Extended!!</span></div>
                <div class="form-row">
                    <div class="col"><input type="text" class="form-control" name="expire_after" v-model="exp_num" id="source_create_expire_period_number"></div>
                    <div class="col"><select class="form-control" name="expire_period" v-model="exp_period">
                        <option value="60">Minutes</option>
                        <option value="3600">Hours</option>
                        <option value="86400">Days</option>
                    </select></div>
                </div>
                <button class="btn btn-block btn-primary mt-2" @click.prevent="extend">Set Expire Time</button>
            </div>
        </div>
        <div class="card col-lg-3 m-lg-auto mt-3" v-if="source">
            <ul class="list-group list-group-flush">
                <li class="list-group-item px-0"><dl class="mb-0 row"><dt class="col-3">Link</dt><dd class="mb-0 col-9"><textarea class="form-control">{{ url }}</textarea></dd></dl></li>
                <li class="list-group-item px-0"><dl class="mb-0 row"><dt class="col-3">Share</dt><dd class="mb-0 col-9"><a :href="whatsapp" target="_blank"><i class="fab fa-whatsapp mr-1 text-success"></i> Whats App</a></dd></dl></li>
            </ul>
        </div>
    </section>

</template>

<script>
    export default {
        name: "Source",
        props: ['id'],
        data(){ return { exp_num:1,exp_period:60,ext_notify:0 } },
        computed: {
            layout(){ return { Status:'status',Expire:'expire',Orders:'orders',Hits:'hit','Hits after expire':'expire_hits' } },
            source(){ return this.$store.getters["SOURCES/source"](this.id) },
            expire(){ return _.toSafeInteger(this.exp_num) * _.toSafeInteger(this.exp_period) },
            phone(){ return this.source.customers.length === 1 ? ('91' + _.get(this.$store.getters["CUSTOMERS/customer"](this.source.customers[0]),'phone')) : ''},
            url(){ return urlParse('SOURCE_LINK',{ uuid:this.source.uuid }) },
            whatsapp(){ return urlParse('WHATSAPP',{ text:this.url,phone:this.phone }) },
        },
        methods: {
            extend(){ this.$store.dispatch('SOURCES/extend',{ id:this.id,expire:this.expire }).then(R => { this.ext_notify++; setTimeout($vm0 => $vm0.ext_notify++,2500,this) }) }
        }
    }
</script>