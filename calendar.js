var date_cells = [];
var day_names = ["пн", "вт", "ср", "чт", "пт", "сб", "нд"];
var months = ["Cічень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
var now_month, now_year, now_day, now_date;

function start() {
	createDatesCells();
	createDayCells();
	var today = new Date();
	now_date = today.getDate();
	now_month = today.getMonth();
	now_day = today.getDay();
	now_year = today.getFullYear();
	createFullDateCell();
	fillCalendar(now_month, now_year);
	var back_month = document.getElementById("back_month");
	var forward_month = document.getElementById("forward_month");
	var back_year = document.getElementById("back_year");
	var forward_year = document.getElementById("forward_year");
	back_month.onclick = previous_month;
	forward_month.onclick = next_month;
	back_year.onclick = previous_year;
	forward_year.onclick = next_year;
	var current = document.getElementById("current");
	current.onclick = returnToCurrentMonth;
}

function returnToCurrentMonth(){
	fillCalendar(now_month, now_year);
}

function previous_year() {
	var current_month = document.getElementById("month").innerHTML;
	var month_name = months.indexOf(current_month);
	var current_year = parseInt(document.getElementById("year").innerHTML);
	fillCalendar(month_name, current_year - 1);
}

function next_year() {
	var current_month = document.getElementById("month").innerHTML;
	var month_name = months.indexOf(current_month);
	var current_year = parseInt(document.getElementById("year").innerHTML);
	fillCalendar(month_name, current_year + 1);
}

function previous_month() {
	var current_month = document.getElementById("month").innerHTML;
	var month_name = months.indexOf(current_month);
	var current_year = parseInt(document.getElementById("year").innerHTML);
	if (month_name == 0) {
		fillCalendar(11, current_year - 1);
	} else {
		fillCalendar(month_name - 1, current_year);
	}
}

function next_month() {
	var current_month = document.getElementById("month").innerHTML;
	var month_name = months.indexOf(current_month);
	var current_year = parseInt(document.getElementById("year").innerHTML);
	if (month_name == 11) {
		fillCalendar(0, current_year + 1);
	} else {
		fillCalendar(month_name + 1, current_year);
	}
}

function clearDateCells() {
	for ( i = 0; i < date_cells.length; i++) {
		var cell = date_cells[i];
		cell.innerHTML = "";
		cell.setAttribute("class", "date");
	}
}

function countDayInMonth(month, year) {
	return new Date(year, month + 1, 0).getDate();
}

function firstDayInWeek(month, year) {
	return new Date(year, month, 1).getDay();
}

function fillCalendar(month, year) {
	clearDateCells();
	var month_cell = document.getElementById("month");
	var year_cell = document.getElementById("year");
	month_cell.innerHTML = months[month];
	year_cell.innerHTML = year;
	var firstWeekDay = firstDayInWeek(month, year) - 1;
	if (firstWeekDay == -1) {
		firstWeekDay = 6;
	}
	var numberOfDays = countDayInMonth(month, year);
	for ( i = 1; i <= numberOfDays; i++) {
		var cell = date_cells[firstWeekDay + i - 1];
		cell.innerHTML = i;
		if (isItDayToday(month, year, i)) {
			cell.setAttribute("class", "today_day");
		}
	}
}

function isItDayToday(month, year, day) {
	return (month == now_month) && (year == now_year) && (day == now_date);
}

function createFullDateCell() {
	document.getElementById("number").innerHTML = now_date;
	document.getElementById("todayMonth").innerHTML = months[now_month];
	document.getElementById("todayYear").innerHTML = now_year;
	var day = now_day - 1;
	if (day == -1) {
		day = 6;
	}
	document.getElementById("weekDay").innerHTML = day_names[day] + ", ";
}

function createDatesCells() {
	var wrapper = document.getElementById("calendar");
	for ( i = 1; i <= 7 * 6; i++) {
		var date = document.createElement("div");
		date.setAttribute("class", "date");
		wrapper.appendChild(date);
		date_cells.push(date);
	}
}

function createDayCells() {
	var day = document.getElementById("day");
	for ( i = 0; i < day_names.length; i++) {
		var week_day = document.createElement("div");
		week_day.setAttribute("class", "week_day");
		day.appendChild(week_day);
		week_day.innerHTML = day_names[i];
	}
}

window.onload = start;
