---
modified date: 2025-05-08 18:24:24
number headings: off
aliases: 
category:
  - 系统设置
tags:
  - note
cssclasses:
  - bannerimg
  - hide-properties
obsidianUIMode: preview
---
![[Lifein_banner1.png##bannerimg]]

<br>

![[系统设置导航]]

## Javascript （js脚本）

1. 放置于`Settings\js`目录下

| 名称                   | 功能                | 备注                        |
| -------------------- | ----------------- | ------------------------- |
| new_note.js          | 快捷命令调出弹出框新建笔记     | 在任何界面都可以用`QuickAdd`命令新建笔记 |
| open_bookshelf.js    | 在侧边栏添加`打开书架`快捷按钮  | 使用`QuickAdd`插件实现          |
| open_movielibrary.js | 在侧边栏添加`打开电影库`快捷按钮 | 使用`QuickAdd`插件实现          |
| theme_dark_light.js  | 快速切换主题`深色`或`浅色`样式 | 使用`QuickAdd`插件实现          |

2. 放置于`Settings\tasksCalendar`目录下

| 名称      | 功能            | 备注                       |
| ------- | ------------- | ------------------------ |
| view.js | 增加`日历视图`的任务面版 | 使用`Dataview`和`Tasks`插件实现 |

## 相关条目
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
