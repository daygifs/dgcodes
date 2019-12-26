setTimeout('showInit()', 15000);


function fixPosisionValue(val){
	var pval=val.toString();
	if (pval.substring(pval.length-2,pval.length)=="px") pval=pval.substring(0,pval.length-2);
	return parseInt(pval);
}

function handleWindowResize(){
				var ki=0;
		var aX=0;
		var aY=0;
		while (ki<document.getElementById("build_area_div").childNodes.length){
			var tI=document.getElementById("build_area_div").childNodes[ki];
			if (tI.id && tI.id=="rTracker") {
				aX=findPosX(document.getElementById("build_area_div"))-fixPosisionValue(tI.style.left);
				aY=findPosY(document.getElementById("build_area_div"))-fixPosisionValue(tI.style.top);
			}
			ki++;
		}

		ki=0;
		while (ki<document.getElementById("build_area_div").childNodes.length){
			var tI=document.getElementById("build_area_div").childNodes[ki];
			if ((tI.id) && ((tI.id.substring(0,4)=="img_") || (tI.id=="rTracker"))) {				
				tI.style.left=fixPosisionValue(tI.style.left) + aX;
				tI.style.top=fixPosisionValue(tI.style.top) + aY;
			}
			ki++;
		}
}

function showInit(){
	if (makerReady) return;	
	if (document.getElementById("shInit")) document.getElementById("shInit").style.display='';	
}

function clearEventPROX(a)
{
  if (!a)
    return;
  a.onabort     = null;
  a.onblur      = null;
  a.onclick     = null;
  a.ondblclick  = null;
  a.onfocus     = null;
  a.onkeydown   = null;
  a.onkeypress  = null;
  a.onkeyup     = null;
  a.onload      = null;
  a.onmousedown = null;
  a.onmousemove = null;
  a.onmouseup   = null;
  a.onmove      = null;
  a.onreset     = null;
  a.onresize    = null;
  a.onselect    = null;
  a.onunload    = null;
  // IE-specific event handlers from
  // http://msdn.microsoft.com/workshop/author/dhtml/reference/events.asp
  a.onactivate         = null;
  a.onafterprint       = null;
  a.onafterupdate      = null;
  a.onbeforeactivate   = null;
  a.onbeforecopy       = null;
  a.onbeforecut        = null;
  a.onbeforedeactivate = null;
  a.onbeforeeditfocus  = null;
  a.onbeforepaste      = null;
  a.onbeforeprint      = null;
  a.onbeforeunload     = null;
  a.onbeforeupdate     = null;
  a.onbounce           = null;
  a.oncellchange       = null;
  a.oncontextmenu      = null;
  a.oncontrolselect    = null;
  a.oncopy             = null;
  a.oncut              = null;
  a.ondataavailable    = null;
  a.ondatasetchanged   = null;
  a.ondatasetcomplete  = null;
  a.ondeactivate       = null;
  a.ondrag             = null;
  a.ondragend          = null;
  a.ondragenter        = null;
  a.ondragleave        = null;
  a.ondragover         = null;
  a.ondragstart        = null;
  a.ondrop             = null;
  a.onfilterchange     = null;
  a.onfinish           = null;
  a.onfocusin          = null;
  a.onfocusout         = null;
  a.onhelp             = null;
  a.onlayoutcomplete   = null;
  a.onlosecapture      = null;
  a.onmousewheel       = null;
  a.onmoveend          = null;
  a.onmovestart        = null;
  a.onpaste            = null;
  a.onpropertychange   = null;
  a.onreadystatechange = null;
  a.onresizeend        = null;
  a.onresizestart      = null;
  a.onrowenter         = null;
  a.onrowexit          = null;
  a.onrowsdelete       = null;
  a.onrowsinserted     = null;
  a.onscroll           = null;
  a.onselectionchange  = null;
  a.onselectstart      = null;
  a.onstart            = null;
  a.onstop             = null;
}

function clearAllEventPROX(a)
{
  if (!a)
    return;
  clearEventPROX(a);
  a.onclick     = null;
  a.ondblclick  = null;
  a.onmouseover = null;
  a.onmouseout  = null;
  a.onsubmit    = null;
  a.onreset     = null;
  a.onchange    = null;
  a.onerror     = null;
}

/* --------------------  no right click ------------------  */
///////////////////////////////////
function evtHandler(e) {
	hd=hidestatus();
	if (navigator.appName=="Netscape") clickType=e.which;  else clickType=event.button;
	if (clickType==2||clickType==3) {
		showContextMenu;
		return false;
	}
}

