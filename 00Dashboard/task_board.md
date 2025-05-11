---
number headings: off
cssclasses:
  - hide-properties
modified date: 2025-05-11 11:38:17
---
### 首页全部任务面版
```dataviewjs
// ==== 1. 收集任务 ====
let taskSources = ["01Projects", "02Business", "00Todolist", "00Journal"];
let tasks = [];

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
  { name: "逾期", tasks: expiredTasks, color: "#ff4c4c" },
  { name: "进行中", tasks: ongoingTasks, color: "#4caf50" },
  { name: "待办", tasks: todoTasks, color: "#ff9800" },
  { name: "今天", tasks: todayTasks, color: "#ffffff" },
  { name: "明天", tasks: tomorrowTasks, color: "#00bcd4" },
  { name: "一周内", tasks: thisWeekTasks, color: "#8bc34a" },
  { name: "未来", tasks: afterSevenDaysTasks, color: "#bbbbbb" },
  { name: "已完成", tasks: completedTasks, color: "#9e9e9e" },
];

// ==== 4. 渲染分类卡片（无任务展示） ====
categories.forEach((cat) => {
  let card = cardsContainer.createDiv({ cls: "card" });

  // 数字
  let numberDiv = card.createDiv({ cls: "number", text: cat.tasks.length.toString() });
  numberDiv.style.color = cat.color;

  // 标签
  let labelDiv = card.createDiv({ cls: "label", text: cat.name });

  // 下划线颜色
  let underline = card.createDiv({ cls: "underline" });
  underline.style.backgroundColor = cat.color;
});

dv.container.appendChild(cardsContainer);

```
### 日常任务
```dataviewjs
// ==== 1. 收集任务 ====
let taskSources = ["02Business", "00Todolist", "00Journal"];
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

### 项目任务
```dataviewjs
// ==== 1. 收集任务 ====
let taskSources = ["01Projects"];
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
