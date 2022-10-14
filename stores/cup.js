import { observable } from "mobx";

const storeCup = observable({
  isStatusClick: true,
  currentRound: 1,
  setIsStatusClick(value) {
    this.isStatusClick = value;
  },
  setCurrentRound(value) {
    this.currentRound = value;
  },
});

export { storeCup };
