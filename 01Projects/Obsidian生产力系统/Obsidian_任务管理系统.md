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
  - 完成
tags:
  - Project
aliases: 
stars: 3星级
number headings: auto, first-level 2, max 6, contents ^toc, skip ^skipped, start-at 1, _.1.1
Summary: 
people: 
created date: 2025-02-24 02:35
modified date: 2025-05-10 19:05:00
start_date: 2025-02-24
stop_date: 2025-04-07
cssclasses: []
---

## 任务清单^skipped
- [x] 编写卡片式任务面版代码，实现按照时间/状态分类的任务展示 ➕ 2025-05-03 ✅ 2025-05-03
- [x] 编写卡片式任务面版样式文件，并调整使样式美观 ➕ 2025-05-03 ✅ 2025-05-03
- [x] 制作卡片式任务面版精简版，用于[[首页]]展示 ➕ 2025-05-03 ✅ 2025-05-03
- [x] 撰写卡片式任务面版代码和样式使用指南 ➕ 2025-05-03 📅 2025-05-04 ✅ 2025-05-05
- [x] 分享卡片式任务面版到Obsidian中文论坛 ➕ 2025-05-03 📅 2025-05-05 ✅ 2025-05-05
- [x] 整理reddit和GitHub上的任务管理库 ➕ 2025-02-24 ✅ 2025-04-07
- [x] 观看YouTube、B站上的OB任务管理视频 🔼 ➕ 2025-02-24 📅 2025-03-02 ✅ 2025-04-07

## 1 项目说明

### 1.1 项目目标
通过Dataviewjs代码实现卡片式任务管理面版：
- 收集多个项目文件夹下的全部任务；
- 按照时间状态分类（如：逾期、进行中、待办、今日、明日、一周内、一周后（未来）、完成）；
- 展示为带有点击切换功能的任务面板；
	- 当点击「逾期」分类时，下方只显示「逾期」的任务列表
	- 当点击「进行中」分类时，下方只显示「进行中」的任务列表
- 使用 `tasks` 插件语法动态生成查询并渲染任务列表。直接应用于现有任务列表，无需任何更改。
	- 需要对任务进行修改时，直接在点击任务文字后的编辑图标即可；点击任务文本最后的超链接，直接跳转到任务所在文件。
- 卡片样式自适应。

### 1.2 项目信息
遇到的问题
- 问题在于 `dv.paragraph(...)` 插入的内容是 纯文本 Markdown，由 Obsidian 渲染器异步加载为任务块。这会导致即使你清除了 HTML 元素，任务块仍然残留（因为 dv.paragraph 生成的是 textNode，不是 Obsidian 渲染的任务块 DOM）。
正确解决方式：
- 你需要在 `updateTasksView()` 中用 **`.innerHTML = ""` 清除 queryContainer 本身**，并**重新创建它**，**不能只清空内部内容**，否则 Obsidian 渲染出来的任务块不会被销毁。


