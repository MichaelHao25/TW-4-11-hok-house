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

	function addClass(elements, classname) {

		var oldClass = getAttr(elements, 'class').split(' ');
		var str = '';

		var newclass = classname.indexOf(' ') >= 0 ? classname.split(' ') : [classname];
		oldClass = oldClass.concat(newclass);
		for (var i = 0; i < oldClass.length; i++) {
			if (oldClass[i]) {
				i == 0 ? str += oldClass[i] : str += ' ' + oldClass[i];

			}
		}
		setAttr(elements, 'class', str);
	}

	function removeClass(elements, classname) {

		var oldClass = getAttr(elements, 'class').split(' ');
		var str = '';

		var newclass = classname.indexOf(' ') >= 0 ? classname.split(' ') : [classname];
		for (var i = 0; i < newclass.length; i++) {

			for (var j = 0; j < oldClass.length; j++) {
				if (newclass[i] == oldClass[j]) {
					oldClass[j] = '';
				}
			}
		}
		for (var i = 0; i < oldClass.length; i++) {
			if (oldClass[i]) {
				i == 0 ? str += oldClass[i] : str += ' ' + oldClass[i];
			}
		}

		setAttr(elements, 'class', str);
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
			return month == 0 ? monthday(year - 1, 11) : monthday(year, month - 1);
		} else {
			return 'error Date'
		}
	}
	//上个月的天数

	function nextMonthDay(year, month) {
		if (isDate(year, month)) {
			return month == 11 ? monthday(year + 1, 0) : monthday(year, month + 1);
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
		if (str == null || str == '') {
			return '';
		}
		var arry = str.split('-')
		for (var i = 0; i < arry.length; i++) {
			arry[i] = parseInt(arry[i]);
		}
		return arry;
	}
	//格式化日期

	function renderSelected() {
		var startDate = format(getAttr(querySelectorAll('.data-range .container')[0], 'start-date'));
		var endDate = format(getAttr(querySelectorAll('.data-range .container')[0], 'end-date'));
		var elementsList = querySelectorAll('.data-range .container .column .day .row span.select');
		if (startDate == '' || endDate == '') return;
		for (var i = 0; i < elementsList.length; i++) {
			var temp = format(getAttr(elementsList[i], 'date'));
			if (new Date(startDate[0], startDate[1], startDate[2]) < new Date(temp[0], temp[1], temp[2]) && new Date(temp[0], temp[1], temp[2]) < new Date(endDate[0], endDate[1], endDate[2])) {
				addClass(elementsList[i], 'selected');
			}
		}
	}
	//渲染选择区间

	function renderActive() {
		var elementsList = querySelectorAll('.data-range .container .column .day .row span.select');
		var startDate = format(getAttr(querySelectorAll('.data-range .container')[0], 'start-date'));
		var endDate = format(getAttr(querySelectorAll('.data-range .container')[0], 'end-date'));
		if (startDate == '' || endDate == '') return;
		for (var i = 0; i < elementsList.length; i++) {
			var temp = format(getAttr(elementsList[i], 'date'));
			if (temp[0] == startDate[0] && temp[1] == startDate[1] && temp[2] == startDate[2] || temp[0] == endDate[0] && temp[1] == endDate[1] && temp[2] == endDate[2]) {
				addClass(elementsList[i], 'active');
			}
		}

	}
	//渲染active


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

		// for (var j = 0; j > 35; j++) {
		// 核心代码等待优化。。。。
		// }

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
			if (count % 7 == 0 && 1 != i) {
				elements += '<div class="row">' + child + '</div>'
				child = ''
			}
			child += '<span date="' + yaer + '-' + month + '-' + i + '" class="zk">' + i + '</span>';
			count++;
		}
		for (; count % 7 != 0; count++) {
			child += '<span date="' + nextdate[0] + '-' + nextdate[1] + '-' + (i - totalDays) + '">' + (i - totalDays) + '</span>';
			i++;
		}
		elements += '<div class="row">' + child + '</div>';

		target.innerHTML = elements;
	}
	//渲染Days



	function renderDomElements(yaer, month) {
		renderYearMonth(yaer, month)
		for (var i = 0; i < querySelectorAll('.container .day').length; i++) {

			if (i >= 1) {
				var newdate = [yaer, month];
				// var newdate = nextDate(yaer, month)
				for (var j = 0; j < i; j++) {
					newdate = nextDate(newdate[0], newdate[1]);
				}
				renderDays(querySelectorAll('.container .day')[i], newdate[0], newdate[1]);
			} else {
				renderDays(querySelectorAll('.container .day')[i], yaer, month);
			}
		}
		addSelect();
	}
	//渲染骨架

	function renderContainer() {


		var dom = '<div class="data-range">' + '<div class="control-btn">' + '<a href="javascript:;" class="clear">清除</a>' + '<a href="javascript:;" class="enter">確認</a>' + '</div>' + '<div class="date">' + '<span>开始日期</span>  －  <span>结束日期</span> ' + '</div>' + '<div class="yaer">' + '<div class="left-control">' + '<div class="year-previous"></div>' + '<div class="month-previous"></div>' + '</div>' + '<div class="yaer-month">' + '<span></span>' + '</div>' + '<div class="yaer-month">' + '<span></span>' + '</div>' + '<div class="right-control">' + '<div class="month-next"></div>' + '<div class="year-next"></div>' + '</div>' + '</div>' + '<div class="container">' + '<div class="column">' + '<div class="week">' + '<span>日</span>' + '<span>一</span>' + '<span>二</span>' + '<span>三</span>' + '<span>四</span>' + '<span>五</span>' + '<span>六</span>' + '</div>' + '<div class="day">' + '</div>' + '</div>' + '<div class="column">' + '<div class="week">' + '<span>日</span>' + '<span>一</span>' + '<span>二</span>' + '<span>三</span>' + '<span>四</span>' + '<span>五</span>' + '<span>六</span>' + '</div>' + '<div class="day">' + '</div>' + '</div>' + '</div>' + '</div>';
		var temp = document.createElement('div')
		temp.innerHTML = dom;
		document.body.append(temp);
	}
	// render container


	function addSelect() {
		var i = 0;
		var domElements = querySelectorAll('.data-range .container .column .day .row span');
		var today = format(getAttr(querySelectorAll('.data-range')[0], 'today'));
		for (; i < domElements.length; i++) {
			var className = getAttr(domElements[i], 'class')
			if (!className) {
				continue;
			}
			if (className.indexOf('zk') >= 0) {
				var date = format(getAttr(domElements[i], 'date'));
				if (new Date(date[0], date[1], date[2]) > new Date(today[0], today[1], today[2])) {
					addClass(domElements[i], 'select');
				} else {
					if (date[0] == today[0] && date[1] == today[1] && date[2] == today[2]) {
						addClass(domElements[i], 'select today');
					}
				}
			}
		}
	}
	//添加可选日期

	function bindEvent() {
		//绑定事件
		addEventListener({
			elements: querySelectorAll('.month-previous')[0],
			event: 'click',
			function: function() {
				var date = format(getAttr(querySelectorAll('.data-range')[0], 'currentDate'))
				prevMonth(date[0], date[1]);
				renderSelected();
				renderActive();
			}

		})
		addEventListener({
			elements: querySelectorAll('.month-next')[0],
			event: 'click',
			function: function() {
				var date = format(getAttr(querySelectorAll('.data-range')[0], 'currentDate'))
				nextMonth(date[0], date[1]);
				renderSelected();
				renderActive();
			}
		})


		addEventListener({
			elements: querySelectorAll('.year-previous')[0],
			event: 'click',
			function: function() {
				var date = format(getAttr(querySelectorAll('.data-range')[0], 'currentDate'))
				prevYear(date[0], date[1]);
				renderSelected();
				renderActive();
			}
		})

		addEventListener({
			elements: querySelectorAll('.year-next')[0],
			event: 'click',
			function: function() {
				var date = format(getAttr(querySelectorAll('.data-range')[0], 'currentDate'))
				nextYear(date[0], date[1]);
				renderSelected();
				renderActive();
			}
		})
		addEventListener({

			elements: querySelectorAll('.data-range .container')[0],
			event: 'click',
			function: function(e) {
				if (e.target.className.indexOf('select') >= 0) {
					var value = getAttr(e.target, 'date')
					if (this.flag) {
						var startDate = format(getAttr(this, 'start-date'));
						var endDate = format(value);
						if (new Date(startDate[0], startDate[1], startDate[2]) <= new Date(endDate[0], endDate[1], endDate[2])) {
							this.flag = false;
							querySelectorAll('.data-range .date span')[1].innerHTML = value
							setAttr(this, 'end-date', value);
							addClass(e.target, 'active');



							renderSelected()

							removeClass(querySelectorAll('.data-range')[0], 'show');
							setTimeout(function() {
								removeClass(querySelectorAll('.data-range')[0], 'active');
							}, 400);


							return;
						}
					}



					var elementsList = querySelectorAll('.data-range .container .column .day .row span.select');
					for (var i = 0; i < elementsList.length; i++) {
						removeClass(elementsList[i], 'active selected');
					}



					this.flag = true;
					addClass(e.target, 'active');
					querySelectorAll('.data-range .date span')[0].innerHTML = value
					querySelectorAll('.data-range .date span')[1].innerHTML = '结束日期'
					setAttr(this, 'start-date', value);


				}
			}

		})

	}



	function init() {
		var nowdate = new Date();
		var initY = parseInt(nowdate.getFullYear());
		var initM = parseInt(nowdate.getMonth());
		//0是值一月份
		var initD = parseInt(nowdate.getDate());
		var initH = parseInt(nowdate.getHours());
		var initI = parseInt(nowdate.getMinutes());
		var initS = parseInt(nowdate.getSeconds());

		renderContainer();
		setAttr(querySelectorAll('.data-range')[0], 'currentDate', initY + '-' + initM + '-' + initD);
		setAttr(querySelectorAll('.data-range')[0], 'today', initY + '-' + initM + '-' + initD);
		// console.log('today ' + initY + ' year ' + initM + ' month ' + initD + ' day ' + initH + ' hours ' + initI + ' minuts ' + initS + ' second week ' + getweek(initY, initM, initD))
		// console.log('month start is 0,week strat 0;');
		// console.log('demo');
		// console.log('month:0 1 2 3 4 5 6 7 8 9 10 11');
		// console.log('week:0 1 2 3 4 5 6');
		// console.log(new Date());

		// getAttr(querySelectorAll('.data-range')[0], 'currentDate');


		renderDomElements(initY, initM)
		bindEvent();
	}
	init();

})();
