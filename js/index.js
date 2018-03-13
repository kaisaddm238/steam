//禁止a链接刷新
var Alist = $("a");
Alist.attr({
	href: "javascript:void(0)"
});





//轮播图函数封装
//传入产参数
//1.left,right当前点击的左右按钮名字类名
//2.box要进行操作的盒子
//3.show添加哪一个类名就能让他显示
//4.穿入小圆点的父级判断更新哪个个小圆点
function bannerMove(left,right,box,show,cirFa){
	//找到左右按钮
	var Left = $(left);//左边点击按钮
	var Right = $(right);//右边点击按钮
	moveBox = $(box);//所有的图片盒子集合


	//去掉传入类名参数前面的点
	var newleft = left.slice(1);
	var newright = right.slice(1);
	var newshow = show.slice(1);
	//判断图片位置
	//给父级元素设置非法属性值
	for(var i = 0;i<moveBox.length;i++){
		moveBox.eq(i).attr({"index":i})
	}
	//绑定右单击事件
	Right.click(function(){
		//让m的值等于非法属性防止变量冲突，因为每个轮播图用的都是自己身上定义的非法属性所以不会起冲突
		m = Number($(show).attr("index"));
		//让许所有的盒子消失
		moveBox.eq(m).fadeOut()
		//先清空所有让大盒子显示的类名
		for(var i = 0;i<moveBox.length;i++){
			moveBox.eq(i).removeClass(newshow);
		}
		//判断当前是否在最后一张
		if(m<moveBox.length-1){
			m++;
		}else{
			m = 0;
		}
		//判断更新哪个小圆点
		updateCricle(cirFa)
		//给第n张添加能让它显示的类名
		moveBox.eq(m).fadeIn()
		moveBox.eq(m).addClass(newshow);
	})
	//绑定左单击事件
	Left.click(function(){
		m = Number($(show).attr("index"));
		//让当前的盒子隐藏
		moveBox.eq(m).fadeOut();
		//清空所有让显示的类名
		for(var i = 0;i<moveBox.length;i++){
			moveBox.eq(i).removeClass(newshow);
		}
		//判断当前图片是不是在第一张
		if(m!==0){
			m--;  //不在第一张让他每次点击自减1
		}else{
			m = moveBox.length-1; //在第一张让他去最后一张
		}
		updateCricle(cirFa)
		//让当前去的图片盒子显示
		moveBox.eq(m).fadeIn();
		//加上显示类名
		moveBox.eq(m).addClass(newshow)
	})
}
// bannerMove(".FirLeft",".FirRight",".bannerFa",".banFaShow",".FirstCircle");
bannerMove(".SecLeft",".SecRight",".location",".yhshow",".SecCircle");
bannerMove(".ThiLeft",".ThiRight",".guanzhu",".ThibanShow",".ThiCircle");
bannerMove(".FourLeft",".FourRight",".FourthBanner",".FourthShow",".FourCircle")

//智能判断
function judge(){
	

	var right_click = $(".FirRight");
	var left_click = $(".FirLeft");
	var box = $(".firstBanner");
	var box1 = $(".FirstCircle")
	//鼠标移上清除计时器
	function mouser(hezi){
		hezi.mouseenter(function(){
			clearInterval(Bannerauto);
		});
	}
	mouser(box);
	mouser(box1);
	//鼠标离开开启计时器
	function leave(hezi){
		hezi.mouseleave(function(){
			bannerauto()
		})
	}
	leave(box);
	leave(box1);
	//自动播放
	function bannerauto(){
		Bannerauto = setInterval(function(){
			var right = $(".FirRight");
			var moveBox = $(".bannerFa");
			//设置非法属性
			for(var i = 0;i<moveBox.length;i++){
				moveBox.eq(i).attr({"index":i})
			}
			//让m的值等于非法属性防止变量冲突，因为每个轮播图用的都是自己身上定义的非法属性所以不会起冲突
			m = Number($(".banFaShow").attr("index"));
			//让许所有的盒子消失
			moveBox.eq(m).fadeOut()
			//先清空所有让大盒子显示的类名
			for(var i = 0;i<moveBox.length;i++){
				moveBox.eq(i).removeClass("banFaShow");
			}
			//判断当前是否在最后一张
			if(m<moveBox.length-1){
				m++;
			}else{
				m = 0;
			}
			//判断更新哪个小圆点
			updateCricle(".FirstCircle")
			//给第n张添加能让它显示的类名
			moveBox.eq(m).fadeIn()
			moveBox.eq(m).addClass("banFaShow");
		},1500)
	}
	bannerauto()
}
judge()


