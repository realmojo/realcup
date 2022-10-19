import { observable } from "mobx";

const storeCommon = observable({
  isSidebarOpen: false,
  isMenuOpen: false,
  isMobile: false,
  setIsMenuOpen(value) {
    this.isMenuOpen = value;
  },
  setIsSidebarOpen(value) {
    this.isSidebarOpen = value;
  },
  setIsMobile(value) {
    this.isMobile = value;
  },
});

export { storeCommon };
