---
title: Regular Expression
date: 2018-11-7
tags: 
  - others
author: iewihc
location: tw  
---

# Raw String (原始字符串)

R為前綴的字符串，不要以任何特殊方式處理`\`，
通常`\`用來表示換行符號之類的東西。

```py
print('\tTab') #輸出［'    'Tab］
print(ｒ'\tTab') #輸出［\tTab］
```


# 

```py
pattern = re.compile(r'abc') #搜尋文範本含abc
matches = partten.finditer(text_to_search)

```
