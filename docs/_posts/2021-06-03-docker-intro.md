---
title: 【CI/CD】 一、Docker－簡介
date: 2018-11-7
tags: 
  - docker
  - ci/cd
author: iewihc
location: tw  
---

簡介：
將應用程序所運行的依賴環境打包在一起，通過容器進行運行。
只需要打包一次就可以在所有系統上執行。
作用: 輕量、容易快速的跨平台部屬

比較:
Docker是一個操作系統上裝了多個應用<–>虛擬機(安裝Linux…Windows)

- Docker Client `客戶端`
  - 通過api訪問Docker Daemon管理Docker鏡像

- Docker Daemon `守護進程`
  - 負責Docker鏡像的創建、刪除、啟動、停止等服務

- Docker Image `鏡像`
  - 只讀的系統CD

- Docker Container `容器`
  - Docker的容器，Docker Images運行實例
- Docker Registry
  - Docker Images的倉庫，Dock Hub


---

# 重要三個概念

## Image
將所有的東西打包成鏡像，就可以一起運行

## Container
創建Image的實例 (類似C#的Class創建一樣)

## Repository
一個Docker Registry中可以包含多個Repository，每個倉庫可以包含多個Tag，每個Tag對應一個Image