#### 1.2.1 DVJS代码
```dataviewjs
// ==== 1. 收集任务 ====
let taskSources = ["01Projects", "02Business", "00Todolist", "07People", "00Journal"];
let tasks = [];

// 根据列表信息添加任务
for (let source of taskSources) {
    tasks.push(...dv.pages(`"${source}"`).file.tasks);
}

let today = dv.date("today");
let tomorrow = dv.date("tomorrow");
let oneWeekLater = today.plus({ days: 6 });

// ==== 2. 分类任务 ====
let expiredTasks = tasks.filter(t => t.status === " " && (
    (t.due && dv.date(t.due).toJSDate() < today.toJSDate()) ||
    (t.scheduled && dv.date(t.scheduled).toJSDate() < today.toJSDate())
));
let ongoingTasks = tasks.filter(t => t.status === "/");
let todoTasks = tasks.filter(t => t.status === " " && (!t.due && !t.scheduled));
let todayTasks = tasks.filter(t => t.status === " " && (
    (t.due && dv.date(t.due).toJSDate().toDateString() === today.toJSDate().toDateString()) ||
    (t.scheduled && dv.date(t.scheduled).toJSDate().toDateString() === today.toJSDate().toDateString())
));
let tomorrowTasks = tasks.filter(t => t.status === " " && (
    (t.due && dv.date(t.due).toJSDate().toDateString() === tomorrow.toJSDate().toDateString()) ||
    (t.scheduled && dv.date(t.scheduled).toJSDate().toDateString() === tomorrow.toJSDate().toDateString())
));
let thisWeekTasks = tasks.filter(t => t.status === " " && (
    (t.due && dv.date(t.due).toJSDate() > tomorrow.toJSDate() && dv.date(t.due).toJSDate() <= oneWeekLater.toJSDate()) ||
    (t.scheduled && dv.date(t.scheduled).toJSDate() > tomorrow.toJSDate() && dv.date(t.scheduled).toJSDate() <= oneWeekLater.toJSDate())
));
let afterSevenDaysTasks = tasks.filter(t => t.status === " " && (
    (t.due && dv.date(t.due).toJSDate() > oneWeekLater.toJSDate()) ||
    (t.scheduled && dv.date(t.scheduled).toJSDate() > oneWeekLater.toJSDate())
));
let completedTasks = tasks.filter(t => t.status === "x");

// ==== 3. 分类定义 ====
const cardsContainer = document.createElement('div');
cardsContainer.className = 'cards-container';

let categories = [
  { name: "逾期", query: ` (not done) AND ((due before today) OR (scheduled before today)) AND (status.type is not IN_PROGRESS)`, tasks: expiredTasks, color: "#ff4c4c" },
  { name: "进行中", query: `status.type is IN_PROGRESS`, tasks: ongoingTasks, color: "#4caf50" },
  { name: "待办", query: `(not done) AND ((no due date) AND (no scheduled date)) AND (status.type is not IN_PROGRESS)`, tasks: todoTasks, color: "#ff9800" },
  { name: "今天", query: ` (not done) AND ((scheduled on today) OR (due on today)) AND (status.type is not IN_PROGRESS)`, tasks: todayTasks, color: "#ffffff" },
  { name: "明天", query: ` (not done) AND ((due on tomorrow) OR (scheduled on tomorrow)) AND (status.type is not IN_PROGRESS)`, tasks: tomorrowTasks, color: "#00bcd4" },
  { name: "一周内", query: ` (not done) AND ((due after tomorrow) AND (due before in 7 day)) OR ((scheduled after tomorrow) AND (scheduled before in 7 day)) AND (status.type is not IN_PROGRESS)`, tasks: thisWeekTasks, color: "#8bc34a" },
  { name: "未来", query: ` (not done) AND ((due after in 7 day) OR (scheduled after in 7 day)) AND (status.type is not IN_PROGRESS)`, tasks: afterSevenDaysTasks, color: "#bbbbbb" },
  { name: "已完成", query: `done`, tasks: completedTasks, color: "#9e9e9e" },
];

// 当前选中分类索引（用于高亮）
let currentIndex = 0;

// ==== 4. 渲染分类卡片 ====
categories.forEach((cat, index) => {
  let card = cardsContainer.createDiv({ cls: "card" });

  // 卡片点击事件：高亮并切换任务
  card.onclick = () => {
    currentIndex = index;
    Array.from(cardsContainer.children).forEach((c, i) => {
      c.classList.toggle("active", i === index);
    });
    showTasks(index);
  };

  // 数字（即使为 0 也显示）
  let numberDiv = card.createDiv({ cls: "number", text: cat.tasks.length.toString() });
  numberDiv.style.color = cat.color;

  // 标签文字
  let labelDiv = card.createDiv({ cls: "label", text: cat.name });

  // 下划线颜色
  let underline = card.createDiv({ cls: "underline" });
  underline.style.backgroundColor = cat.color;
});

// ==== 5. 创建任务显示区域 ====
const taskListContainer = document.createElement('div');
taskListContainer.className = 'task-list';

// ==== 6. 渲染任务块 ====
function showTasks(index) {
  // 清空并重新挂载结构
  dv.container.innerHTML = "";
  dv.container.appendChild(cardsContainer);
  dv.container.appendChild(taskListContainer);

  let queryContainer = taskListContainer.createDiv();

// 查询路径条件
let basePaths = taskSources.map(source => `(path includes ${source})`).join(" OR ");
  // 构建任务查询代码块
  let query = [
    categories[index].query,
    basePaths,
    "sort by priority",
    "sort by created reverse",
    "short mode",
    "show tree"
  ].join("\n");

  // ✅ 构造完整 Markdown 代码块
  let fullBlock = "```tasks\n" + query + "\n```";

  // ✅ 插入查询语句（作为纯 Markdown 块，由 Obsidian Task 插件解析）
  dv.paragraph(fullBlock, queryContainer);
}

// ==== 7. 默认加载“今天”分类 ====
currentIndex = 3;
Array.from(cardsContainer.children).forEach((c, i) => {
  c.classList.toggle("active", i === currentIndex);
});
showTasks(currentIndex);
```