function hide_link_status(){
	var links = document.links;
	for(var i = 0; i < links.length; i++) { 
		links[i].attachEvent("onmouseover", hidestatus);
	}
}

function hidestatus(){
	window.status='';
	return true;
}

if (!(isdefined(window, "dms_skip_right_disable") && (dms_skip_right_disable==true))){
	if (document.captureEvents){
		document.captureEvents(Event.MOUSEDOWN | Event.MOUSEOVER | Event.MOUSEOUT);
		document.onmousedown=evtHandler;
		document.onmouseover=hidestatus;
		document.onmouseout=hidestatus;
	}

			
	document.oncontextmenu=showContextMenu;
}

/* -----------------  no right click end ------------------  */


function dropItem(objId){
	obj=document.getElementById(objId);	
	obj.style.left=-500;
	obj.style.top=-500;
	obj.style.display="none";
	dmsProps[objId]=0;
	hideContextMenu();
	return false;
}
function bringToTopItem(objId){
	obj=document.getElementById(objId);	
	obj.style.zIndex=++tItemCounter;
	dmsLayerIndex[obj.id]=obj.style.zIndex;
	hideContextMenu();
	return false;
}

function hideContextMenu(){
	contextMenu.style.display="none";
	return false;
}

function showContextMenu(e){
	if (!ie&&!ns6) return;
	var firedobj=ns6? e.target : event.srcElement;
	var topelement=ns6? "HTML" : "BODY";
	while (firedobj.tagName!=topelement&&firedobj.className!="drag"){
		firedobj=ns6? firedobj.parentNode : firedobj.parentElement;
	}	

	if (firedobj.className=="drag"){
		var contextMenu=document.getElementById("contextMenu");	
		contextMenu.innerHTML="<TABLE style='width:125px;' id='cMenu'><TR><TD><a id='deleteObjectLNK' href='#' onclick='dropItem(\"" + firedobj.id + "\"); return false;'><img id='deleteObjectLNK' src='https://1.bp.blogspot.com/-5xRLOnXdvoQ/XYwXPyhVKvI/AAAAAAAABro/qgg6wQRPsyYcY625FwKPnbr5mHjX_4A3gCLcBGAsYHQ/s1600/chek3.png' border='0'></a></TD><TD><a id='deleteObjectLNK' href='#' onclick='dropItem(\"" + firedobj.id + "\"); return false;'>Deletar Item</a></TD></TR><TR><TD>&nbsp;</TD><TD><a id='bringToTopObjectLNK' href='#' onclick='bringToTopItem(\"" + firedobj.id + "\"); return false;'>Para Frente</a></TD></TR></TABLE>";
		contextMenu.style.left=findPosX(firedobj);
		contextMenu.style.top=findPosY(firedobj);
		contextMenu.style.display="";
	}

	hideContextMenu;
	return false;
}
/* -----------------  Context Menu ------------------  */

/* -------------------  ns adjucent fix -------------------  */
if(typeof HTMLElement!="undefined" && !HTMLElement.prototype.insertAdjacentElement){
	HTMLElement.prototype.insertAdjacentElement = function (where,parsedNode){
		switch (where){
		case 'beforeBegin':
			this.parentNode.insertBefore(parsedNode,this)
			break;
		case 'afterBegin':
			this.insertBefore(parsedNode,this.firstChild);
			break;
		case 'beforeEnd':
			this.appendChild(parsedNode);
			break;
		case 'afterEnd':
			if (this.nextSibling) this.parentNode.insertBefore(parsedNode,this.nextSibling);
			else this.parentNode.appendChild(parsedNode);
			break;
		}
	}

	HTMLElement.prototype.insertAdjacentHTML = function (where,htmlStr)
	{
		var r = this.ownerDocument.createRange();
		r.setStartBefore(this);
		var parsedHTML = r.createContextualFragment(htmlStr);
		this.insertAdjacentElement(where,parsedHTML)
	}


	HTMLElement.prototype.insertAdjacentText = function (where,txtStr)
	{
		var parsedText = document.createTextNode(txtStr)
		this.insertAdjacentElement(where,parsedText)
	}
}
/* -----------------  ns adjucent fix end ------------------  */


var ie=document.all;
var ns6=document.getElementById&&!document.all;

