<template>
  <div id="no-find">
    <div>404</div>
    <div>抱歉，您访问的页面不存在</div>
    <router-link to="/">
      <button>返回首页</button>
    </router-link>
  </div>
</template>
<script>
  export default {}

</script>

<style lang="scss" scoped>
  #no-find {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: $font-24;
    button {
      background: $background-ff;
      padding: .2rem;
      color: $color;
      border-radius: 5px;
    }
  }

</style>
