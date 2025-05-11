---
area: 个人成长
category:
  - 时间管理
status:
  - 已完成
tags:
  - note
  - GTD
aliases: 
stars: 3星级
number headings: auto, first-level 2, max 6, contents ^toc, skip ^skipped, start-at 1, _.1.1
modified date: 2025-05-08 13:16:03
---
## 1 GTD流程
![[GTD流程20241110.png]]


## 2 相关条目

```dataview
list
from ""
where 
    category AND
    any(this.category, (c) => contains(category, c)) AND
    icontains(tags, "note") AND
    file.name != this.file.name
sort file.ctime desc
limit 10
```

## 3 延伸阅读

[GTD系列之GTD是什么？怎么用？\_TeresaMei的博客-CSDN博客](https://blog.csdn.net/xueyingpiaoran/article/details/124280854)
[GTD时间管理法 - 知乎](https://zhuanlan.zhihu.com/p/578274451)

