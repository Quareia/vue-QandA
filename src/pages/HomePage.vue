<template>
  <div>
    <navigation-bar/>
    <router-view></router-view>
  </div>

</template>


<<script>
import NavigationBar from '@/components/utils/NavigationBar'
export default {
  components: {
    NavigationBar,
  }
}
</script>


<<style scoped>

</style>