var dragapproved=false;
var z,x,y;

var makerReady=false;
var dmsProps=new Array();
var dmsLayerIndex=new Array();
var tItemCounter=10000;		var loadInterrupCount=0;


var show_color_flag=false;

//images
var m_banner="http://none.gif";
var m_wait="http://none.gif";
var m_bg="http://none.gif";

if (!isdefined(window, "dms_color1")) dms_color1="orange";
if (!isdefined(window, "dms_color2")) dms_color2="#FFD530";
if (!isdefined(window, "dms_color3")) dms_color3="#862C00";
if (!isdefined(window, "dms_color4")) dms_color4="black";

if (!isdefined(window, "dms_text_embed")) dms_text_embed="";
if (!isdefined(window, "dms_text_popup")) dms_text_popup="O criador está pronto";

if (!isdefined(window, "dms_width")) dms_width=150;
if (!isdefined(window, "dms_height")) dms_height=200;

if (!isdefined(window, "dms_background")) dms_background=false;
if (!isdefined(window, "dms_text_embed_disable")) dms_text_embed_disable=false;

if (!isdefined(window, "dms_drag_disable")) dms_drag_disable=false;
if (!isdefined(window, "dms_hide_build")) dms_hide_build=false;

if (!isdefined(window, "dms_file_type")) dms_file_type="gif";
if (!isdefined(window, "dms_build_here_src")) dms_build_here_src="http:/none/build-doll-here.gif";

if (!isdefined(window, "dms_debug")) var dms_debug=false;

if (!isdefined(window, "dms_build_written")) var dms_build_written=false;

function isdefined(object, variable)
{
	return (typeof(eval(object)[variable]) != "undefined");
}

function initMaker(){
			if (typeof(document.body.style.filter) != "undefined" ){
		if (document.styleSheets){
			/*
			for ( i = 0; i < document.styleSheets.length; i++ ){
				var mysheet=document.styleSheets[i];
				var myrules=mysheet.cssRules? mysheet.cssRules: mysheet.rules;
				for (i=0; i<myrules.length; i++){
					if(myrules[i].selectorText.toLowerCase()=="input"){ 
						if (myrules[i].style.filter!=""){
							document.getElementById("save_button").value="Save & Download";
							break;
						}
					}
				}
			}
			*/
		}
	}

	if (makerReady) return;	
	if (document.getElementById("shInit")) document.getElementById("shInit").style.display='none';	

	//make sure we still have all the handles
	document.onmousedown=drags;
	document.onmouseup=new Function("dragapproved=false");
	document.ondblclick =move_top;

		if (!dms_hide_build) window.onresize=handleWindowResize;

	iCount=document.images.length;
	for (var loop = 0; loop <iCount; loop++)
	{
		var lnk2=ns6? document.images[loop].parentNode : document.images[loop].parentElement;
		if (lnk2.tagName!="A") {
		
				clearAllEventPROX(document.images[loop]);

		if (document.images[loop].id!="build_area") document.images[loop].id="img_"+loop;
		dmsLayerIndex[document.images[loop].id]=loop;
		if (document.images[loop].className!="nodrag") {
			document.images[loop].className="drag";	
			document.images[loop].title="Arraste e solte ou clique duas vezes";

						document.images[loop].style.zIndex=document.images[loop].style.zIndex+iCount;
			
						lnk=ns6? document.images[loop].parentNode : document.images[loop].parentElement;
			while (lnk.tagName=="A" || lnk.tagName=="DIV") {				
				clearAllEventPROX(lnk);
				if (lnk.href) lnk.href="#";
				lnk.style.zIndex=document.images[loop].style.zIndex;
				lnk=ns6? lnk.parentNode : lnk.parentElement;
			}
		}

		}
	}

	tItemCounter=loop;

	if (!cWidthSet) {
		//provided value is not from droplist - add it as option
		var tObject=document.getElementById("buildWidth");
		tObject.options[tObject.length]=new Option(cWidth,cWidth);
		tObject.selectedIndex=(tObject.length-1);
	}

	if (!cHeightSet) {
		//provided value is not from droplist - add it as option
		var tObject=document.getElementById("buildHeight");
		tObject.options[tObject.length]=new Option(cHeight,cHeight);
		tObject.selectedIndex=(tObject.length-1);
	}

	if (dms_background!=false) document.getElementById("build_area").src=dms_background;

		if (document.getElementById("build_area")){
		mPosX=findPosX(document.getElementById("build_area"));
		mPosY=findPosY(document.getElementById("build_area"));
		var innerHtml = "<img id='rTracker' src='http://web.archive.org/web/20190520004138/http://www.dollmakerscript.com/public/spacer.gif' style='position:absolute; top:" + mPosY + ";left:" + mPosX + ";z-index:100;' width='1' height='1'>";
		document.getElementById("build_area_div").insertAdjacentHTML( "beforeEnd", innerHtml );
	}

	if (!(isdefined(window, "dms_skip_ready_alert") && dms_skip_ready_alert==true)) alert(unescape(dms_text_popup));
	makerReady=true;
}

