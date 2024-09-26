

//打印订单
export function printOrder(lists) {
 
  LODOP = getLodop();
  //console.log(LODOP)
  if (LODOP == undefined) {
    return false;
  }
  var total = lists.length, currentBlock = 10;
  var Divisor = Math.floor(total / currentBlock),
    Remainder = total - Divisor * currentBlock;
  for (var i = 0; i < Divisor; i++) {
    for (var j = 0; j < currentBlock; j++) {
      myPrintA(lists[i * currentBlock + j], i * currentBlock + (j+1), (i+1) * currentBlock, total);
    }
  }
  if (Remainder != 0) {
    for (var x = Divisor * currentBlock; x < total; x++) {
      myPrintA(lists[x], x, total, total);
    }
  }
  
  return true;
  //callback()
  // for (let i=1,len=lists.length;i<=len;i++){
  //   myPrintA(lists[i], i, lists.length,callback);
  // }
}
function getTimeString(){
  var oDate = new Date();
  var Year = oDate.getFullYear(),
    Month = (oDate.getMonth() + 1) >= 10 ? (oDate.getMonth() + 1) : '0' + (oDate.getMonth() + 1),
    Day = (oDate.getDate()) >= 10 ? (oDate.getDate()) : '0' + (oDate.getDate()),
    Hour = (oDate.getHours()) >= 10 ? (oDate.getHours()) : '0' + (oDate.getHours()),
    Minute = (oDate.getMinutes()) >= 10 ? (oDate.getMinutes()) : '0' + (oDate.getMinutes()),
    Second = (oDate.getSeconds()) >= 10 ? (oDate.getSeconds()) : '0' + (oDate.getSeconds());
  return Year + '-' + Month + '-' + Day + ' ' + Hour + ':' + Minute + ':' + Second
}
/**
 * 选择打印机
 */
function myPrintA(list, currentIndex, blockNum, totalList) {
  var printNo = (currentIndex+1)+'/'+(totalList),
    printNum = list.printCount == '' ? 1 : Number(list.printCount)+1,
    printDate = getTimeString(),
    mailno = list.mailno,
    twoDimensionCode = list.twoDimensionCode,
    proCode = list.proCode,
    destRouteLabel = list.destRouteLabel,
    d_contact = list.dcontact,
    // d_tel = list.dtel.slice(0, 3) + '****' + list.dtel.slice(7),
    d_tel=list.dtel,
    d_company = list.dcompany,
    d_address = list.daddress,
    destTeamCode = list.destTeamCode,
    //1:寄付 2：到付 3 第三方付
    pay_method = list.payMethod == '1' ? '寄付' : list.payMethod == '2' ? '到付' :'第三方付',
    codingMapping = list.codingMapping,
    destTransferCode = list.sourceTransferCode,
    abFlag = list.abFlag,
    codingMappingOut = list.codingMappingOut,
    j_contact = list.jcontact,
    // j_tel = list.jtel.slice(0, 3) + '****' + list.jtel.slice(7),
    j_tel=list.jtel,
    j_company = list.jcompany,
    j_address = list.jaddress,
    things=list.things,
    cargoWeight = list.cargoWeight;//实际重量
  	cargoAmount = list.cargoAmount;//代扣货款
  	orderid = list.orderid;//订单号
    COD = list.COD,
    POD='',
    remark=list.remark;
  //定义Icon路径
  var printIcony = "",
    printIcony1 = "",
    printIcony2 = "",
    printIcond = "",
    printIcond1 = "",
    printIcond2 = "";
  var printIcon = list.printIcon || '';
  if (!printIcon){
    var arrIcon = printIcon.split('');
    if(arrIcon[0]=='1'){
      printIcony = "<img border='0' src='./static/wight.png' />"
    }
    if (arrIcon[2] == '1') {
      printIcony1 = "<img border='0' src='./static/xie.png' />"
    }
    if (arrIcon[3] == '1') {
      printIcony2 = "<img border='0' src='./static/fresh.png' />"
    }
    if (arrIcon[4] == '1') {
      printIcond = "<img border='0' src='./static/sui.png' />"
    }
    if (arrIcon[5] == '1') {
      printIcond1 = "<img border='0' src='./static/doctor.png' />"
    }
    if (arrIcon[6] == '1') {
      printIcond2 = "<img border='0' src='./static/zsign.png' />"
    }
  }
  //获取运单号数量
  var n = mailno.split(",");//生成运单号数组
  var m = n.length;//运单号数量
  //主单号
  mailno = n[0];
  //取proCode最后一个字符
  var proCode = proCode.charAt(proCode.length - 1);

  LODOP = getLodop(); //获取打印驱动
  LODOP.PRINT_INITA(0, 0, 378, 567, "顺丰丰密150热敏");//预览窗口标题
  LODOP.SET_PRINT_PAGESIZE(0, 1000, 1500, "")//设置纸张大小100mm*150mm
  LODOP.SET_PRINT_MODE("PRINT_NOCOLLATE", 6);//设置以纸张边缘为基点
  for (j = 0; j < m; j++) {
    children_nos = n[j];
    CreateFullBill2(printNo, printNum, printDate, mailno, children_nos, twoDimensionCode, proCode, destRouteLabel, d_contact, d_tel, d_company, d_address, destTeamCode, pay_method, codingMapping, destTransferCode, abFlag, codingMappingOut, j_contact, j_tel, j_company, j_address, things,cargoWeight, j, m, COD, POD, printIcond, printIcond1, printIcond2, printIcony, printIcony1, printIcony2, remark,cargoAmount,orderid);
  };
  LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 0, 0, "");
  // LODOP.PREVIEW();
  // LODOP.PRINT();
  // if (currentIndex+1==blockNum){
  //   console.log(currentIndex,blockNum)
  //   LODOP.SET_PRINT_MODE("CUSTOM_TASK_NAME", "dzx" + blockNum);//为每个打印单独设置任务名
  //   LODOP.PRINT();
  // }
  LODOP.SET_PRINT_MODE("CUSTOM_TASK_NAME", "dzx" + blockNum);//为每个打印单独设置任务名
  LODOP.PRINT();
  // LODOP.PRINT();
};


