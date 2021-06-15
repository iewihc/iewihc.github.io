---
title: 【CI/CD】 二、Docker 使用場景
date: 2018-11-7
tags: 
  - docker
  - ci/cd
author: iewihc
location: tw  
---

- Simplifying Configuration
  簡化配置－都是透過Images形式，不需要一個一個安裝。可以直接Run
  例:如重裝電腦，需要安裝Line、Chrome要花費很多的時
  Code Pipeline Management
  從編碼到提交，自動做下載、編譯、打包成境像作持續的鏡像、部屬

- Developer Productivity
  同上

- App Isolation
  隔離應用－是獨立的、可以同時開好幾個。
  例:原本一台機器只能運行一個MySQL，用Docker可以啟動多個MySQL

- Server Consolidation
  整合服務器－公用的生產環境、中間件可以包成配置，拉取鏡像即可

- Debugging Capabilities
  可以把鏡像複製到本地做調適，不會影響到Images。

- Multi-tenancy
  多租戶環境－每個用戶請求應用都不同
  例：以前是多個虛擬機

- Rapid Deployment
  快速部屬