function move(e){
	if (dragapproved){
		z.style.left=ns6? temp1+e.clientX-x: temp1+event.clientX-x;
		z.style.top=ns6? temp2+e.clientY-y : temp2+event.clientY-y;
		return false;
	}
}


function drags(e){
	if (!ie&&!ns6) return;
	if (dms_drag_disable) return;	

	var firedobj=ns6? e.target : event.srcElement;
	var topelement=ns6? "HTML" : "BODY";

	if (firedobj.className!="swatch2" && firedobj.className!="swatch") hide_color();

	if ((firedobj.id=="deleteObjectLNK") || (firedobj.id=="bringToTopObjectLNK")){
		return true;
	}


	if (!makerReady && firedobj.tagName=="IMG"){
		loadInterrupCount++;
		if (loadInterrupCount>=3) {
				alert('Trying to initialize the maker now...\nYou will not be able to drag any items that are currently not loaded');
				initMaker();
				return;
		}

		alert('Please wait until the maker is completely loaded or press <ESC> to skip load.  #' + loadInterrupCount);
		return;
	}

	while (firedobj.tagName!=topelement&&firedobj.className!="drag"){
		firedobj=ns6? firedobj.parentNode : firedobj.parentElement;
	}

	if (firedobj.className=="drag"){
		//if dragged - add to dmsProps
		dmsProps[firedobj.id]=firedobj;

		dragapproved=true;
		z=firedobj;
		temp1=parseInt(z.style.left+0);
		temp2=parseInt(z.style.top+0);
		x=ns6? e.clientX: event.clientX;
		y=ns6? e.clientY: event.clientY;
		document.onmousemove=move;
		return false;
	}
			
	hideContextMenu();
}

function move_top(e){
	if (!ie&&!ns6) return;
	var firedobj=ns6? e.target : event.srcElement;
	var topelement=ns6? "HTML" : "BODY";

	if (!makerReady && firedobj.tagName=="IMG"){
		loadInterrupCount++;
		if (loadInterrupCount>=3) {
				alert('Trying to initialize the maker now...\nYou will not be able to drag any items that are currently not loaded');
				initMaker();
				return;
		}

		alert('Aguarde até que o fabricante esteja completamente carregado ou pressione <ESC> para pular o carregamento.  #' + loadInterrupCount);
		return;
	}

	while (firedobj.tagName!=topelement&&firedobj.className!="drag"){
		firedobj=ns6? firedobj.parentNode : firedobj.parentElement;
	}

	if (firedobj.className=="drag"){
		processItem=false;
		//create duplicate of the items

		//if we have local build area - use it, otherwise try to use top (top frame area)
		if (document.getElementById("build_area_div")){
			var z_id = "img_" + ++tItemCounter; 
			var innerHtml = "<img id='" + z_id + "' src='" + firedobj.src + "' class='drag' style='position:absolute;top:0;left:0;z-index:" + tItemCounter + ";' width='" + firedobj.width + "' height='" + firedobj.height + "'>";


			document.getElementById("build_area_div").insertAdjacentHTML( "beforeEnd", innerHtml ) ;
			firedobj=document.getElementById(z_id);

			mPosX=findPosX(document.getElementById("build_area"));
			mPosY=findPosY(document.getElementById("build_area"));

						mPosX=mPosX+(document.getElementById("build_area").width-firedobj.width)/2;
			mPosY=mPosY+(document.getElementById("build_area").height-firedobj.height)/2;

						dmsProps[z_id]=firedobj;

						dmsLayerIndex[z_id]=tItemCounter;
			processItem=true;
		} else {
			if (top.document.getElementById("build_area_div")){
				var z_id = "img_" + ++top.tItemCounter; 
				var innerHtml = "<img id='" + z_id + "' src='" + firedobj.src + "' class='drag' style='position:absolute;top:0;left:0;z-index:" + top.tItemCounter + ";' width='" + firedobj.width + "' height='" + firedobj.height + "'>";

				top.document.getElementById("build_area_div").insertAdjacentHTML( "beforeEnd", innerHtml ) ;
				firedobj=top.document.getElementById(z_id);
				mPosX=findPosX(top.document.getElementById("build_area"));
				mPosY=findPosY(top.document.getElementById("build_area"));

								mPosX=mPosX+(top.document.getElementById("build_area").width-firedobj.width)/2;
				mPosY=mPosY+(top.document.getElementById("build_area").height-firedobj.height)/2;

								top.dmsProps[z_id]=firedobj;
								top.dmsLayerIndex[z_id]=top.tItemCounter;
				processItem=true;
			}
		}			


		if (processItem){
			z=firedobj;
			z.style.left=mPosX-findPosX(z);
			z.style.top=mPosY-findPosY(z);
		}

		return false;
	}
}

