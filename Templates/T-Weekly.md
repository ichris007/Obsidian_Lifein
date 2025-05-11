---
date: <%tp.date.now("YYYY-MM-DD")%>
week: <%moment(tp.file.title).format("GGGG[W]WW")%>
tags:
  - review
  - WeeklyReview
number headings: off
cssclasses:
  - bannerimg
  - daily
  - hide-properties
---
![[Banner06.jpg##bannerimg]]

## <%moment(tp.file.title).startOf('isoWeek').format("MM月DD日")%> - <%moment(tp.file.title).endOf('isoWeek').format("MM月DD日")%>

[[<%moment(tp.file.title).subtract(1,'week').format("GGGG[W]WW")%>|前一周]] | [[<%moment(tp.file.title).add(1,'week').format("GGGG[W]WW")%>|后一周]]

### 本周回顾

![[Tasks_weekly_panel]]

#### 项目
```dataview
table without id
  file.link as 日期,
  regexreplace(L.text, "#\\S+\\s?", "") as 内容
from "00Journal/01DailyNotes"
flatten file.lists as L
where icontains(L.tags, "#项目") AND date(date) >= date(this.date) - dur(6 days) AND date(date) <= date(this.date)
sort file.link asc
```

#### 商业
```dataview
table without id
  file.link as 日期,
  regexreplace(L.text, "#\\S+\\s?", "") as 内容
from "00Journal/01DailyNotes"
flatten file.lists as L
where icontains(L.tags, "#商业") AND date(date) >= date(this.date) - dur(6 days) AND date(date) <= date(this.date)
sort file.link asc
```

#### 个人成长
```dataview
table without id
  file.link as 日期,
  regexreplace(L.text, "#\\S+\\s?", "") as 内容
from "00Journal/01DailyNotes"
flatten file.lists as L
where icontains(L.tags, "#个人成长") AND date(date) >= date(this.date) - dur(6 days) AND date(date) <= date(this.date)
sort file.link asc
```

#### 生活
```dataview
table without id
  file.link as 日期,
  regexreplace(L.text, "#\\S+\\s?", "") as 内容
from "00Journal/01DailyNotes"
flatten file.lists as L
where icontains(L.tags, "#生活") AND date(date) >= date(this.date) - dur(6 days) AND date(date) <= date(this.date)
sort file.link asc
```

### 本周总结/感悟
```dataview
TABLE without ID
	file.link as 日期,
	L.text AS 每日总结
FROM "00Journal/01DailyNotes" 
WHERE date(date) >= date(this.date) - dur(6 days) AND date(date) <= date(this.date)
FLATTEN reverse(file.lists) AS L
WHERE meta(L.section).subpath = "今日总结"
SORT date(file.name) DESC
```

```dataview
TABLE without ID
	file.link as 日期,
	L.text AS 每日感悟
FROM "00Journal/01DailyNotes" 
WHERE date(date) >= date(this.date) - dur(6 days) AND date(date) <= date(this.date)
FLATTEN reverse(file.lists) AS L
WHERE meta(L.section).subpath = "今日感悟"
SORT date(file.name) DESC
```

#### 习惯追踪

![[习惯追踪#习惯追踪]]

![[习惯追踪#健康追踪]]


### 本周复盘

#### 本周思考


