let { 
	FolderKey,
	TagKey,

	filterFileName, 
	filterTags, 
	WhichKey,
	KeyValueFilter,

	dateFilterBy,
	DateSearch,
	Intervalday,
	AnkiFrequncey,

	ContainerStartDateValue,
	ContainerEndDateValue ,
	ContainerMonthDateValue,
	ContainerWeekDateValue,

	sortOption,
	PageSize,
	pageNum,
	headers,		
	 } = input;
	
	

// 函数 -汇总

 // 创建通用的 Flex 容器函数
  function createFlexContainer(cls, justifyContent, flexDirection = "row") {
    let container = document.createElement("div");
    //let container = document.createElement("div");
    container.className = cls;
    container.style.display = "flex";
    container.style.justifyContent = justifyContent;
    container.style.flexDirection = flexDirection;
    return container;
  }


 // 文本输入框函数
  function createInputField(placeholder, defaultValue) { 
     const input = document.createElement("input", "");     // 创建输入框
     input.type = "text";                                  // 设置输入框的类型
     input.className = "input-field";                     // 设置输入框的css类型
     input.placeholder = placeholder;      // 占位符，，就是"底层的提示语"
     input.value = defaultValue;        // 设置，就是到时候你创建时，第2个参数就是此框的默认值
     return input; 
	}


 // 创建下拉选项框
  function createSelectField(options, defaultValue) {
    const select = document.createElement("select");
    select.className = "select-field";
    
    options.forEach(optionText => {
        const option = document.createElement("option");
        option.textContent = optionText; // 设置选项文本
        option.value = optionText;
        if (optionText === defaultValue) {
            option.selected = true; // 设置默认选项
        }
        select.appendChild(option);
    });
    
    return select;
	}


 // 创建按钮-函数
  function createButton(text) {
    const button = dv.el("button", text);
    button.className = "button";
    return button;
	}


 // 前置过滤函数
  function UpFilterKey(page, folderkey, tagkey) {
    // 防御设计：如果 folderkey 和 tagkey 全部同时为空，返回 true（即没有筛选，会展示全部）
    if ((!folderkey || folderkey.trim() === "") && (!tagkey || tagkey.trim() === "")) {
        return true;
    }

    // 确保 folderkey 和 tagkey 为字符串
    folderkey = String(folderkey || "");
    tagkey = String(tagkey || "");

    // 清理并处理 folderkey 和 tagkey
    function cleanAndSplitKey(key) {
        if (!key || key.trim() === "") return [];
        return key.trim().toLowerCase()
                   .replace(/[^\w\s\u4e00-\u9fa5]/g, " ") // 只保留中英文及数字
                   .split(/\s+/) // 以空格分割
                   .filter(word => word); // 过滤掉空字符串
    }

    const folderKeys = cleanAndSplitKey(folderkey);
    const tagKeys = cleanAndSplitKey(tagkey);

    // 匹配逻辑
    function matches(keyArray, sample) {
        return keyArray.some(key => sample.includes(key));
    }

    // 检查 folderkey 和 tagkey 是否匹配
    const folderMatch = folderKeys.length > 0 && matches(folderKeys, page.file.folder.toLowerCase());
    const tagMatch = tagKeys.length > 0 && matches(tagKeys, page.file.tags.map(tag => tag.toLowerCase()).join(" "));

    // 如果 folderkey 或 tagkey 有一个匹配到，就返回 false（即过滤掉该项）
    return !(folderMatch || tagMatch);
	 }


 // 文件名过滤函数
  const customTitleMatch = (page, title) => {
    // 防御设计：title 为空或未定义时返回 true
    if (!title) {
        return true;
    }

    // 处理 title 参数，将其转换为小写并去除首尾空格
    const sanitizeTitle = (t) => {
        const titles = String(t)
            .toLowerCase()         // 忽略大小写
            .trim()                // 去除首尾空格
            .split(/[^a-zA-Z0-9\u4e00-\u9fa5+-]+/); // 非中英字符（+ - 除外）分割为数组
        return titles.filter(Boolean); // 去除空字符串
    };

    // 处理 title 并生成数组
    const titleArray = sanitizeTitle(title);

    // 如果处理后的 titleArray 为空，直接返回 true
    if (titleArray.length === 0) {
        return true;
    }

    // 分组函数：将 titleArray 分为三组 A, B, C
    const groupTitleArray = (arr) => {
        const A = []; // 无符号元素
        const B = []; // 带 + 号的元素
        const C = []; // 带 - 号的元素
        arr.forEach(item => {
            if (item.includes('+')) {
                const sanitizedItem = item.replace(/\+/g, '');
                if (sanitizedItem) {
                    B.push(sanitizedItem); // B组去除+，如果有值才加入
                }
            } else if (item.includes('-')) {
                const sanitizedItem = item.replace(/-/g, '');
                if (sanitizedItem) {
                    C.push(sanitizedItem); // C组去除-，如果有值才加入
                }
            } else {
                A.push(item); // A组无符号
            }
        });
        return { A, B, C };
    };

    // 分组处理后的 titleArray
    const { A, B, C } = groupTitleArray(titleArray);

    // 获取文件名并处理，将其转换为小写并去除首尾空格
    const fileName = String(page.file.name || "").toLowerCase().trim();

    // 匹配逻辑
    // 1. 先排查 C组，只要有一个满足，直接返回 false
    if (C.some(titleItem => fileName.includes(titleItem))) {
        return false;
    }

    // 2. 再排查 B组，只要有一个满足，返回 true
    if (B.some(titleItem => fileName.includes(titleItem))) {
        return true;
    }

    // 3. 最后排查 A组，要全部满足才返回 true，否则返回 false
    return A.every(titleItem => fileName.includes(titleItem));
	};


 // 标签过滤函数
  const customTagMatch = (page, tag) => {
    // 防御设计：tag 为空或未定义时返回 true
    if (!tag) {
        return true;
    }

    // 处理 tag 参数，将其转换为小写并去除首尾空格
    const sanitizeTag = (t) => {
        const tags = String(t)
            .toLowerCase()         // 忽略大小写
            .trim()                // 去除首尾空格
            .split(/[^a-zA-Z0-9\u4e00-\u9fa5+-]+/); // 非中英字符（+ - 除外）分割为数组
        return tags.filter(Boolean); // 去除空字符串
    };

    // 处理 tag 并生成数组
    const tagArray = sanitizeTag(tag);

    // 如果处理后的 tagArray 为空，直接返回 true
    if (tagArray.length === 0) {
        return true;
    }

    // 分组函数：将 tagArray 分为三组 A, B, C
    const groupTagArray = (arr) => {
        const A = []; // 无符号元素
        const B = []; // 带 + 号的元素
        const C = []; // 带 - 号的元素
        arr.forEach(item => {
            if (item.includes('+')) {
                const sanitizedItem = item.replace(/\+/g, '');
                if (sanitizedItem) {
                    B.push(sanitizedItem); // B组去除+，如果有值才加入
                }
            } else if (item.includes('-')) {
                const sanitizedItem = item.replace(/-/g, '');
                if (sanitizedItem) {
                    C.push(sanitizedItem); // C组去除-，如果有值才加入
                }
            } else {
                A.push(item); // A组无符号
            }
        });
        return { A, B, C };
    };

    // 分组处理后的 tagArray
    const { A, B, C } = groupTagArray(tagArray);

    // 获取文件标签并处理，将其转换为小写，去除首尾空格，并去除 # 号和其他特殊字符
    const sanitizeFileTags = (tags) => {
        return tags.flatMap(t => t
            .toLowerCase()        // 忽略大小写
            .replace(/#/g, '')    // 去除 # 号
            .trim()               // 去除首尾空格
            .split(/[^a-zA-Z0-9\u4e00-\u9fa5]+/) // 分割特殊字符
            .filter(Boolean));    // 去除空字符串
    };

    const fileTags = sanitizeFileTags(page.file.tags || []);

    // 匹配逻辑
    // 1. 先排查 C组，只要有一个满足，直接返回 false
    if (C.some(tagItem => fileTags.some(fileTag => fileTag.includes(tagItem)))) {
        return false;
    }

    // 2. 再排查 B组，只要有一个满足，返回 true
    if (B.some(tagItem => fileTags.some(fileTag => fileTag.includes(tagItem)))) {
        return true;
    }

    // 3. 最后排查 A组，要全部满足才返回 true，否则返回 false
    return A.every(tagItem => fileTags.some(fileTag => fileTag.includes(tagItem)));
	};


 // key过滤函数 
  function customKeyMatch(page, whichkey, value) {
    // 确保 whichkey 和 value 为字符串
    whichkey = String(whichkey || "").trim().toLowerCase();
    value = String(value || "").trim().toLowerCase();

    // 防御设计：如果 whichkey 和 value 全部为空或未定义时返回 true
    if (whichkey === "" && value === "") {
        return true;
    }

    // 清理并处理 whichkey 参数
    function cleanAndSplitWhichKey(key) {
        if (!key) return { A: [], B: [] };
        let parts = key.replace(/[^\w\s\u4e00-\u9fa5-]/g, " ") // 只保留中英文及数字和减号
                       .split(/\s+/)
                       .filter(word => word);
        let A = [], B = [];
        parts.forEach(part => {
            if (part.includes('-')) {
                let cleanedPart = part.replace(/-+/g, '').trim();
                if (cleanedPart) B.push(cleanedPart);
            } else {
                A.push(part);
            }
        });
        return { A, B };
    }

    // 清理并处理 value 参数
    function cleanAndSplitValue(val) {
        if (!val) return { X: [], Y: [], Z: [] };
        let parts = val.replace(/[^\w\s\u4e00-\u9fa5+-]/g, " ") // 只保留中英文及数字和加减号
                       .split(/\s+/)
                       .filter(word => word);
        let X = [], Y = [], Z = [];
        parts.forEach(part => {
            if (part.includes('+')) {
                let cleanedPart = part.replace(/\++/g, '').trim();
                if (cleanedPart) Y.push(cleanedPart);
            } else if (part.includes('-')) {
                let cleanedPart = part.replace(/-+/g, '').trim();
                if (cleanedPart) Z.push(cleanedPart);
            } else {
                X.push(part);
            }
        });
        return { X, Y, Z };
    }

    // 清理并处理 M1 (frontmatter keys)
    function cleanAndProcessM1(frontmatter) {
        return Object.keys(frontmatter).map(key => key.trim().toLowerCase().replace(/[^\w\s\u4e00-\u9fa5]/g, ''));
    }

    // 清理并处理 M2 (frontmatter values)
    function cleanAndProcessM2(frontmatter) {
        let values = [];
        Object.values(frontmatter).forEach(value => {
            if (typeof value === 'string') {
                values.push(value.trim().toLowerCase());
            } else if (Array.isArray(value)) {
                value.forEach(val => values.push(String(val).trim().toLowerCase()));
            }
        });
        return values;
    }

    const { A: whichA, B: whichB } = cleanAndSplitWhichKey(whichkey);
    const { X: valueX, Y: valueY, Z: valueZ } = cleanAndSplitValue(value);

    const M1 = cleanAndProcessM1(page.file.frontmatter);
    const M2 = cleanAndProcessM2(page.file.frontmatter);

    // 模糊匹配逻辑
    function fuzzyMatches(keyArray, sampleArray) {
        return keyArray.some(key => sampleArray.some(sample => sample.includes(key)));
    }

    // 匹配逻辑 - 1: AB, XYZ 共5组，全部为空 → 直接 true 结束
    if (whichA.length === 0 && whichB.length === 0 && valueX.length === 0 && valueY.length === 0 && valueZ.length === 0) {
        return true;
    }

    // 匹配逻辑 - 2
    // B组与 M1匹配，有一个模糊匹配上，就是false, 否则true
    if (fuzzyMatches(whichB, M1)) {
        return false;
    }
    // Z组与M2匹配，有一个模糊匹配上，就false，否则 true；
    if (fuzzyMatches(valueZ, M2)) {
        return false;
    }

    // 逻辑-3 ：判断A是否为空，若为空；进行以下匹配
    if (whichA.length === 0) {
        // 先Y组与M2匹配，有一个匹配上，就是true，否则 就是false
        if (fuzzyMatches(valueY, M2)) {
            return true;
        }
        // 再X组与 M2匹配，需要全部匹配上，才能是true ；否则 是false
        return valueX.every(key => M2.some(sample => sample.includes(key)));
    }

    // 逻辑-4：若A不为空，进行以下匹配
    if (fuzzyMatches(whichA, M1)) {
        // Y组与M2匹配，有一个匹配上，就是true，否则 就是false
        if (fuzzyMatches(valueY, M2)) {
            return true;
        }
        // X组与 M2匹配，需要全部匹配上，才能是true ；否则 是false
        return valueX.every(key => M2.some(sample => sample.includes(key)));
    }

    // 默认返回 false
    return false;
	}


 // 层级属性解析时外挂回调解析函数  - 排序的时候用 ；  
  function getNestedValue(obj, path) {
    return path.split('.').reduce((value, key) => value[key], obj);
	}


 // 防抖函数定义  -- 后期打包时用 
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
	}


 // 下拉选项框的 汉字 → 转成代码中能用的字母（如文件名 → 就是  file.name）
  function getFileProperty(param) {
    // 去除参数两边的空格
    const trimmedParam = param.trim();

    // 根据条件返回相应的结果
    if (trimmedParam === "文件名") {
        return "file.name";
    } else if (trimmedParam === "创建时间") {
        return "file.ctime";
    } else if (trimmedParam === "修改时间") {
        return "file.mtime";
    }

    // 不符合任何条件时返回 "file.ctime"
    return "file.ctime";
	}



 // 这个是创建的 - 把下拉选项框的 汉字 → 转成代码中能用的字母（如升序 asc ，降序desc）
    function getSortOrder(param) {
    // 去除参数两边的空格
    const trimmedParam = param.trim();

    // 根据条件返回相应的结果
    if (trimmedParam === "升序") {
        return "asc";
    } else if (trimmedParam === "降序") {
        return "desc";
    }

    // 不符合任何条件时返回 "asc"
    return "asc";
	}


