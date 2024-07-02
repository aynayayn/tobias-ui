// vite.config.ts
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "file:///C:/workspace/tobias-ui/node_modules/.pnpm/vite@5.2.11_@types+node@20.13.0_less@4.2.0/node_modules/vite/dist/node/index.js";
import vueJsx from "file:///C:/workspace/tobias-ui/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.0_vite@5.2.11_@types+node@20.13.0_less@4.2.0__vue@3.4.27_typescript@5.2.2_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vue from "file:///C:/workspace/tobias-ui/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.11_@types+node@20.13.0_less@4.2.0__vue@3.4.27_typescript@5.2.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import tsxResolveTypes from "file:///C:/workspace/tobias-ui/node_modules/.pnpm/vite-plugin-tsx-resolve-types@0.0.2_typescript@5.2.2_vite@5.2.11_@types+node@20.13.0_less@4.2.0_/node_modules/vite-plugin-tsx-resolve-types/dist/index.js";
import dts from "file:///C:/workspace/tobias-ui/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.13.0_rollup@3.29.4_typescript@5.2.2_vite@5.2.11_@types+node@20.13.0_less@4.2.0_/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/workspace/tobias-ui/packages/tobias-ui/vite.config.ts";
var base = fileURLToPath(new URL(".", __vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  plugins: [
    vueJsx(),
    tsxResolveTypes(),
    vue(),
    dts({
      entryRoot: "src",
      outDir: ["es", "lib"],
      exclude: ["**/tests/**"]
    })
  ],
  resolve: {
    // 需要识别tobias-ui别名
    // @tobias-ui/utils在rollupOptions.external中写了，作为外部库打入包中，不需要识别别名
    alias: [
      {
        find: /^tobias-ui/,
        replacement: resolve(base, "src/")
      }
    ]
  },
  build: {
    lib: {
      entry: "./src/index.ts"
    },
    rollupOptions: {
      external: [
        "@floating-ui/vue",
        "vue",
        "@juggle/resize-observer",
        "@v-c/utils",
        "lodash-es",
        "@tobias-ui/utils",
        "@tobias-ui/icons"
      ],
      output: [
        // esm
        {
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
          format: "esm",
          dir: "es"
        },
        // cjs
        {
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
          exports: "named",
          format: "cjs",
          dir: "lib"
        }
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3b3Jrc3BhY2VcXFxcdG9iaWFzLXVpXFxcXHBhY2thZ2VzXFxcXHRvYmlhcy11aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcd29ya3NwYWNlXFxcXHRvYmlhcy11aVxcXFxwYWNrYWdlc1xcXFx0b2JpYXMtdWlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3dvcmtzcGFjZS90b2JpYXMtdWkvcGFja2FnZXMvdG9iaWFzLXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdHN4UmVzb2x2ZVR5cGVzIGZyb20gJ3ZpdGUtcGx1Z2luLXRzeC1yZXNvbHZlLXR5cGVzJ1xyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcclxuXHJcbmNvbnN0IGJhc2UgPSBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4nLCBpbXBvcnQubWV0YS51cmwpKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWVKc3goKSxcclxuICAgIHRzeFJlc29sdmVUeXBlcygpLFxyXG4gICAgdnVlKCksXHJcbiAgICBkdHMoe1xyXG4gICAgICBlbnRyeVJvb3Q6ICdzcmMnLFxyXG4gICAgICBvdXREaXI6IFsnZXMnLCAnbGliJ10sXHJcbiAgICAgIGV4Y2x1ZGU6IFsnKiovdGVzdHMvKionXSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgLy8gXHU5NzAwXHU4OTgxXHU4QkM2XHU1MjJCdG9iaWFzLXVpXHU1MjJCXHU1NDBEXHJcbiAgICAvLyBAdG9iaWFzLXVpL3V0aWxzXHU1NzI4cm9sbHVwT3B0aW9ucy5leHRlcm5hbFx1NEUyRFx1NTE5OVx1NEU4Nlx1RkYwQ1x1NEY1Q1x1NEUzQVx1NTkxNlx1OTBFOFx1NUU5M1x1NjI1M1x1NTE2NVx1NTMwNVx1NEUyRFx1RkYwQ1x1NEUwRFx1OTcwMFx1ODk4MVx1OEJDNlx1NTIyQlx1NTIyQlx1NTQwRFxyXG4gICAgYWxpYXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGZpbmQ6IC9edG9iaWFzLXVpLyxcclxuICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShiYXNlLCAnc3JjLycpLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6ICcuL3NyYy9pbmRleC50cycsXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogW1xyXG4gICAgICAgICdAZmxvYXRpbmctdWkvdnVlJyxcclxuICAgICAgICAndnVlJyxcclxuICAgICAgICAnQGp1Z2dsZS9yZXNpemUtb2JzZXJ2ZXInLFxyXG4gICAgICAgICdAdi1jL3V0aWxzJyxcclxuICAgICAgICAnbG9kYXNoLWVzJyxcclxuICAgICAgICAnQHRvYmlhcy11aS91dGlscycsXHJcbiAgICAgICAgJ0B0b2JpYXMtdWkvaWNvbnMnLFxyXG4gICAgICBdLFxyXG4gICAgICBvdXRwdXQ6IFtcclxuICAgICAgICAvLyBlc21cclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXHJcbiAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXNSb290OiAnc3JjJyxcclxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLmpzJyxcclxuICAgICAgICAgIGZvcm1hdDogJ2VzbScsXHJcbiAgICAgICAgICBkaXI6ICdlcycsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBjanNcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXHJcbiAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXNSb290OiAnc3JjJyxcclxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLmpzJyxcclxuICAgICAgICAgIGV4cG9ydHM6ICduYW1lZCcsXHJcbiAgICAgICAgICBmb3JtYXQ6ICdjanMnLFxyXG4gICAgICAgICAgZGlyOiAnbGliJyxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVULFNBQVMscUJBQXFCO0FBQ3JWLFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sU0FBUztBQU5tTCxJQUFNLDJDQUEyQztBQVFwUCxJQUFNLE9BQU8sY0FBYyxJQUFJLElBQUksS0FBSyx3Q0FBZSxDQUFDO0FBRXhELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxJQUNQLGdCQUFnQjtBQUFBLElBQ2hCLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxNQUNGLFdBQVc7QUFBQSxNQUNYLFFBQVEsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNwQixTQUFTLENBQUMsYUFBYTtBQUFBLElBQ3pCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUE7QUFBQTtBQUFBLElBR1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsUUFBUSxNQUFNLE1BQU07QUFBQSxNQUNuQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUE7QUFBQSxRQUVOO0FBQUEsVUFDRSxpQkFBaUI7QUFBQSxVQUNqQixxQkFBcUI7QUFBQSxVQUNyQixnQkFBZ0I7QUFBQSxVQUNoQixRQUFRO0FBQUEsVUFDUixLQUFLO0FBQUEsUUFDUDtBQUFBO0FBQUEsUUFFQTtBQUFBLFVBQ0UsaUJBQWlCO0FBQUEsVUFDakIscUJBQXFCO0FBQUEsVUFDckIsZ0JBQWdCO0FBQUEsVUFDaEIsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsS0FBSztBQUFBLFFBQ1A7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
