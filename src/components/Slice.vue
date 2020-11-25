<template>
  <div :class="sliceStyle" @click="$emit('user-clicked', name)"></div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sliceStyle() {
      return {
        slice: true,
        blue: this.name === "blue",
        red: this.name === "red",
        yellow: this.name === "yellow",
        green: this.name === "green",
        active: this.isActive,
      };
    },
  },
};
</script>

<style scoped>
.slice:hover {
  border: 2px solid black;
}

.blue {
  position: absolute;
  background-color: dodgerblue;
  width: 300px;
  height: 300px;
  clip: rect(0px, 150px, 150px, 0px);
  border-radius: 50%;
  opacity: 0.6;
}
.red {
  position: absolute;
  background-color: #ff5643;
  width: 296px;
  height: 300px;
  clip: rect(0px, 300px, 150px, 150px);
  border-radius: 50%;
  opacity: 0.6;
}
.yellow {
  position: absolute;
  background-color: #feef33;
  width: 300px;
  height: 296px;
  clip: rect(150px, 150px, 300px, 0px);
  border-radius: 50%;
  opacity: 0.6;
}
.green {
  position: absolute;
  background-color: #bede15;
  width: 296px;
  height: 296px;
  clip: rect(150px, 300px, 300px, 150px);
  border-radius: 50%;
  opacity: 0.6;
}

.slice:active,
.active {
  opacity: 1;
}
</style>