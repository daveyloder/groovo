import { defineConfig } from "vite";

export default defineConfig({
  test: {
    enviroment: "jsdom",
    coverage: {
      provider: "v8",
    },
  },
});
