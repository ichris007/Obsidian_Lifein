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
  - callouts-outlined
obsidianUIMode: preview
---
![[Lifein_banner1.png##bannerimg]]

<br>

![[系统设置导航]]

## 1 用Dataview追踪习惯

### 代码效果

统计、汇总最近 1 周的习惯追踪数据，以表格展示。

### 1.1 代码
````js fold

```dataviewjs
//🧠 1. 配置追踪习惯：字段名、表头 Emoji、可选别名
const habits = [
  { field: "早起", icon: "🌅" },
  { field: "读书", icon: "📖" },
  { field: "写作", icon: "✍🏼" },  // 比如在此修改处
  { field: "健身", icon: "💪🏼" },
  { field: "社媒分享", icon: "📢" },
  { field: "听播客", icon: "👂" },
];

//✅ 2. 获取相关页
const pages = dv.pages('"00Journal/01DailyNotes"')
  .where((p) => habits.some(h => h.field in p))
  .sort(p => p.file.day, "desc")
  .map(p => {
    const note = {
      link: p.file.link,
      day: p.file.day,
    };
    for (const h of habits) {
      note[h.field] = p[h.field];
    }
    return note;
  });

// 🔁 3. 连续打卡记录计算函数
function getRecord(validate) {
  let record = 0;
  let count = 0;
  for (const note of pages) {
    if (validate(note)) {
      count++;
      record = Math.max(record, count);
    } else {
      count = 0;
    }
  }
  return record;
}

const done = "✅";
const skip = "🟥";

// 📆 4. 最近一周的每日记录（表格主体）
const fileRows = pages
  .filter(p => p.day >= moment().subtract(1, "w"))
  .sort(p => p.day)
  .map(note => [
    note.link,
    ...habits.map(h => note[h.field] ? done : skip)
  ]);

// 📈 5. 每个习惯的 record 数据
const records = habits.map(h => getRecord(note => note[h.field]));

// 📋 6. 渲染表格
dv.table(
  ["[[习惯追踪]]", ...habits.map(h => h.icon)],
  [
    ...fileRows,
    ["‎"], // 空行
    ["**Record**", ...records],
  ]
);
```

````

#### 1.2 代码说明：

1. **筛选字段**（在日记模板[[T-Daily]]的`属性`中）：
    - 为 `早起, 读书, 写作, 健身, 社媒分享`
2. **统计**：
    - 统计 **历史最高记录**（Record）
3. **表头显示**：
    - 使用 Emoji 美化 Habit Tracking 表格（🌅 早起, 📖 读书, ✍🏼 写作, 💪🏼 健身, 📢 社媒分享）
4. **逻辑**：
    - ✅ 代表完成
    - 🟥 代表未完成

把习惯追踪的 `DataviewJS` 脚本**模块化**，通过一个数组集中定义你想追踪的习惯（字段、图标），让你：
- **一处配置**，多处自动渲染；
- 随时添加、删除、修改习惯，只动一处即可；（注：`习惯名称`对应`属性字段`，见[[#1.3 运行方式：]]）
	- 在现有习惯上修改，直接在顶部habits数组中修改`名称`和`emoji`。
	- 添加新习惯（如“日记”），只需在顶部 habits 数组中加一行：`{ field: "日记", icon: "📓" },`
- 代码更易读、可维护性高。

### 1.3 使用方式

- **前提**：你的 Daily Notes 需要在 `00Journal/01DailyNotes` 文件夹，并且笔记属性里包含 `早起、读书、写作、健身、社媒分享` 这些字段。
- **插入方式**：在你想放置该表的 Markdown 文件中粘贴 `dataviewjs` 代码块运行。代码块的最终样式如下所示：
````
```dataviewjs

此处为代码块

```

````

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