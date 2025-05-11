---
modified date: 2025-05-08 18:24:24
number headings: off
aliases:
  - 属性
  - yaml
  - frontmatter
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

## yaml（属性）中的字段说明
* area - 领域（即`02Business、03Life、04Growth`三个对应的`商业、生活、个人成长`）
* category - 分类，领域太大，可以设置下属细分类别（如`03Life`下的第二级目录名字）
* type - 类型，比如说自媒体内容，`type`是文字、图文、视频等
* client - 客户，客户名称
* project - 项目，需要在一定时间内，要完成具体目标的事情
* task  - 项目project分解后的任务，或其它待办清单
	* 现在[[Projects_board#任务清单]]和[[task_board]]里统计的task主要位于`01Projects, 02Business, 00Todolist, 00Journal`目录，即这几个目录下的task都会被统计。
	* 如果想自定义自己的目录，请在代码中自行修改
* status - 状态、进展，用于项目、写作等。
	* 未开始：还没有开始
	* 进行中：正在进行中
	* 已完成：已完成
	* 已存档：存档资料
	* `书籍`笔记状态说明
		* 在读
		* 将读
		* 想读
		* 已读
	* `电影`笔记状态说明
		* 想看
		* 将看
		* 在看
		* 已看
* tags - 标签
	* 为了便于`dateview`索引，以下标签特殊说明：
		1. note 笔记，一般笔记`yaml`里添加
		2. project 项目，project文件的`yaml`里必须添加`project`
		3. book 书籍，在书籍文件的`yaml`里必须添加`book`
		4. movie 电影，在电影/观后感文件的`yaml`里必须添加`movie`
		5. blog 写作，在自己写作的笔记的`yaml`里必须添加`blog`
		6. ToRead 稍后阅读，用`dataview`汇集
	- 1-5中的分类tags在模板中自动默认添加
* aliases - 别名 
* stars - 星级，为笔记/文件/项目/任务的重要程度/质量打分，便于将来回顾或搜寻
* created date - 笔记创建时间
- modified date - 笔记修改时间（也可以用插件自动实现）
- Summary - 笔记摘要，便于`dataview`索引
- domain - 对于`project`的主要工作内容或方向
- client - `project`所属客户是谁
- start_date - `project`启动时间
- stop_date -  `project`停止时间
## 全局标签

`#ToWrite` 稍后写作
`#ToRead` 稍后阅读

## 日记中的一级标签
此标签用于`dataview`筛选用，在[[T-Weekly]]中用来分类汇总。
`#项目`
`#生活`
`#商业`
`#个人成长`

日记中也可以用嵌套标签，比如`#项目/自媒体`、`#个人成长/时间管理`等，不影响周复盘[[T-Weekly]]模板对内容的分类汇总。

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