/**
 * Created by JavieChan on 2015/8/11.
 * Updated by JavieChan on 2015/11/11.
 * Updated by fxh on 2015/12/31.
 * encapsulation by jinhaoch 2016/9/12.
 */

;(function($){
    //滚动跟踪侧面定位栏状态的参数
    var fn=function (options) {
        var self=this;
        var def={
            flag:true,
            listBox:'.suspend',
            headElm:'.kj_wrapper h3'
        };
        self.opt=$.extend(def,options);
    };
    fn.prototype.init=function (list) {
        if(list.length>0){
            var self=this;
            self.list=list;
            self.createList();
            self.clickPosition();
            self.onScroll();
        }else {
            return;
        }
    };
    fn.prototype.createList=function () {
        var self=this;
        var h = '<div class="dots"><ul>', t='';
        if(self.list.length>0){
            self.list.each(function (i,elm) {
                i==0 ? t+='<li class="on" data-id="'+i+'">' : t+='<li data-id="'+i+'">';
                t+='<p>'+$(elm).find(self.opt.headElm).text() + '</p></li>';
            });
            h += t;
            h += '</ul></div>';
            //生成侧面定位栏
            $(self.opt.listBox).append(h);
        }
        console.log($(self.opt.listBox));
    };
    fn.prototype.clickPosition=function () {
        var self=this;
        $(document).on('click', '.dots li', function(){
            var t = $(this);
            t.addClass('on').siblings().removeClass('on');
            var n = $(this).attr('data-id');
            var h = self.list.eq(n).offset().top;
            self.opt.flag=false;
            if(t.index()==0){
                $('body,html').animate({scrollTop: 0}, 700, function(){
                    self.opt.flag=true;
                });
            }else{
                $('body,html').animate({scrollTop: h}, 700, function(){
                    self.opt.flag=true;
                });
            }
        });
    };
    fn.prototype.onScroll=function () {
        var self=this;
        //滚动事件
        $(window).scroll(function(){
            if(self.opt.flag){
                var windowHeight = $(window).height();    //屏幕高度
                var scrollTop = $(this).scrollTop();      //滚动高度
                var n = self.list.length;              //模块的数量
                for(var i=n-1; i>0; i--){
                    var h0 = self.list.eq(i).offset().top;
                    if(scrollTop+windowHeight/2>=h0){
                        $('.dots li').eq(i).addClass('on').siblings().removeClass('on');
                        break;
                    }else {
                        $('.dots li').eq(0).addClass('on').siblings().removeClass('on');
                    }
                }
            }
        });
    };
    $.fn.scrollPath=function(options){
        var my=$(this);
        var myscrollPath=new fn(options);
        myscrollPath.init(my);
        return myscrollPath;
    };
})(jQuery);
