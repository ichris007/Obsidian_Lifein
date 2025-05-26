---
number headings: off
cssclasses:
  - bannerimg
  - callouts-outlined
  - hide-properties
modified date: 2025-05-24 13:04:11
tags:
  - index
---
![[banner05.jpg##bannerimg]] 

## 项目列表
```dataviewjs
// 获取所有符合条件的项目，并按 category 分组
const groupedPages = dv.pages('"01Projects"')
  .filter(p => 
    p.tags && p.tags.includes("Project") &&  // 仅筛选包含 "Project" 标签的笔记
    ((p.status && p.status.includes("进行中")) || (p.status && p.status.includes("未开始"))) // 筛选状态为 "进行中" 或 "未开始"
  )
  .groupBy(p => 
    Array.isArray(p.category) ? p.category.join(", ") : (p.category || "未分类") // 处理 category 可能是数组或空值
  );

let tableData = [];

for (const group of groupedPages) {
  const categoryName = group.key; // 分组的 category 名称

  group.rows.forEach((p, index) => {
    const completedTasks = p.file.tasks.filter(t => t.completed).length; // 计算已完成任务数
    const totalTasks = p.file.tasks.length; // 计算总任务数
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100); // 计算进度百分比

    // 读取 start_date 和 stop_date 属性，并格式化日期
    const startDate = p.start_date ? dv.date(p.start_date).toFormat("yyyy-MM-dd") : "未设置"; 
    const stopDate = p.stop_date ? dv.date(p.stop_date).toFormat("yyyy-MM-dd") : "未设置"; 

    tableData.push([
      index === 0 ? categoryName : "", // 只有第一行显示分类名称，其余行留空，模拟合并单元格
      p.file.link, // 任务名称（笔记名称）
      p.client || "未设置", // 客户信息
      p.status || "未设置", // 当前状态
      totalTasks, // 总任务数
      completedTasks, // 已完成任务数
      `<progress value="${progress}" max="100" style="width: 40px;"></progress> ${progress}%`, // 进度条 + 百分比
      startDate, // 开始时间
      stopDate // 完成时间
    ]);
  });
}

// 生成 Dataview 表格
dv.table(["分类", "项目", "客户", "状态", "任务", "完成", "进度", "开始", "完成"], tableData);


```

## 任务清单
```dataviewjs
// ==== 1. 收集任务 ====
let taskSources = ["01Projects", "02Business", "00Todolist", "00Journal"];
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
