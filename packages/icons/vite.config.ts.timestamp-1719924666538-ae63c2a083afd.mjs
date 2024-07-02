// vite.config.ts
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "file:///C:/workspace/tobias-ui/node_modules/.pnpm/vite@5.2.11_@types+node@20.13.0_less@4.2.0/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/workspace/tobias-ui/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.11_@types+node@20.13.0_less@4.2.0__vue@3.4.27_typescript@5.2.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///C:/workspace/tobias-ui/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.13.0_rollup@3.29.4_typescript@5.2.2_vite@5.2.11_@types+node@20.13.0_less@4.2.0_/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/workspace/tobias-ui/packages/icons/vite.config.ts";
var base = fileURLToPath(new URL(".", __vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: "src",
      outDir: ["es", "lib"]
    })
  ],
  build: {
    lib: {
      entry: "src/index.ts"
    },
    rollupOptions: {
      external: ["vue"],
      output: [
        {
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
          format: "esm",
          dir: "es"
        },
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
  },
  resolve: {
    alias: [
      {
        find: /^@tobias-ui\/icons/,
        replacement: resolve(base, "src/")
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3b3Jrc3BhY2VcXFxcdG9iaWFzLXVpXFxcXHBhY2thZ2VzXFxcXGljb25zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFx3b3Jrc3BhY2VcXFxcdG9iaWFzLXVpXFxcXHBhY2thZ2VzXFxcXGljb25zXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi93b3Jrc3BhY2UvdG9iaWFzLXVpL3BhY2thZ2VzL2ljb25zL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXHJcblxyXG5jb25zdCBiYXNlID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIGR0cyh7XHJcbiAgICAgIGVudHJ5Um9vdDogJ3NyYycsXHJcbiAgICAgIG91dERpcjogWydlcycsICdsaWInXSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogJ3NyYy9pbmRleC50cycsXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogWyd2dWUnXSxcclxuICAgICAgb3V0cHV0OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJlc2VydmVNb2R1bGVzOiB0cnVlLFxyXG4gICAgICAgICAgcHJlc2VydmVNb2R1bGVzUm9vdDogJ3NyYycsXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5qcycsXHJcbiAgICAgICAgICBmb3JtYXQ6ICdlc20nLFxyXG4gICAgICAgICAgZGlyOiAnZXMnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJlc2VydmVNb2R1bGVzOiB0cnVlLFxyXG4gICAgICAgICAgcHJlc2VydmVNb2R1bGVzUm9vdDogJ3NyYycsXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5qcycsXHJcbiAgICAgICAgICBleHBvcnRzOiAnbmFtZWQnLFxyXG4gICAgICAgICAgZm9ybWF0OiAnY2pzJyxcclxuICAgICAgICAgIGRpcjogJ2xpYicsXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogL15AdG9iaWFzLXVpXFwvaWNvbnMvLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKGJhc2UsICdzcmMvJyksXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlMsU0FBUyxlQUFlO0FBQ25VLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFKMkssSUFBTSwyQ0FBMkM7QUFNNU8sSUFBTSxPQUFPLGNBQWMsSUFBSSxJQUFJLEtBQUssd0NBQWUsQ0FBQztBQUN4RCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsTUFDRixXQUFXO0FBQUEsTUFDWCxRQUFRLENBQUMsTUFBTSxLQUFLO0FBQUEsSUFDdEIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQSxRQUNOO0FBQUEsVUFDRSxpQkFBaUI7QUFBQSxVQUNqQixxQkFBcUI7QUFBQSxVQUNyQixnQkFBZ0I7QUFBQSxVQUNoQixRQUFRO0FBQUEsVUFDUixLQUFLO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxVQUNFLGlCQUFpQjtBQUFBLFVBQ2pCLHFCQUFxQjtBQUFBLFVBQ3JCLGdCQUFnQjtBQUFBLFVBQ2hCLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxRQUFRLE1BQU0sTUFBTTtBQUFBLE1BQ25DO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
