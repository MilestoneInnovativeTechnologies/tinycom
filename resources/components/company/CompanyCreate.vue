<template>
    <b-card>
        <b-form-group label="Name" label-cols="3" label-align="right">
            <b-form-select v-model="user" :options="[1,2,3]"></b-form-select>
        </b-form-group>

        <b-button variant="outline-warning" class="offset-3" ><b-spinner small class="mb-1 mr-2"></b-spinner>Update</b-button>
    </b-card>
</template>

<script>
    export default {
        name: "CompanyCreate",
        data(){ return {
            user: ''
        } },
    }
</script>