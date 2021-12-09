<!--
 * @page: 
 * @Author: Orts
 * @Date: 2021-12-09 13:54:32
 * @LastEditTime: 2021-12-09 18:07:24
 * @LastEditors: Orts
 * @Description: 
 * @FilePath: /xlsx-in-vue3/README.md
-->
# xlsx-in-vue3
嵌套在网页中的电子表格  
vite+Vue3+element-plus+xlsx+x-data-spreadsheet

[demo](https://time-coding.github.io/xlsx-in-vue3/)

## 依赖
核心依赖：
- [SheetJs](https://github.com/SheetJS/sheetjs)
- [x-data-spreadsheet](https://github.com/myliang/x-spreadsheet)

## 说明
- 本代码只是**demo**。
- 初始化数据是test.xlsx文件，通过ajax访问本地文件来达到解析xlsx文件的目标。  
- 场景目前只有两种，一种是通过ajax请求文件，返回arraybuffer格式的文件。另一种是upload上传

  ```js
  const url = "test.xlsx";
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  request.send(null); 
  request.onload = function () {
    if (request.status == 200) {
      const workbook = XLSX.read(request.response);
      s = new Spreadsheet("#xel", options);
      s.loadData(stox(workbook));
    }
  };
  ```

- 代码中有两种Object，一个是workbook是sheet对象，另一种是Spreadsheet是样式渲染对象。workbook实例要想被使用，需要转化成Spreadsheet需要的格式，不能直接使用，`excel.js`提供了stox方法，可以将workbook实例转化成Spreadsheet可加载的数据。
