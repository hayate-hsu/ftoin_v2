/**
 * Created by JavieChan on 2015/5/29.
 */
;$(function(){
    //返回
    $('#backUrl').click(function(){
        window.location.href = '/news.html';
        //return history.back();
    });
	
	//header导航标记
	var tHref = window.location.href;
	$("header a").removeClass("on");
	if(tHref.indexOf("index.html")>0){$("header .a-index").addClass("on");}
	if(tHref.indexOf("news.html")>0){$("header .a-news").addClass("on");}
	if(tHref.indexOf("aboutus.html")>0){$("header .a-aboutus").addClass("on");}
	if(tHref.indexOf("jobs.html")>0){$("header .a-jobs").addClass("on");}
	if(tHref.indexOf("cloud.html")>0){$(".secnav .a-cloud").addClass("on");}
	if(tHref.indexOf("zncs.html")>0){$(".secnav .a-zncs").addClass("on");}
	if(tHref.indexOf("kjyj.html")>0){$(".secnav .a-kjyj").addClass("on");}
	if(tHref.indexOf("gzfw.html")>0){$(".secnav .a-gzfw").addClass("on");}
	if(tHref.indexOf("zckj.html")>0){$(".secnav .a-zckj").addClass("on");}
	if(tHref.indexOf("zmq.html")>0){$(".secnav .a-zmq").addClass("on");}

    //banner
    var int = setInterval("$.hotImg()", 6000);
    $('.bannerImg div:eq(0)').css("opacity", 1);
    var maxDot=32, minDot=18;
    $('.banner li').click(function(){
        var t = $(this).text();
        if($(this).hasClass('on')){
            return  false;
        }else{
            $(this).addClass('on').animate({"width": maxDot+"px"}, 100).siblings().removeClass('on').animate({"width": minDot+"px"}, 100);
            $('.bannerImg div').eq(t-1).animate({opacity: 1}, 800).siblings().animate({opacity: 0}, 800);
        }
    });

    $.extend({
        hotImg: function () {
            var i = $('.banner li.on').index(), max=32, min=16;

            if(i==1){
                $('.bannerImg div').eq(0).animate({opacity: 1}, 800).siblings().animate({opacity: 0}, 800);
                $('.banner li').eq(0).addClass('on').animate({"width": max+"px"}, 100);
                $('.banner li').eq(i).removeClass('on').animate({"width": min+"px"}, 100);
            }else{
                $('.bannerImg div').eq(i+1).animate({opacity: 1}, 800).siblings().animate({opacity: 0}, 800);
                $('.banner li').eq(i+1).addClass('on').animate({"width": max+"px"}, 100);
                $('.banner li').eq(i).removeClass('on').animate({"width": min+"px"}, 100);
            }
        }
    });

    //科技研究-科技项目
	var sliding = false; //轮播是否正在翻页
	function SlideText(pageNum){	//“在建项目”轮播翻页控制
		if(sliding){ return false; }
		sliding = true;
		//当前激活页、下一页、序号
		var $aSlide = $('.slide.cur');
		var $nSlide = $('.slide.cur').next(".slide");			
		var aIndex = $('.slide.cur').index();
		//点击页码时，传人的跳转页码
		if(pageNum){
			if((pageNum>2 && aIndex == pageNum-1) || (pageNum==1 && aIndex==4) || (pageNum==2 && aIndex==5)){	//点击的就是当前页
				clearInterval(kbint); kbint = setInterval(SlideText, 3000);
				setTimeout(function(){sliding = false;},100);	
				return false;
			}
			//根据页码重新设定下一页、序号参数
			var nPageNum = pageNum+3;
			if(pageNum == 4 || (aIndex == pageNum)){ nPageNum = pageNum - 1; }
			/*
			if(aIndex == 2 && pageNum == 1){ $nSlide = $(".slide:eq(4)"); }+3
			if(aIndex == 2 && pageNum == 2){ $nSlide = $(".slide:eq(1)"); }+3-4
			if(aIndex == 2 && pageNum == 4){ $nSlide = $(".slide:eq(3)"); }+3-4
			
			if(aIndex == 3 && pageNum == 1){ $nSlide = $(".slide:eq(4)"); }+3
			if(aIndex == 3 && pageNum == 2){ $nSlide = $(".slide:eq(5)"); }+3
			if(aIndex == 3 && pageNum == 3){ $nSlide = $(".slide:eq(2)"); }+3-4
			
			if(aIndex == 4 && pageNum == 2){ $nSlide = $(".slide:eq(5)"); }+3
			if(aIndex == 4 && pageNum == 3){ $nSlide = $(".slide:eq(6)"); }+3
			if(aIndex == 4 && pageNum == 4){ $nSlide = $(".slide:eq(3)"); }+3-4
			
			if(aIndex == 5 && pageNum == 1){ $nSlide = $(".slide:eq(4)"); }+3
			if(aIndex == 5 && pageNum == 3){ $nSlide = $(".slide:eq(6)"); }+3
			if(aIndex == 5 && pageNum == 4){ $nSlide = $(".slide:eq(3)"); }+3-4
			*/
			
			$nSlide = $(".slide:eq("+nPageNum+")");
			//if(pageNum<3){ aIndex = pageNum + 2; }
			//else{ aIndex = pageNum - 2; }			
			//$nSlide = $(".slide:eq("+(aIndex+1)+")");
		}
		var nIndex = $nSlide.index();
		//当前页动画
		$aSlide.find('h3').css({"left":"24px","width":"auto","text-align":"left","font-weight":"normal"});
		$aSlide.find('p').fadeOut(200);
		$aSlide.find('.activeBg').fadeOut(500);
		$aSlide.animate({"width":"330px","margin-right":"90px","margin-left":"0px"},500);
		//整体位移
		$(".slide:eq(0)").animate({"margin-left":(1-nIndex)*420+"px"},500);
		//下一页动画
		$nSlide.find('.activeBg').fadeIn();
		$nSlide.find('h3').css({"left":"0px","width":"100%","text-align":"center","font-weight":"bold"});
		$nSlide.animate({"width":"486px","margin-left":"-78px","margin-right":"12px"},500,function(){
			$nSlide.find('p').fadeIn(200,function(){
				//动画完成后调用
				//从p4回p1（先到p5，在切回p1）				
				if(nIndex==6 || nIndex==1){
					$(".slide:eq(0)").css("margin-left",(nIndex==6?1 : 4)*(-420)+"px");
					var nEq = (nIndex==6?2 : 5);
					$(".slide:eq(" + nEq + ")").css({"width":"486px","margin-left":"-78px","margin-right":"12px"}).addClass("cur");
					$(".slide:eq(" + nEq + ") .activeBg").show();
					$(".slide:eq(" + nEq + ") h3").css({"left":"0px","width":"100%","text-align":"center","font-weight":"bold"});
					$(".slide:eq(" + nEq + ") p").show();
					$nSlide.removeAttr("style");
					$nSlide.find('h3').css({"left":"24px","width":"auto","text-align":"left","font-weight":"normal"});
					$nSlide.find('p').hide(200);
					$nSlide.find('.activeBg').hide(500);
				}
				else{	//nIndex2-5
					$nSlide.addClass("cur");
				}
				$('.slide.active').removeClass("active");
				$('.slide.active h3').css({"left":"24px","width":"auto","text-align":"left","font-weight":"normal"});
				$('.slide.active p').hide();
				$('.slide.active .activeBg').hide();
				$aSlide.removeClass("cur active").removeAttr("style");
				setTimeout(function(){sliding = false;},100);	//至此，一次翻页完成
				if(pageNum){clearInterval(kbint); kbint = setInterval(SlideText, 3000); }	//如果是页码控制，继续自动轮播
			});
		});
		//页码动画
		var pgLiNext = nIndex;
		if(nIndex>3){ pgLiNext = nIndex - 4; }
		$('.kb_page li.on').animate({"opacity":"0.5","width":"20px"}).removeClass("on");
		$('.kb_page li').eq(pgLiNext).animate({"opacity":"1","width":"30px"}).addClass("on");
	}
	
    $('.kb_content .slide').clone().appendTo($('.kb_content'));	//轮播准备，复制前三页到最后:lt(3)
	$(".slide:eq(0)").css("margin-left",-4*420+"px");	//调到复制的123
	$('.kb_content .slide.active:first').removeClass("active cur");	//删掉复制出来的active
    var kbint = setInterval(SlideText, 3000);	//“在建项目”开始自动轮播
	$('.kb_content').mouseover(function(){	//“在建项目”鼠标移上，停止自动播
		clearInterval(kbint);
	}).mouseout(function(){
		clearInterval(kbint);
		kbint = setInterval(SlideText, 3000);
	});
    $('.kb_page li,.kb_content .slide').click(function(){	//“在建项目”点击页/码跳转
		clearInterval(kbint);
		if(sliding){ return false; }
        var $index= $(this).index();
		if($index>3){ $index = $index - 4;}		//点击页时可能出现index>3
		SlideText($index+1);	//传入页码参数
    });
	
    //科技研究-研究中心
    $('.kjyj01 li img').mouseenter(function(){
        $(this).parent().find('.zhez').fadeIn(300);
        $(this).parent().find('.zhez span').addClass('on');
    });
    $('.zhez').mouseleave(function(){
        $(this).fadeOut(300);
        $(this).parent().find('div.zhez span').removeClass('on');
    });
    $('.kb_modal').click(function(){
        var $index = $(this).find('i').text();
        $('.bz_article').eq($index).show().siblings('.bz_article').hide();
        $('#bzDialoagBox').modal(true);
    });

    //科技研究-前沿技术研究
    $('.kjyj02 li').hover(function(){
        $(this).find('div').animate({"opacity": 1}, 300);
    }, function(){
        $(this).find('div').animate({"opacity": 0}, 300);
    });

    //分享
    $('.share').click(function(){
        $('.shareWays').toggle(function(){
            if(!$(this).is(':hidden')){
                $('.share').addClass('on');
            }else{
                $('.share').removeClass('on');
            }
        });
    });

    //搜索
    $('.bdSearch').hover(function(){
        $(this).css('background', '#f7f7f7').animate({'width': 328+'px'}, 200);
        $('.bdSearch input').animate({'opacity': 1}, 200).focus();
    });
    $('body').click(function(){
        if($('.bdSearch input').val()==''){
            $('.bdSearch').animate({'width': 48+'px'}, 200, function(){
                $(this).css('background', '#fff');
            });
            $('.bdSearch input').animate({'opacity': 0}, 200);
        }
    });
    $('.bdSearch button').click(function(event){
        event.stopPropagation();
    });
    $('.bdSearch input').click(function(event){
        event.stopPropagation();
    });

    //主页-技术咨询
    //$('.fallbox li').hover(function(){
    //    $(this).find('a').fadeIn();
    //},function(){
    //    $(this).find('a').fadeOut();
    //});

    //智能城市
    $('.zncs00 li').hover(function(){
        $(this).find('span').fadeIn('fast');
    },function(){
        $(this).find('span').fadeOut('fast');
    });

    //友情链接
    $(".moselect").click(function(e){
        //var theEvent = window.event || arguments.callee.caller.arguments[0];
        var $i = $(this).parent().index();
        $('.flinkbox ul').fadeOut();
        $(this).next('ul').fadeToggle();

        e.stopPropagation();
    });
    $(document).on('mouseleave', '.flinkbox ul', function(){
        $('.flinkbox ul').fadeOut();
    });
    $('body').click(function(){
        $('.flinkbox ul').fadeOut();
    });

    //提交项目
    $(document).on("click", ".subhelp input, .subPro", function(){
        $(".zckj03").css("background", "#f5f5f5");
        $('.hidzcText').hide();
        $(".subProFrom").show();
    });
    $(document).on("click", ".spClosed", function(){
        $(".zckj03").css("background", 'url("images/zckj003.jpg") top center no-repeat');
        $(".subProFrom").hide();
        $(this).parent().siblings("div.zcText").show();
    });

    var uploadFlag = false;
    $(document).on("click", ".spSub", function(){
        var name=$('#name').val(), project=$('#project').val(), ctime=$('#ctime').val(), team=$('#team').val(), company=$('#company').val(), mobile=$('#mobile').val(), email=$('#email').val(), city=$('#city').val(), needs=$('#needs').val(), plan=$('#plan').val();
        var $this = $(this);

        var msgError = {
            projectOverlengthError: '【项目简介】长度超出字数要求，请精简填写！',
            teamOverlengthError: '【团队简介】长度超出字数要求，请精简填写！',
            needsOverlenghtError: '【您希望从Niot获得哪些帮助？】长度超出字数要求，请精简填写！',
            planError: '请等待文件上传完毕再提交！'
        };

        var obj = {
            name: name,
            project: project,
            ctime: ctime,
            team: team,
            company: company,
            mobile: mobile,
            email: email,
            city: city,
            needs: needs,
            plan: plan
        };

        if(project.length > 100){
            alert(msgError.projectOverlengthError); return false;
        }else if(team.length > 100){
            alert(msgError.teamOverlengthError); return false;
        }else if(needs.length > 100){
            alert(msgError.needsOverlenghtError); return false;
        }else if(uploadFlag){
            alert(msgError.planError); return false;
        }else{
            console.log(obj);

            $.ajax({
               url: 'http://www.cniotroot.cn/project',
               data: obj,
               type: "post",
               beforeSend: function(){
                   $this.val("正在提交...").attr('disabled', 'disabled');
               },
               dataType: "json",
               success: function(data){
                   console.log(data);
               },
               complete: function(){
                   $this.val("提交").removeAttr('disabled');
               }
           });

           $(".zckj03").css("background", 'url("images/zckj003.jpg") top center no-repeat');
           $(".subProFrom").hide();
           $("div.zcText").show();
           $('.invest').fadeIn();
        }
    });

    $(".spfilebtn").wrap("<form action='http://www.cniotroot.cn/file' method='post' enctype='multipart/form-data'></form>");
    $('.spfilebtn').change(function(){
        var $form = $('form');
        var options  = {
            beforeSubmit : function() {
                $('.loading').css("visibility", 'visible');
                uploadFlag = true;
            },
            success:function(data)
            {
                console.log(data);
                $('#plan').val(data.name);
                $('.loading').css("visibility", 'hidden');
                uploadFlag = false;
            }
        };

        $form.ajaxSubmit(options);
    });

    //众创空间-孵化
    $('.mos img').mouseenter(function(){
        $(this).parent().find('a').fadeIn();
        $(this).parent().find('a').addClass('on');
    });
    $('.mos li a').mouseleave(function(){
        $(this).fadeOut();
        $(this).removeClass('on');
    });

    //导航新闻
    $(".scNewsF").click(function(){
        if($(".scNews").is(":hidden")){
            $(this).addClass("scNewsC");
            $(".scNews").fadeIn();
        }else{
            $(this).removeClass("scNewsC");
            $(".scNews").fadeOut();
        }
    });

    //联系我们
    $('.us_tab:eq(0)').show();
    $('.us_nav li').click(function(){
        $(this).addClass('on').siblings().removeClass('on');
        var index = $(this).index();
        $('.us_tab').eq(index).show().siblings('.us_tab').hide();
    });

    //我要投资
    $('#wytz').click(function(){
        $('.invest').fadeIn();
    });
    $('.invest .closed').click(function(){
        $(this).parent().fadeOut();
    });

    //智慧城市
    $('.jsyy00 .huge').css("opacity", 1);
    $('.jsyy01 .small').css("opacity", 1);
    $('.jsyy02 .small').css("opacity", 1);
    $('.jsyy03 .small').css("opacity", 1);

    var lastBlock = $("#a1"), maxWidth = 514, minWidth = 170;

    $('.jsyy li').hover(function(){
        $(lastBlock).animate({width: minWidth+"px"}, { queue:false, duration:400});
        $(this).animate({width: maxWidth+"px"}, { queue:false, duration:400});
        $(lastBlock).find('div.small').animate({opacity: 1}, { queue:false, duration:400});
        $(lastBlock).find('div.huge').animate({opacity: 0}, { queue:false, duration:400});
        $(this).find('div.small').animate({opacity: 0}, { queue:false, duration:400});
        $(this).find('div.huge').animate({opacity: 1}, { queue:false, duration:400});
        var currentBlock = this;
        lastBlock = this;
    });

    //孵化项目
    $('.fs_arrow_blue_right').show();
    var checklen = function (d, f) {
        if(d == (f-1)){
            $('.fs_arrow_blue_right').hide();
        }else if(d == 0){
            $('.fs_arrow_blue_left').hide();
        }else{
            $('.fs_arrow_blue_right').show();
            $('.fs_arrow_blue_left').show();
        }
    };

    var fslen = $('div.hatch').length, dinx = 0, dwd = 1170;
    $(document).on('click', '.fs_arrow_blue_right', function(){
        dinx += 1;
        $('.ndxm').animate({'left': -dinx*dwd+'px'}, 500);
        checklen(dinx, fslen);
    });
    $(document).on('click', '.fs_arrow_blue_left', function(){
        dinx -= 1;
        $('.ndxm').animate({'left': -dinx*dwd+'px'}, 500);
        checklen(dinx, fslen);
    });

    //首页授权注册维修商
    var roll = $('.bz_reRoll'), roll00=$('.bzRoll_0'), roll01 = $('.bzRoll_1'), roll02 = $('.bzRoll_2'), rollLen = $('.bzRoll_1 li').length;
    $direction = 'left';

    if(rollLen > 4){
        roll02.html(roll01.html());roll00.html(roll01.html());
        roll.scrollLeft(roll01.outerWidth());
        var marqueeVar = setInterval('$.marqueeLeft($direction)', 50);
    }

    $.extend({
        marqueeLeft:function(direction){
            var roll = $('.bz_reRoll'), roll00=$('.bzRoll_0'), roll01 = $('.bzRoll_1'), roll02 = $('.bzRoll_2');

            var rollLeft = roll.scrollLeft(), outWidth = roll01.outerWidth();

            if(direction=='left'){
                if(rollLeft >= outWidth*2){
                    roll.scrollLeft(outWidth);
                }else{
                    roll.scrollLeft(rollLeft+1);
                }
            }else{
                if(rollLeft <= outWidth){
                    roll.scrollLeft(outWidth*2);
                }else{
                    roll.scrollLeft(rollLeft-1);
                }
            }
        }
    });

    $('.bz_arrowL').hover(function(){
        if(rollLen > 4){
            $direction = 'left';
            clearInterval(marqueeVar);
            marqueeVar = setInterval('$.marqueeLeft($direction)', 50);
        }
    });
    $('.bz_arrowR').hover(function(){
        if(rollLen > 4){
            $direction = 'right';
            clearInterval(marqueeVar);
            marqueeVar = setInterval('$.marqueeLeft($direction)', 50);
        }
    });

    $('.bz_reRoll li').hover(function(e){
        var idx = $(this).index();
        if(rollLen > 4){
            clearInterval(marqueeVar);
            $('.bzRoll_0 li').eq(idx).addClass('on').siblings().removeClass('on');
            $('.bzRoll_1 li').eq(idx).addClass('on').siblings().removeClass('on');
            $('.bzRoll_2 li').eq(idx).addClass('on').siblings().removeClass('on');
        }else{
            $(this).addClass('on').siblings().removeClass('on');
        }
        var windowWidth = $(window).width(), x = e.pageX, xx=0;   //windowWidth屏幕宽度
        if(windowWidth<=1280){
            xx = x-55-39-13;     //39左边到父层的距离， 13图片宽度的一半
        }else{
            xx = x-(windowWidth-1170)/2-39-13;
        }
        if(xx >= 532){
            xx = 532;
        }else if(xx <= 0){
            xx = 0;
        }
        $('.bz_info i').css('left', xx+'px');
        $('.bz_info').css('z-index', 1001).stop(true,false).animate({'opacity': 1}, { queue:false, duration:400});

        var link = $(this).find('a').attr("href");
        $('.bz_btn').attr("href", link);
        //$('.bz_info').show();
    },function(){
        $('.bz_info').animate({'opacity': 0}, { queue:false, duration:400});
        $('.bz_info').animate({'z-index': 999}, { queue:false, duration:400});
        //$('.bz_info').hide();
        if(rollLen > 4){
            marqueeVar = setInterval('$.marqueeLeft($direction)', 50);
        }
    });

/*    $('.bzad:eq(0)').addClass('on');
	$('.bzad').hover(function(){
        $('.bz_info').css('z-index', 1001).stop(true,false).animate({'opacity': 1}, { queue:false, duration:400});
        $(this).addClass('on').siblings().removeClass('on');
    },function(){
        $('.bz_info').animate({'opacity': 0}, { queue:false, duration:400});
        $('.bz_info').animate({'z-index': 999}, { queue:false, duration:400});
    });*/
    $('.bzad a:eq(0)').hover(function(){
        $('.bz_info').fadeIn();
    },function(){
        $('.bz_info').fadeOut();
    });

    //首页-标识查询
    $('.bz_sbox button').click(function(){
        var bz = $('.bz_sbox input').val();
        var bzHref = 'http://reg.cniotroot.cn?code='+Trim(bz);
        if(bz==''||bz==null){
            alert('请输入需要查询的标识');
        }else{
            window.open(bzHref);
        }
    });

    //滚动事件
    $(window).scroll(function(){
        var windowHeight = $(window).height();    //屏幕高度
        var scrollTop = $(this).scrollTop();      //滚动高度

        if(scrollTop > windowHeight){
            $('.sus_top').fadeIn();
        }else{
            $('.sus_top').fadeOut();
        }
    });
    $(document).on('click', '.uptotop', function(){
        $('body,html').animate({scrollTop: 0}, 700);
    });

    //侧面工具栏
    $('.showEwm').hover(
        function () {
            var $this = $(this);
            $this.stop().animate({'width':'191px'}, 300);
            $this.find('div').stop(true,true).fadeIn();
        },
        function () {
            var $this = $(this);
            $this.find('div').stop(true,true).hide();
            $this.stop().animate({'width':'48px'}, 200);
        }
    );
    $('.showPhone').hover(
        function () {
            var $this = $(this);
            $this.stop().animate({'width':'222px'}, 300);
            $this.find('div').stop(true,true).fadeIn();
        },
        function () {
            var $this = $(this);
            $this.find('div').stop(true,true).hide();
            $this.stop().animate({'width':'48px'}, 200);

        }
    );
    $('.uptotop').hover(
        function () {
            var $this = $(this);
            $this.stop().animate({'width':'160px'}, 300);
            $this.find('div').stop(true,true).fadeIn();
        },
        function () {
            var $this = $(this);
            $this.find('div').stop(true,true).hide();
            $this.stop().animate({'width':'48px'}, 200);

        }
    );

    //帮助中心
    $('.gz_help li:eq(0) div.gz_note').show();
    $('.gz_help li:eq(0)').addClass('on');
    $('.gz_help li').hover(function(){
        $('.gz_help li div.gz_note').stop(true, false).slideUp(500);
        $(this).find('div.gz_note').stop(true, false).slideDown(500);
        $(this).addClass('on').siblings().removeClass('on');
    });

    //自贸区-应用服务
    var lastzmq = 0, zmq5h=243, zmq6h=278;
    $('.zmq03').height(851);
    $('.appTxt div:eq(0)').show();
    $('.appserIco li a').hover(function(){
        var idx = $(this).parent().index();
        if(lastzmq != idx){
            //$('.appTxt div').eq(lastzmq).stop(true, true).hide();
            $('.appTxt div').eq(idx).addClass('on').siblings().removeClass('on');
            $(this).parent().addClass('on').siblings().removeClass('on');
            idx==2 ? $('.zmq03').animate({'height': 608+zmq6h}, 500) : $('.zmq03').animate({'height': 608+zmq5h}, 500);
            lastzmq = idx;
        }
    });

    //大事件-时间轴
    //var axh=axt=zw='', dan=170, kai=26, axw=340*2, len=10, flag=false;   //zw:实际总宽度, len:大事件个数
    //zw = -len*dan+kai;
    //for(var i=1; i<=len; i++){
    //    if(i%2==0){
    //        axt='<div class="axis">';
    //    }else{
    //        if(i==1){
    //            axt='<div class="axis axdown on">';
    //        }else{
    //            axt='<div class="axis axdown">';
    //        }
    //    }
    //    axt += '<img src="/images/bidong_s.jpg" /><div><p class="axtime">2013-12-24</p><p class="axcontent">中国（广东）自由贸易试验区 广州南沙新区片区信息中心正式落地 信息中心依托NIOT建设发展</p></div><i class="dot"></i></div>';
    //
    //    axh += axt;
    //}
    //$('.timeline').html(axh);
    //$('.timeline .axis').each(function(i){
    //    $(this).css('left', (i*dan+kai)+'px');
    //    if(i<4){
    //        $(this).delay((i+1)*100).animate({'opacity': 1}, 400);
    //    }
    //});
    //
    //var checkTimeline = function(w){
    //    $('#axis_right').removeClass('axis_right_dis').addClass('axis_right');
    //    $('#axis_left').removeClass('axis_left_dis').addClass('axis_left');
    //    if(w>=0){
    //        $('#axis_left').removeClass('axis_left').addClass('axis_left_dis');
    //    }
    //    if(w<=zw+axw){
    //        $('#axis_right').removeClass('axis_right').addClass('axis_right_dis');
    //    }
    //};
    //checkTimeline(0);
    //
    //$('#axis_right').click(function(){
    //    if(flag){
    //        return false;
    //    }else{
    //        flag = true;
    //
    //        var axleft = parseInt($('.timeline').css('left'));
    //        if($(this).hasClass('axis_right_dis')){
    //            return false;
    //        }else{
    //            var axorg = Math.abs(axleft) / axw;
    //            axleft = axleft - axw;
    //            var axflag = Math.abs(axleft) / axw;
    //            var f = g = 0;
    //            for(var i=0; i<4; i++){
    //                var axi = axflag * 4 + i;
    //                f += 1;
    //                $('.timeline .axis').eq(axi).delay((f+1)*100).animate({'opacity': 1}, 400);
    //            }
    //            for(var j=0; j<4; j++){
    //                var axj = axorg * 4 + j;
    //                g += 1;
    //                $('.timeline .axis').eq(axj).delay((g+1)*100).animate({'opacity': 0}, 400);
    //            }
    //            $('.timeline').stop(true, true).animate({'left': axleft+'px'}, 1000, function(){
    //                flag = false;
    //            });
    //        }
    //        checkTimeline(axleft);
    //    }
    //});
    //$('#axis_left').click(function(){
    //    if(flag){
    //        return false;
    //    }else {
    //        flag = true;
    //
    //        var axleft = parseInt($('.timeline').css('left'));
    //        if ($(this).hasClass('axis_left_dis')) {
    //            return false;
    //        } else {
    //            var axorg = Math.abs(axleft) / axw;
    //            axleft = axleft + axw;
    //            var axflag = Math.abs(axleft) / axw;
    //            var f = g = 0;
    //            for (var i = 3; i >= 0; i--) {
    //                var axi = axflag * 4 + i;
    //                f += 1;
    //                $('.timeline .axis').eq(axi).delay((f + 1) * 100).animate({'opacity': 1}, 400);
    //            }
    //            for (var j = 3; j >= 0; j--) {
    //                var axj = axorg * 4 + j;
    //                g += 1;
    //                $('.timeline .axis').eq(axj).delay((g + 1) * 100).animate({'opacity': 0}, 400);
    //            }
    //            $('.timeline').stop(true, true).animate({'left': axleft + 'px'}, 1000, function(){
    //                flag = false;
    //            });
    //        }
    //        checkTimeline(axleft);
    //    }
    //});
    //$(document).on('click', '.dot', function(){
    //    var $this = $(this);
    //    var idx = $(this).parent().index();
    //    $this.parent().addClass('on').siblings().removeClass('on');
    //});
});