function changeWidth(wSelector){
	if (document.getElementById("build_area") && wSelector)
	{
		document.getElementById("build_area").width=wSelector.options[wSelector.selectedIndex].value;
	}
	return true;
}

function changeHeight(hSelector){
	if (document.getElementById("build_area") && hSelector)
	{
		document.getElementById("build_area").height=hSelector.options[hSelector.selectedIndex].value;
	}
	return true;
}

function findPosX(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj)
{
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}


function _PrepSubmit(){
	if (!document.getElementById("build_area")){
		alert('Could not process the request.\nMake sure you have build_area image defined.');
		return false;
	}

	//make sure all the required elements exists
	if (!document.getElementById("buildWidth") || !document.getElementById("buildHeight")){
		alert('Could not process the request.\nMake sure you have defined width and height.');
		return false;
	}	

	//populate
	document.dmMain.auto_url.value=top.location;

	//collect items info
	var item_counter=0;
	var dmsString="";

	//add build area - always first element
	dmArea=document.getElementById("build_area");
	dmsString += "-1**" + dmArea.src + "**" + findPosX(dmArea) + "**"+ findPosY(dmArea);

	for (im in dmsProps)
	{
		if (dmsProps[im]!=0){	  
  		  item_counter++;
		  dmsString += "##" + dmsLayerIndex[dmsProps[im].id] + "**"+dmsProps[im].src + "**" + findPosX(dmsProps[im]) + "**"+ findPosY(dmsProps[im]);
		}
	}

	if (item_counter==0)
	{
		alert('Please drag item to the build area and press \'Build\' to create the doll.');
		return false;
	}

	document.dmMain.dmsString.value=dmsString;

	//prep window
	var moutputWindow=window.open("","_moutput");

	moutputWindow.document.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Drag and Drop Doll Maker Script Engine by dollmakerscript.com</TITLE><META NAME=\"Generator\" CONTENT=\"EditPlus\"><META NAME=\"Author\" CONTENT=\"\"><META NAME=\"Keywords\" CONTENT=\"\"><META NAME=\"Description\" CONTENT=\"\"></HEAD><BODY><TABLE width='468' style=\"border-color:" + escape(dms_color3) + "; border-width: 1px; border-style: solid; background: URL('" + m_bg + "');\"><TR><TD align='center' style='background-color:" + dms_color1 + ";color:" + dms_color4 + "; font-size: 13; font-family: verdana;'><b>Please wait while we are creating your image...</b></TD></TR><TR><TD align='center'><img id='hour_glass' src='" + m_wait + "' border='0'></TD></TR><TR><TD align='center'><a class='ready_link' href='https://daygifs.blogspot.com' target='_blank' title='Visit Day Gifs'><img src='" + m_banner + "' border='0' width='88' height='31'></a></TD></TR></TABLE></BODY></HTML>");
	moutputWindow.focus();

	document.dmMain.submit();

	moutputWindow.document.getElementById("hour_glass").src="http://animated_hourglass_small.gif";
	return false;
}

document.onmousedown=drags;
document.onmouseup=new Function("dragapproved=false");
document.ondblclick =move_top;

//drop styles
document.write("<style>");

