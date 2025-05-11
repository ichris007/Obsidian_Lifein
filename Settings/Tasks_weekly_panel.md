```dataviewjs
window.moment.updateLocale("en", {
    week: {
        dow: 1,
    },
});

// 获取当前日期
const today = window.moment();
let selectedDate = today.clone();
let currentWeekOffset = 0;

// 初始状态
let showTree = false;
let showWeekTasks = false;
let showInbox = false;

// 检查是否存在全局数据，如果不存在则初始化
if (!window.tasksQueryData) {
    window.tasksQueryData = {
        showTree: true,
        showWeekTasks: false,
        showInbox: false,
        currentWeekOffset: 0,
        selectedDate: today.format("YYYY-MM-DD")
    };
} else {
    // 恢复状态
    showTree = window.tasksQueryData.showTree;
    showWeekTasks = window.tasksQueryData.showWeekTasks;
    showInbox = window.tasksQueryData.showInbox;
    currentWeekOffset = window.tasksQueryData.currentWeekOffset;
    selectedDate = window.moment(window.tasksQueryData.selectedDate);
}

// 创建一个用于显示当前周次的标签
const weekControlsContainer = document.createElement("div");
weekControlsContainer.style.textAlign = "center";
weekControlsContainer.style.marginBottom = "10px";

// 创建 week input
const weekInput = document.createElement("input");
weekInput.type = "week";

// 为 week input 设置样式
Object.assign(weekInput.style, {
    fontSize: "medium",
    color: "var(--text-normal)",
    backgroundColor: "var(--background-primary)",
    border: "1px solid var(--background-modifier-border)",
    borderRadius: "4px",
    padding: "0.2rem",
    outline: "none"
});

// 设置初始值为当前周
function getFormattedWeekString(date) {
    const year = date.format("GGGG"); // 使用ISO年
    const week = date.format("WW");
    return `${year}-W${week}`;
}
weekInput.value = getFormattedWeekString(selectedDate);

// 设置 week input 的事件监听
weekInput.addEventListener("change", () => {
    const [year, week] = weekInput.value.split('-W').map(str => parseInt(str));
    const firstWeek = today.clone().year(year).startOf('year').week(1);
    const targetWeekStart = firstWeek.add(week - 1, 'weeks');
    currentWeekOffset = targetWeekStart.week() - today.week();
    updateWeekButtons();  // 新增
    dayButtonsContainer.children[0].click();
    saveState();
});

// 创建操作按钮
const leftButtonWeek = document.createElement("button");
const rightButtonWeek = document.createElement("button");
const toggleShowTreeButton = document.createElement("button");
const toggleShowWeekTasksButton = document.createElement("button");
const toggleInboxTasksButton = document.createElement("button");
const todayButton = document.createElement("button");

[leftButtonWeek, rightButtonWeek, todayButton, toggleInboxTasksButton, toggleShowTreeButton, toggleShowWeekTasksButton].forEach(button => {
    button.style.border = "none";
    button.style.margin = "0 5px";
    button.style.padding = "5px 10px";
    button.style.backgroundColor = "var(--interactive-accent)";
    button.style.fontSize = "medium";
    button.style.color = "var(--text-on-accent)";
    button.style.cursor = "pointer";
});
leftButtonWeek.textContent = "←";
rightButtonWeek.textContent = "→";
toggleShowTreeButton.textContent = "↳";
toggleShowWeekTasksButton.textContent = "周报";
todayButton.textContent = "今日";
toggleInboxTasksButton.textContent = "Inbox";

function updateWeekButtons() {
    daysOfWeek.forEach((day, index) => {
        const button = dayButtonsContainer.children[index];
        const date = today.clone().startOf("week").add(currentWeekOffset, "weeks").add(index, "days");
        button.textContent = `${day}(${date.format("DD")})`;
    });
}

// 在切换周次的地方调用更新函数
leftButtonWeek.addEventListener("click", () => {
    currentWeekOffset -= 1;
    updateWeekInput();
    updateWeekButtons();  // 新增
    dayButtonsContainer.children[0].click();
    saveState();
});

rightButtonWeek.addEventListener("click", () => {
    currentWeekOffset += 1;
    updateWeekInput();
    updateWeekButtons();  // 新增
    dayButtonsContainer.children[0].click();
    saveState();
});

todayButton.addEventListener("click", () => {
    currentWeekOffset = 0;
    updateWeekInput();
    updateWeekButtons();  // 新增
    const todayIndex = today.day() === 0 ? 6 : today.day() - 1;
    dayButtonsContainer.children[todayIndex].click();
    saveState();
});

// 初始化 可选按钮
function initButtonTheme(button, active) {
    if (active) {
        button.style.color = "var(--text-on-accent)";
        button.style.backgroundColor = "var(--interactive-accent)";
    } else {
        button.style.color = "var(--text-normal)";
        button.style.backgroundColor = "transparent";
    }
}

toggleShowTreeButton.addEventListener("click", () => {
    showTree = !showTree;
    initButtonTheme(toggleShowTreeButton, showTree);
    dayButtonsContainer.querySelector("button[style*='interactive-accent']").click();
    saveState();
});

toggleShowWeekTasksButton.addEventListener("click", () => {
    showWeekTasks = !showWeekTasks;
    initButtonTheme(toggleShowWeekTasksButton, showWeekTasks);
    dayButtonsContainer.querySelector("button[style*='interactive-accent']").click();
    saveState();
});

toggleInboxTasksButton.addEventListener("click", () => {
    showInbox = !showInbox;
    initButtonTheme(toggleInboxTasksButton, showInbox);
    dayButtonsContainer.querySelector("button[style*='interactive-accent']").click();
    saveState();
});

// 初始化按钮主题色
initButtonTheme(toggleShowTreeButton, showTree);
initButtonTheme(toggleShowWeekTasksButton, showWeekTasks);
initButtonTheme(toggleInboxTasksButton, showInbox);

// 更新周次选择框
function updateWeekInput() {
    const startDate = today.clone().startOf('week').add(currentWeekOffset, 'weeks');
    weekInput.value = getFormattedWeekString(startDate);
}

// 保存当前状态到全局属性
function saveState() {
    window.tasksQueryData = {
        showTree: showTree,
        showWeekTasks: showWeekTasks,
        showInbox: showInbox,
        currentWeekOffset: currentWeekOffset,
        selectedDate: selectedDate.format("YYYY-MM-DD")
    };
}

// 插入控件
weekControlsContainer.appendChild(toggleShowWeekTasksButton);
weekControlsContainer.appendChild(toggleInboxTasksButton);
weekControlsContainer.appendChild(leftButtonWeek);
weekControlsContainer.appendChild(weekInput);
weekControlsContainer.appendChild(rightButtonWeek);
weekControlsContainer.appendChild(toggleShowTreeButton);
weekControlsContainer.appendChild(todayButton);
// 添加到页面中
document.body.appendChild(weekControlsContainer);
dv.container.appendChild(weekControlsContainer);

// 创建星期按钮
const daysOfWeek = ["周一", "周二", "周三", "周四", "周五", "周六", "周天"];
const dayButtonsContainer = document.createElement("div");
dayButtonsContainer.style.display = "flex";
dayButtonsContainer.style.justifyContent = "center";
dayButtonsContainer.style.width = "100%";

// 存储当前选中的按钮
let selectedButton;
// 添加样式的默认值
const defaultButtonStyle = {
    border: "none",
    borderRadius: "0px",
    cursor: "pointer",
    fontSize: "medium",
    flex: "1 1 auto",
    color: "var(--text-normal)",
    backgroundColor: "transparent",
};


daysOfWeek.forEach((day, index) => {
    const button = document.createElement("button");
    Object.assign(button.style, defaultButtonStyle);
    // button.textContent = day;

    // 计算并显示日期
    const date = today.clone().startOf("week").add(currentWeekOffset, "weeks").add(index, "days");
    button.textContent = `${day}(${date.format("DD")})`;

    button.addEventListener("click", () => {
        // 设置选中的日期
        selectedDate = today.clone().startOf("week").add(currentWeekOffset, "weeks").add(index, "days");
        updateTasksView();

        // 更新先前选中按钮的样式
        if (selectedButton) {
            Object.assign(selectedButton.style, defaultButtonStyle);
        }

        // 更新选中按钮的样式
        button.style.backgroundColor = "var(--interactive-accent)";
        button.style.color = "var(--text-on-accent)";
        selectedButton = button;
        saveState();
    });

    dayButtonsContainer.appendChild(button);
});
// 插入星期按钮容器
dv.container.appendChild(dayButtonsContainer);

function updateTasksView() {
    dv.container.innerHTML = "";
    dv.container.appendChild(weekControlsContainer);
    dv.container.appendChild(dayButtonsContainer);

    const dateStr = selectedDate.format("YYYY-MM-DD");
    const weekStr = selectedDate.format("YYYY-[W]WW");
    const showTreeOption = showTree ? "show tree" : "";
    let queryDayOfWeek = `
    {(done on ${dateStr}) OR (happens on ${dateStr}) }\\
     OR {(happens before ${dateStr}) AND (not done) AND (happens on ${weekStr}) }\\
     OR {filter by function \\
        const filename = task.file.filenameWithoutExtension;\\
        const date1 = window.moment(filename).format('YYYY-MM-DD');\\
        return date1 === '${dateStr}';}
    ${showTreeOption}
    group by status.name reverse
    short mode
    is not recurring
    # limit groups 5
    `;
    const queryWeek = `
    group by function task.description.includes("http") ? "🌐阅读记录" : "📅任务记录"
    {(done on ${weekStr}) OR (happens on ${weekStr})}
    ${showTreeOption}
    is not recurring
    # group by status.name
    group by done reverse
    short mode
    limit 100
    `;
    const queryInbox = `
    not done
    group by function task.due.category.groupText
    ${showTreeOption}
    # 不包含的路径
    path does not include "Templates"
    # 不包含看板文件的任务
    filter by function !task.file.hasProperty('kanban-plugin')

    short mode
    hide tags
    limit groups 10
    `;
    queryDayOfWeek = !showInbox ? queryDayOfWeek : queryInbox;
    const query = !showWeekTasks ? queryDayOfWeek : queryWeek;

    dv.paragraph("```tasks\n" + query + "\n```");
}

// 初始化：选择今天
todayButton.click();

// 监听今日按钮的双击事件
todayButton.addEventListener("dblclick", () => {
    app.commands.executeCommandById("daily-notes");
});
``

```