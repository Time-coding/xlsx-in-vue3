<!--
 * @page: 
 * @Author: Orts
 * @Date: 2021-12-08 12:02:09
 * @LastEditTime: 2021-12-09 17:58:31
 * @LastEditors: Orts
 * @Description: 
 * @FilePath: /xlsx-in-vue3/src/App.vue
-->
<script setup>
import { reactive, ref, onMounted } from "vue";
import XLSX from "xlsx";
import Spreadsheet from "x-data-spreadsheet";
import "x-data-spreadsheet/dist/locale/zh-cn";
Spreadsheet.locale("zh-cn", window.x_spreadsheet.$messages["zh-cn"]);
import { stox, xtos } from "./excel";

// const testWorkbook = XLSX.readFile("test.xlsx");

const fileList = reactive([]);
const fileRef = ref(null);
let xlsxData = null; // sheet Object
let s = null; // Spreadsheet Object

onMounted(() => {
  loadLocalDemo();
});

// ecel默认配置
const options = {
  mode: "edit", // edit | read 编辑/只读
  showToolbar: true,
  showGrid: true,
  showContextmenu: true,
  view: {
    height: () => document.documentElement.clientHeight,
    width: () => document.documentElement.clientWidth,
  },
  row: {
    len: 100,
    height: 25,
  },
  col: {
    len: 26,
    width: 100,
    indexWidth: 60,
    minWidth: 60,
  },
  style: {
    bgcolor: "#ffffff",
    align: "left",
    valign: "middle",
    textwrap: false,
    strike: false,
    underline: false,
    color: "#0a0a0a",
    font: {
      name: "Helvetica",
      size: 10,
      bold: false,
      italic: false,
    },
  },
};

// 读取本地文件 test.xlsx文件
const loadLocalDemo = () => {
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
};

// excel挂载
const createExcel = (fileList) => {
  if (s?.getData()) document.querySelector("#xel").innerHTML = "";
  const reader = new FileReader();
  reader.readAsArrayBuffer(fileList[0]?.raw);
  reader.onload = (event) => {
    const ArrayBufferData = event.target.result;
    const data = new Uint8Array(ArrayBufferData);

    const workbook = XLSX.read(data, {
      type: "array",
    });
    xlsxData = workbook;
    s = new Spreadsheet("#xel", options);
    s.loadData(stox(workbook));
    fileList.pop();
  };
};

const handleChange = (file, fileList) => {
  console.log(file, fileList);
  if (typeof FileReader === "function" && fileList[0]) {
    createExcel(fileList);
  } else {
    alert("对不起，您的浏览器暂不支持此功能！");
  }
};

// 上传
const send = () => {
  const wopts = { bookType: "xlsx", bookSST: false, type: "base64" };
  const wbout = XLSX.write(xlsxData, wopts);

  const req = new XMLHttpRequest();
  req.open("POST", "/upload", true);
  const formdata = new FormData();
  formdata.append("file", "test.xlsx"); // <-- server expects `file` to hold name
  formdata.append("data", wbout); // <-- `data` holds the base64-encoded data
  req.send(formdata);
};

// 监控修改变化
s?.change((data) => {
  console.log(data, "data");
  // save data to db
});

// data validation
s?.validate();
</script>

<template>
  <el-upload
    class="upload-demo"
    action=""
    ref="fileRef"
    :limit="1"
    :auto-upload="false"
    :on-change="handleChange"
    :file-list="fileList"
    :show-file-list="false"
  >
    <el-button size="small" type="primary">Click to upload</el-button>
  </el-upload>
  <div id="xel"></div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  overflow: hidden;
}

</style>
<style lang="less">
.upload-demo {
  height: 5vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  vertical-align: middle;
}
.x-spreadsheet-menu {
  display: flex;
  flex-direction: row;
  width: 100vw;
  flex-wrap: nowrap;
  height: 70px;
  overflow-x: scroll;
}
#xel {
  height: 93vh;
  position: relative;
}
.x-spreadsheet-bottombar {
  position: absolute;
  bottom: 0px;
  right: 0;
  left: 0;
  z-index: 999;
}
.x-spreadsheet-dropdown {
  position: static;
}
.x-spreadsheet-dropdown.top-left .x-spreadsheet-dropdown-content {
  left: 100px;
  z-index: 999;
}
</style>