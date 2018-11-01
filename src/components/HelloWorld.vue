<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <h1>signup</h1>
    email:    <Input v-model="email" placeholder="Enter something..." style="width: 300px" /><br>
    password: <Input v-model="password" placeholder="Enter something..." style="width: 300px" /><br><br>
    <Button type="primary" @click="signup">Signup</Button>
    <h2>login</h2><br>
    email:    <Input v-model="em" placeholder="Enter something..." style="width: 300px" /><br>
    password: <Input v-model="pass" placeholder="Enter something..." style="width: 300px" /><br><br>
    <Button type="primary" @click="login">Login</Button>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      email:'',
      password:'',
      em:'',
      pass: ''
    }
  },
  methods: {
     signup () {
       console.log("signup called")
       console.log(this.email)
       console.log(this.password)
       axios.post(`http://localhost:5000/signup`, { "email":this.email,"password":this.password})
      .then(response => {
        console.log("response", response)
        // this.$router.push({
        //   name: 'ShowBook',
        //   params: { id: response.data._id }
        // })
      })
      .catch(err=> {
         console.log("err", err)
      })
     },
     login() {
        console.log("login called")
        console.log("===",this.em)
       console.log("===",this.pass)
       axios.post(`http://localhost:5000/login`, { "email":this.em,"password":this.pass})
      .then(response => {
        console.log("response", response)
        Cookies.set('authToken', response.data.logintoken);
        this.$router.push({
          name: 'BookList',
          params: { id: response.data._id }
        })
      })
      .catch(err=> {
         console.log("err", err)
      })
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
