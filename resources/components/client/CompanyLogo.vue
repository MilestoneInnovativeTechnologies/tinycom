<template>
    <b-container>
        <form ref="logo-form" @submit.prevent="submit" :key="'img-upload-form-key-' + company + '-' + frm_key">
            <input type="hidden" name="company" :value="company">
            <img :src="current" class="img-fluid img-thumbnail mb-2" />
            <p class="text-muted text-center">Upload square image of width not more than 128px</p>
            <input type="file" class="form-control-file w-auto" id="image" name="image">
            <input type="submit" class="btn btn-primary btn-block mt-2 mb-5" value="Upload">
        </form>
    </b-container>
</template>

<script>
    export default {
        name: "CompanyLogo",
        props: ['company','current'],
        data(){ return {
            frm_key: 0
        } },
        methods: {
            submit(){
                this.$post('company','companyLogo',new FormData(this.$refs['logo-form']))
                    .then(url => this.$emit('logo',url))
            }
        }
    }
</script>