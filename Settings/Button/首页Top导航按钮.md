---
modified date: 2025-04-23 08:30:54
tags:
  - button
cssclasses:
  - hide-properties
---
`BUTTON[DailyNote,WeeklyReview]`  `BUTTON[NewTask_life,NewTask_work]`  `BUTTON[NewProject1]` `BUTTON[Task_board]` `BUTTON[Task_Calendar]` 

```meta-bind-button
label: 打开日记
style: default
tooltip: "打开日记"
id: DailyNote
hidden: true
actions:
  - type: command
    command: dust-calendar:open-daily-note
```

```meta-bind-button
label: 打开周记
style: default
tooltip: "打开周回顾"
id: WeeklyReview
hidden: true
actions:
  - type: command
    command: dust-calendar:open-weekly-note
```

```meta-bind-button
label: 日常任务
icon: ""
style: default
class: ""
cssStyle: ""
backgroundImage: ""
tooltip: ""
id: NewTask_life
hidden: true
actions:
  - type: command
    command: quickadd:choice:fd3f1701-bdf8-4afe-88a6-5530ce2f0548

```

```meta-bind-button
label: 工作任务
icon: ""
style: default
class: ""
cssStyle: ""
backgroundImage: ""
tooltip: ""
id: NewTask_work
hidden: true
actions:
  - type: command
    command: quickadd:choice:5633572f-2607-4c38-9004-770ca4d8f1c1

```

```meta-bind-button
label: 新建项目
style: default
tooltip: 新建项目
id: NewProject1
hidden: true
actions:
  - type: command
    command: quickadd:choice:2cf0b727-189c-4b3d-bb0d-482b54492753
```

```meta-bind-button
label: 任务列表
icon: ""
style: default
class: ""
cssStyle: ""
backgroundImage: ""
tooltip: ""
id: Task_board
hidden: true
actions:
  - type: open
    link: 00Dashboard/task_board.md
    newTab: true

```

```meta-bind-button
label: 任务日历
icon: ""
style: default
class: ""
cssStyle: ""
backgroundImage: ""
tooltip: 打开任务日历视图
id: Task_Calendar
hidden: true
actions:
  - type: open
    link: 00Dashboard/任务日历面板.md
    newTab: true

```
