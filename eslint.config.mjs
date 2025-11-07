import { fixupPluginRules } from "@eslint/compat";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintPluginImport from "eslint-plugin-import";
import importRecommended from "eslint-plugin-import/config/recommended.js";
import importTypeScript from "eslint-plugin-import/config/typescript.js";
import prettierPlugin from "eslint-plugin-prettier";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const eslintrcAutoImport = JSON.parse(
  readFileSync(join(__dirname, ".eslintrc-auto-import.json"), "utf-8")
);

// —— 1. 从 vuePlugin.configs 中拿到 “flat/recommended” 这个 preset 的 rules & settings ——
const {
  rules: vueRecommendedRules = {},
  settings: vueRecommendedSettings = {},
} = vuePlugin.configs["flat/recommended"];

// —— 2. 从 prettierPlugin.configs 里拿到 “recommended” 的 rules ——
const { rules: prettierRecommendedRules = {} } =
  prettierPlugin.configs.recommended;

export default [
  // 全域忽略設定
  {
    ignores: [
      "dist",
      "**/*.mjs",
      ".commitlint.config.js",
      "postcss.config.js",
      "tailwind.config.js",
      "vite.config.ts",
      "**/*.yaml",
      "**/*.yml",
      "**/*.json",
      "node_modules",
      "reference",
      ".gitignore",
      "auto-imports.d.ts",
      "components.d.ts",
      ".eslintrc-auto-import.json",
      ".nvmrc",
    ],
    languageOptions: {
      // 把原本 JSON 裡的 globals 移到這裡
      globals: {
        ...eslintrcAutoImport.globals,
      },
    },
  },

  // 針對 Vue 檔案的設定
  {
    files: ["**/*.vue"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: vueParser,
      parserOptions: {
        // 指定內部 <script> 區塊使用 @typescript-eslint/parser 解析
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      vue: vuePlugin,
      prettier: prettierPlugin,
      tailwindcss: tailwindcssPlugin,
    },
    rules: {
      // 先注入官方 vue3-recommended 規則
      ...vueRecommendedRules,
      // 再注入 Prettier recommended 只會有 prettier/prettier
      ...prettierRecommendedRules,
      "tailwindcss/classnames-order": "warn",
    },
    settings: {
      // 先注入官方 vue3-recommended settings
      ...vueRecommendedSettings,
      "vue/setup-compiler-macros": true,
    },
  },
  // 針對 .ts/.js 檔案的設定
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      import: fixupPluginRules(eslintPluginImport),
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        alias: {
          map: [["@", "./src"]],
          extensions: [".ts", ".js", ".vue"],
        },
      },
    },
    rules: {
      ...importRecommended.rules,
      ...importTypeScript.rules,
      // 只启用 Prettier 的格式检查
      ...prettierRecommendedRules,
      "import/no-unresolved": "error", // 在 import 出錯時更快發現問題

      "import/order": [
        "warn",
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
          ],
          pathGroups: [
            {
              pattern: "vue",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
    },
  },

  // 其他通用規則
  {
    rules: {
      // ESLint 核心規則註解
      "no-var": "error",
      "no-undef": "off", // 允許使用未宣告的變數（通常用於全域變數）
      "no-empty": "off", // 允許空的程式區塊（如空的 if, catch 區塊）
      "no-fallthrough": "off", // 允許 switch case 落空（不加 break）
      "no-sparse-arrays": "off", // 允許稀疏陣列（中間缺值）
      "no-misleading-character-class": "off", // 允許在 RegExp 中使用混淆的 Unicode 字元集
      "no-cond-assign": "off", // 允許在條件判斷中使用賦值運算（如 if (x = 1)）
      "no-control-regex": "off", // 允許 RegExp 中使用控制字元（通常為不可見字元）
      "no-prototype-builtins": "off", // 允許直接使用 Object.prototype 上的方法（如 hasOwnProperty）
      "no-case-declarations": "off", // 允許在 case 內直接使用變數宣告（如 let/const）
      "no-useless-escape": "off", /// 允許不必要的跳脫字元（如 '\"'）
      "no-redeclare": "off", // 允許重複宣告變數
      "no-setter-return": "off", // 允許 setter 回傳值（通常不推薦）
      "no-self-assign": "off", // 允許對自己賦值（如 x = x）
      "no-unreachable": "off", // 允許不可達的程式碼（如 return 後還有程式）
      "no-func-assign": "off", // 允許對函式名稱重新賦值
      "no-unexpected-multiline": "off", // 允許可能造成解析錯誤的換行（如 return
      "no-unsafe-finally": "off", // 允許在 finally 區塊中使用 return/throw 等

      // TypeScript ESLint 規則註解
      "prettier/prettier": "error", // 只要程式碼格式不符合 Prettier 的規則，就會被 ESLint 當作 錯誤（error） 報出來
      "@typescript-eslint/no-explicit-any": "off", // 允許使用 any 型別
      "@typescript-eslint/no-unused-vars": "off", // 允許未使用的變數
      "@typescript-eslint/no-unsafe-declaration-merging": "off", // 允許不安全的宣告合併（interface + function 同名）
      "@typescript-eslint/no-empty-object-type": "off", // 允許空的物件型別（{}）
      "@typescript-eslint/no-unused-expressions": "off", // 允許未使用的表達式（如 a && b）
      "@typescript-eslint/no-duplicate-enum-values": "off", // 允許 enum 中重複的值
      "@typescript-eslint/no-unsafe-function-type": "off", // 允許未定義型別的函式參數/回傳值
      "@typescript-eslint/no-this-alias": "off", // 允許將 this 指派給變數（如 const self = this）
      "@typescript-eslint/no-extraneous-class": "off", // 允許僅包含靜態屬性的 class
      "@typescript-eslint/no-empty-function": "off", // 允許空函式（function() {}）
      "@typescript-eslint/no-invalid-void-type": "off", // 允許在非回傳位置使用 void 型別
      "@typescript-eslint/no-dynamic-delete": "off", // 允許使用 delete 刪除物件屬性
      "@typescript-eslint/prefer-for-of": "off", // 不強制使用 for-of
      "@typescript-eslint/class-literal-property-style": "off", // 不限制類別屬性的寫法（如 field: string vs this.field = ''）
      "@typescript-eslint/no-non-null-assertion": "off", // 允許使用非空斷言（如 str!.length）
    },
  },
];
