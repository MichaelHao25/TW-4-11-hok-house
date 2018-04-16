//////////////////
// by Michael// //
// 2018-4-14-16点34分//
//////////////////
(function() {
	function addEventListener(json) {
		json.elements.addEventListener(json.event, json.function)
	}

	function removeEventListener(json) {
		json.elements.removeEventListener(json.event, json.funtionName)
	}

	function querySelectorAll(str) {
		return document.querySelectorAll(str);
	}

	function getAttr(elements, attr) {
		return elements.getAttribute(attr);
	}

	function setAttr(elements, attr, value) {
		elements.setAttribute(attr, value);
	}

	function isDate(yaer, month, day) {
		if (!day) {
			if (day == 0) {
				return false;
			}
			return isMonth(month);
		} else {
			return isMonth(month) && isDay(day)
		}
	}
	//判断日期是否为正常日期

	function isMonth(month) {
		if (month >= 0 && month <= 11) {
			return true;
		} else {
			return false;
		}
	}
	//判断月份是否为正常日期

	function isDay(day) {
		if (day >= 1 && day <= 31) {
			return true;
		} else {
			return false;
		}
	}
	//判断天数是否为正常日期


	function getweek(year, month, day) {
		if (isDate(year, month, day)) {
			return day ? new Date(year, month, day).getDay() : new Date(year, month, 1).getDay();
			// 0代表周日 1 -- 6
		} else {
			return 'error Date'
		}
	}
	//获取今天是周几


	function monthday(year, month) {
		if (isDate(year, month)) {
			if (isleap(year) && month === 1) {
				return 29;
			} else {
				if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
					return 31;
				} else {
					if (month == 1) {
						return 28;
					} else {
						return 30;
					}
				}
			}
		} else {
			return 'error Date'
		}
	}
	//获取这个月有多少天


	function previousMonthDay(year, month) {
		if (isDate(year, month)) {
			return month == 0 ? monthday(initY - 1, 11) : monthday(initY, month - 1);
		} else {
			return 'error Date'
		}
	}
	//上个月的天数

	function nextMonthDay(year, month) {
		if (isDate(year, month)) {
			return month == 11 ? monthday(initY + 1, 0) : monthday(initY, month + 1);
		} else {
			return 'error Date';
		}
	}
	//下个月的天数

	function previousDate(year, month) {
		if (isDate(year, month)) {
			return month == 0 ? [year - 1, 11] : [year, month - 1];
		} else {
			return 'error Date';
		}
	}
	//上个月是几月份

	function nextDate(year, month) {
		if (isDate(year, month)) {
			return month == 11 ? [year + 1, 0] : [year, month + 1];
		} else {
			return 'error Date';
		}
	}
	//下个月是几月份

	function isleap(year) {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}
	//是否闰年

	function prevMonth(yaer, month) {
		var newdate = previousDate(yaer, month);
		setAttr(querySelectorAll('.data-range')[0], 'currentDate', newdate[0] + '-' + newdate[1]);
		renderDomElements(newdate[0], newdate[1])
	}
	//绑定事件上一个月


	function nextMonth(yaer, month) {
		var newdate = nextDate(yaer, month);
		setAttr(querySelectorAll('.data-range')[0], 'currentDate', newdate[0] + '-' + newdate[1]);
		renderDomElements(newdate[0], newdate[1])
	}
	//绑定事件下一个月

	function prevYear(yaer, month) {
		var newdate = [yaer - 1, month];
		setAttr(querySelectorAll('.data-range')[0], 'currentDate', newdate[0] + '-' + newdate[1]);
		renderDomElements(newdate[0], newdate[1])
	}

	function nextYear(yaer, month) {
		var newdate = [yaer + 1, month];
		setAttr(querySelectorAll('.data-range')[0], 'currentDate', newdate[0] + '-' + newdate[1]);
		renderDomElements(newdate[0], newdate[1])
	}

	function format(str) {
		var arry = str.split('-')
		for (var i = 0; i < arry.length; i++) {
			arry[i] = parseInt(arry[i]);
		}
		return arry;
	}
	//格式化日期

	function renderYearMonth(year, month) {

		var domElements0 = querySelectorAll('.data-range .yaer .yaer-month span')[0],
			domElements1 = querySelectorAll('.data-range .yaer .yaer-month span')[1];

		var str = year + '年' + (month + 1) + '月';
		domElements0.innerHTML = str
		var arry = nextDate(year, month);
		str = arry[0] + '年' + (arry[1] + 1) + '月';
		domElements1.innerHTML = str

		setAttr(domElements0, 'currentDate', year + '-' + month)
		setAttr(domElements1, 'currentDate', arry[0] + '-' + arry[1])
	}
	// 渲染标题年月份

	function renderDays(target, yaer, month) {
		var firstWeek = getweek(yaer, month),
			totalDays = monthday(yaer, month),
			prevMonthDays = previousMonthDay(yaer, month),
			prevdate = previousDate(yaer, month),
			nextdate = nextDate(yaer, month),
			count = 0,
			elements = '',
			child = '',
			i = 1;

		for (; i <= firstWeek; i++) {
			if (count % 7 == 0 && 1 != i) {
				elements += '<div class="row">' + child + '</div>'
				child = ''
			}
			child += '<span date="' + prevdate[0] + '-' + prevdate[1] + '-' + (prevMonthDays - firstWeek + i) + '">' + (prevMonthDays - firstWeek + i) + '</span>';
			count++;
		}
		for (i = 1; i <= totalDays; i++) {
			// if (count % 7 == 0 && firstWeek == 0 && 1 != i) {
			if (count % 7 == 0 && firstWeek == 0 && 1 != i) {
				elements += '<div class="row">' + child + '</div>'
				child = ''
			}
			child += '<span date="' + yaer + '-' + month + '-' + i + '">' + i + '</span>';
			count++;
		}
		for (; count % 7 != 0; count++) {
			child += '<span class="repeat" date="' + nextdate[0] + '-' + nextdate[1] + '-' + (i - totalDays) + '">' + (i - totalDays) + '</span>';
			i++;
		}
		elements += '<div class="row">' + child + '</div>';

		target.innerHTML = elements;
	}
	//渲染Days



	function renderDomElements(yaer, month) {
		renderYearMonth(yaer, month)
		for (var i = 0; i < querySelectorAll('.container .day').length; i++) {
			renderDays(querySelectorAll('.container .day')[i], yaer, month);
			if (i >= 1) {
				var newdate = [yaer, month];
				// var newdate = nextDate(yaer, month)
				for (var j = 0; j < i; j++) {
					newdate = nextDate(newdate[0], newdate[1]);
				}
				renderDays(querySelectorAll('.container .day')[i], newdate[0], newdate[1]);
			}
		}
	}
	//渲染骨架


	var nowdate = new Date();
	var initY = parseInt(nowdate.getFullYear());
	var initM = parseInt(nowdate.getMonth());
	//0是值一月份
	var initD = parseInt(nowdate.getDate());
	var initH = parseInt(nowdate.getHours());
	var initI = parseInt(nowdate.getMinutes());
	var initS = parseInt(nowdate.getSeconds());

	setAttr(querySelectorAll('.data-range')[0], 'currentDate', initY + '-' + initM + '-' + initD);
	// console.log('today ' + initY + ' year ' + initM + ' month ' + initD + ' day ' + initH + ' hours ' + initI + ' minuts ' + initS + ' second week ' + getweek(initY, initM, initD))
	// console.log('month start is 0,week strat 0;');
	// console.log('demo');
	// console.log('month:0 1 2 3 4 5 6 7 8 9 10 11');
	// console.log('week:0 1 2 3 4 5 6');
	// console.log(new Date());

	// getAttr(querySelectorAll('.data-range')[0], 'currentDate');


	renderDomElements(initY, initM)



	//绑定事件
	addEventListener({
		elements: querySelectorAll('.month-previous')[0],
		event: 'click',
		function: function() {
			var date = format(getAttr(querySelectorAll('.data-range')[0], 'currentDate'))
			prevMonth(date[0], date[1]);
		}

	})
	addEventListener({
		elements: querySelectorAll('.month-next')[0],
		event: 'click',
		function: function() {
			var date = format(getAttr(querySelectorAll('.data-range')[0], 'currentDate'))
			nextMonth(date[0], date[1]);
		}
	})


	addEventListener({
		elements: querySelectorAll('.year-previous')[0],
		event: 'click',
		function: function() {
			var date = format(getAttr(querySelectorAll('.data-range')[0], 'currentDate'))
			prevYear(date[0], date[1]);
		}
	})

	addEventListener({
		elements: querySelectorAll('.year-next')[0],
		event: 'click',
		function: function() {
			var date = format(getAttr(querySelectorAll('.data-range')[0], 'currentDate'))
			nextYear(date[0], date[1]);
		}
	})

})();
