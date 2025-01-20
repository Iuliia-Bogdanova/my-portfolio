import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/**/*",
          dest: "assets",
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        projects: "./projects.html",
      },
    },
  },
});
