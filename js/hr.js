/**
 * Created by admin on 2016/9/9.
 */
;
//录用公告
function getPublicity() {
    $.ajax({
        async:false,
        url:'/cms/message/?groups=12698,29859&gmtype=77',
        success:function (data) {
            console.log(data);
            if(data.Code==200 && data.messages.length>0){
                $('#publicity').jqoteapp('#public',data,'*');
                togglePublicity();
            }else {
                $('.jobs_others').hide();
            }
        },
        error:function () {
            $('.jobs_others').hide();
        }
    })
}
getPublicity();
//公告滚动
function togglePublicity(id) {
    var p_list=$(id+'>p');
    if(p_list.length<=1){
        return;
    }
    //on焦点的样式，out，失去焦点的样式，cont-roll准备样式
    setInterval(function () {
        var  out=$(id+' p.cont-roll:not(".on")');
        $(id+' p.on').removeClass('on').addClass('out');
        out.addClass('on');
        setTimeout(function () {
            $(id+' p.out').prop("outerHTML");
            $(id+'').append($(id+' p.out').removeClass("out cont-roll").prop("outerHTML"));
            $(id+'>p:eq(0)').remove();
            $(id+' p.on').next('p').addClass('cont-roll');
        },1100)
    },2000);
}
/*list切换效果，绑定on状态*/
function addClassOn(id) {
    $(id).each(function (i,elm) {
        $(elm).children(':not(".no")').on('click',function () {
            if($(this).hasClass('on')){
                return;
            }
            $(this).addClass('on').siblings().removeClass('on');
        })
    });
}
/*请求jobs数据*/
var jobdata=[];
var jobList=[];
function getPrhList() {
    $.ajax({
        url:'/cms/jobs.json?groups=12698,29859',
        success:function (data) {
            console.log(data);
            if(data.Code==200){
                jobdata=data;
                jobList=data.sociology;
                addClassOn('.prh_list_right,.prh_list_left');
                addClassOn('.jobs_classify');
                $('.prh_list_left:first-child li:first-child').click();
            }
        }
    })
}
getPrhList();
/*滚动条跟踪插件*/
$('section').scrollPath({});
//招聘类型切换
function openJobType(type) {
    //1是社招，0是校招
    if(type=='1'){
        jobList=jobdata.sociology;
        $('.prh_list_left:last-child').hide();
        $('.prh_list_left:first-child').show();
        $('.prh_list_left:first-child li:first-child').click();
    }else {
        jobList=jobdata.school;
        $('.prh_list_left:first-child').hide();
        $('.prh_list_left:last-child').show();
        $('.prh_list_left:last-child li:first-child').click();
    }
}
//岗位列表切换
function toggleJobList(name,e) {

    if(jobdata.length<1){
        return;
    }
    $(this).attr('data-type');
    var data={
        name:name,
        job_address:jobdata.job_address,
        list:jobList,
        jobtype:$(e).attr('data-jobtype')
    };
    $('.prh_ulbox_list').html('');
    if($('.prh_ulbox_list>ul li').length==0){
        $('.prh_ulbox_list>ul').html('<p>暂无开放职位！</p>');
    }
    $('.prh_ulbox_list').show().siblings().hide();
}

// 岗位信息切换
function jobTabShow(e) {
        var index=$(e).attr('data-index');
        var data= jobList[index];
        data.address_id=jobdata.job_address[data.address_id];
        $('.prh_ulbox_content').html('');
        $('.prh_ulbox_content').show().siblings().hide();
}
//  岗位-返回
function jobListShow(e) {
    $('.prh_ulbox_list').show().siblings().hide();
}
//校招-简介
function toggleJobIntro() {
    $('#intro').show().siblings().hide();
}
//校招-宣讲
function toggleJobPreach() {
    $('#preach').show().siblings().hide();
}

//实例化轮播图插件
$("#imgBox").luara({width:"1170",height:"500",interval:3500,selected:"on",deriction:"left"});
