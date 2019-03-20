<template>
  <div>
    HOME {{name}}
    <input v-model="name">
  </div>
</template>
<script>
export default {
  name: 'HomePage',
  data() {
    return {
      name: 'vue ssr'
    }
  }
}
</script>