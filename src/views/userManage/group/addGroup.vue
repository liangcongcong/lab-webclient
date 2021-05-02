// </<template>
//   <div style="padding:30px;">
//     <div>
//         <el-button plain>从EXCEL批量导入</el-button>
//     </div>
//       <el-form ref="addForm" label-width="100px" :model="addForm">

//         <!-- <el-form-item
//           label="编号："
//           prop="id"
//           :rules="{
//             required: true,
//             message: '不能为空',
//             trigger: 'blur',
//           }"
//         >
//           <el-input v-model="addForm.id" placeholder="必填项" clearable />
//         </el-form-item> -->

//         <el-form-item
//           label="名称："
//           prop="name"
//           :rules="{
//             required: true,
//             message: '不能为空',
//             trigger: 'blur',
//           }"
//         >
//           <el-input v-model="addForm.name" placeholder="必填项" clearable />
//         </el-form-item>
//         <el-form-item
//           label="父级分组："
//         >
//           <el-select
//             v-model="addForm.parentid"
//             placeholder="根分组"
//             filterable
//             style="width: 100%"
//           >
//             <el-option
//               v-for="item in parentOptions"
//               :key="item.id"
//               :label="item.name"
//               :value="item.id"
//             >
//             </el-option>
//           </el-select>
//         </el-form-item>
//         <el-form-item
//           label="分组类型："
//         >
//           <el-select
//             v-model="addForm.typeid"
//             placeholder="选择分组类型"
//             filterable
//             style="width: 100%"
//           >
//             <el-option
//               v-for="item in typeOptions"
//               :key="item.id"
//               :label="item.grouptypename"
//               :value="item.id"
//             >
//             </el-option>
//           </el-select>
//         </el-form-item>
//         <el-form-item
//           label="选择用户"
//         >
//           搜索：
//         <el-input
//             placeholder="请输入内容"
//             style="width: 20%; margin-right: 20px"
//             size="mini"
//         >
//         </el-input>
//         <el-button
//         type="primary"
//         size="mini"
//         icon="el-icon-search"
//         @click="search" >
//         搜索</el-button>
//         </br>
//           <el-checkbox-group v-model="addForm.username">
//             <input type="checkbox" name="hobbies" id="box01" value="敲代码" v-model="hobbies01">
//             <label for="box01"></label>
//           <el-checkbox
//               v-for="item in userList"
//               :lable="item.username"
//           >
//           </el-checkbox>
//           </el-checkbox-group>
//         </el-form-item>
//         <el-form-item style="margin-bottom: 20px">
//           <el-button @click="dialogVisible = false"> 取 消 </el-button>
//           <el-button
//             type="primary"
//             :disabled="submitBtnDisabled"
//             style="margin-left: 20px"
//             @click="submitForm('addForm')"
//           >
//             确 定
//           </el-button>
//         </el-form-item>
//       </el-form>
//   </div>
// </template>
// <script>
// import {
//   getGroupList,
//   addGroup,
//   pagination
// } from "@/api/group";
// import { getAcademyList } from "@/api/academy";
// import { getGroupTypeList } from "@/api/type";
// import { getUserList } from "@/api/user";
// export default {
//   filters: {
//     statusFilter(status) {
//       const statusMap = {
//         published: "success",
//         draft: "gray",
//         deleted: "danger",
//       };
//       return statusMap[status];
//     },
//   },
//   data() {
//     return {
//       list: null,
//       userList: [],
//       options: [],
//       listLoading: true,
//       total: 0,
//       pageNum:1,
//       dialogVisible: false,
//       editDialogVisible: false,
//       listQuery: { page: 1, size: 10 },
//       pageSize: 1,
//       submitBtnDisabled: false,
//       passwordType: "password",
//       typeOptions: [],
//       parentOptions: [],
//       uidList: [],
//       addForm: {
//         id: "",
//         name: "",
//         parentid: 1,
//         typeid: 1,
//         username: "",
//       },
//       multipleSelection: [],
//       pageSize:5
//     };
//   },
//   created() {
//     this.fetchData();
//     this.getTypes();
//     this.getParentids();
//     this.getUsers();
//     getGroupList().then((res)=>{
//       this.total = res.data.length;
//     });
//   },
//   methods: {
//     sizeChange(size){
//       this.pageSize = size;
//       this.fetchData();
//     },
//     async currentPageChange(currentPage){
//       this.listLoading = true;
//       let res = await pagination(currentPage,this.pageSize);
//       this.list = res.data;
//       this.listLoading = false;
//     },
//     handleSelectionChange(val) {
//       this.multipleSelection = val; //当前选中行的数据
//       this.multipleSelection.forEach((el) => {
//         this.uidList.push(el.userUid);
//       });
//     },
//     showPwd() {
//       if (this.passwordType === "password") {
//         this.passwordType = "";
//       } else {
//         this.passwordType = "password";
//       }
//       this.$nextTick(() => {
//         this.$refs.password.focus();
//       });
//     },
//     getTypes() {
//       getGroupTypeList().then((res) => {
//         this.typeOptions = res.data;
//       });
//     },
//     getParentids() {
//       getAcademyList().then((res) => {
//         this.parentOptions = res.data;
//       });
//     },
//     getUsers() {
//       getUserList().then((res) => {
//         this.userList = res.data;
//       });
//     },
//     addDateZero(num) {
//       return num < 10 ? "0" + num : num;
//     },
//     dateFormat(date) {
//       let d = new Date(date);
//       date =
//         d.getFullYear() +
//         "-" +
//         this.addDateZero(d.getMonth() + 1) +
//         "-" +
//         this.addDateZero(d.getDate());
//       return date;
//     },
//     async fetchData() {
//       this.listLoading = true;
//       let res = await pagination(this.pageNum,this.pageSize);
//       this.list = res.data;
//       this.listLoading = false;
//     },
//     async search() {
//       //this.listLoading = true;
//       if (this.stuNum !== "") {
//         let res = await getStudentInfoViewByStuNum(this.stuNum);
//         this.list = [];
//         this.list.push(res.data);
//         this.listLoading = false;
//       } else {
//         await this.fetchData();
//       }
//     },
//     // 展开行效果
//     toogleExpand(row) {
//       const $table = this.$refs.table;
//       // 注意，这里的 this.list 是上面 data 中的 list
//       // 通过比对数据与行里的数据，对展开行进行控制，获取对应值
//       this.list.map((item) => {
//         if (row.id !== item.id) {
//           $table.toggleRowExpansion(item, false);
//         }
//       });
//       $table.toggleRowExpansion(row);
//     },
//     addGroup() {
//       this.dialogVisible = true;
//       this.addForm = {};
//     },
//     submitForm(formName) {
//       const form = this.$refs[formName];
//       form.validate(async (valid) => {
//         if (valid) {
//           console
//           let res = await addGroup(this.addForm);
//           if (res.message === "success") {
//             this.$message({
//               message: "新增成功！",
//               type: "success",
//             });
//           }
//           await this.search();
//           this.dialogVisible = false;
//         }
//       });
//     },
//   },
// };
// </script>
