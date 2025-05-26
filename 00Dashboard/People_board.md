---
number headings: off
cssclasses:
  - bannerimg
  - callouts-outlined
  - hide-properties
modified date: 2025-05-25 13:16:04
tags:
  - index
关键词: ""
---
![[banner05.jpg##bannerimg]] 
```meta-bind-embed
[[新建人物按钮]]
```

## 人脉检索

> [!tip]- 点击查看使用说明
> 1. 在目录中新建`07People`文件夹
> 2. 将`T-人物模板`放在目录`Templates`下
> 3. 通过`T-人物模板`创建的人物笔记名称以`姓名`命名，创建时后会自动存入`07People`目录下
> 4. 人物笔记内容以`无序列表`（以 `-`开头）或`有序列表`（以`1. `开头）撰写，才能被搜索出来，否则无法被搜索。（因为dataview不支持非列表内容检索）
> 5. 在下面搜索框输入关键词，多个关键词用`空格`分开，注意：
> 	- 单个关键词搜索无限制
> 	- 多个关键词不能横跨`属性`和`正文内容`，只能属于同一类才能搜出结果，比如：
> 		- 关键词都是属性：`公司名称 职务 城市 性别`，可出结果。如果你把人物简介填写了更多内容，也会被搜索到显示在结果中。
> 		- 关键词都在正文：任何在`无序列表`或`有序列表`中的内容均可搜索
> 		- 不可搜索：`属性`+`正文内容`，即：有的关键词是`属性`，有的关键词是`正文内容`，则无法搜索。
> 6. 更广泛的搜索可以使用系统自带搜索或插件`Omnisearch`进行搜索（`Ctrl + O`)，这种情况下，搜索正文内容，内容格式不局限于`列表`形式。

### 关键词搜索
```meta-bind
INPUT[text:关键词]
```


### 属性匹配

```dataview
TABLE WITHOUT ID
    file.link as 名称,
    公司,
    职务,
    category as 关系,
    简介
FROM "07People" AND !"Templates"
WHERE this.关键词 != null
    AND this.关键词 != ""
    AND all(split(this.关键词, " "), (term) => (
        icontains(tags, term) OR
        icontains(category, term) OR
        icontains(aliases, term) OR
        icontains(项目, term) OR
        icontains(公司, term) OR
        icontains(职务, term) OR
        icontains(城市, term) OR
        icontains(手机号, term) OR
        icontains(lower(file.name), term) OR
        icontains(简介, term)
    ))
SORT filename DESC
```


### 正文内容匹配

```dataview
TABLE
  join(
    map(
      filter(
        rows,
        (r) => any(split(this.关键词, " "), (term) => icontains(lower(r.L.text), lower(term)))
      ),
      (r) => regexreplace(r.L.text, "^\\s*-\\s*", "")
    ),
    "<br>"
  ) AS 匹配内容
FROM "07People"
FLATTEN file.lists AS L
WHERE this.关键词 != null AND this.关键词 != ""
GROUP BY file.link
WHERE all(
  split(this.关键词, " "),
  (term) => any(rows, (r) => icontains(lower(r.L.text), lower(term)))
)
SORT file.name DESC

```

## 需要跟进的人脉

```dataview
TABLE WITHOUT ID
    file.link as 姓名,
    category as 关系,
    公司,
    职务,
    最后联系时间 as 上次联系,
    简介
FROM "07People" AND !"Templates"
WHERE 
	(跟进 = true) and (最后联系时间 <= date(today) - dur(2 week))
SORT filename DESC
```

%%
筛选标准，根据属性值：
1. `跟进`是打勾✅状态
2. `最后联系时间`到今天为止大于2个星期（2 week）
%%