//封装弹出层
//传入参数
//1.传入banner图类名(最大的盒子)
//2.传入内部弹出层的类名
//3.传入让当前张数显示的类名，用来确定所有的操作是在当前显示张数上
//4.获取this
function popups(father,popups,opin){
	var a = false;
	//找到最大盒子
	var Father = $(father);
	//找到弹出层
	var popu = $(father).find(popups);

	//将所有传入的类名去掉点
	var newFather = father.slice(1);
	var newPopups = popups.slice(1);
	var newOpin = opin.slice(1);

	Father.mouseenter(function(){
		popu.stop();
		//占到当前移上的大盒子this
		var _this = $(this);
		//判断他是否有让他显示的判断类名
		var panduan = _this.hasClass(newOpin);
		//如果存在则让他显示
		if(panduan == true){
			popu.fadeIn()
		}
	});
	//鼠标移除隐藏
	Father.mouseleave(function(){
		popu.stop();
		//占到当前移上的大盒子this
		var _this = $(this);
		//判断他是否有让他显示的判断类名
		var panduan = _this.hasClass(newOpin);
		//如果存在则让他显示
		if(panduan == true){
			popu.fadeOut()
		}
	});
	//移上弹出框弹出框隐藏
	popu.mouseenter(function(){
		$(this).fadeOut();
	})
}
// popups(".bannerFa",".popups",".banFaShow")


//弹出层图片自动播放函数封装
//传入参数
//1.传入banner图类名(最大的盒子)
//2.传入用来显示当前的类名，用来判断所有的操作是否应该执行
//3.传入包含图片的盒子类名
//4.让图片显示的类名
function autoplay(father,imgName,opin,imgshow){
	//找到传入参数的最大盒子
	var Father = $(father);
		//找到装切换图片的盒子
		var Img = $(imgName);
	
		//去掉类名上的点
		var newFather = father.slice(1);
		var newImg = Img.slice(1);
		var newOpin = opin.slice(1);
		var ImgShow = imgshow.slice(1);

		//var Opin = $(opin);如果写在外面那么每次改变图层移上的时候他的值不会变
	Father.mouseenter(function(){
		//每次移上都应该重新获取需要判断的是否是在当前显示的这张banner图里进行操作
		var Opin = $(opin);
		if($(this).hasClass(newOpin) == true){
			var n = 0;
			//找到弹出层里面图片集合
			var imglist = Opin.find(imgName).find("img")
			// console.log(imglist)
			//循环清除让图片显示的类名
			imgauto = setInterval(function(){
				for(var i = 0;i<imglist.length;i++){
					imglist[i].className = "";
				}
				//判断让其循环显示
				imglist.eq(n).fadeOut()
				if(n<imglist.length-1){
					n++;
				}else{
					n = 0;
				}
				// console.log(imglist[n])
				imglist.eq(n).fadeIn()
				imglist[n].className = ImgShow;
			},800)
		}
	});
	Father.mouseleave(function(){
		clearInterval(imgauto)
	})
}
// autoplay(".bannerFa",".Img",".banFaShow",".show")