function CreateFullBill2(printNo, printNum, printDate, mailno, children_nos, twoDimensionCode, proCode, destRouteLabel, d_contact, d_tel, d_company, d_address, destTeamCode, pay_method, codingMapping, destTransferCode, abFlag, codingMappingOut, j_contact, j_tel, j_company, j_address, things,cargoWeight, j, m, COD, POD, printIcond, printIcond1, printIcond2, printIcony, printIcony1, printIcony2, remark,cargoAmount,orderid) {
  LODOP.NewPage();
  //表格底版
  // LODOP.ADD_PRINT_SETUP_BKIMG("<img border='0' src='/template/images/bk.jpg'>");
  // LODOP.SET_SHOW_MODE("BKIMG_PRINT",1);//打印包含背景图
  printTemp();
  //**************************
  //打印序号
  LODOP.ADD_PRINT_TEXT(10, 239, 64, 20, printNo);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  //打印次数和打印时间
  LODOP.ADD_PRINT_TEXT(29, 91, 260, 10, "第" + printNum + "次打印 打印时间" + printDate);
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 7);
  //运单号条码
  LODOP.ADD_PRINT_BARCODE(42, 63, "52.00mm", "13.00mm", "128C", children_nos);//大纯数字
  //LODOP.ADD_PRINT_BARCODE(42, 63, "42.00mm", "13.00mm", "128C", children_nos);//小
 
  //LODOP.ADD_PRINT_BARCODE(42, 63, "42.00mm", "13.00mm", "128B", mailno);//数字+字母
  LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0);
  
  //alert(twoDimensionCode);
  //判断二维码为空
  if(twoDimensionCode==null||twoDimensionCode==""){
	  
  }else{
	  //取twoDimensionCode值,二维码
	  var objJson= eval('(' + twoDimensionCode + ')');
	  var twoDimensionCodeString = "";
	  if(objJson.hasOwnProperty("k5")){//判断key的值k5是否存在
		  objJson["k5"]=children_nos;//给二维码的k5母单号赋值为子单号
		  twoDimensionCodeString = JSON.stringify(objJson);
	  }else{
		  twoDimensionCodeString = twoDimensionCode;
	  }
	  
	  //alert(twoDimensionCodeString);
	 // console.log(twoDimensionCodeString+"--"+objJson);
	  LODOP.ADD_PRINT_BARCODE(244, 140, 100, 100, "QRCode", twoDimensionCode);//大
	  //LODOP.ADD_PRINT_BARCODE(253, 150, 115, 115, "QRCode", twoDimensionCodeString);//小
	  LODOP.SET_PRINT_STYLEA(0, "ShowBarText", 0);
  }
  //子母件分数标识
  LODOP.ADD_PRINT_TEXT(96, 8, 58, 16, j + 1 + "/" + m);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "Arial");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
  //子单号
  LODOP.ADD_PRINT_TEXT(93, 120, 121, 16, children_nos);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "Arial");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);

  //母单号
  LODOP.ADD_PRINT_TEXT(113, 120, 118, 16, mailno);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "Arial");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
  //运单号条码
  LODOP.ADD_PRINT_BARCODE(500, 53, "42.00mm", "12.00mm", "128C", children_nos);//纯数字
  //取pro_code值
  LODOP.ADD_PRINT_TEXT(64, 307, 44, 64, proCode);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "Arial");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 49);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  //取destRouteLabel值
  LODOP.ADD_PRINT_TEXT(137, 17, 278, 27, destRouteLabel);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "Arial");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 26);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);

  //收件人信息
  LODOP.ADD_PRINT_TEXT(181, 48, 73, 14, d_contact);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  LODOP.ADD_PRINT_TEXT(182, 90, 111, 15, d_tel);
  LODOP.ADD_PRINT_TEXT(181, 200, 180, 15, d_company);
  LODOP.ADD_PRINT_TEXT(200, 48, 243, 30, d_address);
  //COD标识
  LODOP.ADD_PRINT_TEXT(152, 270, 100, 20, COD);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  LODOP.SET_PRINT_STYLEA(0, "TextFrame", 11);
  //取destTeamCode值
  LODOP.ADD_PRINT_TEXT(210, 120, 93, 36, destTeamCode);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "Arial");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 20);
  LODOP.SET_PRINT_STYLEA(0, "FontColor", "#C0C0C0");
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  //付款方式
  LODOP.ADD_PRINT_TEXT(250, 23, 85, 20, pay_method);
  //取codingMapping值
  LODOP.ADD_PRINT_TEXT(271, 25, 85, 25, codingMapping);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "Arial");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 24);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  //取sourceTransferCode值
  LODOP.ADD_PRINT_TEXT(311, 23, 85, 20, destTransferCode);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "Arial");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  //取abFlag值
  LODOP.ADD_PRINT_TEXT(248, 312, 45, 47, abFlag);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "Arial");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 36);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  //取codingMappingOut值
  LODOP.ADD_PRINT_TEXT(310, 315, 46, 25, codingMappingOut);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "ARial");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 19);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  //寄件人信息
  LODOP.SET_PRINT_STYLE("FontSize", 10); //字体大小
  LODOP.ADD_PRINT_TEXT(343, 52, 63, 15, j_contact);
  LODOP.ADD_PRINT_TEXT(343, 123, 101, 15, j_tel);
  LODOP.ADD_PRINT_TEXT(342, 214, 123, 15, j_company);
  LODOP.ADD_PRINT_TEXT(365, 52, 297, 23, j_address);
  LODOP.ADD_PRINT_TEXT(352, 255, 60, 23, "订单号:");//订单号
  LODOP.ADD_PRINT_TEXT(365, 255, 150, 23, orderid);
  //其他   
  //LODOP.ADD_PRINT_TEXT(400, 8, 245, 20, cargoAmount);//改为代收货款
  LODOP.ADD_PRINT_TEXT(400, 158, 245, 30, cargoWeight);
  LODOP.SET_PRINT_STYLE("FontSize", 9); //字体大小
  LODOP.ADD_PRINT_TEXT(432, 158, 262, 60, things);  
  LODOP.ADD_PRINT_TEXT(466, 150, 262, 30, remark);//备注内容
  //图标标签
  LODOP.ADD_PRINT_IMAGE(497, 10, 60, 63, printIcony);
  LODOP.SET_PRINT_STYLEA(0, "Stretch", 1);//(可变形)扩展缩放模式
  LODOP.ADD_PRINT_IMAGE(496, 70, 60, 63, printIcony1);
  LODOP.SET_PRINT_STYLEA(0, "Stretch", 1);//(可变形)扩展缩放模式
  LODOP.ADD_PRINT_IMAGE(496, 130, 60, 63, printIcony2);
  LODOP.SET_PRINT_STYLEA(0, "Stretch", 1);//(可变形)扩展缩放模式
  LODOP.ADD_PRINT_IMAGE(497, 190, 60, 63, printIcond);
  LODOP.SET_PRINT_STYLEA(0, "Stretch", 1);//(可变形)扩展缩放模式
  LODOP.ADD_PRINT_IMAGE(496, 250, 60, 63, printIcond1);
  LODOP.SET_PRINT_STYLEA(0, "Stretch", 1);//(可变形)扩展缩放模式
  LODOP.ADD_PRINT_IMAGE(496, 310, 60, 63, printIcond2);
  LODOP.SET_PRINT_STYLEA(0, "Stretch", 1);//(可变形)扩展缩放模式

  LODOP.ADD_PRINT_TEXT(505, 260, 90, 66, POD);
  LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 30);
  LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  LODOP.SET_PRINT_STYLEA(0, "TextFrame", 11);


};

