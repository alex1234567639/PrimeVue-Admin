# PrimeVue 後台模板

- 本專案使用 Vue 3 + Vite + TypeScript 開發
- UI框架: [PrimeVue](https://primevue.org/)

## 目錄

- [使用工具](#使用工具)
- [環境建立](#環境建立)
- [下載及執行專案](#下載及執行專案)
- [開發流程](#開發流程)
  - [建立開發分支](#建立開發分支)
  - [提交程式碼](#提交程式碼)
- [Commit 規範](#commit-規範)
- [專案架構](#專案架構)
- [程式碼風格規範](#程式碼風格規範)
- [.vue 檔開發規範](#vue-檔開發規範)
  - [script 區域編排建議](#script-區域編排建議)
  - [script 區塊範例](#script-區塊範例)

## 使用工具

- Node.js 執行環境 - [v22.17.0](https://nodejs.org/zh-tw)
- 套件管理 - [pnpm 10](https://pnpm.io/zh-TW/installation)
- 版本控制 - [Git](https://git-scm.com)

## 環境建立

1. 安裝 Node.js v22.17.0 LTS（建議使用 [Volta](https://docs.volta.sh/guide/) 或 [nvm](https://github.com/nvm-sh/nvm) 安裝及管理 Node 版本。
2. 安裝 pnpm - 參考 [官網安裝說明](https://pnpm.io/zh/installation) 或直接使用以下指令安裝。

   ```bash
   npm install -g pnpm
   ```

3. 安裝 Git - 從 [官網](https://git-scm.com/) 下載並安裝 GIT。

## 下載及執行專案

```bash
git clone git@專案位置
cd 專案名稱
git checkout test
pnpm install
pnpm run dev
```

## 開發流程

### 建立開發分支

```bash
git checkout test
git pull origin test
git checkout -b feature/<your-feature-name>
```

### 提交程式碼

1. 切換到開發分支

   ```bash
   git checkout <branch>
   ```

2. 將最新的 test 合併進開發分支（確保先解衝突）

   ```bash
   git merge origin/test
   ```

3. 確認測試沒問題後，切換回 test 分支

   ```bash
   git checkout test
   git pull origin test
   ```

4. 把開發分支的程式合併進 test 並打包程式碼

   ```bash
   git merge <branch>
   pnpm run build:stage
   ```

5. 推送到遠端 test 分支（更新測試站）

   ```bash
   git push origin test
   ```

## Commit 規範

參考採用 [Conventional Commits](https://www.conventionalcommits.org/zh-hant/v1.0.0/)

```text
feat: 新增功能
modify: 修改功能
fix: 修正錯誤
refactor: 重構程式碼 (不含 Bug 修復及新增功能)
build: 部署用
```

## 專案架構

```bash
├── .vscode/                    # VSCode 設定
├── public/                     # 靜態資源
├── src/                        # 主程式資源
│   ├── assets                  # 圖片 / 圖示
│   ├── components              # 公用組件(大寫駝峰)
│   ├── composables             # 共用 Vue 組合式函數
│   ├── layout                  # 頁面結構樣式
│   ├── models                  # 型別定義
│   ├── router                  # Vue Router
│   ├── service                 # API 層
│   ├── stores                  # Pinia Store
│   ├── utils                   # 工具函數
│   ├── views                   # Page View
│   ├── App.vue                 # 根組件
│   └── main.ts                 # 入口點
│   ├── vite-env.d.ts           # 全域型別
├── .editorconfig               # Editor 格式化規則
├── .env.*                      # 環境變數檔案
├── .eslintrc-auto-import.json  # 自動匯入 globals 設定
├── .gitignore                  # Git 忽略規則
├── .nvmrc                      # 指定 Node.js 版本
├── .prettierignore             # Prettier 忽略檔案清單
├── .prettierrc.json            # Prettier 設定
├── auto-imports.d.ts           # 自動匯入的型別定義
├── commitlint.config.mjs       # CommitLint (commit‑msg) 規則
├── components.d.ts             # 全域共用元件自動引入
├── eslint.config.mjs           # ESLint Flat Config 設定
├── index.html                  # HTML 入口檔
├── jsconfig.json               # 讓 VS Code、Volar、ESLint、Vite 理解路徑別名與語法提示
├── package.json                # 專案描述與指令
├── pnpm‑lock.yaml              # pnpm 鎖定檔
├── postcss.config.js           # PostCSS 設定
├── README.md                   # 專案說明文件
├── tailwind.config.js          # Tailwind CSS 設定
├── tsconfig.json               # TypeScript 設定
├── vite.config.ts              # Vite 設定
```
