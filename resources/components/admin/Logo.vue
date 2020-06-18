<template>
    <div style="height: 80vh" class="d-flex flex-column justify-content-center align-items-center" :key="'img-upd-key-'-img">
        <form ref="logo-form" @submit.prevent="submit">
            <img :src="logo" class="img-fluid img-thumbnail mb-2" />
            <p class="text-muted text-center">Upload square image of width not more than 128px</p>
            <input type="file" class="form-control-file w-auto" id="image" name="image">
            <input type="submit" class="btn btn-primary btn-block mt-2 mb-5" value="Upload">
        </form>
    </div>
</template>

<script>
    export default {
        name: "Logo",
        data(){ return { img:0,logo:URL.LOGO } },
        methods: {
            submit(){
                this.$store.dispatch('SERVER/serverItemAction',{ data:new FormData(this.$refs['logo-form']),item:'company',action:'logo' })
                    .then(url => {
                        if(!url) return;
                        this.logo = url; this.img++; let mime = 'image/' + _.last(url.split('.'));
                        document.getElementById('link-icon').setAttribute('href',url);
                        document.getElementById('link-icon').setAttribute('type',mime);
                        document.getElementById('link-short-icon').setAttribute('href',url);
                        document.getElementById('link-short-icon').setAttribute('type',mime);
                    })
            }
        }
    }
</script>