<%*
if (tp.file.title === "Untitled" || tp.file.title === "") {
    const newName = await tp.system.prompt("请输入项目名称");
    if (newName) {
        tp.file.rename(newName);
    }
}
 tR += "---"
 %>
area: 工作
category:
  - <% tp.system.prompt("领域下的分类: 如自媒体、品牌合作") %>
domain: 
  - <% tp.system.prompt("请输入主要工作内容或方向") %>
client: <% tp.system.prompt("输入客户名称") %>
project:
  - <% tp.system.prompt("请输入所属父项目") %>
status:
  - <% tp.system.suggester(["未开始","进行中","已停止","已完成","已存档"],["未开始","进行中","已停止","已完成","已存档"]) %>
tags:
  - Project
aliases: 
stars: <% tp.system.suggester(["3星级","4星级","5星级"],["3星级","4星级","5星级"]) %>
number headings: auto, first-level 2, max 6, contents ^toc, skip ^skipped, start-at 1, _.1.1
Summary: 
people: 
  - 
created date: <% tp.file.creation_date() %>
modified date: <% tp.file.last_modified_date() %>
start_date: 
stop_date:
---

## 任务清单^skipped

## 1 项目说明

### 1.1 项目目标
%%预期成果、截至时间%%

### 1.2 项目信息
%%项目主要内容%%

### 1.3 相关资源


## 2 子项目

```dataview
table without id 
  file.link as 项目名称,
  client as 客户,
  status as 状态,
  stars as 紧急程度,
  start_date AS 启动时间,
  stop_date AS 停止时间,
  round(max((date(today) - date(start_date)).days, 0)) + "天" AS 已启动
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
  round(max((date(today) - date(start_date)).days, 0)) + "天" AS 已启动
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
sort file.ctime desc
```

## 5 相关条目

```dataview
list without id 
from ""
where icontains(project, link(this.file.name)) AND contains(tags, "note")
sort stars desc, file.ctime desc
```
