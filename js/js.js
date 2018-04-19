// 来高雄的上一站
$('.textarea').on('input propertychange', 'textarea', function() {
	if ($(this).val() != '') {
		$(this).parent().addClass('active');
	} else {
		$(this).parent().removeClass('active');
	}
}).on('click', function() {
	$(this).children('textarea').focus();
});
// 来高雄的上一站


// 单选
$('.radio-wrap').on('click', function(e) {
	console.log(e);
	if (e.target.tagName.toLowerCase() == 'input') {
		$.each($('.radio-wrap .radio input'), function(index, val) {
			if ($(val).prop('checked')) {
				$(this).parents('.radio').addClass('active')
			} else {
				$(this).parents('.radio').removeClass('active')
			}
		});
	}
});
// 单选



// var initScrollBottom = 0;
// var flagBottom = true;
// $('.regional-selection .regional-list ul').on('touchstart', function(event) {
// 	// event.preventDefault();
// 	console.log(1);
// });
// $('.regional-selection .regional-list ul').on('touchmove', function(event) {
// 	// if () {}
// 	// event.preventDefault();
// 	// console.log($(this).scrollTop());
// 	var scrollTop = parseInt(this.scrollHeight - $(this).height());
// 	// console.log(scrollTop);
// 	// if ($(this).scrollTop() == 0) {
// 	// 	console.log(event.originalEvent.touches[0].pageY);
// 	// 	if (flag) {
// 	// 		flag = false
// 	// 		initScrollTop = event.originalEvent.touches[0].pageY;
// 	// 		event.preventDefault();
// 	// 	} else {
// 	// 		if (initScrollTop < event.originalEvent.touches[0].pageY) {
// 	// 			return true;
// 	// 		} else {
// 	// 			event.preventDefault();
// 	// 		}
// 	// 	}

// 	// }
// 	if ($(this).scrollTop() == scrollTop) {
// 		if (flagBottom) {
// 			flagBottom = false
// 			initScrollBottom = event.originalEvent.touches[0].pageY;
// 			event.preventDefault();
// 		} else {
// 			if (initScrollBottom < event.originalEvent.touches[0].pageY) {
// 				return true;
// 			} else {
// 				flagBottom = true
// 				event.preventDefault();
// 			}
// 		}
// 		console.log(initScrollBottom + '  ' + event.originalEvent.touches[0].pageY)

// 	}
// });


// 组织默认事件的通用类
$('.touchmove-preventDefault').on('touchmove', function(event) {
	event.preventDefault();
});


// 性别选择
$('.form .sex-select').on('click', 'span', function() {
	$(this).addClass('active').siblings().removeClass('active')
});
// 性别选择


// 国家选择

$('.regional-selection-trigger').on('click', function() {
	$('.layout-touch-no-move').show();
	$('.regional-selection').fadeIn();


	$('.regional-selection').css({
		top: $(this).offset().top + $(this).height() + 1,
	})


	fix_screen('hide')
});
$('.regional-selection .regional-header .close').on('click', function() {
	$('.layout-touch-no-move').hide();
	$('.regional-selection').fadeOut();

	fix_screen()
});
$('.regional-selection .regional-list li').on('click', function() {
	$('.regional-selection .regional-header .close').trigger('click')
	$('.regional-selection-trigger input').val($(this).children('span').text());
	if ($(this).children('span').text().indexOf('其他') >= 0 || $(this).children('span').text().indexOf('Other') >= 0) {
		$('.regional-selection-other').removeClass('hidden')
	} else {
		$('.regional-selection-other').addClass('hidden')
	}
});
$('.regional-selection .regional-other').on('click', '.submit', function() {
	var str = $('.regional-selection .regional-other .input').val()
	if (str == '') {
		alert('不能为空');
	} else {
		$('.regional-selection .regional-header .close').trigger('click')
		$('.regional-selection-trigger input').val(str);
	}
});

// 国家选择

// id选择
$('.id-selection-trigger').on('click', function() {
	$('.layout-touch-no-move').show();
	$('.id-selection').fadeIn();


	$('.id-selection').css({
		top: $(this).offset().top + $(this).height() + 1,
	})


	fix_screen('hide')

});
$('.id-selection .id-header .close').on('click', function() {
	$('.layout-touch-no-move').hide();
	$('.id-selection').fadeOut();

	fix_screen()

});
$('.id-selection .id-list li').on('click', function() {
	$('.id-selection .id-header .close').trigger('click')
	$('.id-selection-trigger input').val($(this).children('span').text());
});
$('.id-selection .id-other').on('click', '.submit', function() {
	// var str = $('.id-selection .id-other .input').val()
	// if (str == '') {
	// 	alert('不能为空');
	// } else {
	$('.id-selection .id-header .close').trigger('click')
	// $('.regional-selection-trigger input').val(str);
	// }
});

