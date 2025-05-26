<%*
if (tp.file.title === "Untitled" || tp.file.title === "") {
    const newName = await tp.system.prompt("请输入笔记名称");
    if (newName) {
        tp.file.rename(newName);
    }
}
 tR += "---"
 %>
area: 
- <% tp.system.suggester(["工作","生活","个人成长"],["工作","生活","个人成长"]) %>
category:
  - <% tp.system.prompt("领域下的分类:") %>
status:
  - <% tp.system.suggester(["未开始","进行中","已停止","已完成","已存档"],["未开始","进行中","已停止","已完成","已存档"]) %>
tags:
  - note
project: 
  - <% tp.system.prompt("所属项目:") %>
meeting: 
  - <% tp.system.prompt("所属会议:") %>
aliases: 
stars: <% tp.system.suggester(["3星级","4星级","5星级"],["3星级","4星级","5星级"]) %>
number headings: auto, first-level 2, max 6, contents ^toc, skip ^skipped, start-at 1, _.1.1
created date: <% tp.file.creation_date() %>
modified date: <% tp.file.last_modified_date() %>
cssclasses:
  - callouts-outlined
Summary:
---


> [!NOTE] 内容提要/阅读提炼
> 如题所示



## 1 相关条目
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
## 2 延伸阅读


