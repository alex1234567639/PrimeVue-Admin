// JWT Token 解析後的用戶資訊
export interface UserInfo {
  id: string; // 使用者唯一識別碼
  name: string; // 使用者名稱
  email: string; // 使用者帳號與電子信箱
  permission: string; // 權限
}