// 再次补充的函数包 - 主要是日期筛选的


// 动态日期函数包  -- 返回动态的 18个变量（今年去年明年|本月下月|上月~月初月末）
 function DateFilterPackage() {
	// 定义格式化日期为 yyyy-MM-dd 字符串的函数
			function formatDate(date) {
		    const year = date.getFullYear();
		    const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const day = date.getDate().toString().padStart(2, '0');
		    return `${year}-${month}-${day}`;
			}
 
		const currentDate = new Date();                       // 获取当前日期
		const currentYear = currentDate.getFullYear();        // 获取当前年份和月份
		const currentMonth = currentDate.getMonth();          // 0-11 代表1月到12月


	// 容错处理  -- 当1月时，判断上一个月有坑； 本质上，上个月的运算是通过  0~11 ±1来的，如果1月，0--1=-1 ，得不到12的哈，得处理 
		let previousMonthYear = currentYear;
		let previousMonth = currentMonth - 1;
		if (currentMonth === 0) {  // 当前月份为 1 月时
		    previousMonthYear = currentYear - 1;
		    previousMonth = 11; // 12 月
			}

	// 容错处理 - 12月时，判断下一个月有坑； 本质上是因为这个计算下一个用，用的是   0~11 ±1； 跨年的话没办法再 - 下去了 
		let nextMonthYear = currentYear;
		let nextMonth = currentMonth + 1;
		if (currentMonth === 11) {  // 当前月份为 12 月时
		    nextMonthYear = currentYear + 1;
		    nextMonth = 0; // 1 月
			}

	// 先组装-年初-年末  ~ 动态的
		const startofYear = new Date(new Date().getFullYear(), 0, 1)
		const endofYear = new Date(new Date().getFullYear(), 11, 31)


		const LaststartofYear = new Date(new Date().getFullYear()-1, 0, 1)      // 去年  --- 年初  | 年末 
		const LastendofYear = new Date(new Date().getFullYear()-1, 11, 31)
		const FuturestartofYear = new Date(new Date().getFullYear()+1, 0, 1)     // 明年  ---  年初 \ 年末 
		const FutureendofYear = new Date(new Date().getFullYear()+1, 11, 31)

    // 组装-本月 - 月初-月末  ~ 动态的
		const startOfMonth = new Date(currentYear, currentMonth, 1);      //  本月  -- 月初 |  月末 
		const endOfMonth = new Date(currentYear, currentMonth + 1, 0);    
		const LaststartOfMonth = new Date(previousMonthYear, previousMonth, 1);   // 上个月，月初 | 月末 
		const LastendOfMonth = new Date(currentYear, currentMonth, 0);		
		const NextstartOfMonth = new Date(nextMonthYear, nextMonth, 1);         //下个月，月初 \ 月末 
		const NextendOfMonth = new Date(nextMonthYear, nextMonth + 1, 0);


	// 转换 - 动态的 - 本年年初 \ 本月年末
		const FloatYearStart = formatDate(startofYear);   // 格式化日期   --今年
		const FloatYearEnd = formatDate(endofYear);       // 格式化日期
		const FloatLastYearStart = formatDate(LaststartofYear);   // 格式化日期   --- 去年
		const FloatLastYearEnd = formatDate(LastendofYear);       // 格式化日期
		const FloatFutureYearStart = formatDate(FuturestartofYear);   // 格式化日期   --明年
		const FloatFutureYearEnd = formatDate(FutureendofYear);       // 格式化日期


	// 转换 -动态的 - 本月月初 \ 本月月末
		const FloatMonthStart = formatDate(startOfMonth);   // 格式化日期 -- 本月 
		const FloatMonthEnd = formatDate(endOfMonth);       // 格式化日期
		const FloatLastMonthStart = formatDate(LaststartOfMonth);     // 格式化日期 -- 上月 
		const FloatLastMonthEnd = formatDate(LastendOfMonth);     
		const FloatNextMonthStart = formatDate(NextstartOfMonth);  
		const FloatNextMonthEnd = formatDate(NextendOfMonth);    

	// 拆解 → 得到单独的 数字部分，    去年 | 今年 | 明年 ；   本月 |上月| 下月
	    let   LastYearNumber  = FloatLastYearStart.split('-')[0];
		let   CurrentYearNumber=  FloatYearStart.split('-')[0];
		let   FutureYearNumber=  FloatFutureYearStart.split('-')[0];
		
		let   LastMonthNumber  =  FloatLastMonthStart.split('-')[1];
		let   CurrentMonthNumber =  FloatMonthStart.split('-')[1];
		let   NextMonthNumber =  FloatNextMonthStart.split('-')[1];


		// 上面一顿操作，就是计算出了6对，12个变量   动态的变量      
			//   FloatYearStart,            FloatYearEnd              动态的；  本年年初、 年末
			//   FloatLastYearStart,     FloatLastYearEnd,        动态的；  去年年初、 年末
			//   FloatFutureYearStart,  FloatFutureYearEnd,   动态的；  明年初、 年末

			//   FloatMonthStart,       FloatMonthEnd,          动态的；  本月月初，月末 
			//   FloatLastMonthStart, FloatLastMonthEnd,    动态的；  上个月月初，月末  （要解决跨年时的1月问题）
			//   FloatNextMonthStart, FloatNextMonthEnd,	 动态的； 下个月月初，月末（要解决跨年时的12月问题）

	    return {FloatYearStart,FloatYearEnd,
			    FloatLastYearStart, FloatLastYearEnd,
			    FloatFutureYearStart,  FloatFutureYearEnd,
			    FloatMonthStart,       FloatMonthEnd,   
			    FloatLastMonthStart, FloatLastMonthEnd,
			    FloatNextMonthStart, FloatNextMonthEnd,
			    LastYearNumber, CurrentYearNumber, FutureYearNumber,
				LastMonthNumber, CurrentMonthNumber ,NextMonthNumber 
			    };
	}