document.write("#t_tb0,#t_tb1,#td_tb0,#td_tb1 {text-align: center;}");
document.write("#cMenu {border-width: 0px; background-color: " + dms_color2 + ";}");
document.write("#deleteObjectLNK:link,#deleteObjectLNK:visited, #deleteObjectLNK:active {color:" + dms_color4 + "; font-size: 12px; font-family: verdana, arial; font-weight: bold; text-decoration: none}");
document.write("#deleteObjectLNK:hover {color:" + dms_color4 + "; font-size: 12px; font-family: verdana, arial; font-weight: bold; text-decoration: underline}");
document.write("#bringToTopObjectLNK:link,#bringToTopObjectLNK:visited, #bringToTopObjectLNK:active {color:" + dms_color4 + "; font-size: 12px; font-family: verdana, arial; font-weight: bold; text-decoration: none}");
document.write("#bringToTopObjectLNK:hover {color:" + dms_color4 + "; font-size: 12px; font-family: verdana, arial; font-weight: bold; text-decoration: underline}");


document.write(".Bsbttn3n {background-position: center; width:180px; height:0px; font-family:verdana,arial; font-weight: bold; font-size:13px;background-color: " + dms_color2 + "; border-bottom: 1px solid " + dms_color3 + ";border-right: 1px solid " + dms_color3 + ";border-left: 1px solid " + dms_color1 + ";border-top:1px solid " + dms_color1 + "; color:" + dms_color4 + ";text-decoration:none;cursor: hand}");

document.write(".Bsbttn3 {background-position: center; width:180px; height:0px; font-family:verdana,arial; font-weight: bold; font-size:13px;background-color: " + dms_color2 + "; background-image:url(''); background-repeat: no-repeat; border-bottom: 1px solid " + dms_color3 + ";border-right: 1px solid " + dms_color3 + ";border-left: 1px solid " + dms_color1 + ";border-top:1px solid " + dms_color1 + "; color:" + dms_color4 + ";text-decoration:none;cursor: hand}   .smfont{font-size: 10px; font-family: verdana, arial; }  .drag{position:relative;cursor:hand}  .sTop{position:relative;z-index: 1000; }");

document.write("A.powered:link {text-decoration: none;font-size: 9;font-weight: normal;font-family: verdana;}");
document.write("A.powered:visited {text-decoration: none;font-size: 9;font-weight: normal;font-family: verdana; }");
document.write("a.powered:active {text-decoration: none;font-size: 9;font-weight: normal;font-family: verdana; }");
document.write("A.powered:hover {text-decoration: underline;font-size: 9;font-weight: normal;font-family: verdana; }");
document.write(".noBorder{border-width: 0px;} .swatch, .swatch2 {cursor: hand;cursor: pointer;height: 12px;}  .swatch {width: 12px;} .swatch2 {width: 92px;} .defBg{background:transparent none repeat scroll 0% 0%; border-width: 0px;}");
document.write("</style>");


if (document.images) {
	//preload some images for the popup window
	im_pop_wait = new Image;
	im_pop_bg = new Image;
	im_pop_banner = new Image;

	im_pop_wait.src=m_wait;
	im_pop_bg=m_bg;
	im_pop_banner.src=m_banner;
}

//create build area
if (!dms_hide_build && !dms_build_written) document.write("<center><TABLE id='t_tb0' cellpadding='0' cellspacing='0' border='0' style='border-width: 0px;'><TR><TD id='td_tb0'><table id='t_tbl' cellpadding='0' cellspacing='0' style=\"border-width: 0px; background: URL('" + dms_build_here_src + "'); background-repeat: no-repeat; z-index: 5000; width:" + dms_width + "\"><tr><td id='td_tb1'><div id='build_area_div' style='padding: 0 0 0 0; margin: 0 0 0 0;'><img name='build_area' id='build_area' class='nodrag' src='http://web.archive.org/web/20190520004138/http://www.dollmakerscript.com/public/spacer.gif' height='" + dms_height + "' width='" + dms_width + "' border='0' style='border-width: 1px; border-color: #A46550; border-style: dashed;'></div></td></tr></table></TD></TR><TR><TD id='td_tb0'><a class='powered' target='_blank' title='Visit Day Gifs' href='https://daygifs.blogspot.com/'>Day Gifs</a></TD></TR></TABLE>");

//get presets
var cWidth=dms_width;
var cHeight=dms_height;

var cWidthSet=false;
var cHeightSet=false;
var buildWidthHTML="<select class='smfont' id='buildWidth' name='buildWidth' onchange='changeWidth(this);'>";
for (var i=50;i<250 ;i++ ) {
	if (cWidth==i) {
		buildWidthHTML +="<option selected value='" + i + "'>" + i; 
		cWidthSet=true;
	} else {
		buildWidthHTML +="<option value='" + i + "'>" + i;
	}
}