//打印底板
function printTemp() {
  //表格底版
  LODOP.ADD_PRINT_LINE(53, "74mm", 52, "98mm", 0, 1);
  LODOP.ADD_PRINT_LINE(137, "2.00mm", 136, "98mm", 0, 1);
  LODOP.ADD_PRINT_LINE(243, "2.00mm", 242, "98mm", 0, 1);
  LODOP.ADD_PRINT_LINE(341, "2.00mm", 340, "98mm", 0, 1);
  LODOP.ADD_PRINT_LINE(387, "5.7pt", 386, "98mm", 0, 1);
  LODOP.ADD_PRINT_LINE(495, "2.00mm", 495, "98mm", 0, 1);
  LODOP.ADD_PRINT_LINE(53, 279, "36.00mm", 280, 0, 1);
  LODOP.ADD_PRINT_LINE(340, "35mm", "64.00mm", 133, 0, 1);
  LODOP.ADD_PRINT_LINE(339, "67.0mm", "64.00mm", 254, 0, 1);
  LODOP.ADD_PRINT_LINE(340, "77.00mm", "64.00mm", 292, 0, 1);
  LODOP.ADD_PRINT_LINE(266, "2.00mm", 265, "35mm", 0, 1);
  LODOP.ADD_PRINT_LINE(307, "2.00mm", 306, "35mm", 0, 1);
  LODOP.ADD_PRINT_LINE(306, "77.00mm", 305, "98mm", 0, 1);
  //文字底版
  LODOP.ADD_PRINT_TEXT(95, 67, 53, 16, "子单号");
  LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
  LODOP.ADD_PRINT_TEXT(113, 66, 53, 16, "母单号");
  LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 10);
  LODOP.ADD_PRINT_TEXT(57, 285, 44, 32, "T");
  LODOP.SET_PRINT_STYLEA(0, "FontName", "Arial");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 28);
  LODOP.ADD_PRINT_TEXT(258, 262, 25, 70, "已\r\n验\r\n视");
  LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 14);
  LODOP.SET_PRINT_STYLEA(0, "FontColor", "#C0C0C0");
  //LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
  //LODOP.SET_PRINT_STYLE("FontSize", 10); //字体大小
  //LODOP.ADD_PRINT_TEXT(400, "2.00mm", 92, 42, "增值服务：");
  LODOP.ADD_PRINT_TEXT(400, "30.00mm", 90, 42, "月结卡号:");
  LODOP.ADD_PRINT_TEXT(433, "30.00mm", 90, 42, "托寄物：");
  LODOP.ADD_PRINT_TEXT(466, "30.00mm", 90, 42, "备注：");
  LODOP.ADD_PRINT_ELLIPSE(181, "2.00mm", 35, 35, 0, 1);
  LODOP.ADD_PRINT_ELLIPSE(347, "2.00mm", 35, 35, 0, 1);
  LODOP.ADD_PRINT_TEXT(189, 15, 22, 20, "收");
  LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 14);
  LODOP.ADD_PRINT_TEXT(355, 15, 20, 20, "寄");
  LODOP.SET_PRINT_STYLEA(0, "FontName", "黑体");
  LODOP.SET_PRINT_STYLEA(0, "FontSize", 14);

};