// id选择


// up load
$('.upload-input').on('click', function() {
	var input = $(this).children('input')[0]
	// console.log($(this).children('input')[0].click())
	input.click();
});
$('.upload-input input').on('change', function() {
	var url;
	$(this).parent().addClass('active');
	if (window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(this.files[0]);
	} else if (window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(this.files[0]);
	} else if (window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(this.files[0]);
	}
	$('.form .row .input-wrap').attr('data-name', this.files.item(0).name);
	$('.upload img').attr('src', url);
});

$('.upload-input-files').on('click', function() {
	var input = $(this).children('input')[0]
	// console.log($(this).children('input')[0].click())
	input.click();
});
$('.upload-input-files input').on('change', function() {
	var url;
	if (window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(this.files[0]);
	} else if (window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(this.files[0]);
	} else if (window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(this.files[0]);
	}
	$('.upload-url img').attr('src', url);
});


// 日历
$('.data-range-toogle').on('click', function() {
	$('.data-range').css({
		top: $(this).offset().top + $(this).height() + 1,
		left: $(this).offset().left
	})
	$('.data-range').addClass('active show');


});
$('.data-range').on('click', function() {
	var str = ''
	$.each($('.data-range .date span'), function(index, val) {
		index == 0 ? str += $(val).text() : str += ' - ' + $(val).text();
	});
	$('.data-range-toogle .input').val(str);
	$('.data-range-toogle .value').val(str);
});
$('body').on('click', '.data-range .control-btn a', function() {
	$('.data-range').removeClass('show');
	setTimeout(function() {
		$('.data-range').removeClass('active');
	}, 400);


});


$('.number-picker-toggle').on('click', function() {

	fix_screen('hide')

	$('.number-picker').css({
		top: $(this).offset().top + $(this).height() + 1,
		left: $(this).offset().left
	})
	$('.number-picker').fadeIn();
});
$('.people-number-control').on('click', '.add', function() {
	var number = parseInt($(this).siblings('input').val());
	$(this).siblings('input').val(++number);
});
$('.people-number-control').on('click', '.min', function() {

	var number = parseInt($(this).siblings('input').val());
	number == 0 ? number = 0 : --number;
	$(this).siblings('input').val(number);
});
$('.number-picker .control-btn .clear').on('click', function() {
	$('.number-picker-toggle .input').val('');
	$('.number-picker').fadeOut();

	fix_screen()

});
$('.number-picker .control-btn .enter').on('click', function() {
	var number = 0
	$.each($('.number-picker .wrap input'), function(index, val) {
		number += parseInt($(val).val());
	});
	$('.number-picker-toggle input').val(number + '人');
	$('.number-picker').fadeOut();

	fix_screen()

});


$(window).on('resize', function() {

	$('.number-picker-toggle').length > 0 &&
		$('.number-picker').css({
			top: $('.number-picker-toggle').offset().top + $('.number-picker-toggle').height() + 1,
			left: $('.number-picker-toggle').offset().left
		})

	$('.data-range-toogle').length > 0 &&
		$('.data-range').css({
			top: $('.data-range-toogle').offset().top + $('.data-range-toogle').height() + 1,
			left: $('.data-range-toogle').offset().left
		})


	$('.regional-selection-trigger').length > 0 &&
		$('.regional-selection').css({
			top: $('.regional-selection-trigger').offset().top + $('.regional-selection-trigger').height() + 1,
		})


	$('.id-selection-trigger').length > 0 &&
		$('.id-selection').css({
			top: $('.id-selection-trigger').offset().top + $('.id-selection-trigger').height() + 1,
		})

});

// 人数



function fix_screen(hide) {
	// var top = document.documentElement.scrollTop || document.body.scrollTop;
	// if (hide == 'hide') {
	// 	document.documentElement.style.overflow = 'hidden';
	// 	$('body').addClass('active').css('top', '-' + top + 'px');
	// } else {
	// 	$('body').removeClass('active');
	// 	document.documentElement.style.overflow = 'auto';
	// 	document.documentElement.scrollTop = -parseInt($('body').css('top'));
	// 	document.body.scrollTop = -parseInt($('body').css('top'));
	// }
	return
}



// brand
$('.brand-list .item').on('click', function() {
	$(this).addClass('active').siblings().removeClass('active');
});



//user-7
$('.form .cloumn-two .edit').on('click', function() {
	$(this).removeClass('active');
	$('.form .cloumn-two .done').addClass('active');
	$('.form .cloumn-two').removeClass('active')
});
$('.form .cloumn-two .done').on('click', function() {
	$('.form .cloumn-two').addClass('active')
	$(this).removeClass('active');
	$('.form .cloumn-two .edit').addClass('active');
});
