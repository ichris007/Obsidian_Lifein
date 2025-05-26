<%*
if (tp.file.title === "Untitled" || tp.file.title === "") {
    const newName = await tp.system.prompt("请输入人物名称");
    if (newName) {
        tp.file.rename(newName);
    }
}
 tR += "---"
 %>
area: 人物
category:
 - <% tp.system.suggester(["家人", "同学", "校友", "朋友", "客户", "同事", "其他"],["家人", "同学", "校友", "朋友", "客户", "同事", "其他"],false, "选择人物分类") %>
tags:
  - people
aliases: 
状态:
  - <% tp.system.suggester(["未开始","进行中","已停止","已完成"],["未开始","进行中","已停止","已完成"],false, "选择人物当前状态") %>
项目: 
  - 
姓名: <% tp.file.title %>
公司: 
职务: 
国家: 
城市: 
性别: <% tp.system.suggester(["男","女"],["男","女"],false, "选择人物性别") %>
手机号: 
微信号: 
简介: 
初识时间: <% tp.file.creation_date("YYYY-MM-DD") %>
跟进: false
最后联系时间: <% tp.file.creation_date("YYYY-MM-DD") %>
stars: <% tp.system.suggester(["3星级","4星级","5星级"],["3星级","4星级","5星级"],false, "选择人物重要程度") %>
created: <% tp.file.creation_date() %>
updated: <% tp.file.last_modified_date() %>
number headings: auto, first-level 2, max 6, contents ^toc, skip ^skipped, start-at 1, _.1.1
---

## 1 人物资料

### 1.1 个人信息
- 人物的基本信息
- 个性特点
- 习惯、喜好
- 主要经历
- 家庭情况

### 1.2 公司信息
- 公司名称
- 主要产品/服务

### 1.3 合作经历
- 2025年3月开始合作

### 1.4 其它信息
- 如何认识的


## 2 相关项目
```dataview
table without id
	项目,
	状态
from "07People"
where icontains(tags, "Project") AND icontains(file.outlinks, [[<% tp.file.title %>]])
sort file.cday desc
```

## 3 相关日记

```dataview
table without id
  file.link as 日期,
  regexreplace(L.text, "#\S+", "") as 内容
from "00Journal/01DailyNotes"
flatten file.lists as L
where contains(L.text, "[[" + this.file.name + "]]") 
```

## 4 任务清单
### 4.1 未完成
```tasks
not done
description includes <% tp.file.title %>
sort by due desc
```

### 4.2 已完成
```tasks
done
description includes <% tp.file.title %>
sort by due desc
```

## 5 延伸阅读



<% await tp.file.move("/07People/" + tp.file.title) %>