//  中文筛选 -- 辅助 - 对搜索的文字 ，string处理的函数    
 function ChineseSwitch(DateSearch) {

	let ArrayOneYear = [];
	let ArrayOneMonth = [];
	let ArrayDay = [];

 
  // 动态日期函数包返回值解析  
	let { FloatYearStart,FloatYearEnd,
	   FloatLastYearStart, FloatLastYearEnd,
	   FloatFutureYearStart,  FloatFutureYearEnd,
	   FloatMonthStart,       FloatMonthEnd,   
	   FloatLastMonthStart, FloatLastMonthEnd,
	   FloatNextMonthStart, FloatNextMonthEnd,
	   LastYearNumber, CurrentYearNumber, FutureYearNumber,
	   LastMonthNumber, CurrentMonthNumber ,NextMonthNumber,	   
		} = DateFilterPackage();      // 解析数据 ，就是之前的那些返回值

  // 00 - 再次补充的间隔 比如1~10号，  1-12号；  12-19号 , 批量加间隔 
  
         let regexinterval = /(\d{1,2})[-~](\d{1,2})[号日]/g;
         let matchesinterval = [];

         // 收集所有匹配项
         let  matchvalue ; 
         while ((matchvalue = regexinterval.exec(DateSearch)) !== null) {
             matchesinterval.push(matchvalue);
         }

         // 处理每个匹配项
         matchesinterval.forEach(match => {
            let start = parseInt(match[1], 10);
            let end = parseInt(match[2], 10);

            // 排序从小到大
            if (start > end) {
                [start, end] = [end, start];
            }

            // 生成数字系列并加入到临时数组中
            let tempArray = [];
            for (let i = start; i <= end; i++) {
                tempArray.push(i.toString().padStart(2, '0'));  // 保证是两位数格式
                     }

            // 将临时数组中的元素加入到 ArrayDay 中，并去重
            ArrayDay = Array.from(new Set([...ArrayDay, ...tempArray]));

            // 将匹配的部分替换为空字符串
            DateSearch = DateSearch.replace(match[0], '').trim();
            });

  // 00 - 再次补充的，解决了：23年 24年  25年变成  2023  2024  2025  2026

         // 定义正则表达式
         let regexYear = /(\d{2})年/g;
         let matchesYear = [];

         // 收集所有匹配项
         let matchYearValue;
         while ((matchYearValue = regexYear.exec(DateSearch)) !== null) {
             matchesYear.push(matchYearValue);
         }

            // 处理每个匹配项

          matchesYear.forEach(match => {

          let year = match[1];
          let fullYear = "20" + year;  // 在前面加上 "20"
         //dv.paragraph(`DateSearch - 年 - 处理之后 : ${fullYear}`);
   
   
         let yearNumber = parseInt(fullYear, 10);
         //dv.paragraph(`DateSearch - 年 - 处理之后 : ${yearNumber}`);

         let tempArray = [];
            // 检查是否在 1 到 31 范围内
         tempArray.push(yearNumber);
         tempArray = Array.from(new Set(tempArray)).sort((a, b) => a - b);   
         ArrayOneYear = Array.from(new Set([...ArrayOneYear, ...tempArray]));   
         DateSearch = DateSearch.replace(match[0], '').trim();

         });

  //  01 - 标准的优先处理；  匹配标准日期格式 yyyy-MM-DD;   这种优先识别出来 
	let NormalMatches = DateSearch.match(/\b(\d{4})-(\d{2})-(\d{2})\b/g);
		
	if (NormalMatches) {
	    NormalMatches.forEach(match => {
        // 将匹配到的年、月、日加入数组
        let [, year, month, day] = match.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        ArrayOneYear.push(year);
        ArrayOneMonth.push(month);
        ArrayDay.push(day);
	    });

	    // 替换匹配到的标准日期格式为空
	    DateSearch = DateSearch.replace(/\b(\d{4})-(\d{2})-(\d{2})\b/g, '');
		}

	// 这个是把  2024.5.6的这种，也优先处理掉； 
	 DateSearch = DateSearch.replace(/[.]/g, '-0');   // 去除所有非单词字符和空白字符

	if (NormalMatches) {
	    NormalMatches.forEach(match => {
        // 将匹配到的年、月、日加入数组
        let [, year, month, day] = match.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        ArrayOneYear.push(year);
        ArrayOneMonth.push(month);
        ArrayDay.push(day);
	    });

	    // 替换匹配到的标准日期格式为空
	    DateSearch = DateSearch.replace(/\b(\d{4})-(\d{2})-(\d{2})\b/g, '');
		}

  // 02 - 提取年的部分 - 相当于补充吧  
	let yearMatches = DateSearch.match(/\d{4}/g);
	if (yearMatches) {
	    ArrayOneYear = yearMatches.map(year => parseInt(year));
	    DateSearch = DateSearch.replace(/\b\d{4}\b/g, ''); // 替换为空    
	} else { 
		}


  // 02.5 - 处理中文的月份，比如 - 一月 | 二月
     function replaceChineseMonths(DateSearch) {
        const chineseMonths = {
        '一月': '1月',
        '二月': '2月',
        '三月': '3月',
        '四月': '4月',
        '五月': '5月',
        '六月': '6月',
        '七月': '7月',
        '八月': '8月',
        '九月': '9月',
        '十月': '10月',
        '十一月': '11月',
        '十二月': '12月'
          };

         return DateSearch.replace(/(一月|二月|三月|四月|五月|六月|七月|八月|九月|十月|十一月|十二月)/g, match => chineseMonths[match]);
          }

      DateSearch = replaceChineseMonths(DateSearch);






  // 03 -处理用的部分  --  要求你的月的形式是    '1月  7月   9月'   或者  "01月  02月  03月"形式的   
	let monthMatches = DateSearch.match(/\d{1,2}月/g);
	if (monthMatches) {
	    ArrayOneMonth = monthMatches.map(month => {
	        let num = month.replace('月', '').trim();
	        if (parseInt(num, 10) <= 12) {
            return num.padStart(2, '0');
		        } else {
	            return null; // 忽略大于12的月份
		        }
	    }).filter(month => month !== null); // 过滤掉为 null 的项

		DateSearch = DateSearch.replace(/\d{1,2}月/g, ''); // 替换为空
	
		} else {
    // 处理其他格式的月份
		}

    // 04 - 日期提取 -- 要求你的形式是  " 1号  9号，   9日  10日  "

	let dayMatches = DateSearch.match(/\d{1,2}(?:号|日)/g);
	if (dayMatches) {
	    ArrayDay = dayMatches.map(day => {
        let num = day.replace('号', '').replace('日', '').trim();
        let dayNumber = parseInt(num, 10);
        if (dayNumber >= 1 && dayNumber <= 31) {
	            return dayNumber.toString().padStart(2, '0');
	        } else {
	            return null; // 不符合范围的日期返回 null
	        }
	    }).filter(day => day !== null); // 过滤掉不符合范围的日期
		} else {
	    // 处理其他格式的日期
		}


  // 1. 容错检查  -   遍历三个数组的第一个项目
	let firstItems = {
	    year: ArrayOneYear[0],
	    month: ArrayOneMonth[0],
	    day: ArrayDay[0]
		};

  // 2. 容错检查  -   对于 ArrayOneYear，去重、从大到小排序

	ArrayOneYear = ArrayOneYear.filter(year => {
	    let yearNumber = parseInt(year, 10);
	    return yearNumber >= 2000 && yearNumber <= 3000;
			});
	ArrayOneYear.sort((a, b) => a - b); // 从大到小排序

  // 3. 容错检查  -   对于 ArrayOneMonth，去重、判断范围、从大到小排序
	ArrayOneMonth = ArrayOneMonth.filter(month => {
	    let monthNumber = parseInt(month, 10);
	    return monthNumber >= 1 && monthNumber <= 12;
		});
	ArrayOneMonth = ArrayOneMonth.filter((value, index, self) => self.indexOf(value) === index); // 去重
	ArrayOneMonth.sort((a, b) => a - b); // 从大到小排序

  // 4. 容错检查  -   对于 ArrayDay，去重、判断范围、从大到小排序
	ArrayDay = ArrayDay.filter(day => {
	    let dayNumber = parseInt(day, 10);
	    return dayNumber >= 1 && dayNumber <= 31;
		});
	ArrayDay = ArrayDay.filter((value, index, self) => self.indexOf(value) === index); // 去重
	ArrayDay.sort((a, b) => a - b); // 从大到小排序

    return {  ArrayOneYear, ArrayOneMonth, ArrayDay};
	 }

