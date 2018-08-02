<template>
  <div class="main">
    <div class="item">
      <div style="width:100px">登录页</div> 
      <input type='text' v-model='user.username'/>
    </div>
    <div class="item">
      <div style="width:100px">密码</div> 
      <input type='text' v-model='user.password'/>
    </div>
    <button @click="login">提交</button>  
  </div>
</template>

<script>
import axios from '../../utils/axios'
export default {
  data() {
      return {
        user: {
          username: '',
          password: ''
        }
      }
  },
  methods: {
    login() {
      axios.post('/login',this.user).then(res => {
        localStorage.setItem('token', res.data.token)
        this.$router.push('/order')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  margin: 0 auto;
  width: 300px;

  .item {
    display: flex;
    margin-bottom: 10px;
  }
  }
</style>