var buildHeightHTML="<select class='smfont' id='buildHeight' name='buildHeight' onchange='changeHeight(this);'>";
for (var i=50;i<350 ;i++ ) {
	if (cHeight==i) {
		buildHeightHTML +="<option selected value='" + i + "'>" + i; 
		cHeightSet=true;
	} else {
		buildHeightHTML +="<option value='" + i + "'>" + i;
	}
}

if (!dms_build_written) window.onload = initMaker;

if (!dms_hide_build && !dms_build_written) {
	document.write("<form onsubmit='return _PrepSubmit();' name='dmMain' target='_moutput' method='post' action='http://hongru.github.io/proj/canvas2image/canvas2image.js' style='margin: 0 0 0 0 ;'>");
	document.write("<input type='hidden' name='dms_k' value='cfc32919fc6bb988867c5768992fb268'>");
	document.write("<input type='hidden' name='auto_url' value=''>");
	document.write("<input type='hidden' name='dmsString' value=''>");
	document.write("<input type='hidden' name='dmsLocalFiles' value='0'>");

	document.write("<input type='hidden' name='dms_BgColor' value='0'>");

	document.write("<input type='hidden' name='dms_color1' value='" + dms_color1 + "'>");
	document.write("<input type='hidden' name='dms_color2' value='" + dms_color2 + "'>");
	document.write("<input type='hidden' name='dms_color3' value='" + dms_color3 + "'>");
	document.write("<input type='hidden' name='dms_color4' value='" + dms_color4 + "'>");

	document.write("<input type='hidden' name='dms_text_popup' value='" + dms_text_popup + "'>");
	document.write("<input type='hidden' name='dms_text_embed' value='" + dms_text_embed + "'>");
	document.write("<input type='hidden' name='dms_text_embed_disable' value='" + dms_text_embed_disable + "'>");

	document.write("<input type='hidden' name='dms_file_type' value='" + dms_file_type + "'>");	


	document.write("<table border='0' class='noBorder' style='width: 200px;'><tr><td class='smfont' style='border-width: 0px;'><img style='position:relative; z-index: 1000;' class='nodrag' src='https://2.bp.blogspot.com/-DjEcaPmb4fg/Xf5KeuklbGI/AAAAAAAACI0/OHEZQRs9Yqc-wp9Ol2HHraR6tclmWkbKACLcBGAsYHQ/s1600/icon_width.gif' width='18' height='13' border='0'></td><td class='noBorder'>" + buildWidthHTML + "</td><td class='smfont' style='border-width: 0px;'><img style='position:relative; z-index: 1000;' class='nodrag' src='https://3.bp.blogspot.com/-UtcxyOVtshw/Xf5Keu8_QfI/AAAAAAAACIw/TNhPaAuI9gYG67yNK7rkzECIFgTswAoWACLcBGAsYHQ/s1600/icon_height.gif' width='13' height='18' border='0'></td><td class='noBorder'>" + buildHeightHTML + "</td><td class='smfont' style='border-width: 0px;'><a href='#' onclick='show_color(); return false;'><img style='position:relative; z-index: 1000;' class='nodrag' src='https://1.bp.blogspot.com/-ji5AylgcNYQ/Xf5KeuNFRsI/AAAAAAAACIs/xFkzOBRjJTUZbbNE8ZAyR1kJS6RhJiVTwCLcBGAsYHQ/s1600/icon_color_picker.gif' width='15' height='13' border='0' onclick='' alt='Select Background'></a></td></tr><tr><td colspan='5' align='center' class='noBorder'><input type='text' class='Bsbttn3' value='' style='position:relative; z-index: 1000;' id='save_button'></td></tr>");
				
	document.write("<tr id='shInit' style='display:none'><td colspan='5' align='center' class='noBorder'><input type='button' class='Bsbttn3n' value=' Start Maker ' style='position:relative; z-index: 1000;' id='shInit_button' onclick='initMaker();'></td></tr>");

	document.write("</table>");
	document.write("</form></center>");

	document.write("<div id='cwindow' style='position:absolute;background-color:#ffffff;cursor:hand;left:0px;top:0px;display:none;z-index:2000; border-width: 1px; border-color: #A46550; border-style: solid;' onSelectStart='return false'>");

	document.write("<table class='defBg' cellpadding='1' cellapdcing='1'>");

	wt();

	document.write("</table>");
	document.write("</div>");
	document.write("<div id='contextMenu' style='display:none; position:absolute; top:0; left:0; width:130px; border:1px solid black; font-family:Verdana; line-height:20px; cursor:default; font-size:14px; z-index:10000; background-color: " + dms_color2 + ";'></div>");

	dms_build_written=true;
}