//小圆点的函数
//自动生成小圆点个数
//传入参数
//1.大banner图的类名用来确定生成几个圆点；
//2.生成的小圆点的父元素类名用来确定小圆点放在那里；
function initCircle(father,location){
	//几个banner
	var Father = $(father);
	//小圆点位置
	var Loca = $(location);
	for(var i = 0;i<Father.length;i++){
		//插入小圆点
		Loca.append('<span></span>');
		//小圆点添加非法属性
		$(location).find("span").eq(i).attr({index:i})
	}
	// 让第一个校园点默认显示
	Loca.find("span").eq(0).addClass('yanse')
}
// initCircle(".bannerFa",".FirstCircle");
initCircle(".location",".SecCircle");
initCircle(".guanzhu",".ThiCircle");
initCircle(".FourthBanner",".FourCircle");

//更新小圆点
//传入参数
//1.小圆点所在位子的父元素类名
function updateCricle(spanfather){
	var spanFa = $(spanfather);
	var spanlist = spanFa.find("span");
	// 清空所有span显示类名show
	spanlist.removeClass('yanse');
	//放在点击事件里更新所以确定span的第几个是用变量n
	spanlist.eq(m).addClass('yanse');
}

//小圆点点击事件
//传入参数
//1.banner名，确定要操作的是哪几个banner
//2.小圆点位置
//3.让小圆点显示变色的类名
//4.让banner图显示的类名
function circleClick(father,fathershow,circle,circleshow){
	//找到banner图和圆点集合
	var banner = $(father);
	var circlelist = $(circle).find("span")

	//将传入的类名去掉点
	var newbanner = father.slice(1);
	var newbanShow = fathershow.slice(1);
	var newcircle = circle.slice(1);
	var newcirShow = circleshow.slice(1);
	

	//给圆点绑定但单击事件
	circlelist.click(function(){
		// 清空所有的让banner显示的类名,小圆点变色的类名
		banner.removeClass(newbanShow);
		banner.fadeOut()
		$(circlelist).removeClass(newcirShow);
		//获取非法属性值
		var _this = $(this).attr("index");
		m = _this
		//让当前的显示
		banner.eq(_this).fadeIn();
		banner.eq(_this).addClass(newbanShow)
		circlelist.eq(_this).addClass(newcirShow)
	})
}
// circleClick(".bannerFa",".banFaShow",".FirstCircle",".yanse");
circleClick(".location",".yhshow",".SecCircle",".yanse");
circleClick(".guanzhu",".ThibanShow",".ThiCircle",".yanse");
circleClick(".FourthBanner",".FourthShow",".FourCircle",".yanse");


//*************************未设置成函数方法***************************/
//商店社区下拉菜单
var merchant = $(".merchant_fa");
var merchantSon = $(".merchant");
var community = $(".community_fa")
var communitySon = $(".community")
//商店下拉
merchant.mouseenter(function(){
	merchantSon.fadeIn(200)
})
merchant.mouseleave(function(){
	merchantSon.fadeOut(200)
})
//社区下拉
community.mouseenter(function(){
	communitySon.fadeIn(200)
})
community.mouseleave(function(){
	communitySon.fadeOut(200)
})

//添加非法属性
function feifa(){
	for(var i = 0;i<showlitterImg.length;i++){
		showlitterImg[i].setAttribute("index",i)
	}
	for(var j = 0;j<big.length;j++){
		big[j].setAttribute("order",j)
	}
}

//移上小图片切换大图片
// bannerbg.mouseenter(function(){
// 	//移上显示相同图片
// 	//每次移上都重新获取图片
//  	litterImg = $(".banFaShow .banner1Img");
// 	bigImg = $(".banFaShow .bannerSon_left a img");

// 	//在执行移动到小图片上改变大图片
// 	litterImg.mouseenter(function(){
// 		var _thisFa = $(this).closest(".banFaShow").hasClass("banFaShow");
// 		if(_thisFa){
// 			feifa();
// 			$(bigImg).removeClass("bannerSon_show")
// 			var thisIndex = this.getAttribute("index");
// 			var thisOrder = bigImg[thisIndex];
// 			$(thisOrder).addClass("bannerSon_show");
// 		}
// 	})	
// })