//  中文搜索筛选函数  - 主函数 --  ChineseDateFilter
 function ChineseDateFilter(p, dateFilterBy, DateSearch) {
    // 防御设计：如果 dateFilterBy 和 DateSearch 都为空，直接返回 true
    if (!dateFilterBy && !DateSearch) {
        return true;
    }

    // 参数处理 - dateFilterBy
    let dateValue = getNestedValue(p, dateFilterBy);
    if (!dateValue) {
        return false;
    }


	let txDate = new Date(dv.date(dateValue));
	let txYear = txDate.getFullYear().toString();
	let txMonth = (txDate.getMonth() + 1).toString().padStart(2, '0');
	let txDay = txDate.getDate().toString().padStart(2, '0');

    // 使用 ChineseSwitch 函数处理 DateSearch 参数
    let { ArrayOneYear, ArrayOneMonth, ArrayDay } = ChineseSwitch(DateSearch);

    // 年份匹配逻辑
    let yearMatch = ArrayOneYear.length === 0 || ArrayOneYear.some(year => txYear === year.toString());

    // 月份匹配逻辑
    let monthMatch = ArrayOneMonth.length === 0 || ArrayOneMonth.some(month => txMonth === month);

    // 日期匹配逻辑
    let dayMatch = ArrayDay.length === 0 || ArrayDay.some(day => txDay === day);

    // 组合条件的最终匹配
    return yearMatch && monthMatch && dayMatch;
	}

//  辅助 ~ 时间±调整函数 
 function adjustedDate(days) {
    let date = new Date();
    date.setDate(date.getDate() + days);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
	}

//  时间块筛选 - 辅助 - 搜索的 sting 处理的函数   
 function processIntervalday(Intervalday) {
    if (!Intervalday || typeof Intervalday !== 'string' || !Intervalday.trim()) {
        return true; // 防御设计
    }

    // 去除两边空格并转为字符串
    Intervalday = Intervalday.trim();

    // 替换所有 `±` 符号为 `+-`
    Intervalday = Intervalday.replace(/±/g, '+-');

    // 定义正则表达式匹配数字
    const numberPattern = /[+-]?\d+/g;

    // 判断是否是等号 = 开头
    if (Intervalday.startsWith('=')) {
        let items = Intervalday.slice(1).match(numberPattern);
        if (!items) return true;

        items = items.map(item => Number(item)).filter(item => !isNaN(item));

        // 使用 adjustedDate 计算日期数组
        let dates = items.map(adjustedDate);

        // 去重并排序
        dates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b));

        return { type: 'arrayA', values: dates };
    }

    // 判断是否是 “±” “+-”  “-+” 开头
    if (Intervalday.startsWith('+-') || Intervalday.startsWith('-+') || Intervalday.startsWith('+±')) {
        let items = Intervalday.slice(2).match(numberPattern);
        if (!items || items.length === 0) return true;

        let number = Math.abs(Number(items[0]));
        let dateRange = [-number, number].map(adjustedDate);

        // 去重并排序
        dateRange = [...new Set(dateRange)].sort((a, b) => new Date(a) - new Date(b));

        return { type: 'arrayB', values: dateRange };
    }

    // 处理非=等号 、 “±” “+-”  “-+” 开头的情况
    let items = Intervalday.match(numberPattern);
    if (!items) return true;

    items = items.map(item => Number(item)).filter(item => !isNaN(item));

    // 存为临时数组
    let tempArray = items;

    // 判断临时数组内的项目是否只有一个元素且不为0
    if (tempArray.length === 1 && tempArray[0] !== 0) {
        tempArray.push(0);

        // 使用 adjustedDate 计算日期数组
        let dates = tempArray.map(adjustedDate);

        // 去重并排序
        dates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b));

        return { type: 'arrayC', values: dates };
    }

    // 判断临时数组内的项目是否只有一个元素且为0
    if (tempArray.length === 1 && tempArray[0] === 0) {
        tempArray.push(0);

        // 使用 adjustedDate 计算日期数组
        let dates = tempArray.map(adjustedDate);

        // 去重并排序
        dates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b));

        return { type: 'arrayD', values: dates };
    }

    // 判断临时数组内的项目是否大于 1 个元素
    if (tempArray.length > 1) {
        // 使用 adjustedDate 计算日期数组
        let dates = tempArray.map(adjustedDate);

        // 去重并排序
        dates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b));

        // 只取第1个元素和最后一个元素，组成新的数组
        let dateRange = [dates[0], dates[dates.length - 1]];

        return { type: 'arrayF', values: dateRange };
    }

    return true; // 默认返回 true
	}

//  时间块筛选 - 主函数的代码 
 function DateFilterBlock(p, dateFilterBy, Intervalday) {
    // 防御设计：如果 dateFilterBy 和 Intervalday 同时为空或无定义，返回 true
    if (!dateFilterBy && !Intervalday) {
        return true;
    }

    // 参数处理 - dateFilterBy
    const dateValue = getNestedValue(p, dateFilterBy);
    if (!dateValue) {
        return false; // 如果 dateValue 无法获取，返回 false
    }

    const txdate = new Date(dateValue);
    const txyear = txdate.getFullYear();
    const txmonth = (txdate.getMonth() + 1).toString().padStart(2, '0');
    const t0day = txdate.getDate().toString().padStart(2, '0');
    const txday = `${txyear}-${txmonth}-${t0day}`;

    // 参数处理 - Intervalday
    const result = processIntervalday(Intervalday);

    // 匹配容错：如果 processIntervalday 返回的值为 true，则整个函数结束，返回 true
    if (result === true) {
        return true;
    }

    // 匹配筛选
    if (result.type === 'arrayA') {
        return result.values.some(date => date === txday);
    }

    if (result.type === 'arrayB' || result.type === 'arrayC' || result.type === 'arrayF') {
        const [tLow, tUp] = result.values;
        return tLow <= txday && txday <= tUp;
    }

    if (result.type === 'arrayD') {
        return result.values[0] === txday;
    }

    return false; // 默认返回 false
	}


// Anki 复习筛选 --辅助函数 → 对 Anki 的频率进行解析的   
 function AnkiStringHandle(AnkiFrequncey) {
    
    // 删除中英字符，去除两边空格，string 化
    AnkiFrequncey = AnkiFrequncey.replace(/[a-zA-Z\u4e00-\u9fa5]/g, '').trim().toString();
    
    // 容错防御设计：如果 AnkiFrequncey 为空或无定义时，返回 true   
    
    if (!AnkiFrequncey) {
        return true;
    }

    
    

    // 所有除 +、- 和数字外的字符都当成分割符，切割并存为数组
    let items = AnkiFrequncey.split(/[^0-9+\-]+/);

    // 定义3个数组存放不同符号的数字
    let arrayA = [];
    let arrayB = [];
    let arrayC = [];

    // 遍历所有 item，分类存放到对应数组
    items.forEach(item => {
        let num = Number(item);
        if (!isNaN(num)) {
            if (item.startsWith('-')) {
                arrayB.push(num);
            } else if (item.startsWith('+')) {
                arrayC.push(num);
            } else {
                arrayA.push(-num); // 没有符号的取反
            }
        }
    });

    // 利用函数 adjustedDate 对3个数组里的每一个 item 运算，得到3个新数组
    let dateArrayA = arrayA.map(days => adjustedDate(days));
    let dateArrayB = arrayB.map(days => adjustedDate(days));
    let dateArrayC = arrayC.map(days => adjustedDate(days));

    // 合并3个新数组，去重并从小到大排序
    let combinedArray = [...new Set([...dateArrayA, ...dateArrayB, ...dateArrayC])].sort((a, b) => new Date(a) - new Date(b));

    // 返回这个数组
    return combinedArray;
	}


