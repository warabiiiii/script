import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/main.ts",
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [typescript()],
};

export default config;
