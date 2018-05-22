<div class='page_bg'>
	<div class='input_page_text'>
		每页<select id='pageSize' name='pageSize' class='page_select'><option value="10">10</option></select>条 /总共<font>$page.totalPageCount$</font>页，共<font>$page.totalCount$</font>条记录<input id='totalPageCount' name='totalPageCount' type='hidden' value='$page.totalPageCount$'/>
    </div>
    <div class='page_img_frist' onclick='pagingAction.fristClick();'></div> 
	<div class='page_img1' onclick='pagingAction.prevClick();'></div> 
	<div class='page_img2' onclick='pagingAction.nextClick();'></div> 
	<div class='page_img_last' onclick='pagingAction.lastClick();'></div>
	<span class='input_page_text'>转到<input id='currentPageNo' name='currentPageNo' type='text' onkeydown='pagingAction.formKeyDown();' class='input_page' value='$page.currentPageNo$'/>页</span>
	<div class='go' onclick='pagingAction.goClick();'></div>
	<input id='pageUrl' name='pageUrl' type='hidden' value='$page.pageUrl$'/>
</div>

<script type="text/javascript">
for (i=0;i<document.getElementById('$page.formName$').pageSize.length;i++)   {
	if (document.getElementById('$page.formName$').pageSize.options[i].text=='$page.pageSize$'){
		document.getElementById('$page.formName$').pageSize.options[i].selected=true;
	}
}
var pagingAction={
	FC:function(ids){
		return document.getElementById(ids);
	},
	fristClick:function(){
		var currentPageNo=this.FC("currentPageNo").value;
		if (currentPageNo=='1'){
			alert('已经是首页了!');
			return ;
		}else{
			this.FC("currentPageNo").value='1';
			this.pageView();
		}
	},
	lastClick:function(){
		var totalPageCount=this.FC("totalPageCount").value;
		var currentPageNo=this.FC("currentPageNo").value;
		if (currentPageNo==totalPageCount){
			alert('已经是末页了!');
			return ;
		}else{
			this.FC("currentPageNo").value=this.FC("totalPageCount").value;
			this.pageView();
		}
	},
	prevClick:function(){
		var currentPageNo=parseFloat(this.FC("currentPageNo").value);
		if (currentPageNo<=1){
			alert('已经是首页了!');
			return ;
		}
		else{			 
			this.FC("currentPageNo").value=parseFloat(currentPageNo)-1;
			this.pageView();
		}
	},
	nextClick:function(){
		var totalPageCount=this.FC("totalPageCount").value;
		var currentPageNo=this.FC("currentPageNo").value;
		if (currentPageNo==totalPageCount){
			alert('已经是末页了!');
			return ;
		} else{			 
			this.FC("currentPageNo").value=parseFloat(currentPageNo)+1;	
			this.pageView();
		} 
	},
	getFormObj:function (){
		var form=this.FC('$page.formName$');
		if (form=='' ||  form.action =='' ){
			form=document.forms[0];
		}
		return form;
	},
	goClick:function(){
		this.pageView(); 
	},
	formKeyDown:function()
	{
	    if (event.keyCode == 13)
	    {
	        event.returnValue=false;
	        event.cancel = true;
	        this.goClick();
	    }
	},
	pageView:function(){
		var totalPageCount=this.FC("totalPageCount").value;
		var currentPageNo=this.FC("currentPageNo").value;
		if(isNaN(currentPageNo)){
			alert('输入页数不正确!');
			return ;
		}
		var idx = currentPageNo.indexOf(".");
		if(idx!=-1){
			alert('输入页数不正确，不能含小数点!');
			return ;
		}
		if(parseFloat(currentPageNo)!=parseFloat(currentPageNo)){
			alert('输入页数不正确!');
			return ;
		}		
		if (parseFloat(currentPageNo)>parseFloat(totalPageCount)){
			alert('输入页数不正确!');
			return ;
		}
		if (parseFloat(currentPageNo)<1){
			alert('输入页数不正确!');
			return ;
		}
		var form=this.getFormObj();
		if(form == '' || form.action ==''){
			var pageUrl=this.FC("pageUrl").value; 
			var pageSize=this.FC("pageSize").value;
			var currentPageNo=this.FC("currentPageNo").value;
			window.location.href=pageUrl+'&pageSize='+pageSize+'&currentPageNo='+currentPageNo;
		}else{
			form.submit();
		}
	},
	doSubmit:function(){
		pagingAction.FC("currentPageNo").value="1";
		pagingAction.getFormObj().submit();
	}
}
if(document.all){
	pagingAction.getFormObj().attachEvent("onsubmit",pagingAction.doSubmit);
}else{
	pagingAction.getFormObj().addEventListener("submit",pagingAction.doSubmit,false); 
}
</script>
