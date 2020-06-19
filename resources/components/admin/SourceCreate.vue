<template>
    <form @submit.prevent="submit" method="post" enctype="multipart/form-data" ref="source_create_form" id="source_create_form" :key="'source_create_form_' + increment">
        <div class="modal fade" tabindex="-1" role="dialog" ref="source_create_modal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">New source created successfully!!</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <p>Share the link</p>
                        <textarea class="form-control">{{ link }}</textarea>
                    </div>
                    <div class="modal-footer"><button type="button" class="btn btn-info" @click.prevent="$router.push({ name:'sources' })" data-dismiss="modal">Back to Home</button></div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><strong>New Source</strong></div>
            <div class="card-body">
                <div class="form-group row">
                    <label for="source_create_title" class="col-3 col-form-label">Title</label>
                    <div class="col-9"><input type="text" class="form-control required" name="title" id="source_create_title" required value=""></div>
                </div>
                <div class="form-group row">
                    <label for="source_create_description" class="col-3 col-form-label">Description</label>
                    <div class="col-9"><textarea class="form-control" name="description" id="source_create_description"></textarea></div>
                </div>
                <div class="form-group row">
                    <label for="source_create_expire_period_number" class="col-3 col-form-label">Expire After</label>
                    <div class="col-9 form-row">
                        <div class="col"><input type="text" class="form-control" name="expire_after" v-model="exp_num" id="source_create_expire_period_number"></div>
                        <div class="col"><select class="form-control" name="expire_period" v-model="exp_period">
                            <option value="60">Minutes</option>
                            <option value="3600">Hours</option>
                            <option value="86400">Days</option>
                        </select><input type="hidden" name="expire" :value="expire"></div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="source_create_image" class="col-3 col-form-label">Image</label>
                    <div class="col-9"><input type="file" class="form-control-file" name="image" id="source_create_image"></div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3 px-0">
                        <div class="nav flex-column nav-pills" id="source_create_tab" role="tablist" aria-orientation="vertical">
                            <a class="nav-link pl-2 pr-0 py-1 active" id="source_link_customers" data-toggle="pill" href="#source_pane_customers">Customers</a>
                            <a class="nav-link pl-2 pr-0 py-1" id="source_link_items" data-toggle="pill" href="#source_pane_items">Items</a>
                            <a class="nav-link pl-2 pr-0 py-1" id="source_link_categories" data-toggle="pill" href="#source_pane_categories">Categories</a>
                            <a class="nav-link pl-2 pr-0 py-1" id="source_link_finish" data-toggle="pill" href="#source_pane_finish">Finish</a>
                        </div>
                    </div>
                    <div class="col-9 pr-0 pl-3">
                        <div class="tab-content" id="source_create_tabContent">
                            <div class="tab-pane fade show active" id="source_pane_customers">

                                <p>Select customers to which this offer is limited to. Select none to make it available for all customers.</p>
                                <input type="text" class="form-control mb-2" v-model="customer_filter">
                                <div class="form-check" v-for="customer in customers" :key="'source_create_customer_list_' + customer.id" v-if="customerFilter(customer)">
                                    <input class="form-check-input" type="checkbox" name="customers[]" :value="customer.id" :id="'create_source_customer_list_' + customer.id">
                                    <label class="form-check-label mt-1" :for="'create_source_customer_list_' + customer.id">{{ customer.name }} <i class="fas fa-phone ml-2"></i> {{ customer.phone }}</label>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="source_pane_items">

                                <p>Select items and set offer price for this particular source</p>
                                <input type="text" class="form-control mb-2" v-model="item_filter">
                                <div class="form-check" v-for="item in items" :key="'source_create_item_list_' + item.id" v-if="itemFilter(item)">
                                    <input class="form-check-input" type="checkbox" name="items[]" :value="item.id" :id="'create_source_item_list_' + item.id">
                                    <label class="form-check-label mt-1 row" :for="'create_source_item_list_' + item.id">
                                        <div class="col">{{ item.name }}</div><div class="col"><input type="text" class="form-control" :name="`item[${item.id}]`" :value="item.selling || item.price"></div>
                                    </label>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="source_pane_categories">

                                <p>Select Categories and a percentage of discount to be applied. All items from that category will be applied the same percentage of discount. The discount amount will be applied ti price and not selling amount.</p>
                                <input type="text" class="form-control mb-2" v-model="category_filter">
                                <div class="form-check" v-for="category in categories" :key="'source_create_category_list_' + category.id" v-if="categoryFilter(category)">
                                    <input class="form-check-input" type="checkbox" name="categories[]" :value="category.id" :id="'create_source_category_list_' + category.id">
                                    <label class="form-check-label mt-1 row" :for="'create_source_category_list_' + category.id">
                                        <div class="col">{{ category.name }}</div><div class="col"><input type="text" class="form-control" :name="`category[${category.id}]`" :value="0"></div>
                                    </label>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="source_pane_finish">

                                <p>Submit to create source</p>
                                <input type="submit" name="submit" value="SUBMIT" class="btn btn-block btn-info" :disabled="disabled" :class="{ disabled }">

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "SourceCreate",
        data(){ return {
            increment: 0,
            exp_num: 1,
            exp_period: 60,
            customer_filter: '',
            item_filter: '',
            category_filter: '',
            disabled: false,
            link: '',
        } },
        computed: {
            expire(){ return parseInt(this.exp_num) * parseInt(this.exp_period) },
            customers(){ return this.$store.state.CUSTOMERS.CUSTOMERS },
            items(){ return this.$store.state.ITEMS.ITEMS },
            categories(){ return this.$store.state.CATEGORIES.CATEGORIES },
            url(){ return this.$store.state.SOURCES.url.create },
            link_url(){ return this.$store.state.SOURCES.url.link },
        },
        methods: {
            customerFilter({ name,phone }){ return !this.customer_filter || _.includes([name,phone].join(' ').toLowerCase(),this.customer_filter.toLowerCase()) },
            itemFilter({ name,description }){ return !this.item_filter || _.includes([name,description].join(' ').toLowerCase(),this.item_filter.toLowerCase()) },
            categoryFilter({ name,description }){ return !this.category_filter || _.includes([name,description].join(' ').toLowerCase(),this.category_filter.toLowerCase()) },
            submit(){
                let data = new FormData(this.$refs['source_create_form']); this.disabled = true;
                this.$store.dispatch('SOURCES/create',data).then(({ id }) => this.$router.push({ name:'source',params:{ id } }))
            }
        },
        beforeRouteLeave (to, from, next) {
            this.increment++; this.disabled = false;
            next();
        }
    }
</script>

<style>
    #source_pane_items div.form-check { border-bottom: 1px solid #EEEEEE; }
    #source_pane_categories div.form-check { border-bottom: 1px solid #EEEEEE; }
</style>