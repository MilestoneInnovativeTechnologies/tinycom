<template>
    <div class="modal fade" data-backdrop="static" id="confirmModal" role="dialog" aria-labelledby="confirmModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmModalTitle">Confirm Order</h5>
                    <button type="button" class="close" aria-label="Close" @click.prevent="close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body" :alter="alter" :response="response">
                    <blockquote v-if="ordered.error === false" class="order-success blockquote">
                        <p>Thank you for the trust in us. Your order placed successfully!!. Our representative will call you soon..</p>
                        <button class="btn btn-block btn-primary" @click="move('start')">Continue Shopping</button>
                    </blockquote>
                    <blockquote v-else-if="ordered.error" class="order-error blockquote">
                        <p>There is some error in placing your order. Please try again!!</p>
                        <p><strong>Server Response: </strong>{{ ordered.message }}</p>
                        <button class="btn btn-block btn-primary" @click="move('start')">Visit Home Page</button>
                    </blockquote>
                    <blockquote v-else-if="!user" class="no-user blockquote">
                        <p>Please login to place your order.</p>
                        <button class="btn btn-block btn-primary" @click="move('login')">Click here to login</button>
                    </blockquote>
                    <blockquote v-else-if="!items.length" class="no-user blockquote text-center">
                        <p>You have nothing in cart. Start adding products</p>
                        <button class="btn btn-block btn-primary" @click="move('home')">Start from here</button>
                    </blockquote>
                    <div v-else class="ready">
                        <blockquote class="blockquote">
                            <p class="font-weight-bolder">Your order will be placed and a representative will call you to confirm delivery address.</p>
                            <hr>
                            <p>Please confirm the below details are correct and belongs to you, Delivery and billing will be done on these details.</p>
                            <p class="mb-0"><strong>Name: </strong>{{ user.name }}</p>
                            <p class="mb-0"><strong>Phone: </strong>{{ user.phone }}</p>
                        </blockquote>
                        <hr>
                        <div class="cart-summary">
                            <p><strong>Cart Summary</strong></p>
                            <ol>
                                <li v-for="item in items" :key="'confirm-order-item-'+item.item">
                                    <dl class="row mb-0">
                                        <dt class="col-12">{{ name(item.item) }}</dt>
                                        <dd class="col-12">
                                            <dl class="row mb-0">
                                                <dd class="col-4 py-0 my-0">{{ item.price }}</dd>
                                                <dd class="col-3 py-0 my-0">X <kbd>{{ item.quantity }}</kbd></dd>
                                                <dd class="col-5 py-0 my-0 text-right font-weight-bolder" style="font-size: 1.2rem">{{ item.amount }}</dd>
                                            </dl>
                                        </dd>
                                    </dl>
                                </li>
                            </ol>
                            <p class="lead text-center font-weight-bolder mx-5" style="font-size: 2rem; border-bottom: 3px double #EEEEEE; border-top: 3px double #EEEEEE"><i class="fas fa-fw fa-rupee-sign"></i>{{ total }}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" v-if="user && items.length && ordered.error !== false">
                    <button type="button" class="btn btn-secondary" :class="{ disabled }" @click.prevent="close">Close</button>
                    <button type="button" :disabled="disabled" class="btn btn-primary" :class="{ disabled }" @click.prevent="order">Confirmed, Place Order <i v-if="disabled" class="fas fa-spin fa-spinner"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "ConfirmModal",
        computed: {
            ...mapState('CART',['items','details','ordered']),
            status(){ return this.$store.state.MISC.modal },
            alter(){ return !!$('#confirmModal').modal(['hide','show'][_.toSafeInteger(this.status)]); },
            user(){ return this.$store.state.USER.USER },
            name(){ return (id) => _.get(this.details,[id,'name']) },
            total(){ return this.$store.getters['CART/total'] },
            disabled(){ return this.ordered.status || this.ordered.error || !this.user || _.isEmpty(this.items) },
            response(){ let response = this.ordered.error === false; if(response) setTimeout(this.move,3000,'start'); return response; }
        },
        methods: {
            close(){ this.$store.commit('MISC/alterModal') },
            order(){ this.$store.dispatch('CART/order') },
            move(name){ this.close(); return (name === 'start') ? (window.location.href = "/r") : this.$router.push({ name }) }
        },
        watch: {
            status(val){ if(val) (this.$store.state.CART.sync)() },
        }
    }
</script>
