
	//返回节点方法
	//传入"#id"名,或则".类名"，或则"标签名"
	function FindElem(selector){
		var first = selector.slice(1);
		if(selector[0] == "#"){
			var obj1 = document.getElementById(first);
			if(obj1 == null){
				return "页面中未找到" + first + "相关id名";
			}else{
				return obj1;
			}
		}
		if(selector[0] == "."){
			var obj2 = document.getElementsByClassName(first);
			if(obj2.length == 0){
				return "页面中未找到" + first + "相关类名";
			}else{
				return obj2;
			}
		}
		if(selector[0] !== "#" && selector[0] !== "."){
			var obj3 = document.getElementsByTagName(selector);
			if(obj3.length == 0){
				return "页面中未找到" + selector + "相关标签";
			}else{
				return obj3;
			}
		}
	}



	//nodelist事件绑定方法
	//参数selector传入"标签名"或则".类名",Event传入绑定事件名，fn事件函数
	function BindEvent(selector,Event,fn){
		//设置传事件对象参数默认值
		if(arguments.length==2){
			fn = arguments[1];
			Event = "onclick";
		}
		//判断写入参数顺序
		// for(var k = 0;k<arguments.length;k++){
		// 	//判断时否时函数
		// 	if(typeof arguments[k] == "function"){
		// 		var a = arguments[k];
		// 		// arguments[arguments.length-1] = a;
		// 		// arguments[k] = arguments[arguments.length-1];
		// 	}
		// 	if(typeof arguments[k] == "string"){
		// 		var b = arguments[k];
		// 		// arguments[1] = b;
		// 		// arguments[k] = arguments[1];
		// 	}
		// 	if(arguments[k] == "object"){
		// 		var c = arguments[k];
		// 		// arguments[k] = arguments[0];
		// 		// arguments[0] = c;
		// 	}

		// }
		
		
		for(var i = 0;i<selector.length;i++){
			selector[i][Event] = fn;
		}
	}

	// 查询cookie
	function getcookie(start){
		//获取要查询的字符的起始位置
		var str = document.cookie
		var start = str.indexOf(start)
		//从查询字符的起始位置开始找到第一个分号
		var endstr = str.indexOf(";",start);
		//判断要截取的数据之后是否还有分号，如果没有返回值为-1，说明当前截取的数据是最后个数据，那么截取的结束位置就是字符串的长度
		if(endstr == -1){
			endstr = str.length
		}
		//截取查询字符起始位置到分号位置的字符
		var nowstr = str.slice(start,endstr)
		//从等号开始分割截好的字符串
		var result = nowstr.split("=")[1];
		return result
	}
		
	//设置cookie
	//obj传入传参数为对象
	//save,cookie保存的时间
	function setCookie(obj,save){
		//获取时间
		var date = new Date();
		//设置cookie保存时间
		date.setDate(date.getDate() + save);
		//循环对象，每次循环就会新建一个cookie
		for(var i in obj){ 
			//i代表传入对象中的属性名，obj[i]是属性值
			document.cookie = i + "=" + obj[i] + ";expires=" + date
		}
	}

	//删除cookie
	//传入一个数组，
	function removeCookie(cookieName){
		//获取时间
		var date = new Date();
		//设置时间小于当前的时间那么就会删除cookie
		date.setDate(date.getDate() -1);
		for(var i in cookieName){
			//找到传入参数名相对应的cookie，用新的时间来覆盖之前的cookie
			document.cookie = cookieName[i] + "=" + "" + ";expires=" + date;
		}
	}
