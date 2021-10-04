---
title: 【py】 Jieba 斷詞
date: 2021-08-29
tags: 
  - py
  - jieba
author: iewihc
location: tw  
---


# 效果

e.g. 文字雲

![image](https://user-images.githubusercontent.com/53833171/131240320-b76f8730-e77f-406b-8522-48d2ef5a3e3b.png)

e.g. 錯字偵錯系統

小明今~~添~~天不上~~般~~班

e.g. 語意查詢

![image](https://user-images.githubusercontent.com/53833171/131240573-b9bb4f97-0ec3-4767-ba96-41d164f3983f.png)


`川普多高?`

`川普是誰?`



e.g. 文字情緒分析


|sen.|polarity|subjectiivty|
|---|---|---|
|Today is a good day for a picnic.| 0.7 | 0.600|
|I hate snowstorms| -0.8| 0.9|
|Bacon is my favorite| 0.625 | 1.0



# 斷詞

`詞`為句子的最小單位，理解為將雞蛋（詞）放到不同的籃子裡。可以實作機器翻譯、語言分析（語意）、情感偵測等等。

## 中文的博大精深？

斷詞的位置加上「／」後句子所呈現釋義會截然不同。
其實還有很多，不過好像會變成中文課(突然覺得自己中文很差XD)

- 下雨天留客，天留我不留。
(下雨天時留住客人，但主人自白心聲，天雖要留人，我不願留客人。)
- 下雨天留客，天留我?不留。
(下雨天時留住客人，客人自問天意要留住自己嗎?客人的決定是不留。)
- 下雨天留客，天留我不?留。
(下雨天時留住客人，客人自問自答，老天爺是否要我留?客人自答:對,正是要我留下。)
- 下雨，天留客;天留我不留?
(此時天雨，老天爺在留客人，客人自己在猶豫著老天爺的真意為何?)
- 下雨天，留客天，留我?不留。
(下雨天，正是留住客人的時候，不論天意留我或主人留我，我就是堅決不留?)
- 下雨天，留客天;留我不?留。
(下雨天，正是個留客的日子。客人問「主人不肯留我是嗎?」客人偏要留下。)
- 下雨天，留客天，留我不留?

---

- 每天膳食，無雞鴨亦可，無魚肉亦可，青菜一碟足矣
- 每天膳食，無雞，鴨亦可; 無魚，肉亦可; 青菜一碟，足矣

---

# 主題

終於來到主題了，以前習慣開宗明義地講用法，怎麼去使用，這次意外接觸到文字雲，想起以前國中六十分的國文，竟潸然淚下難以下筆，不過沒關係。


- 全模式: 將所有成詞的詞句都切分出來
`jieba.cut("我來到一個島它叫卡加布列島小黑猩猩很有禮貌",cut_all=True)`
- 精準模式: 將句子精確的切分出來
`jieba.cut("我從小是來自一個非常貧困的鄉下家裡有十五個人都死掉我從小就非常有夢想聽說如果有夢想你要越慘就能夠越能夠實現你的夢想其實我本身也有殘廢我小便是歪向左邊我覺得我非常慘我今天來到這個舞台中國最重要的舞台就是想告訴大家我會飆高音",cut_all=False)`
- 搜尋引擎模式: 基於精準模式上，更精確的切分長詞
`jieba.cut("我來到你的城市走過你來時的路 想像著沒我的日子你是怎樣的孤獨",cut_all=True,HMM=True)`

有趣的範例
> 1. 今天下雨我騎車差點摔倒了好在我一把把把住了
> 2. 我想過過過兒過的生活
> 3. 差點沒上上上上海的車。
> 4. 用毒毒毒蛇毒蛇會不會被毒毒死？
> 5. 校服上除了校徽別別別的，讓你們別別別的別別別的你非得別別的！
> 6. 吃檸檬吧檸檬熟了酸爆

![image](https://user-images.githubusercontent.com/53833171/131243357-5cb5b87f-744a-4540-9be6-b934fed9396b.png)


![image](https://user-images.githubusercontent.com/53833171/131243373-129bba23-16be-4069-8fd6-8b45f3122047.png)


# 程式範例
```py
import jieba

samples = ["今天下雨我騎車差點摔倒了好在我一把把把住了","吃檸檬吧檸檬熟了酸爆"]

print("---精準模式")
for sentence in samples:
    seg_list = jieba.cut(sentence)
    print('/'.join(seg_list))
print("---")

print("---全模式")
for sentence in samples:
    seg_list = jieba.cut(sentence,cut_all=True)
    print('/'.join(seg_list))
print("---")


print("---搜尋引擎模式")
for sentence in samples:
    seg_list = jieba.cut_for_search(sentence)
    print('/'.join(seg_list))
print("---")

# 預期"陳其邁"，但被切分為"陳/其邁"了
news ="感謝陳其邁副院長費心督導，對於年假期間各防疫機關人員的堅守崗位，也表示肯定與感謝。"
seg_list = jieba.cut(news)
print('/'.join(seg_list))
# 感謝/陳/其邁/副/院長/費心督導/，/對/於/年/假期/間/各/防疫/機關/人員/的/堅守崗位/，/也/表示/肯定/與/感謝/。

# 載入字典
jieba.load_userdict('sample/userdict.txt')
seg_list = jieba.cut(news)
print('/'.join(seg_list))
# 感謝/陳其邁/副/院長/費心督導/，/對/於/年/假期/間/各/防疫/機關/人員/的/堅守崗位/，/也/表示/肯定/與/感謝/。
```


# Ref
[Github 程式碼不完整範例](https://github.com/iewihc/py-jieba-tutorial)

[如何使用 jieba 結巴中文分詞程式
](https://blog.fukuball.com/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-jieba-%E7%B5%90%E5%B7%B4%E4%B8%AD%E6%96%87%E5%88%86%E8%A9%9E%E7%A8%8B%E5%BC%8F/)

[CKIP Lab 中文詞知識小組](https://ckip.iis.sinica.edu.tw/demo)


# End 

--- 
