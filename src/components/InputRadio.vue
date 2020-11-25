<template>
  <label
    ><input
      type="radio"
      name="game-type"
      :value="name"
      :checked="checked"
      :disabled="disabled"
      @click="sendParam"
    />
    {{ userValue }}</label
  >
</template>
  
<script>
export default {
  props: {
    name: {
      type: Number,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    userValue: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    sendParam() {
      this.$emit("send-param", this.name);
    },
  },
};
</script>>

<style scoped>
input[type="radio"] {
  margin-right: 10px;
}
</style>