import { observable } from "mobx";

const storeCup = observable({
  isStatusClick: true,
  currentRound: 1,
  finalImage: {},
  setIsStatusClick(value) {
    this.isStatusClick = value;
  },
  setCurrentRound(value) {
    this.currentRound = value;
  },
  setFinalImage(value) {
    this.finalImage = value;
  },
});

export { storeCup };
