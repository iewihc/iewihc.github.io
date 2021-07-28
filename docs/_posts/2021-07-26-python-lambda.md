---
title: 【py】 Lambda in Python  
date: 2021-07-24
tags: 
  - py
author: iewihc
location: tw  
---



## Lambda Python in Use 



```py
import collections
import functools
from os import name
from functools import reduce
import itertools

# Immutable

Player = collections.namedtuple('Player',[
  'name',
  'field',
  'born',
  'champion'
])

players = [
 Player(name='LbJ' , field='SF' , born=1949 , champion=True),
 Player(name='KD' , field='SF' , born=1985 , champion=True),
 Player(name='Harden' , field='PG' , born=1995 , champion=False)
]

################################
# Filter '''相當於for ... if'''
################################

a = tuple(filter(lambda x: x.champion is False , players)) # Harden

# 同上寫法
def no_champion_filter(x):
    return x.champion is False

b = tuple(filter(no_champion_filter,players))

c = [x for x in players if x.field is 'PG']
# print(c)

################################
# Map  '''轉換為一個不同的列表'''
################################

names_and_ages = tuple(map(
  lambda x: {'name' : x.name , 'age' : 2021-x.born},players))
print(names_and_ages)


d = tuple([{'name': x.name , 'age': 2021-x.born} for x in players])

print(d)


################################
# reduce  '''序列內加總 , 分組'''
################################

total_age = reduce(
  lambda acc , val : acc + val['age'], # acc: 累加器(變量) , val: 當前的數組值
  names_and_ages,
  0 # 初始值
)

e = sum(x['age'] for x in names_and_ages)



# 分組至新的串列上

def reducer(acc,val):
    acc[val.field].append(val.name)
    return acc
  
player_by_field = reduce(reducer , players , {'PG':[],'SG':[],'PF':[],'SF':[],'C':[]})
print(player_by_field)
# {'PG': ['Harden'], 'SG': [], 'PF': [], 'SF': ['LbJ', 'KD'], 'C': []}

f = {
  item[0]: list(item[1])
  for item in itertools.groupby(players, lambda x:x.field)
}
# {'SF': [Player(name='LbJ', field='SF', born=1949, champion=True), Player(name='KD', field='SF', born=1985, champion=True)], 'PG': [Player(name='Harden', field='PG', born=1995, champion=False)]}


g = functools.reduce(
  lambda acc,val : {**acc, **{val.field : acc[val.field] + [val.name]}},
  players,
  {'PG':[],'SG':[],'PF':[],'SF':[],'C':[]}
)

# {'PG': ['Harden'], 'SG': [], 'PF': [], 'SF': ['LbJ', 'KD'], 'C': []}

```


# Args, Kwargs

```py

##############
# args and kwargs **#
##############

# 無限參數 args
def hi_test(n,*args):
  a = n 
  for arg in args:
      a +=arg
  print(a)

hi_test(1,2,3) # 調用方: 可傳入多個


def hi_test2(n, **kwargs): # 能夠判別那個參數是屬於 **kwargs 的 k,v值
  print(n)
  for a , b in kwargs.items():
    print(a,b)

hi_test2(1,S=3,L=5,XL=10) # 調用方: 具名參數傳入
# 1 
# key 3 
# value 5
# aaa 10
```
