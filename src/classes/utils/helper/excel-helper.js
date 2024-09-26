
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function downloadFile(fileName, content) {
  let aLink = document.createElement('a');
  let blob = base64ToBlob(content); //new Blob([content]);

  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);

  // aLink.dispatchEvent(evt);
  //aLink.click()
  aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));//兼容火狐
}
//base64转blob
function base64ToBlob(code) {
  let parts = code.split(';base64,');
  let contentType = parts[0].split(':')[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;

  let uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}

export function exportToExcel(arrayOfExportToExcel, name) {
  if (Array.isArray(arrayOfExportToExcel) && arrayOfExportToExcel.length) {
    downloadExl(arrayOfExportToExcel, name);
  }
}
function downloadExl(data, name) {
  var keys = Object.keys(data[0]);
  var firstRow = {};
  keys.forEach(function (item) {
    firstRow[item] = item;
  });
  data.unshift(firstRow);

  var content = {};

  // 把json格式的数据转为excel的行列形式
  var sheetsData = data.map(function (item, rowIndex) {
    return keys.map(function (key, columnIndex) {
      return Object.assign({}, {
        value: item[key],
        position: (columnIndex > 25 ? getCharCol(columnIndex) : String.fromCharCode(65 + columnIndex)) + (rowIndex + 1),
      });
    });
  }).reduce(function (prev, next) {
    return prev.concat(next);
  });

  sheetsData.forEach(function (item, index) {
    content[item.position] = { v: item.value };
  });

  //设置区域,比如表格从A1到D10,SheetNames:标题，
  var coordinate = Object.keys(content);
  var workBook = {
    SheetNames: ["Sheet"],
    Sheets: {
      "Sheet": Object.assign({}, content, { "!ref": coordinate[0] + ":" + coordinate[coordinate.length - 1] }),
    }
  };
  //这里的数据是用来定义导出的格式类型
  var excelData = XLSX.write(workBook, { bookType: "xlsx", bookSST: false, type: "binary" });
  var blob = new Blob([string2ArrayBuffer(excelData)], { type: "" });
  saveAs(blob, `${name}.xlsx`);
}
//字符串转字符流
function string2ArrayBuffer(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
  let temCol = "",
    s = "",
    m = 0
  while (n > 0) {
    m = n % 26 + 1
    s = String.fromCharCode(m + 64) + s
    n = (n - m) / 26
  }
  return s
}