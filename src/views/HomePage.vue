<template>
  <div>
    <h3>{{name}}</h3>
    <div class="list" v-for="(item, index) in list" :key="index">
      <router-link :to="{path:'/item/'+item.id}">{{item.title}}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch('fetchList')
  },
  computed: {
    list() {
      return this.$store.state.list
    }
  },
  data() {
    return {
      name: '文章列表'
    }
  }
}
</script>