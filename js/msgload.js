/* Created by fxh on 2015/12/31 */
;$(function(){
    window.cmsUrl = 'https://cms.cniotroot.cn';//'http://cms.bidongwifi.com/';
    if(checkBrower()){cmsUrl = 'https://www.cniotroot.cn/cms';}
	
	var urlList = '/message',
		msgGroups = '12698';

	//加载新闻列表
	var page=0,		
		callbackNews = function(data){
			var h=t='', len = data.messages.length;
			for(var i=0; i<len; i++){
				if(i==0 && page==0){
					t='<div class="nwBanner"><a href="/newsdetail.html?id='+data.messages[i].id+'"><img src="'+cmsUrl+data.messages[i].image+'" alt="'+data.messages[i].title+'" /></a>'+
						'<span>'+data.messages[i].title+'</span></div>';
				}else{
					t='<div class="newsGroup"><a href="/newsdetail.html?id='+data.messages[i].id+'"><img src="'+cmsUrl+data.messages[i].image+'" alt="'+data.messages[i].title+'" width="260" height="156" /></a>'+
						'<div class="newsbox"><h3><a href="/newsdetail.html?id='+data.messages[i].id+'">'+data.messages[i].title+'</a></h3>'+
						'<p>'+ellipsis(data.messages[i].subtitle, 70)+'</p>' +
						'<span class="nwTime">'+data.messages[i].ctime+'</span></div></div>';
				}
				h+=t;
			}
			$('.newsTown').append(h);
			if(data.end==1){
				$('.newsPages button').unbind('click').html('暂无更多新闻');
			}
			else{$('.newsPages button').removeClass('load').html('加载更多').removeAttr('disabled');}
		},
		callbackNotice = function(data){
			var h=t='', len = data.messages.length;
			for(var i=0; i<len; i++){
				t='<li><a href="/newsdetail.html?id='+data.messages[i].id+'">'+data.messages[i].title+'</a><span>'+data.messages[i].ctime.substring(0,10)+'</span></li>';
				h+=t;
			}
            $('.noticeList').append(h);
			if(data.end==1){
				$('.newsPages button').attr('disabled', 'disabled').unbind('click').html('暂无更多内容');
			}
			else{$('.newsPages button').removeClass('load').html('加载更多').removeAttr('disabled');}
		};

	
	//新闻、通知、标识资讯查看更多，gmtype=1标识、2通知、3新闻
	function ajaxGetNews(callback, gmtype){
		page += 1;
		$.ajax({
			url: cmsUrl+urlList,
			data: {
				groups: msgGroups,
				mask: 2,
				per: 20,
				page: page,
				gmtype: gmtype
			},
			type: "get",
			beforeSend: function(){
				$('.newsPages button').addClass('load').html('正在加载...').attr('disabled', 'disabled');
			},
			dataType: "json",
			success: callback,
			error: function(){
				page-=1;
				$('.newsPages button').removeClass('load').html('加载失败，请重试').removeAttr('disabled');
			}
		});
	}
	
	//if($('.noticeList li').length<20)$('.newsPages').hide();
	$('.newsPages .more').click(function(){
		if($(this).hasClass("notices")){
			ajaxGetNews(callbackNotice,2);
		}
		else if($(this).hasClass("nameinfo")){
			ajaxGetNews(callbackNotice,1);
		}
		else{
			ajaxGetNews(callbackNews,3);
		}
	});
});


//浏览器版本
function checkBrower(){
    if(/ie/gi.test(navigator.userAgent)){
		return true;
    }else{
        return false;
    }
}