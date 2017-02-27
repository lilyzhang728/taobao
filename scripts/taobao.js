$(function(){
	//全选按钮(底部)   代码有冗余待优化！
	$(".quanxuan").click(function(){
		if ($("#quanxuanButton2").prop("checked")) {
			$(":checkbox").prop("checked",true);
			$(".shangpin").css({
				'background-color':'#fff8e1'
			});
			$(".cart-sum button").css({
				'background-color':'#ff4400'
			});
			$(".jiesuan").css({
				'background-color':'#ff4400'
			});

			haveSelectedNum();

		} else{
			$(":checkbox").prop("checked",false);
			$(".shangpin").css({
				'background-color':'#fcfcfc'
			});
			$(".cart-sum button").css({
				'background-color':'#aaaaaa'
			});
			$(".jiesuan").css({
				'background-color':'#aaaaaa'
			});

			//取消全选，结算金额置零
			$(".number-heji").children(".number-heji2").text("0.00");
			$("#jiesuanTop").text("0.00");

			//更新已选商品件数
			$(".have-selected").children(".number-select").text("0");
		}
	})
	$(".th-chk").click(function(){
		if ($("#select-all").prop("checked")) {
			$(":checkbox").prop("checked",true);
			$(".shangpin").css({
				'background-color':'#fff8e1'
			});
			$(".cart-sum button").css({
				'background-color':'#ff4400'
			});
			$(".jiesuan").css({
				'background-color':'#ff4400'
			});

			haveSelectedNum();

		} else{
			$(":checkbox").prop("checked",false);
			$(".shangpin").css({
				'background-color':'#fcfcfc'
			});
			$(".cart-sum button").css({
				'background-color':'#aaaaaa'
			});
			$(".jiesuan").css({
				'background-color':'#aaaaaa'
			});

			//取消全选，结算金额置零
			$(".number-heji").children(".number-heji2").text("0.00");
			$("#jiesuanTop").text("0.00");
			//更新已选商品件数
			$(".have-selected").children(".number-select").text("0");
		}
	})

	//点击店铺复选框，商品复选框联动
	//取消某一单选，取消全选
	$(".dianpu").click(function(){
		if ($(this).children("input").prop("checked")) {
			$(this).next("div").children("ul").children("li:first").children("input").prop("checked",true);		//商品复选框联动
			$(this).next("div").css({
				'background-color':'#fff8e1'
			});
			$(".cart-sum button").css({
				'background-color':'#ff4400'
			});
			$(".jiesuan").css({
				'background-color':'#ff4400'
			});
			
			//看是否需要全选勾上
			var selectedNumber = $(".have-selected").children(".number-select").text();
			var selectedNumberUpdate = parseInt(selectedNumber);
			var zongshu = parseInt($(".shangpin").length);
			if (selectedNumberUpdate == zongshu) {
				$("#quanxuanButton2").prop("checked",true);
				$("#select-all").prop("checked",true);
			}
			

		} else{
			$(this).next("div").children("ul").children("li:first").children("input").prop("checked",false);
			$("#quanxuanButton2").prop("checked",false);
			$("#select-all").prop("checked",false);
			$(this).next("div").css({
				'background-color':'#fcfcfc'
			});

			//最后一个被取消，结算变灰
			var selectedNumber = $(".have-selected").children(".number-select").text();
			var selectedNumberUpdate = parseInt(selectedNumber);
			if (selectedNumberUpdate == 0) {
				$(".cart-sum button").css({
					'background-color':'#aaaaaa'
				});
				$(".jiesuan").css({
					'background-color':'#aaaaaa'
				});
			}
			
		}

	haveSelectedNum();

	})

	//点击商品复选框，店铺复选框联动
	$(".shopMsg-input").click(function(){
			//$(this).parent("li").parent("ul").parent("div").prev("div").click();
			$(this).parent("li").parent("ul").parent("div").prev("div").children("input").prop("checked",$(this).prop("checked"));
			$(this).parent("li").parent("ul").parent("div").prev("div").click();
	})


	//增减数量
	$(".amount-right").click(function(){
		var num = $(this).prev("input").val();
		num++;
		$(this).prev("input").val(num);

		//点击加号则已选商品件数增加
			var selectedNumber = $(".have-selected").children(".number-select").text();
			var selectedNumberUpdate = parseInt(selectedNumber);
			++selectedNumberUpdate;
			$(".have-selected").children(".number-select").text(selectedNumberUpdate.toString());

		haveSelectedNum();

		return false;

	})
	$(".amount-left").click(function(){
		var num = $(this).next("input").val();
		num>1 ?num--:num=1;
		
		$(this).next("input").val(num);

		//点击减号则已选商品件数减少
			var selectedNumber = $(".have-selected").children(".number-select").text();
			var selectedNumberUpdate = parseInt(selectedNumber);
			--selectedNumberUpdate;
			$(".have-selected").children(".number-select").text(selectedNumberUpdate.toString());

		haveSelectedNum();

		return false;
	})



	//卖家促销悬停显示
	$(".promotion").hover(function(){
		$(this).next("div").show();
	},function(){
		$(this).next("div").hide();
	})


	//删除功能
	$(".delete").click(function(){
		$(this).parent("li").parent("ul").parent("div").hide();
		$(".delete-recall").css({
			'display':'block'
		});
		$(this).parent("li").parent("ul").parent("div").parent("div").html($(".delete-recall"));
		
		return false;
	})

	$("#chexiao").click(function(){
		$(this).parent("div").show();
	})



	//更新已选商品数量及金额
	function haveSelectedNum(){
		//遍历所有选中商品以及每个商品数量，计算已选商品数量
		var checkboxChecked = $(".shopMsg-input:checked");
		var seLected = 0;
		var jiesuanUpdate = 0;
		for(var i=0;i<checkboxChecked.length;i++){
			var valSelected = $(checkboxChecked[i]).parent("li").parent("ul").children("li:eq(4)").children("div").children("div").children("input").val();
			seLected+=parseInt(valSelected);
			var moneySelected = $(checkboxChecked[i]).parent("li").parent("ul").children("li:eq(5)").children("div").children("span").text();
			jiesuanUpdate = jiesuanUpdate + valSelected * parseInt(moneySelected);
		}
		$(".have-selected").children(".number-select").text(seLected.toString());
		$(".number-heji").children(".number-heji2").text(jiesuanUpdate.toString() + ".00");
		$("#jiesuanTop").text(jiesuanUpdate.toString() + ".00");
	}

})


