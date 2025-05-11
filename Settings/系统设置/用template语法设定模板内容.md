---
modified date: 2025-03-16 21:41:16
number headings: off
tags:
  - note
category:
  - 系统设置
cssclasses:
  - bannerimg
  - hide-properties
obsidianUIMode: preview
---
![[Lifein_banner1.png##bannerimg]]

<br>

![[系统设置导航]]

<%*
const title = await tp.system.prompt("title");
await tp.file.rename(`${title}`);
_%>

## 创建笔记时，提示输入笔记名称
<%*
if (tp.file.title === "Untitled" || tp.file.title === "") {
    const newName = await tp.system.prompt("请输入笔记名称");
    if (newName) {
        tp.file.rename(newName);
    }
}
 %>

## 通过模板创建笔记，自动移动到指定文件夹
<% await tp.file.move("/People/" + tp.file.title) %>

## 获取今天日期
  <% tp.date.now("YYYY.MM.DD") %>
  
## 善用 `file.outlinks`
例如：相关项目
````
```dataview
table without id
	client as 客户,
	project as 项目,
	status as 状态
from ""
where icontains(tags, "Project") AND icontains(file.outlinks, [[<% tp.file.title %>]])
sort file.cday desc
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