//******tab选项卡******/
function gametab(){
	//找到所有的选项卡标题分类
	var alist = document.getElementsByClassName("fenlei");
	var gamelist = document.getElementsByClassName("gameList")
	//给所有分类添加非法属性
	for(var i = 0;i<alist.length;i++){
		$(alist).eq(i).attr({"index":i});
	}
	//给要炒作的盒子添加非法属性
	for(var j = 0;j<gamelist.length;j++){
		$(gamelist).eq(j).attr({"index":j});
	}
	//绑定单击事件
	$(alist).click(function(){
		//获取当前点击的非法属性
		var _this = $(this).attr("index");
		//清空所有操作盒子的类名
		$(gamelist).removeClass('show');
		$(alist).removeClass('remen');
		//让点击的对应盒子显示
		$(this).addClass('remen');
		$(gamelist).eq(_this).addClass('show');
	});

	// 当鼠标移上的时候进行判断
	$(gamelist).mouseenter(function(){
		//给含有类名show的盒子里的游戏项目添加非法属性
		if($(this).hasClass('show')){
			//找到当前盒子里面的game项目添加非法属性
			var leftgame = $(this).find('.game1');
			var rightimg = $(this).find(".gameRight")
			console.log(rightimg)
			for(var k = 0;k<leftgame.length;k++){
				leftgame.eq(k).attr({index:k});
				rightimg.eq(k).attr({index:k});
			}
			leftgame.mouseenter(function(){
				//输出当前移上的game的非法属性值
				var gamethis = $(this).attr("index")
				//清空所有的让右边图片显示的类并显示当前的	
				rightimg.removeClass('show');
				rightimg.eq(gamethis).addClass('show')
			})
		}
		//绑定鼠标移上换右边图片事件
		//每次鼠标移上先判断是否在显示的盒子类操作
	});
}
gametab()



//**********详情页轮播图*****/
//判断图片所在张数
var sideLoction = {}
sideLoction.m = 0;
sideLoction.n = 0;
//找到笑小图片的父元素
var litterImg_fa = $(".video_img")
//找到所有的要操作的小图片
var imgLitter = $(".video_img div");
//给所有的图片元素添加非法属性
for(var i = 0;i<imgLitter.length;i++){
	imgLitter.eq(i).attr({"order": i})
}
var gameInfo_left = $(".first_gdLeft");
var gameInfo_right = $(".first_gdRight")
gameInfo_right.click(function(){
	//清空类名
	imgLitter.removeClass("whiteSide")
	//获取当前可视区域的最右边位置
	if((sideLoction.m +1 )%5 == 0 && sideLoction.m != 0){
		var rightDistance = sideLoction.m + 1;
	}
	if(sideLoction.m<imgLitter.length){
		//判断如果当前所在sideLoction.m的位置是第张的位置那么此时的sideLoction.m的值为4的倍数
		//让下一个图片的边框出来
		sideLoction.m++;
		//清空白边类名
		imgLitter.eq(sideLoction.m).addClass("whiteSide");
		//如果当前移动到第五个
		if(sideLoction.m%5 == 0 && (imgLitter.length-1)-sideLoction.m>=5){
			litterImg_fa.animate({
				marginLeft: -(sideLoction.m*120) + "px"
			},function(){
				//当移动到污的倍数变换的时候，找到当前的margin值所占的百分比然后让滚动条更新
				var imgFaMargin = Math.abs(parseInt(litterImg_fa[0].style.marginLeft));
				var imgFa_baifen =  Math.round(imgFaMargin/(imgLitter.length*116)*100)/100;
				$(".firstgd").animate({
					marginLeft: imgFa_baifen*($(".firstgd").parent().width() - $(".firstgd").width()) + "px"
				});
			})
		}

		if((imgLitter.length-1)-rightDistance<5){
			if(sideLoction!==imgLitter.length-1){
				//判断还剩几张图片
				var shengyu = (imgLitter.length-1)-rightDistance;
				litterImg_fa.animate({
					marginLeft:-(sideLoction.m+shengyu-4)*120 + "px"
				})
				$(".firstgd").animate({
					marginLeft: 1*($(".firstgd").parent().width() - $(".firstgd").width()) + "px"
				});
			}
		}

		if(sideLoction.m==imgLitter.length){
			litterImg_fa.animate({
				marginLeft: 0,
			})
			sideLoction.m = 0;
			imgLitter.eq(sideLoction.m).addClass('whiteSide');
			$(".firstgd").animate({
				marginLeft: 0 + "px"
			});
		}
	}
})



