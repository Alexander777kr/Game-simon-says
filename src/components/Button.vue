<template>
  <button @click="$emit('clicked')" :disabled="buttonDisabled">
    {{ name }}
  </button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "Button",
    },
    buttonDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
button {
  width: 5em;
  box-sizing: border-box;
  font-size: 1.4em;
  border-radius: 10px 10px 10px 10px;
  background: #6dabe8;
  border: none;
  padding: 0.3em 0.6em;
}
button:hover {
  background: #78bcff;
}
</style>