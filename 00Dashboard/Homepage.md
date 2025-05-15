---
aliases:
  - 主页
  - 首页
cssclasses:
  - bannerimg
  - hide-properties
  - callouts-outlined
number headings: off
modified date: 2025-05-15 21:07:02
obsidianUIMode: preview
---
![[Banner06.jpg##bannerimg]]
```meta-bind-embed
[[首页Top导航按钮]]
```

![[像素风格年倒计时]]
> [!multi-column]
> > [!!blank-container] 倒计时
>> ![[倒计时]]
>
>>[!!blank-container] 系统概况
>> ![[天气]]
>> 
>

<br>

![[Projects_board#项目列表]]


![[task_board#首页全部任务面版]]

<br>

![[习惯追踪#习惯追踪汇总表]]


<br>

![[习惯追踪#健康追踪]]

> [!multi-column]
>
>> [!blank-container]+ 项目列表
>> #### 项目列表
>> ```dataview
>> list
>> from "01Projects"
>> where icontains(tags, "Project") AND (icontains(status, "进行中") OR icontains(status, "未开始"))
>> sort file.cday desc
>> limit 10
>> ```
>
>> [!blank-container]+ 稍后阅读
>> #### 稍后阅读
>> ```dataview
>> list
>> from "0Inbox"
>> where icontains(tags, "ToRead") 
>> sort file.cday desc
>> limit 5
>> ```
>
>> [!blank-container]+ 快速导航
>> #### 快速导航
>> - [[从这里开始]]
>> - [[Lifein]]
>> - [[Obsidian从入门到精通|Obsidian入门到精通]]
>> - [[MarkDown超级教程|Markdown教程]]
>> - [[一些技巧]]
>> - [[常见问题]]
>


```contributionGraph
title: 贡献热力图
graphType: default
dateRangeValue: 6
dateRangeType: LATEST_MONTH
startOfWeek: 1
showCellRuleIndicators: true
titleStyle:
  textAlign: center
  fontSize: 15px
  fontWeight: normal
dataSource:
  type: PAGE
  value: '#note or "00Journal" or #blog or #project or #book or #Movie or #people'
  dateField: {}
  countField:
    type: DEFAULT
fillTheScreen: true
enableMainContainerShadow: false
cellStyleRules:
  - id: default_b
    color: "#9be9a8"
    min: 1
    max: 2
  - id: default_c
    color: "#40c463"
    min: 2
    max: 5
  - id: default_d
    color: "#30a14e"
    min: 5
    max: 10
  - id: default_e
    color: "#216e39"
    min: 10
    max: 999
cellStyle:
  borderRadius: ""
  minWidth: 8px
  minHeight: 8px

```

> [!multi-column]
> > [!summary] 最新创建
>> ```dataview
>> list
>> from ""
>> Sort file.ctime DESC
>> limit 7
>> ```
>
>> [!example] 最近更新
>> ```dataview
>> list
>> from ""
>> Sort file.mtime DESC
>> limit 7
>>```
>

---
```dataviewjs
let ftMd = dv.pages("").file.sort(t => t.cday)[0]
let total = parseInt([new Date() - ftMd.ctime] / (60*60*24*1000))
let totalDays = `已使用 Obsidian <span style="color:#e91e63;">${total}</span> 天，`;

let nofold = '!"Templates"'
let allFile = dv.pages(nofold).file

let totalMd = `共创建 <span style="color:#3f51b5;">${allFile.length}</span> 篇笔记`;
let totalTag = `<span style="color:#4caf50;">${allFile.etags.distinct().length}</span> 个标签`;
let totalTask = `<span style="color:#ff9800;">${allFile.tasks.length}</span> 个待办。`;

let finalText = totalDays + totalMd + "、" + totalTag + "、" + totalTask;

//设置字体大小（比如 1.2em）
dv.el("div", finalText, { attr: { style: "font-size: 0.9em;" } });
```

