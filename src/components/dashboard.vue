<template>
    <h1>{{msg}}</h1>
    <booklist></booklist>
</template>

<script>
import booklist from './BookList'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Dashboard'
    }
  },
  components: {
     booklist 
  },
  mounted() {
      
  },
  methods: {}
}
</script>

<style>

</style>