//真用 Anki 直接筛选的函数哈   
 function AnkiFilter(p, dateFilterBy, AnkiFrequncey) {
    // 容错防御设计：如果 dateFilterBy 和 AnkiFrequncey 同时为空，返回 true
    if (!dateFilterBy && !AnkiFrequncey) {
        return true;
    }

    // 参数处理 - dateFilterBy
    let dateValue = getNestedValue(p, dateFilterBy);
    let txDate = new Date(dv.date(dateValue));
    let txYear = txDate.getFullYear().toString();
    let txMonth = (txDate.getMonth() + 1).toString().padStart(2, '0');
    let txDay = txDate.getDate().toString().padStart(2, '0');
    let txCompleteDate = `${txYear}-${txMonth}-${txDay}`;

    // 对参数 AnkiFrequncey 使用 AnkiStringHandle 函数处理
    let result = AnkiStringHandle(AnkiFrequncey);

    // 容错：如果 AnkiStringHandle 返回 true 或者返回的数组长度为 0，返回 true
    if (result === true || result.length === 0) {
        return true;
    }

    // 匹配：遍历数组的每一个 item，与 txCompleteDate 比对，如果相等返回 true，否则返回 false
    for (let item of result) {
        if (txCompleteDate === item) {
            return true;
        }
    }
    return false;
	}


