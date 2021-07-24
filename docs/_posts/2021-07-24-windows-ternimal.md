---
title: 【cmd】The Windows Ternimal Quickly Open
date: 2021-07-24
tags: 
  - cmd
author: iewihc
location: tw  
---

# 需求描述 :
 微服務需要個別開啟的時候，可以透過已下指令於Ternimal執行，快速開啟多個終端機和頁籤。

```sh
wt --title 訂單服務 -p Order --tabColor "#009999" -d D:\proj\Order --suppressApplicationTitle ; 
wt new-tab --title 出貨服務 -p Invoice -d -d D:\proj\2 --suppressApplicationTitle ;
wt new-tab --title WebApi -p WebApi --tabColor "#FF0080" -d D:\proj\WebAPI --suppressApplicationTitle ;
```

- `wt` : Windows Ternimal
- `--title` : 設置標題名稱(預設為路徑名稱)
- `-p` : 使用 PowerShell 
- `d` : 目錄
- `--suppressApplicationTitle` 防止改變TAB名稱 
- `--tabColor "#FF0080"` 設定TAB顏色

# 效果如下

![image](https://user-images.githubusercontent.com/53833171/126865171-106262b7-ff46-4024-8513-0e17c60a2594.png)
