<template>
  <div class="order">
    <h1>This is an order page</h1>
    {{username}}
  </div>
</template>

<script>
import axios from '../../utils/axios'
  export default {
    data() {
      return {
        username: ''
      }
    },
    mounted() {
      axios.get('/order').then(res => {
        this.username = res.data.user.username
      })
    },
  }
</script>
