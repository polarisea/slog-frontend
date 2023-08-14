import { defineStore } from "pinia";

export const useLSidebarStore = defineStore("lSidebar", {
  state: () => {
    return {
      isOpen: false,
      items: [],
      isShowAllTags: false,
      tags: [],
    };
  },
  actions: {
    fetchTags() {
      if (this.tags.length == 0) {
        setTimeout(() => {
          this.tags = [
            {
              label: "Chưa cập nhật 1",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật 2",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật 3",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật 4",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật 5",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật 6",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật 7",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật 8",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật 9",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật 10",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật 11",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật 12",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật 13",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
            {
              label: "Chưa cập nhật",
              type: "route",
              icon: "pi-hashtag",
              route: "/",
            },
          ];
        }, 2000);
      }
    },
    initHomeview() {
      this.fetchTags();
      this.items = [
        { label: "Trang chủ", type: "route", icon: "pi-home", route: "/" },
        {
          label: "Phổ biến nhất",
          type: "route",
          icon: "pi-arrow-up-right",
          route: "/hot",
        },
        { type: "line" },
        { label: "THỂ LOẠI", type: "title" },
        { type: "tag-container" },
        { type: "toggle", label: "Xem thêm", callback: this.limitAmountTags },
        { type: "line" },
        { label: "TÀI NGUYÊN", type: "title" },
        {
          label: "About me",
          type: "route",
          icon: "pi-prime",
          route: "/about-me",
        },
      ];
    },
    initUploadview() {
      this.items = [
        { label: "Trang chủ", type: "route", icon: "pi-home", route: "/" },
        {
          label: "Tổng quan",
          type: "route",
          icon: "pi-desktop",
          route: "/summary",
        },
        { type: "line" },
        { label: "BÀI VIẾT", type: "title" },
        {
          label: "Thêm bài viết",
          type: "route",
          icon: "pi-plus",
          route: "/upload",
        },
        { type: "line" },
        { label: "TÀI NGUYÊN", type: "title" },
        {
          label: "About me",
          type: "route",
          icon: "pi-prime",
          route: "/about-me",
        },
      ];
    },
  },
});
