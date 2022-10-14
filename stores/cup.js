import { observable } from "mobx";

const storeCup = observable({
  isStatusClick: true,
  setIsStatusClick(value) {
    this.isStatusClick = value;
  },
});

export { storeCup };