//滚动条左点击事件
// gameInfo_left.click(function(){
// 	//清空类名
// 	imgLitter.removeClass("whiteSide");
// 	//判断当前图片所在的位置，如果小于则
// 	if(sideLoction.m<imgLitter.length){
// 		//判断如果当前所在sideLoction.m的位置是第张的位置那么此时的sideLoction.m的值为4的倍数
// 		//让下一个图片的边框出来

// 		if(sideLoction.m!==0){
// 			sideLoction.m--;
// 			// console.log(sideLoction.m)
// 			//清空白边类名
// 			imgLitter.removeClass("whiteSide");
// 			imgLitter.eq(sideLoction.m).addClass("whiteSide");
// 			//图片总张数的下标减去图片的位置的余数等与当前图片位置距离图片最后一张的距离
// 			newLoction = Math.abs((imgLitter.length-1)-(sideLoction.m));
// 			// 如果当前的图片位置是是第五张则一次移动五张
// 			// console.log(sideLoction.m)
// 			if(newLoction == imgLitter.length-5){
// 				litterImg_fa.animate({
// 					marginLeft: 0
// 				});
// 				gdtiao.animate({
// 					marginLeft: 0
// 				})
// 			}
// 			//如果总图片的下标减去当前图片的位置等于4则margin值等于当前的位置向前移动一个图片的位置，或则图片为特殊情况的位置减去当前位置等于4则向前移动一个，
// 			if((imgLitter.length-1)-(sideLoction.m)>=4){
// 				// if((imgLitter.length-1)-(sideLoction.m) == imgLitter.length-5){
// 				// 	litterImg_fa.animate({
// 				// 		marginLeft: 0
// 				// 	});
// 				// }
// 				if(sideLoction.m>=5){
// 					console.log(parseInt(litterImg_fa.css("marginLeft")))
// 					console.log(sideLoction.m*120)
// 					if(parseInt(litterImg_fa.css("marginLeft")) == -(sideLoction.m*120)){
// 						sideLoction.m = sideLoction.m-1;
// 					}
// 					else{

// 					}
// 				}
// 				litterImg_fa.animate({
// 					marginLeft: -(sideLoction.m*120) + "px"
// 				})
// 			}

// 		}
// 	}
// })

gameInfo_left.click(function(){
	sideLoction.m--;
	// 清空所有的白边类名
	imgLitter.removeClass('whiteSide')
	//判断当前图片所在的位置
	//如果不在第五张那么图片始终在白边移动到左侧边缘的时候再次点击向前移动一个
	// console.log(sideLoction.m)
	imgLitter.eq(sideLoction.m).addClass('whiteSide')
	// console.log(parseInt(litterImg_fa.css("marginLeft")))
	// console.log(-(sideLoction.m+1)*120)
	if( (parseInt(litterImg_fa.css("marginLeft")) == -(sideLoction.m+1)*120 ) && sideLoction.m!==4){
		litterImg_fa.animate({
			marginLeft: -((sideLoction.m)*120) + "px"
		});
		imgLitter.eq(sideLoction.m-1).addClass('whiteSide')
	}
	if(sideLoction.m == 4){
		litterImg_fa.animate({
			marginLeft: 0
		})
	}
	if(sideLoction.m == 0){
		litterImg_fa.animate({
			marginLeft: -(imgLitter.length-5)*120 + "px"
		})
		sideLoction.m == imgLitter.length-1;
		imgLitter.eq(sideLoction.m).addClass("whiteSide")
	}
})