function show_color(){
	if (!show_color_flag){
		//position the window
		document.getElementById("cwindow").style.left=findPosX(document.getElementById("save_button"));
		document.getElementById("cwindow").style.top=findPosY(document.getElementById("save_button"));
		document.getElementById("cwindow").style.display='';
		show_color_flag=true;
	}
}

function hide_color(){
	if (!dms_hide_build) document.getElementById("cwindow").style.display='none';
	show_color_flag=false;
}


function set_bg(v){
	document.dmMain.dms_BgColor.value=v;
	document.getElementById("build_area").src='http://web.archive.org/web/20190520004138/http://www.dollmakerscript.com/public/spacer.gif';
	document.getElementById("build_area_div").style.backgroundColor=v; 
	hide_color();
}

/* get field value */
function gf() {
	if (document.forms.form1)
	{
		var e = document.forms.form1.elements.field;
		if(e != undefined) {
			for (var i = 0; i < e.length; i++) {
				if (e[i].checked) {
					return e[i].value;
				}
			}
		}
	}
  

  /* we need this so this function becomes reusable
   * with ChooseColor.gxp
   */
  var r = document.images;
  for (var i = 0; i < r.length; i++) {
	 if (r[i].id=="build_area") {
		 return r[i].id;
	 }
  }
}

/* set field helper for onchange events */
function sf_oc(f, v) {
  if (f=="build_area"){
	  set_bg(v);
  } else {
	  sf(f, v);
  }
}

/* set field valid value */
var sf_vv = /#[0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F]/i;

/* set field value */
function sf(f, v) {
  if (!sf_vv.test(v)) {
	document.getElementById(f).value="";
	createAdvancedScript();
	return false;
  }

  document.getElementById(f).value=v;
  createAdvancedScript();
}


/* write swatch */
function ws(c, s, z) {
  var v = "#" + toHex(c);
  document.write(
    "<td id='ps' class='defBg' style='font-size:1px;background-color:" + v + "' onclick=\"sf_oc(gf(),'" + v +
    "')\" title=\"" + v + "\" " + ((s == 1) ? "" : ("colspan=\"" + s +
    "\" ")) + "bgcolor=\"" + v + "\" onmouseover=\"status='" + v +
    "'\" " + "onmouseout=\"status=''\"><div class=\"" + z + "\"></div></td>");
}

/* write palette table */
function wt() {
  for(var r = 255; r >= 0; r -= 51) {
    document.write("<tr class='defBg'>");
    for(var g = 255; g >= 0; g -= 51) {
      for(var b = 255; b >= 0; b -= 51) {
        ws([r, g, b], 1, "swatch");
      }
    }
    document.write("</tr>");
  }
  document.write("<tr>");
  for(var l = 255; l >= 0; l -= 51) {
    ws([l, l, l], 6, "swatch2");
  }
  document.write("</tr>");
}

function toColor(h) {
  return [ parseInt(h.substring(0, 2), 16),
           parseInt(h.substring(2, 4), 16),
           parseInt(h.substring(4, 6), 16) ];
}

function toHex(c) {
  var r, g, b;
  r = c[0].toString(16);
  if (c[0] < 0x10) {
    r = "0" + r;
  }
  g = c[1].toString(16);
  if (c[1] < 0x10) {
    g = "0" + g;
  }
  b = c[2].toString(16);
  if (c[2] < 0x10) {
    b = "0" + b;
  }
  return (r + g + b).toUpperCase();
}


/* set field helper for keydown events */
function sf_ok(f, v) {
  if (window.event) {
    if (event.keyCode == 13) {
      sf_oc(f, v); // simulate onchange
      event.cancelBubble = true;
    }
  }
}
/* focus field */
function ff(f) {
  var v = document.forms.form1.elements;
  var e = v.field;
  for (var i = 0; i < e.length; i++) {
    if (e[i].value == f) {
      e[i].checked = true;
      v[f].focus();
      break;
    }
  }
}
