/**
 * Created by JavieChan on 2015/8/11.
 * Updated by JavieChan on 2015/11/11.
 * Updated by fxh on 2015/12/31.
 */

;$(function(){
    var flag = 1;

    var h = '<div class="dots"><ul>', t='';
    for(var i=0; i<$('section').length; i++){
        i==0 ? t='<li class="on">' : t='<li>';
        if($('.square').length>0){
            t+=$('section').eq(i).find('.kj_wrapper h3').text() + '<i>'+(i+1)+'</i></li>';
        }else{
            t += '<i>'+(i+1)+'</i></li>';
        }
        h += t;
    }

    h += '</ul></div>';

    //生成侧面定位栏
    if($('.square').length>0){
        $('.suspend .sus_wrapper:eq(0)').before(h);
    }else{
        $('.suspend').append(h);
    }

    //侧面定位栏
    $(document).on('click', '.up', function(){
        $('body,html').animate({scrollTop: 0}, 700, function(){
            $('.dots li:eq(0)').addClass('on').siblings().removeClass('on');
        });   //回到顶部
    });
    //侧面栏定位
    $(document).on('click', '.dots li', function(){
        var t = $(this);
        t.addClass('on').siblings().removeClass('on');
        var n = $(this).find('i').text();
        var h = $('section').eq(n-1).offset().top;

        flag=0;

        if(t.index()==0){
            $('body,html').animate({scrollTop: 0}, 700, function(){
                flag=1;
            });
        }else{
            $('body,html').animate({scrollTop: h}, 700, function(){
                flag=1;
            });
        }

    });
    //滚动事件
    $(window).scroll(function(){
        var windowHeight = $(window).height();    //屏幕高度
        var scrollTop = $(this).scrollTop();      //滚动高度
        var n = $('section').length;              //模块的数量

        //if(scrollTop > windowHeight){
        //    $('.dots span').fadeIn();
        //}else{
        //    $('.dots span').fadeOut();
        //}

        if(flag==1){
            for(var i=n; i>2; i--){
                var h0 = $('section').eq(1).offset().top;
                var h1 = $('section').eq(i-1).offset().top;
                var h2 = $('section').eq(i-2).offset().top;

                if(scrollTop<h0){
                    $('.dots li').eq(0).addClass('on').siblings().removeClass('on');
                    return false;
                }else{
                    if(scrollTop>=h1){
                        $('.dots li').eq(i-1).addClass('on').siblings().removeClass('on');
                        return false;
                    }else if(scrollTop<h1 && scrollTop>=h2){
                        $('.dots li').eq(i-2).addClass('on').siblings().removeClass('on');
                        return false;
                    }
                }
            }
        }
    });

    //区域居中
    var zcHeight;
    $('.zcText').each(function(idx){
        zcHeight = $(this).height();
        $(this).css({"top":"50%", "margin-top": -zcHeight/2});
    });

    //区域自适应
    changeModuleHigh();

    //窗口resize
    $(window).resize(function(){
        changeModuleHigh();
    });
});

function changeModuleHigh(){
    var windowHeight = $(window).height();
    if(windowHeight>922){
        $('section .fs_wrapper').height(922);
		$('.zckj00 .fs_wrapper').height(724);	//众创空间第一栏例外
    }else if(windowHeight < 700){
        $('section .fs_wrapper').height(700);
    }else{
        $('section .fs_wrapper').height(windowHeight);
    }
}