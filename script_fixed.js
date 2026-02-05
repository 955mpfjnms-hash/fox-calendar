
let calendarData = [];
let currentMonth = 1;

// 初始化加载
window.onload = async () => {
  const res = await fetch("./calendar_2026.json");  // 修复路径
  calendarData = await res.json();
  renderCalendar(currentMonth);
  document.getElementById("month-select").addEventListener("change", (e) => {
    currentMonth = parseInt(e.target.value);
    renderCalendar(currentMonth);
  });
};

// 渲染某个月的日历
function renderCalendar(month) {
  const calendarDiv = document.getElementById("calendar");
  calendarDiv.innerHTML = "";

  const daysInMonth = calendarData.filter(d => {
    const m = new Date(d.date).getMonth() + 1;
    return m === month;
  });

  for (let day of daysInMonth) {
    const div = document.createElement("div");
    div.className = "day";
    const dateObj = new Date(day.date);
    const dayNum = dateObj.getDate();
    div.innerHTML = `<strong>${dayNum}</strong><br><span style='font-size:0.8em;'>${day.weekday}</span>`;
    div.onclick = () => showPopup(day.date, day.message);
    calendarDiv.appendChild(div);
  }
}

function showPopup(date, message) {
  document.getElementById("popup-date").innerText = date;
  document.getElementById("popup-message").innerText = message;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}
