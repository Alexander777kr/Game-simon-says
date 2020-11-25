<template>
  <div class="wrapper">
    <page-header></page-header>
    <container-slot>
      <div class="round-container">
        <slice-circle
          :name="colors[0]"
          :isActive="blueActive"
          @user-clicked="handleUserClick"
        ></slice-circle>
        <slice-circle
          :name="colors[1]"
          :isActive="redActive"
          @user-clicked="handleUserClick"
        ></slice-circle>
        <slice-circle
          :name="colors[2]"
          :isActive="yellowActive"
          @user-clicked="handleUserClick"
        ></slice-circle>
        <slice-circle
          :name="colors[3]"
          :isActive="greenActive"
          @user-clicked="handleUserClick"
        ></slice-circle>
      </div>
      <div class="game-info">
        <h2>Round: {{ round }}</h2>
        <game-button
          name="Start"
          @clicked="startOfGame"
          :buttonDisabled="buttonDisabled"
        ></game-button>
        <div class="user-message">
          <p>{{ messageToUser ? messageToUser : "" }}</p>
        </div>
        <div class="options">
          <h2>Уровни сложности:</h2>
          <input-radio
            :name="1500"
            :checked="true"
            userValue="Легкий"
            :disabled="buttonDisabled"
            @send-param="sendParam"
          ></input-radio>
          <input-radio
            :name="1000"
            userValue="Нормальный"
            :disabled="buttonDisabled"
            @send-param="sendParam"
          ></input-radio>
          <input-radio
            :name="400"
            userValue="Сложный"
            :disabled="buttonDisabled"
            @send-param="sendParam"
          ></input-radio>
        </div>
      </div>
    </container-slot>
  </div>
  <page-footer></page-footer>
</template>

<script>
import Slice from "./components/Slice";
import Button from "./components/Button.vue";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InputRadio from "./components/InputRadio";
const audio = new Audio(require("./assets/1.mp3"));
const audio2 = new Audio(require("./assets/2.mp3"));
const audio3 = new Audio(require("./assets/3.mp3"));
const audio4 = new Audio(require("./assets/4.mp3"));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  data() {
    return {
      round: 0,
      buttonDisabled: false,
      blueActive: false,
      redActive: false,
      yellowActive: false,
      greenActive: false,
      colorsOfLevel: [],
      messageToUser: "",
      colors: ["blue", "red", "yellow", "green"],
      delay: 1500,
    };
  },
  components: {
    "slice-circle": Slice,
    "page-header": Header,
    "page-footer": Footer,
    "input-radio": InputRadio,
    "game-button": Button,
  },
  methods: {
    getRandom() {
      const maxNumber = Math.floor(3);
      const random = Math.floor(Math.random() * (maxNumber + 1));
      return this.colors[random];
    },
    levelGame(level) {
      let arrayOfColors = [];
      for (let i = 0; i < level; i++) {
        arrayOfColors.push(this.getRandom());
      }
      return arrayOfColors;
    },
    startOfGame() {
      this.buttonDisabled = true;
      this.messageToUser = "";
      this.roundIncrement();
    },
    roundIncrement() {
      this.round++;
      this.getColorsOfLevel();
    },
    getColorsOfLevel() {
      this.colorsOfLevel = this.levelGame(this.round);
      this.showColorsOfGame();
    },
    async showColorsOfGame() {
      for (const color of this.colorsOfLevel) {
        this.showSelectedColor(color);
        await sleep(this.delay);
      }
    },
    async showSelectedColor(color) {
      if (this.round === 0) {
        return;
      }
      this.playSound(color);
      switch (color) {
        case "blue":
          this.blueActive = true;
          await sleep(this.delay - 300);
          this.blueActive = false;
          break;
        case "red":
          this.redActive = true;
          await sleep(this.delay - 300);
          this.redActive = false;
          break;
        case "yellow":
          this.yellowActive = true;
          await sleep(this.delay - 300);
          this.yellowActive = false;
          break;
        case "green":
          this.greenActive = true;
          await sleep(this.delay - 300);
          this.greenActive = false;
          break;
        default:
          throw new Error(
            `Неправильная передача данных в метод showSelectedColor, переданный цвет: ${color}`
          );
      }
    },
    handleUserClick(color) {
      if (this.colorsOfLevel.length === 0 && this.round === 0) {
        return (this.messageToUser = "Нажмите Start для начала игры");
      } else if (
        this.colorsOfLevel[0] === color &&
        this.colorsOfLevel[1] !== color
      ) {
        this.colorsOfLevel.shift();
        if (this.colorsOfLevel.length === 0) {
          return this.roundIncrement();
        } else {
          return;
        }
      } else if (
        this.colorsOfLevel[0] === color &&
        this.colorsOfLevel[1] === color
      ) {
        return this.colorsOfLevel.shift();
      } else {
        return this.endOfGame();
      }
    },
    endOfGame() {
      this.colorsOfLevel = [];
      this.messageToUser = `Извините, Вы проиграли после ${this.round} раундов.`;
      this.round = 0;
      this.buttonDisabled = false;
    },
    sendParam(param) {
      this.delay = param;
    },
    playSound(color) {
      switch (color) {
        case "blue":
          audio.load();
          audio.play();
          break;
        case "red":
          audio2.load();
          audio2.play();
          break;
        case "yellow":
          audio3.load();
          audio3.play();
          break;
        case "green":
          audio4.load();
          audio4.play();
          break;
        default:
          throw new Error(
            "Неправильно передан color для воспроизведения звука"
          );
      }
    },
  },
};
</script>

<style>
html,
body {
  font-family: Arial, serif;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.wrapper {
  flex: 1 0 auto;
}

h2 {
  margin-top: 2rem;
}

.round-container {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-right: 30px;
}

.user-message {
  margin-top: 20px;
}

.game-info {
  display: flex;
  flex-direction: column;
}
.options {
  display: flex;
  flex-direction: column;
}
</style>