function Trim(str){   //去掉所有空格
    str = str.replace(/\s/g,"");
    return str;
}

//历史查询和今日查询
function bzAll(){
    $.ajax({
        url: 'http://58.241.41.150:8888/collect',
        type: "get",
        dataType: "json",
        success: function(data){
            $('#bz_all').html(data.total);
            $('#bz_today').html(data.today);
        },
        error: function(data){
            console.log("error");
            console.log(data);
        }
    });
}

//键盘响应
function EnterPress(e, t){ //传入 event
    var e = e || window.event;
    if(e.keyCode == 13){
        var id = t.id;
        $('#'+id).next('button').click();
    }
}

function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2].replace(/\+/g, " ")); return null;
}

//文字超出显示省略号
function ellipsis(t, m){     //t是字符串  m截取数量
    if(t.length>m){
        t = t.substr(0, m)+'...';
    }else{
        t = t;
    }
    return t;
}

function ScrollText(){
    var d = $('.kb_page li.on').index();

    d==3 ? d=0 : d+=1;

    $('.kb_content li').eq(d).fadeIn().siblings().fadeOut();
    $('.kb_page li').eq(d).addClass('on').siblings().removeClass('on');
}

//注册标识
function shake(times){
    $('#bzS').addClass('shake');
    times-=1;
    setTimeout("unshake("+times+")", 150);
}
function unshake(times){
    $('#bzS').removeClass('shake');
    if(times<=0){
        $('#bzS').focus();
        return false;
    }
    setTimeout("shake("+times+")", 150);
}