##### 1.2.1.1 Dvjs代码说明
- 设置了 `.cards-container` （卡片容器）横向布局，但你的 DataviewJS 脚本中 `cardsContainer.className = 'task-list'`，意外 覆盖掉了原来的 `cards-container` 类名，导致你的卡片容器不再使用你设定的样式。
- 任务块容器 `taskListContainer` 设为 `task-list`，卡片容器 `cardsContainer` 仍保留 `cards-container` 类名。
- 当任务数量为 0 时，卡片按钮中没有显示数字 "0"。这是因为 `card.createDiv({cls: "number", text: cat.tasks.length})` 中 `text` 值为 `0` 时，有可能被认为是“空文本”而没有渲染。
	- 在某些 HTML 渲染环境中，`text: 0` 会被当成 falsy 值处理，最终不创建或渲染这个元素的内容。强制转换为字符串 `"0"` 可确保数字始终显示。
	- 修改为`let numberDiv = card.createDiv({cls: "number", text: String(cat.tasks.length)}); // ✅ 确保显示 0`
- `let currentIndex = 0;`的作用
	- 在切换分类时，高亮当前按钮
		- 在点击分类卡片时，**添加一个类 `active` 到当前卡片**，并移除其他卡片的 `active` 类
		- 在样式中定义 `.card.active` 的高亮效果
	- 切换后某些状态依赖 `currentIndex`（例如未来加返回按钮或滚动定位）
	- 避免重复点击同一个分类造成多次渲染

##### 1.2.1.2 使用说明
- 自定义要收集任务的文件目录，在代码最开始的`1.收集任务`中的`dv.pages`中设置；有几个文件夹就定义几个`tasks`，前后序号要一致。
- 需要调整分类卡片的顺序，可以在`3.分类定义`中调整前后顺序。
- 需要修改`task`的样式、优先级、排序等，在`6.渲染任务块`中的`构建任务查询代码块`中按需修改，完全采用`task`插件原生语法。
- 修改默认展示的任务分类，在`7.默认加载"今天"分类`中修改数字`3`为你希望的分类对应的序号（序号从0开始，即第一个分类序号为0）
- 对于卡片样式修改，自行在CSS样式代码中修改。

#### 1.2.2 卡片样式CSS代码
````css fold

/* ------ 卡片式任务面版样式 -----*/
.dropdown-container {
  margin-bottom: 1em;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 1px; /* 控制卡片左右间距 */
  row-gap: 2px;     /* 控制卡片上下间距 */
  margin: 1px 0px; 
}

.card {
  background: var(--background-secondary);
  border-radius: 4px; /* 12px */
  box-shadow: var(--shadow-s); 
  padding: 8px 0px; /*10px*/
  margin: 0px 1px;
  width: 60px;
  height: 60px;
  min-width: 45px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease; /* background 0.3s; */
}

.card:hover {
  transform: scale(1.05);
  background: #333;
}

.card .number {
  font-size: 1em;
  font-weight: bold;
  margin-top: -7px;
  padding-top: 0px;
}

.card .label {
  font-size: 0.8em;
  color: var(--text-muted);
  margin-top: 4px;
}


.underline {
  width: 36px;
  height: 1.5px;
  margin: 1px auto 0;
  border-radius: 1px;
}

.task-list {
  margin-top: 2px;
  padding-top: 0px;
  border-top: 1.5px solid #444;
}

.task-item {
  margin: 5px 0;
  font-size: 14px;
}

/* .cards-container .card.active {
/*   border: 1px solid var(--text-accent); /*让激活卡片采用高亮边框*/
/*  background-color: var(--background-secondary-alt); 
/*   transform: scale(1.05);
/* } */

.cards-container .card.active {
  background-color: var(--background-modifier-hover); /*var(--interactive-accent)：让激活卡片采用主题强调色背景。*/
  color: white;
}

.cards-container .card.active .number,
.cards-container .card.active .label {
  color: white;
}

.cards-container .card.active .underline {
  background-color: white;
}



````



### 1.3 相关资源

- [How to get tasks in current file - Tasks User Guide - Obsidian Publish](https://publish.obsidian.md/tasks/How+To/How+to+get+tasks+in+current+file#Using+Dataview+to+generate+Tasks+blocks+-+the+old+way)
- [GTD with Obsidian: a ready-to-go GTD system with Task Sequencing, Quick-add template, Waiting-on, Someday/Maybe, and more - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/gtd-with-obsidian-a-ready-to-go-gtd-system-with-task-sequencing-quick-add-template-waiting-on-someday-maybe-and-more/65502/27)

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