//点图片
function gameinfoimgclick(){
	var imglist = $(".video_img div")
	// 绑定点击事件
	imglist.click(function(){
		//清空所有的白边类名,点击的添加类名
		imglist.removeClass("whiteSide");
		$(this).addClass("whiteSide");
		//更新图片位置
		sideLoction.m = $(this).attr("order")
	})
}
gameinfoimgclick()



//滚动条
function gundong(){
	var bodybd = $("body")[0]
	//找到滚动条
	gdtiao = $(".firstgd");
	gdtiao.css({
		marginLeft: 0
	})
	//找到滚动条宽度
	var gd_width = gdtiao.parent().width();
	//绑定鼠标点击事件
	gdtiao.mousedown(function(event){
		//起始位置的margin
		var startX = parseInt(gdtiao.css("marginLeft"));
		var clickX = event.clientX;
		// 绑定移上事件
		window.onmousemove = function(event){
			//移动的位置
			var moveX = event.clientX;
			//移动后的margin值
			var ml = moveX-(clickX - startX);
			//当刚进入页面时点击后的ml不是当前的margin值所以所以应该先移动在判断
			gdtiao.css({
				marginLeft: ml + "px"
			})
			if(ml<0){
				gdtiao.css({
					marginLeft: 0
				})
				ml = 0;
			}
			if(ml>gd_width-60){
				gdtiao.css({
					marginLeft: gd_width-60 + "px"
				})
				ml = gd_width-60;
			}


			//小条占整个滚动条的百分比
			var baifen = Math.round((ml/(gd_width-gdtiao.width()))*100)/100
			//让图片的Margin left更正
			litterImg_fa.css({
				marginLeft: -baifen*((imgLitter.length-4)*imgLitter.width()) + "px"
			});
			if(parseInt(litterImg_fa.css("marginLeft")) < -(imgLitter.length-5)*(120)){
				litterImg_fa.css({
					marginLeft: -(imgLitter.length-5)*120 + "px"
				})
			}
		}
		//禁止内容选中
		bodybd.onselectstart = function(){
			return false
		}

		//清空事件
		window.onmouseup = function(){
			window.onmousemove = null;
		}
		gdtiao.mouseleave(function(){
			bodybd.onselectstart = function(){
				return
			}
		})
	}); 
}
gundong()



// 了解更多事件
//找到了解更多
var more = $(".kfliaojie")
more.click(function(){
})


//七天免登陆
function loginCookie(){
	//找到登陆点击按钮
	var login = $(".logBtnL .logBtn")
	login.click(function(){
		//找到input款对应的value值
		var name_value = $("#username").val();
		var pass_value = $("#pass").val();
		var check = $("#time")[0].checked;
		//判断是否点击奇谈免登陆来决定是否建立cookie
		if(check==true && name_value!=="" && pass_value!==""){
			setCookie({username:name_value,password:pass_value},7)
		}
		//如果没有点击免登陆则清除cookie
		if(check==false){
			removeCookie(["username","password"])
		}
		//如果信息未填完则不建立cookie
		if(name_value=="" || pass_value==""){
			removeCookie(["username","password"])
			alert("请填写完相关信息")
		}
	});
	//当页面加载完成后执行代码段
	window.onload = function(){
		//寻找到指定名的cookie
		var usercookie = getcookie("username");
		var passcookie = getcookie("password");
		//判断是否存在，如果存在则将cookie值写入input的value中
		if(usercookie!=="" && passcookie!==""){
			$("#username").val(usercookie);
			$("#pass").val(passcookie);
		}
		//如果不存在则将input框的value值清空
		else{
			$("#username").val("");
			$("#pass").val("");
		}
	}
}
loginCookie()



