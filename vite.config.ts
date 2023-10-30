import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
// export default ({ mode }) => {
//   process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));

//   return defineConfig({
//     plugins: [react(), svgr()],
//   });
// };

export default defineConfig(() => {
  const env = loadEnv("mock", process.cwd(), "");
  const processEnvValues = {
    "process.env": Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val,
      };
    }, {}),
  };

  return {
    plugins: [react(), svgr()],
    define: processEnvValues,
  };
});
