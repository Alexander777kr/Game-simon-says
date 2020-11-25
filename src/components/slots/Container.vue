<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>
  
<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>