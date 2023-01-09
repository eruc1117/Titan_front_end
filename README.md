# Titan_front_end

這個專案是前後端分離之專案。 <br />
後端 [Github 連結](https://github.com/eruc1117/Titan_back_end) 

使用者
  - 輸入帳號密碼登入 
  - 使用者直接從資料庫初始化(密碼預設 titaner)
  - 有修改密碼功能，需輸入由信箱收到的驗證碼
  - 登入密碼錯誤滿 5 次後不可登入打卡系統
  - GPS 打卡功能: 在辦公室 400m 內按一個按鈕即可打卡，打卡後顯示打卡時間
  - Qrcode 打卡：掃描後即可打卡，但 Qrcode 需要在辦公室 400m 內才能獲得


### 測試用帳號

#### 前台帳號
帳號: user0
密碼: titaner

## Project Setup
```
cd Titan_front_end
```
```sh
npm install
```
```sh
npm run build
```
```sh
npm run dev
```
P.S.

若不清楚現在網站所抓到得地點，可以在點擊打卡後在開發者工具中查看。
