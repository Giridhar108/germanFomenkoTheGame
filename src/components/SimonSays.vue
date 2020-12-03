<template>
  <div class="container">
    <h1>Simon Says</h1>
    <div class="flex">
      <div class="simon">
        <ul id="ul">
          <li class="red" id="1" v-on:click="red">1</li>
          <li class="blue" id="2" v-on:click="red">2</li>
          <li class="yellow" id="3" v-on:click="red">3</li>
          <li class="green" id="4" v-on:click="red">4</li>
        </ul>
      </div>
      <div class="game">
        <div class="game-info">
          <h2 class="round">Round: {{ round }}</h2>
          <p class="sorry" v-if="startGame === 'false'">
            Sorry, you lost after {{ round }} rounds!
          </p>

          <button id="start" class="start" v-on:click="start">Start</button>
        </div>
        <div class="game- complexity">
          <h2>Game complexity</h2>
          <div>
            <input type="radio" value="1500" id="easy" v-model="complexity" />
            <label for="easy">Easy</label>
          </div>

          <div>
            <input type="radio" value="1000" id="medium" v-model="complexity" />
            <label for="medium">Medium</label>
          </div>

          <div>
            <input type="radio" value="400" id="hard" v-model="complexity" />
            <label for="hard">Hard</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getSequence from "../utils/getSequence.js";
import play from "../utils/play.js";

export default {
  data() {
    return {
      complexity: "1000",
      startGame: "true",
      round: 0,
      red(event) {
        const value = event.target.id;
        switch (value) {
          case "1":
            new Audio(require("../sounds/1.mp3")).play();
            break;
          case "2":
            new Audio(require("../sounds/2.mp3")).play();
            break;
          case "3":
            new Audio(require("../sounds/3.mp3")).play();
            break;
          case "4":
            new Audio(require("../sounds/4.mp3")).play();
            break;
        }
      }
    };
  },
  methods: {
    async start(event) {
      if (event.isTrusted && this.startGame === "false") {
        this.round = 0;
        this.startGame = "true";
      }
      if (this.startGame === "true") {
        this.round += 1;
        let interval = 0;
        const sequence = getSequence(this.round);
        let counter = 0;
        const playPromise = new Promise((resolve, reject) => {
          for (let i of sequence) {
            play(i, interval);
            interval += this.complexity * 1;
          }
          resolve(sequence, counter);
        }).then(
          new Promise((resolve, reject) => {
            document.getElementById("ul").addEventListener("click", function b(a) {
              if (a.isTrusted) {
                const id = a.target.id;
                counter += 1;
                const check = (sequenceIn, id) => {
                  if (sequenceIn[counter - 1] === +id || sequenceIn[counter - 1] === undefined) {
                    if (sequenceIn.length === counter) {
                      setTimeout(() => {
                        document.getElementById(`start`).click();
                      }, 1000);
                    }
                  } else if (sequenceIn[counter - 1] !== +id) {
                    setTimeout(() => {
                      if (!a.isTrusted) {
                        document.getElementById(`start`).click();
                      }
                    }, 1500);
                    resolve((this.startGame = "false"));
                  }
                };
                check(sequence, id);
              }
            });
          }).then((resolve, reject) => {
            this.startGame = "false";
          })
        );
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.container {
  max-width: 960px;
  margin: 0 auto;
}
.flex {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}
.simon {
  background: #fff;
  position: relative;
  float: left;
  margin-right: 3em;
  min-width: 296px;
  height: 289px;
  border-radius: 150px 150px 150px 150px;
  box-shadow: 2px 1px 12px #aaa;
}
.red,
.blue,
.yellow,
.green {
  opacity: 0.6;
  height: 290px;
  -webkit-border-radius: 150px 150px 150px 150px;
  border-radius: 150px 150px 150px 150px;
  position: absolute;
  text-indent: 10000px;
  transition: 0.3s;
  &:active {
    opacity: 1;
  }
}
.active {
  opacity: 1;
}
.red:hover,
.blue:hover,
.yellow:hover,
.green:hover {
  border: 2px solid black;
}
.red {
  background: #ff5643;
  clip: rect(0px, 300px, 150px, 150px);
  width: 296px;
}

.blue {
  background: dodgerblue;
  clip: rect(0px, 150px, 150px, 0px);
  width: 300px;
}

.yellow {
  background: #feef33;
  clip: rect(150px, 150px, 300px, 0px);
  width: 300px;
}

.green {
  background: #bede15;
  clip: rect(150px, 300px, 300px, 150px);
  width: 296px;
}

.game {
  text-align: start;
}

.game- complexity {
  display: flex;
  flex-direction: column;
}

.game- complexity h2 {
  margin-bottom: 0;
}
.game- complexity input {
  margin-right: 10px;
}

.round {
  margin: 20px 0 0 0;
}
.start {
  margin-top: 50px;
  width: 5em;
  box-sizing: border-box;
  font-size: 1.4em;
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #6dabe8;
  border: none;
  padding: 0.3em 0.6em;
  &:hover {
    background: #78bcff;
  }
}

.sorry {
  position: absolute;
  margin: 5px 0 0 0;
}
</style>
