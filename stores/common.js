import { observable } from "mobx";

const storeCommon = observable({
  isSidebarOpen: false,
  isMenuOpen: false,
  setIsMenuOpen(value) {
    this.isMenuOpen = value;
  },
  setIsSidebarOpen(value) {
    this.isSidebarOpen = value;
  },
});

export { storeCommon };
