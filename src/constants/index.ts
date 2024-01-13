import { INavLink } from "@/types";

export const sidebarLinks: Array<INavLink> = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
    isProtected: false,
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
    isProtected: false,
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/all-users",
    label: "People",
    isProtected: false,
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
    isProtected: true,
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create Post",
    isProtected: true,
  },
];

export const bottomBarLinks: INavLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
    isProtected: false
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
    isProtected: false
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
    isProtected: true
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create",
    isProtected: true
  },
];
