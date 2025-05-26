---
number headings: off
cssclasses:
  - bannerimg
  - callouts-outlined
  - hide-properties
modified date: 2025-05-24 13:07:16
tags:
  - index
---
![[banner05.jpg##bannerimg]] 

```dataview
table without id
	file.link as 名称,
	file.cday as 时间
from ""
where icontains(tags, "ToRead") or icontains(tag, "ToRead")
sort file.ctime desc
```
