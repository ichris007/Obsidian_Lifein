---
area: 工作
category:
  - 生产力系统
domain: 
client:
  - "[[Lifein]]"
project:
  - "[[Obsidian生产力系统]]"
status:
  - 进行中
tags:
  - Project
aliases: 
stars: 3星级
number headings: auto, first-level 2, max 6, contents ^toc, skip ^skipped, start-at 1, _.1.1
Summary: 
people: 
created date: 2025-03-18 18:23
modified date: 2025-05-09 18:42:57
start_date: 2025-03-18
stop_date: 2025-06-30
cssclasses: []
---

## 任务清单^skipped
- [x] 模板[[T-Daily]]中的`前一天|后一天`代码更新 ➕ 2025-04-01 📅 2025-04-01 ✅ 2025-04-02
- [x] 研究Journal插件-看[YouTube](https://www.youtube.com/watch?v=ks969Cp0yZU)、B站等 ➕ 2025-03-20 📅 2025-03-20 ✅ 2025-04-03
- [x] 美化Button，且并排显示 🔼 ➕ 2025-03-20 📅 2025-03-21 ✅ 2025-03-24
- [x] 日记模板 ➕ 2025-03-18 ✅ 2025-03-20
- [x] 周回顾模板 ➕ 2025-03-18 📅 2025-03-25 ✅ 2025-04-01
- [ ] 月回顾模板 ➕ 2025-03-18
- [ ] 年回顾模板 ➕ 2025-03-18
- [x] 内容布局、美化CSS ➕ 2025-03-18 ✅ 2025-04-01
- [x] 日期导航部分添加 `周回顾` 代码 ➕ 2025-04-02 📅 2025-04-02 ✅ 2025-04-02


## 1 项目说明

### 1.1 项目目标
- 建立日记、周记、月记和年记模板，进行以日记为基础的周、月、年回顾
- 帮助个人建立通过日记，进行沉淀、复盘，以提升自己

### 1.2 项目信息
- 日记模板
	- 属性
		- date：`<%tp.date.now("YYYY-MM-DD")%>`
		- week：`<% moment(tp.file.title, "WW_YYYYMMDD").format("GGGG[W]WW") %>`
		- tags
			- DailyNotes
		- cssclasses
			- daily
			- callouts-outlined
			- bannerimg
		- number headings：off
		- 读书
		- 写作
		- 健身
		- 早起
		- 社媒分享
		- 听播客
	- 美化：banner ✅
	- 日期导航 ✅
		- 前一天
		- 今天，`周回顾`
		- 后一天
	- 添加任务按钮 ✅
		- 嵌入 [[添加任务按钮]] 中的 `添加任务按钮`
	- 交互：嵌入 `任务` 模块，用 `tab` 形式更简洁直观 ✅
	- 交互：嵌入 `会议` 模块 ✅
		- 快速添加会议按钮
	- 日记部分：`quickadd` 快速添加时间戳 ✅
	- 今日总结/感悟 ✅
		- 今日总结（关键词section，筛选用）
		- 今日感悟（关键词section，筛选用）
- 周回顾模板
	- 属性
		- tags
			- review
			- WeeklyReview
		- date：`<%tp.date.now("YYYY-MM-DD")%>`
		- week：`<%moment(tp.file.title).format("GGGG[W]WW")%>`
		- number headings：off
		- cssclasses
			- bannerimg
			- daily
	- 周起始日期（一级标题）
	- 本周回顾
		- 任务回顾
		- 项目回顾
		- 商业回顾
		- 个人成长
		- 生活
	- 本周总结/感悟
	- 本周复盘

### 1.3 相关资源
[Journaling in Obsidian - My Daily, Weekly, Monthly and Yearly Review Templates - YouTube](https://www.youtube.com/watch?v=uqrGVjdIYpk)
- 他的昨日、今日、明日的链接代码可以借鉴，[详细代码](https://notepad.link/share/FU33YfpsUu5Hm2xdRHZY) 应用不成功错误❌

[Templater常用语法(视频+模板) \| obsidian文档咖啡豆版](https://coffeetea.top/zh/plugins-templater/templater-b.html#_2-2-%E8%8E%B7%E5%8F%96%E5%BD%93%E5%A4%A9%E6%97%A5%E6%9C%9F)
- templater获取日期语法 | 成功 ✅

[Habit tracking vault build from SCRATCH - youtube](https://youtu.be/ubkzPh29qyw)
- 日记模板日期导航templater语法 ✅

## 2 子项目

```dataview
table without id 
  file.link as 项目,
  client as 客户,
  status as 状态,
  stars as 紧急,
  start_date AS 开始,
  stop_date AS 完成,
  date(today) - file.cday AS 已启动
from ""
where contains(project, link(this.file.name)) AND contains(tags, "Project")
sort stars desc, file.ctime desc
```

## 3 同级项目
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
where project = this.project AND contains(tags, "Project") AND file.name != this.file.name
sort stars desc, file.ctime desc
```

## 4 相关日记

```dataview
table without id
  file.link as 日期,
  regexreplace(L.text, "#\S+", "") as 内容
from "00Journal/01DailyNotes"
flatten file.lists as L
where contains(L.text, "[[" + this.file.name + "]]") 
```

## 5 相关条目

```dataview
list without id 
from ""
where icontains(project, link(this.file.name)) AND contains(tags, "note")
sort stars desc, file.ctime desc
```