// 时间类容器筛选 - 辅助 - 对容器抓取的数据处理函数   
 function DateContainerStringCook(ContainerStartDateValue, ContainerEndDateValue, ContainerMonthDateValue, ContainerWeekDateValue) {
    // 容错设计
    if (!ContainerStartDateValue && !ContainerEndDateValue && !ContainerMonthDateValue && !ContainerWeekDateValue) {
        return { type: 'none', values: [] };
    }

    // 计算当前日期 t0date
    let now = new Date();
    let t0Year = now.getFullYear();
    let t0Month = (now.getMonth() + 1).toString().padStart(2, '0');
    let t0Day = now.getDate().toString().padStart(2, '0');
    let t0date = `${t0Year}-${t0Month}-${t0Day}`;

    // 判断4个参数的值 - 1
    if (ContainerStartDateValue || ContainerEndDateValue) {
        let tLow = ContainerStartDateValue ? ContainerStartDateValue : t0date;
        let tUp = ContainerEndDateValue ? ContainerEndDateValue : t0date;
        let values = [tLow, tUp].sort();
        return { type: 'arrayA', values: values };
    }

    // 判断4个参数的值 - 2
    if (ContainerMonthDateValue) {
        let [tYear, tMonth] = ContainerMonthDateValue.split('-');
        return { type: 'arrayB', values: [tYear, tMonth] };
    }

    // 判断4个参数的值 - 3
    if (ContainerWeekDateValue) {
        let [year, week] = ContainerWeekDateValue.split('-W');
        year = parseInt(year);
        week = parseInt(week);

        // 获取这一年的第一个星期一
        let firstDayOfYear = new Date(year, 0, 1);
        let dayOfWeek = firstDayOfYear.getDay();
        let firstMonday = new Date(firstDayOfYear);

        // 如果第一个星期一不在本周内，调整到下一个星期一
        if (dayOfWeek !== 1) {
            firstMonday.setDate(firstDayOfYear.getDate() + (dayOfWeek === 0 ? 1 : 8 - dayOfWeek));
        }

        // 计算目标周的第一个星期一
        let firstDayOfWeek = new Date(firstMonday);
        firstDayOfWeek.setDate(firstMonday.getDate() + (week - 1) * 7);

        // 计算目标周的第七天
        let lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

        // 格式化日期为 yyyy-MM-dd
        function formatDate(date) {
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        let tLow = formatDate(firstDayOfWeek);
        let tUp = formatDate(lastDayOfWeek);
        let values = [tLow, tUp].sort();
        return { type: 'arrayC', values: values };
    }

    // 默认返回
    return { type: 'none', values: [] };
	}


// 时间类容器筛选 - 主函数

 function ContainerDateFilter(p, dateFilterBy, ContainerStartDateValue, ContainerEndDateValue, ContainerMonthDateValue, ContainerWeekDateValue) {
    // 防御设计：如果除 p 外的5个参数同时为空或者无定义时，直接返回 true
    if (!ContainerStartDateValue && !ContainerEndDateValue && !ContainerMonthDateValue && !ContainerWeekDateValue) {
        return true;
    }

    // 参数处理 - dateFilterBy
    function getNestedValue(obj, path) {
        return path.split('.').reduce((value, key) => value[key], obj);
    }

    let dateValue = getNestedValue(p, dateFilterBy);
    let txDate = new Date(dv.date(dateValue));
    let txYear = txDate.getFullYear().toString();
    let txMonth = (txDate.getMonth() + 1).toString().padStart(2, '0');
    let txDay = txDate.getDate().toString().padStart(2, '0');
    let txCompleteDate = `${txYear}-${txMonth}-${txDay}`;

    // 利用函数 DateContainerStringCook 得到返回值
    let { type, values } = DateContainerStringCook(ContainerStartDateValue, ContainerEndDateValue, ContainerMonthDateValue, ContainerWeekDateValue);

    // 判断匹配 - 容错保险设计
    if (type === 'none') {
        return true;
    }

    // 匹配筛选 - 数组 array A
    if (type === 'arrayA') {
        let [tLow, tUp] = values.sort();
        return tLow <= txCompleteDate && txCompleteDate <= tUp;
    }

    // 匹配筛选 - 数组 array B
    if (type === 'arrayB') {
        let [tYear, tMonth] = values;
        let yearMatch = (tYear === txYear);
        let monthMatch = (tMonth === txMonth);
        return yearMatch && monthMatch;
    }

    // 匹配筛选 - 数组 array C
    if (type === 'arrayC') {
        let [tLow, tUp] = values.sort();
        return tLow <= txCompleteDate && txCompleteDate <= tUp;
    }

    return true;
	}








// 创建主容器
const mainContainer = createFlexContainer("flex-container", "center", "column");


// row1 - 创建第一排 容器布局 
const row1 = createFlexContainer("flex-row", "space-between");

// row1 - 01 - 创建+添加 "文本输入框" （文件名搜索的）+ （带追踪事件）
	const labelFileName = document.createElement("label");
	labelFileName.innerText = "文件名搜索";
	labelFileName.className = "label-field"; // 单独设置类名

	const inputFieldFileName = createInputField("多个关键字 用逗号空格等隔开", "");
	inputFieldFileName.className = "inputFilter-field"; // 单独设置类名
	inputFieldFileName.addEventListener("input", (event) => {    
		event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	
	    debouncedUpdateInputFileName(event.target.value);
    
		});
		
// row1 - 02 - 创建+添加清空按钮 + （带追踪事件）
	const buttonClearFileName = document.createElement("button");
	buttonClearFileName.innerText = "清空条件";

	buttonClearFileName.className = "button-class"; // 单独设置类名
	buttonClearFileName.addEventListener("click", () => {
		event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	    //inputFieldFileName.value = "";     // 这是2个原本的，清空 ，还有变量清空 
	    //filterFileName = "";
	    debouncedUpdateClearFileName();     // 用防抖函数打包了的

		});

// row1 - 03 - 创建+添加第一个下拉选项框-排序区域的 （带追踪事件）
	const labelSortOption = document.createElement("label");
	labelSortOption.innerText = "按...排序";
	labelSortOption.className = "label-field"; // 单独设置类名

	const selectSortOption = createSelectField(["文件名", "创建时间", "修改时间"], "创建时间");
	selectSortOption.addEventListener("change", (event) => {
		event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	    //sortOption = getFileProperty(event.target.value);
	    //pageNum = 1; 
	    //filterPages();
	    //fy();
    
	    debouncedUpdateOption(event.target.value);
    

		});

// row1 - 装载 -  将标签 lable ，文本输入框，下拉选框，清空按钮 添加到第一排
	row1.appendChild(labelFileName);
	row1.appendChild(inputFieldFileName);
	row1.appendChild(buttonClearFileName);
	row1.appendChild(labelSortOption);
	row1.appendChild(selectSortOption);

	// 将第一排添加到主容器
	mainContainer.appendChild(row1);


// row2 - 创建第2排 容器布局 
const row2 = createFlexContainer("flex-row", "space-between");

// row2 - 01 - 创建+添加 "文本输入框" (标签搜索的) +  （带追踪事件）
	const labelTagsName = document.createElement("label");
	labelTagsName.innerText = "Tags 搜索";
	labelTagsName.className = "label-field"; // 单独设置类名

	const inputFieldTagsName = createInputField("多个 tag 用逗号空格等隔开", "");
	inputFieldTagsName.className = "inputFilter-field"; // 单独设置类名
	inputFieldTagsName.addEventListener("input", (event) => {
		event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	    //filterTags = event.target.value;
		debouncedUpdateInputFilterTags(event.target.value);
		});

// row2 - 02 - 创建+添加清空按钮+ （带追踪事件）
	const buttonClearTags = document.createElement("button");
	buttonClearTags.innerText = "清空条件";
	buttonClearTags.className = "button-class"; // 单独设置类名
	buttonClearTags.addEventListener("click", () => {
		event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	    //inputFieldTagsName.value = "";    
	    //filterTags = ""; 
	    debouncedUpdateClearFilterTags();

		});

// row2 - 03 - 创建+添加  "下拉选项框" (排序升序降序的) 
	const labelSortOrder = document.createElement("label");
	labelSortOrder.innerText = "Sort 升降";
	labelSortOrder.className = "label-field"; // 单独设置类名
	const selectSortOrder = createSelectField(["升序", "降序"], "升序");
	selectSortOrder.addEventListener("change", (event) => {
		event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	    //sortOrder = getSortOrder(event.target.value) ;
	    debouncedUpdateSortOrder(event.target.value);
    
		});

// row2 - 装载； 将标签 lable ，文本输入框，下拉选框，清空按钮 添加到第2排
	row2.appendChild(labelTagsName);
	row2.appendChild(inputFieldTagsName);
	row2.appendChild(buttonClearTags);
	row2.appendChild(labelSortOrder);
	row2.appendChild(selectSortOrder);

	// 将第2排添加到主容器
	mainContainer.appendChild(row2);


// row3 - 创建第3排 容器布局 
const row3 = createFlexContainer("flex-row", "space-between");

// row3 - 01 - 创建+添加 "文本输入框" (Key 搜索的)  + （带追踪事件）
	const labelKeyName = document.createElement("label");
	labelKeyName.innerText = "Key - 搜索";
	labelKeyName.className = "label-Keyfield"; // 单独设置类名

	const inputFieldKeyName = createInputField("关键字 用逗号空格等隔开", "");
	inputFieldKeyName.className = "inputFilter-Keyfield"; // 单独设置类名
	inputFieldKeyName.addEventListener("input", (event) => {
		event.preventDefault(); // 阻止表单提交的默认行为；走这个监听下面的其他的流程；
	    //WhichKey = event.target.value;   
	    debouncedUpdateWhichKey(event.target.value);  
    	});

// row3 - 02 - 创建+添加 "文本输入框" (Key 搜索的)  + （带追踪事件）
	const labelValueName = document.createElement("label");
	labelValueName.innerText = "Value - 搜索";
	labelValueName.className = "label-Keyfield"; // 单独设置类名

	const inputFieldKeyValue = createInputField("关键字 用逗号空格等隔开", "");
	inputFieldKeyValue.className = "inputFilter-Keyfield"; // 单独设置类名
	inputFieldKeyValue.addEventListener("input", (event) => {
		event.preventDefault(); // 阻止表单提交的默认行为；走这个监听下面的其他的流程；
	    //KeyValueFilter = event.target.value;    
		debouncedUpdateKeyValueFilter(event.target.value);
    
		});

// row3 - 03 - 创建+添加清空按钮 + （带追踪事件）
	const buttonClearKey = document.createElement("button");
	buttonClearKey.innerText = "清空条件";
	buttonClearKey.className = "button-class"; // 单独设置类名
	buttonClearKey.addEventListener("click", () => {
		event.preventDefault(); // 阻止表单提交的默认行为；走这个监听下面的其他的流程；
	    //inputFieldKeyName.value = "";
	    //inputFieldKeyValue.value = "";
	    //WhichKey = ""; 
	    //KeyValueFilter = "";
    
		debouncedUpdateClearKeyFilter();
	});

// row3 - 04 - 创建+添加 "文本输入框" + （最大页面设置）
	const labelPageSize = document.createElement("label"); 
	labelPageSize.innerText = "单页 Max"; 
	labelPageSize.className = "label-pagesize"; // 单独设置类名

	const PageSizeInput = document.createElement("input");
	PageSizeInput.type = "number"; // 设置类型为数值
	PageSizeInput.placeholder = "值要>0"; // 设置占位符
	PageSizeInput.value = "10"; // 设置默认值
	PageSizeInput.className = "inputPageMax-field"; // 单独设置类名
	
	PageSizeInput.addEventListener("input", (event) => {
		event.preventDefault(); // 阻止表单提交的默认行为
		//PageSize = event.target.value; // 确保值为整数，默认值为10	    
		//pageNum = 1; 
	    //filterPages();
	    //fy();
		const value = parseInt(event.target.value);
		debouncedUpdatePageSize(isNaN(value) ? 10 : value); // 确保传递给防抖函数的值不为 NaN
		});


// row3 - 装载 - 将标签 lable ，文本输入框，下拉选框，清空按钮 添加到第3排
	row3.appendChild(labelKeyName);
	row3.appendChild(inputFieldKeyName);

	row3.appendChild(labelValueName);
	row3.appendChild(inputFieldKeyValue);

	row3.appendChild(buttonClearKey);
	row3.appendChild(labelPageSize);
	row3.appendChild(PageSizeInput);
	// 将第3排添加到主容器
	mainContainer.appendChild(row3);
	dv.container.appendChild(mainContainer);  // 搜索框 → 加载主容器



// row4 - 创建第一排 容器布局 
const row4 = createFlexContainer("flex-row", "space-between");

// row4 - 01 - 创建+添加第一个下拉选项框-时间按什么排序区域的 （带追踪事件）
	const labelWhichDate = document.createElement("label");
	labelWhichDate.innerText = "什么时间";
	labelWhichDate.className = "label-row4-00"; // 单独设置类名
	
	const selectDateSortBy = createSelectField(["创建时间", "修改时间","XX-可增改"], "创建时间");
	selectDateSortBy.className = "select-Row5"; // 单独设置类名
	selectDateSortBy.addEventListener("change", (event) => {
       event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	   debouncedUpdateDateSortBy(event.target.value)
		});

// row4 - 02 - 创建+添加 "文本输入框" （中文日期搜索）+ （带追踪事件）

	const labelChineseSearch = document.createElement("label");
	labelChineseSearch.innerText = "日期搜索";
	labelChineseSearch.className = "label-row4-01";              // 单独设置类名
	
	const inputChineseSearch= createInputField("多关键字 用逗号空格等隔开", "");
	inputChineseSearch.className = "inputFilter-row4-01";     // 单独设置类名
	inputChineseSearch.addEventListener("input", (event) => {    
	     event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	     debouncedUpdateChineseSearch(event.target.value); 
	     //pageNum = 1;
	     //filterPages();
	     ///fy();
	     ;
    
		});

// row4 - 03 - 创建+添加 "文本输入框" （时间块搜索）+ （带追踪事件）
	const labelDateBlockFilter = document.createElement("label");
	labelDateBlockFilter.innerText = "时间块搜";
	labelDateBlockFilter.className = "label-row4-02";              // 单独设置类名
	

	const inputDateBlockFilter= createInputField("-1昨天，0今天，+1明天", "");
	inputDateBlockFilter.className = "inputFilter-row4-02";     // 单独设置类名
	inputDateBlockFilter.addEventListener("input", (event) => {    
	     event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	     debouncedUpdateBlockFilter(event.target.value);
	     ;
    
		});


// row4 - 04 - 创建+添加 "文本输入框" （Anki 日期搜索）+ （带追踪事件）
	const labelDateAnkiFilter = document.createElement("label");
	labelDateAnkiFilter.innerText = "Anki 复习";
	labelDateAnkiFilter.className = "label-row4-03";              // 单独设置类名


	const inputDateAnkiFilter= createInputField("多关键字 用逗号空格等隔开", "");
	inputDateAnkiFilter.className = "inputFilter-row-03";     // 单独设置类名
	inputDateAnkiFilter.addEventListener("input", (event) => {    
	     event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	     debouncedUpdateAnkiFilter(event.target.value);
	     ;
    
		});
		

// Row4 - 装载到容器上

    row4.appendChild(labelWhichDate);
	row4.appendChild(selectDateSortBy);
	row4.appendChild(labelChineseSearch);
	row4.appendChild(inputChineseSearch);
	row4.appendChild(labelDateBlockFilter);
	row4.appendChild(inputDateBlockFilter);
	row4.appendChild(labelDateAnkiFilter);
	row4.appendChild(inputDateAnkiFilter);


	mainContainer.appendChild(row4);



// row5 - 创建第一排 容器布局 
const row5 = createFlexContainer("flex-row", "space-between");

	let today = new Date();
	let year = today.getFullYear();
	let month = (today.getMonth() + 1).toString().padStart(2, '0');
	let day = today.getDate().toString().padStart(2, '0');
	let formattedToday = `${year}-${month}-${day}`;


// rows5 - 01  - 创建日期 day - 起点 Start - 输入容器
	const labelContainerDayStart = document.createElement("label");
	 labelContainerDayStart.innerText = "日期-起点";
	 labelContainerDayStart.className = "label-row5-01";              // 单独设置类名
 
	let startdateInput = document.createElement("input");
	startdateInput.type = "date";
	startdateInput.classList.add("your-css-class");    // 添加 CSS 类
	startdateInput.addEventListener("change", function() {    // 添加事件监听器，    
	    event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	    
	    //dv.paragraph(`监控的开始日期值 : ${ ContainerStartDateValue}`);
	    debouncedUpdateStart(event.target.value);
		});
	

// rows5 - 02  - 创建日期 day - 终点 End- 输入容器
	const labelContainerDayEnd = document.createElement("label");
	 labelContainerDayEnd.innerText = "日期终点";
	 labelContainerDayEnd.className = "label-row5-02";              // 单独设置类名
 
	let enddateInput = document.createElement("input");
	enddateInput.type = "date";
	enddateInput.classList.add("your-css-class");    // 添加 CSS 类
	enddateInput.addEventListener("change", function() {    // 添加事件监听器，
		event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	  
		debouncedUpdateEnd(event.target.value);
		
	    //dv.paragraph(`监控的结束日期值 : ${ContainerEndDateValue }`);
		});
	//enddateInput.value = formattedToday;

// rows5 - 03  - Month 类型容器 
	const labelContainerMonth = document.createElement("label");
	labelContainerMonth.innerText = "Month-月";
	labelContainerMonth.className = "label-row5-03";              // 单独设置类名

	let monthDateInput = document.createElement("input");
	monthDateInput.type = "month";
	monthDateInput.classList.add("your-css-class");    // 添加 CSS 类
	monthDateInput.addEventListener("change", function() {    // 添加事件监听器，
		 event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	 
	     debouncedUpdateMonth(event.target.value);
	    //dv.paragraph(`监控的月份容器 值  : ${ContainerMonthDateValue}`);
		});
	

// rows5 - 04 -  Week 类型容器 
	const labelContainerWeek = document.createElement("label");
	labelContainerWeek.innerText = "Week-周";
	labelContainerWeek.className = "label-row5-04";              // 单独设置类名

	let weekDateInput = document.createElement("input");
	weekDateInput.type = "week";
	weekDateInput.classList.add("your-css-class");    // 添加 CSS 类
	weekDateInput.addEventListener("change", function() {    // 添加事件监听器，
	    event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	
        debouncedUpdateWeek(event.target.value);
	    //dv.paragraph(`监控的 week 周的值  : ${ContainerWeekDateValue}`);
		});
	//weekDateInput.value = today;

// row5 - 05 - 创建+添加清空按钮 + （带追踪事件）
	const buttonClearRow45All= document.createElement("button");
	 buttonClearRow45All.innerText = "清空条件";
	 buttonClearRow45All.className = "button-class"; // 单独设置类名

	 buttonClearRow45All.addEventListener("click", () => {
	 event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	  
      debouncedUpdateClearRow45All();

		});

// row5 - 容器装载


	row5.appendChild(labelContainerDayStart);
	row5.appendChild(startdateInput); // 将容器添加到文档中

	row5.appendChild(labelContainerDayEnd)
	row5.appendChild(enddateInput);

	row5.appendChild(labelContainerMonth)
	row5.appendChild(monthDateInput)

	row5.appendChild(labelContainerWeek)
	row5.appendChild(weekDateInput)

	row5.appendChild(buttonClearRow45All)

	mainContainer.appendChild(row5);





// 筛选过滤集合函数 
function filterPages() {
    let pageData = dv.pages()
    //.slice(0, 3); 
    
    // 前置过滤 -- 文件夹（如日记） 还有标签
   pageData = pageData.filter(p => UpFilterKey(p,FolderKey, TagKey))

    // 中场过滤 - 标题 + 标签  + key 字段 
    const conditions = [
	   { value: filterFileName, matchFunction: customTitleMatch },
	   { value: filterTags, matchFunction: customTagMatch },
	   { whichkey: WhichKey, value: KeyValueFilter, matchFunction: customKeyMatch }
		];
	
  (async () => {
   // 过滤标准3件匹配条件（标题 + 标签  + key 字段 ）
	pageData = pageData.filter(p => {
		    return conditions.every(condition => {
		        if (condition.matchFunction === customKeyMatch) {
	            // 对于 customKeyMatch 需要传递 whichkey 和 value
		            return condition.matchFunction(p, condition.whichkey, condition.value);
		        } else {
	            // 对于其他函数，传递 page 和 value
		            return condition.matchFunction(p, condition.value);
		        }
			});
		});


	// 中文日期过滤  
   pageData = pageData.filter(p => {return ChineseDateFilter(p, dateFilterBy,DateSearch ); })


	// 时间块筛选
    pageData = pageData.filter(p => {return DateFilterBlock(p, dateFilterBy, Intervalday); })


	// anki 复习过滤
	pageData = pageData.filter(p => {return AnkiFilter(p, dateFilterBy, AnkiFrequncey); }) 


	// 时间块容器筛选
	pageData = pageData
        .filter(p => {return ContainerDateFilter(p, dateFilterBy , 
		        ContainerStartDateValue,  ContainerEndDateValue, 
		        ContainerMonthDateValue, ContainerWeekDateValue); })

   // 排序 
	pageData = pageData
				.sort(p => {return getNestedValue(p, sortOption);}, sortOrder)
	})();

    let totalData = pageData.length;
    let maxnum = Math.ceil(totalData / PageSize);

    // 确保 maxnum 不为 0 
    if (maxnum === 0) { maxnum = 1; }
	
    return { pageData, totalData, maxnum };
   
	}



// 以下是翻页的部分，不用动哈 
 let { pageData, totalData, maxnum } = filterPages();  // 解析筛选数据


 let paragraph = document.createElement("div");
 paragraph.innerText =` 共检索出 ${totalData} 条数据`;
 paragraph.style.flex = "1";


 const row7 = createFlexContainer("flex-row", "space-between");


 let pageSpan1 = dv.el("span", `${pageNum}`); 
 let pageSpan2 = dv.el("span", "  / ");    
 let pageSpan3 = dv.el("span", maxnum);  
 //let pageSpan3 = dv.el("span",`${maxnum}`);  


 const buttonUp = createButton("上一页");    
 buttonUp.className = "button-class";                         
 buttonUp.addEventListener("click", () => {
	//event.preventDefault(); // 阻止表单提交的默认行为；走这个监听下面的其他的流程；
	const { maxnum } = filterPages(); // 获取最新的 maxnum
	pageNum = pageNum > 1 ? pageNum - 1 : maxnum;     
	if (pageNum < 1) pageNum = 1; // 确保 pageNum 不小于 1  	
    setTimeout(() => { fy(); }, 30);    
	});



 const buttonDown = createButton("下一页");    
 buttonDown.className = "button-class";  
 buttonDown.addEventListener("click", () => {
	//event.preventDefault(); // 阻止表单提交的默认行为；走这个监听下面的其他的流程；
	const { maxnum } = filterPages(); // 获取最新的 maxnum
    pageNum = pageNum < maxnum ? pageNum + 1 : 1;   
    if (pageNum < 1) pageNum = 1;   // 确保 pageNum 不小于       
    setTimeout(() => { fy(); }, 30);    

	});

 // 将第1排添加到 row1组件 
 row7.appendChild(paragraph);
 row7.appendChild(buttonUp);
 row7.appendChild(pageSpan1);
 row7.appendChild(pageSpan2);
 row7.appendChild(pageSpan3);
 row7.appendChild(buttonDown);

 // 将第一排添加到主容器
 mainContainer.appendChild(row7);

// fy() 就是翻页，展示的函数，也不用动啥哈 
function fy() {

    const elementsToRemove = document.querySelectorAll(".dataview.table-view-table, .dataview.dataview-error-box");
    elementsToRemove.forEach(element => element.remove());
	
    const { pageData, totalData, maxnum } = filterPages();
    (async () => {
    let ShowData = pageData.slice((pageNum - 1) * PageSize, pageNum * PageSize);

	//let x = dv.el("div",maxnum)

    pageSpan1.innerText = pageNum;    // 写这儿是简化，如果不写儿，要在2个按钮那儿都写一次；
    pageSpan3.innerText = maxnum;     // 筛选函数 → 结果总数变化 / max= 这儿要记它变化
    paragraph.innerText =` 共检索出 ${totalData} 条数据`;  // 更新 那个检索数据的值 
	

    let tableRows = ShowData.map(p => { 
          return [ p.file.link, ...headers.map( property => p.file[property] || p[property] || "") ]; });


    dv.table(["FileName", ...headers], tableRows, ".dataview.table-view-table");
    })();
}

// 防抖是有必要的，不然会各种 bug  ,超级多 bug  
// 防抖补充包儿  

 // 防抖包装- row1 - 01-  “文件名搜索” + 筛选函数  +  翻页更新函数
	const debouncedUpdateInputFileName = debounce((value) => {
	    filterFileName = value;
	    pageNum = 1; 
	    filterPages();
	    fy();
		}, 100);

 // 防抖包装- row1 -02-  “清空按钮” + 筛选函数  +  翻页更新函数
	const debouncedUpdateClearFileName = debounce(() => {
	    filterFileName = "";
	    inputFieldFileName.value = "";
	    pageNum = 1; 
	    filterPages();
	    fy();
		}, 100);

 // 防抖包装- row1 - 03-  “排序区域” + 筛选函数  +  翻页更新函数
	const debouncedUpdateOption= debounce((value) => {
	    sortOption = getFileProperty(value);
	    pageNum = 1; 
	    filterPages();
	    fy();
		}, 100);

 // 防抖包装- row2 - 01-  “标签搜索” + 筛选函数  +  翻页更新函数
	const debouncedUpdateInputFilterTags = debounce((value) => {
	    filterTags = value;
	    pageNum = 1; 
	    filterPages();
	    fy();
		}, 100);

 // 防抖包装- row2 -02-  “清空按钮” + 筛选函数  +  翻页更新函数
		const debouncedUpdateClearFilterTags = debounce(() => {
	    inputFieldTagsName.value = ""    
	    filterTags = "";
	    pageNum = 1; 
	    filterPages();
	    fy();
		}, 100);

 // 防抖包装- row 2 - 03-  “排序区域” + 筛选函数  +  翻页更新函数
		const debouncedUpdateSortOrder= debounce ((value) => {    
	    sortOrder = getSortOrder (value);
	    pageNum = 1; 
	    filterPages ();
	    fy ();
		}, 100);

 // 防抖包装- row 3 - 01-  “key 搜索” + 筛选函数  +  翻页更新函数
		const debouncedUpdateWhichKey  = debounce ((value) => {
	    WhichKey  = value;
	    pageNum = 1; 
	    filterPages ();
	    fy ();
		}, 100);

 // 防抖包装- row 3 - 02-  “value 搜索” + 筛选函数  +  翻页更新函数
	const debouncedUpdateKeyValueFilter  = debounce ((value) => {
	    KeyValueFilter = value;
	    pageNum = 1; 
	    filterPages ();
	    fy ();
		}, 300);

 // 防抖包装- row 3 -03-  “清空按钮” + 筛选函数  +  翻页更新函数
		const debouncedUpdateClearKeyFilter = debounce (() => {
	    inputFieldKeyName. value = "";
	    inputFieldKeyValue. value = "";

	    WhichKey = ""; 
	    KeyValueFilter = "";

	    pageNum = 1; 
	    filterPages ();
	    fy ();
		}, 100);

 // 防抖包装- row 3 -04-  “pagesize” + 筛选函数  +  翻页更新函数
		const debouncedUpdatePageSize = debounce ((value) => {
    // 确保值不等于 0
	    PageSize = value !== 0 ? value : 10;
	    pageNum = 1; 
	    filterPages ();
	    fy ();
		}, 100);

 // 防抖包装 - row4 - 01 - 时间 By 来源 
	    const debouncedUpdateDateSortBy = debounce ((value) => {    
	    dateFilterBy = getFileProperty(value);
	    pageNum = 1; 
	    filterPages ();
	    fy ();
		}, 100);

 // 防抖包装 - row4 - 02  - 日期 中文搜索  

	    const debouncedUpdateChineseSearch= debounce ((value) => {    
	    DateSearch  = value;           // 自己值更新到全局变量
        Intervalday   = "" ;           // 其他全局变量，都要清空，因为是相斥关系 
        AnkiFrequncey   = "" ;
	    inputDateBlockFilter.value  = "" ;   // 另外2个要清空，因为是相斥关系 
        inputDateAnkiFilter.value   = "" ;

	    startdateInput.value = "";
	    enddateInput.value = "";
	    monthDateInput.value= "";
	    weekDateInput.value=  "";

        ContainerStartDateValue = "";
        ContainerEndDateValue  =  "";
        ContainerMonthDateValue  =  "";
        ContainerWeekDateValue =  "";

	    pageNum = 1; 
	    filterPages ();
	    fy ();
		}, 100);


 // 防抖包装 - row4 - 03  - 时间块 搜索
 	const debouncedUpdateBlockFilter  = debounce ((value) => {    
	    Intervalday = value;
	    DateSearch  = "" ;
        AnkiFrequncey   = "" ;        
        inputChineseSearch.value = "" ;
        inputDateAnkiFilter.value   = "" ;

	    startdateInput.value = "";
	    enddateInput.value = "";
	    monthDateInput.value= "";
	    weekDateInput.value=  "";

        ContainerStartDateValue = "";
        ContainerEndDateValue  =  "";
        ContainerMonthDateValue  =  "";
        ContainerWeekDateValue =  "";

	    pageNum = 1; 
	    filterPages ();
	    fy ();
		}, 100);
 
 
 // 防抖包装 - row4 - 04  - Anki 复习
	  const debouncedUpdateAnkiFilter  = debounce ((value) => {    	    
	    AnkiFrequncey = value;

	    DateSearch  = "" ;
        Intervalday = "" ;
        inputChineseSearch.value = "" ;
	    inputDateBlockFilter.value  = "" ;

	    startdateInput.value = "";
	    enddateInput.value = "";
	    monthDateInput.value= "";
	    weekDateInput.value=  "";

        ContainerStartDateValue = "";
        ContainerEndDateValue  =  "";
        ContainerMonthDateValue  =  "";
        ContainerWeekDateValue =  "";
	    pageNum = 1; 
	    filterPages ();
	    fy ();
		}, 100);



 // 防抖包装 - row5 - 01  - 日期起点
	const debouncedUpdateStart  = debounce ((value) => {    
	    ContainerStartDateValue  = value;   
	    
        ContainerMonthDateValue  =  "";
        ContainerWeekDateValue =  "";   

	    monthDateInput.value = "";
	    weekDateInput.value=  "";

	    DateSearch  = "" ;             // row4的值全部清空，包含全局变量
        Intervalday =  "" ;
	    AnkiFrequncey = "" ;
        inputChineseSearch.value = "" ;
	    inputDateBlockFilter.value  = "" ;
        inputDateAnkiFilter.value   = "" ;

	    pageNum = 1; 
	    filterPages ();
	    fy ();
		}, 100);


 // 防抖包装 - row5 - 02  - 日期终点
 	const debouncedUpdateEnd = debounce ((value) => {    
	     ContainerEndDateValue = value;

         ContainerMonthDateValue  =  "";
         ContainerWeekDateValue =  "";

	     monthDateInput.value= "";
	     weekDateInput.value=  "";


	     DateSearch  = "" ;
         Intervalday =   "" ;
	     AnkiFrequncey = "" ;
         inputChineseSearch.value = "" ;
	     inputDateBlockFilter.value  = "" ;


	     pageNum = 1; 
	     filterPages ();
	     fy ();
		}, 100);
 
 
 // 防抖包装 - row5 - 03  - 按月

    const debouncedUpdateMonth  = debounce ((value) => {    
	    ContainerMonthDateValue = value;

	    startdateInput.value = "";
	    enddateInput.value = "";	   
	    weekDateInput.value=  "";

        ContainerStartDateValue = "";
        ContainerEndDateValue  =  "";                    
        ContainerWeekDateValue =  "";

	    DateSearch  = "" ;
        Intervalday =  "" ;
	    AnkiFrequncey = "" ;
        inputChineseSearch.value = "" ;
	    inputDateBlockFilter.value  = "" ;

	    pageNum = 1; 
	    filterPages ();
	    fy ();
		}, 100);


 // 防抖包装 - row5 - 04  - 按周
    const debouncedUpdateWeek  = debounce ((value) => {    
	     ContainerWeekDateValue= value;

	     startdateInput.value = "";
	     enddateInput.value = "";
	     monthDateInput.value= "";
	   

         ContainerStartDateValue = "";
         ContainerEndDateValue  =  "";
         ContainerMonthDateValue  =  "";
                    

	     DateSearch  = "" ;
         Intervalday = "" ;
	     AnkiFrequncey = "" ;
         inputChineseSearch.value = "" ;
	     inputDateBlockFilter.value  = "" ;



	     pageNum = 1; 
	     filterPages ();
	     fy ();
		}, 100);


 // 防抖包装 - row5 - 05  - 清空所有 日期筛选条件
 	 const debouncedUpdateClearRow45All = debounce ((value) => {    
	   
	   DateSearch =  "";
	   Intervalday   = "" ;
	   AnkiFrequncey   = "" ;
	   inputChineseSearch.value = "" ;
	   inputDateBlockFilter.value  = "" ;
	   inputDateAnkiFilter.value   = "" ;

	   startdateInput.value = "";
	   enddateInput.value = "";
	   monthDateInput.value= "";
	   weekDateInput.value=  "";

	   ContainerStartDateValue = "";
	   ContainerEndDateValue  =  "";
	   ContainerMonthDateValue  =  "";
	   ContainerWeekDateValue =  "";

	    pageNum = 1; 
	    filterPages ();
	    fy ();
		}, 100);



fy ();
	