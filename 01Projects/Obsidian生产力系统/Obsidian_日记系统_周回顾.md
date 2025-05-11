---
area: 工作
category:
  - 生产力系统
domain:
  - 生产力系统
client:
  - "[[Lifein]]"
project:
  - "[[Obsidian_日记系统]]"
status:
  - 完成
tags:
  - Project
aliases: 
stars: 3星级
number headings: auto, first-level 2, max 6, contents ^toc, skip ^skipped, start-at 1, _.1.1
Summary: 对周回顾进行规划，包括模板设置
people: 
created date: 2025-04-01 22:09
modified date: 2025-05-07 18:26:35
start_date: 2025-04-01
stop_date: 2025-04-02
cssclasses: []
---
## 任务清单^skipped
- [x] 周回顾模板包含哪些内容 ➕ 2025-04-01 ✅ 2025-04-02

## 1 项目说明

### 1.1 项目目标
- 周回顾模板

模板文件
- [[T-Weekly]]

### 1.2 项目信息
- 本周的重点
- 本周计划是否达成，为什么达成/未达成？
- 那些事应该继续做，哪些事应该停止做，哪些事应该开始做？

- R0：回顾本周目标及上周计划[^1]
- R1：调用每日记录，列出本周为了各个目标分别都做了些什么？
- R1：贴各种数据：「滴答清单」导出本周有效时间、有效时间分配；「健康」导出睡眠情况、运动合环表格。插入对应位置。
- R2：评判完成计划情况，是否达成目标？
- R2：对好的行为进行肯定和保留，对不好的行为进行分析（4M1E）
- R3：列出下周目标及行动计划（5W1H）

#### 1.2.1 第一版模板
属性
- CSSClasses
	- Daily
	- number headings：off
- tags：review, WeeklyReview
- date


内容
- 本周回顾
	- 任务情况
	- 项目情况
	- 商业
	- 个人成长
	- 生活
- 本周总结/感悟
	- 每日总结
	- 每日感悟
- 本周复盘
	- 本周思考



#### 1.2.2 第二版
内容增加：
- 习惯追踪回顾

### 1.3 相关资源
[套娃之复盘「复盘」](https://www.douban.com/group/topic/306607416/?_i=1969221fBwL7df)

## 2 子项目

```dataview
table without id 
  file.link as 项目名称,
  client as 客户,
  status as 状态,
  stars as 紧急程度,
  start_date AS 启动时间,
  stop_date AS 停止时间,
  date(today) - file.cday AS 已启动
from ""
where contains(project, link(this.file.name)) AND contains(tags, "Project")
sort stars desc, file.ctime desc
```

## 3 相关日记

```dataview
table without id
  file.link as 日期,
  regexreplace(L.text, "#\S+", "") as 内容
from "00Journal/01DailyNotes"
flatten file.lists as L
where contains(L.text, "[[" + this.file.name + "]]") 
```

## 4 相关条目

```dataview
list without id 
from ""
where icontains(project, link(this.file.name)) AND contains(tags, "note")
sort stars desc, file.ctime desc
```
