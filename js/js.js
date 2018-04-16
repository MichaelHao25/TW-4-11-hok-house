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
});
$('.regional-selection .regional-header .close').on('click', function() {
	$('.layout-touch-no-move').hide();
	$('.regional-selection').fadeOut();
});
$('.regional-selection .regional-list li').on('click', function() {
	$('.regional-selection .regional-header .close').trigger('click')
	$('.regional-selection-trigger input').val($(this).children('span').text());
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
});
$('.id-selection .id-header .close').on('click', function() {
	$('.layout-touch-no-move').hide();
	$('.id-selection').fadeOut();
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
