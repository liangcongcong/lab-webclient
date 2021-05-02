<template>
  <div style="padding:30px;">
    <div style="margin-bottom: 20px" >
      <el-button size="mini" type="primary" @click="addType"
        >添加分组</el-button
      >
      <el-button size="mini" type="warning" @click="deleteAllGroup()"
        >批量删除</el-button
      >
      <el-button size="mini" type="info"
        >分组导入<i class="el-icon-upload2 el-icon--right"
      /></el-button>
      <el-button size="mini" type="info"
        >分组导出<i class="el-icon-download el-icon--right"
      /></el-button>
    </div>
    <div style="margin-bottom: 20px">
      类型：
      <el-input
        placeholder="请输入内容"
        style="width: 20%; margin-right: 20px"
        size="mini"
        v-model="name"
      >
      </el-input>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-search"
        @click="search" >
        搜索</el-button>

    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      style="width: 100%; margin-bottom: 20px"
      ref="table"
      @selection-change="handleSelectionChange"
      border
      ><el-table-column type="selection" width="40" align="center">
      </el-table-column>

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="编号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="类型ID">
              <span>{{ props.row.typeid }}</span>
            </el-form-item>
            <el-form-item label="父级ID">
              <span>{{ props.row.parentid }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="类型" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.grouptypename }}
        </template>
      </el-table-column>

      <el-table-column label="排它" width="280" align="center">
        <template slot-scope="scope">
          {{ format(scope.row.isexclusive) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="toogleExpand(scope.row)"
            >查看</el-button
          >
          <el-button type="text" size="mini" @click="editType(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="deleteGroup(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>

    </el-table>
    <el-pagination background layout="total,sizes, prev, pager, next"  :current-page ="pageNum" @size-change ="sizeChange" :page-sizes = "[5, 10, 20, 30]" :total="total" :page-size.sync="pageSize" @current-change="currentPageChange">
    </el-pagination>

    <!-- 新增学生弹窗 -->
    <el-dialog title="新增学生" :visible.sync="dialogVisible" width="45%">
      <el-form ref="addForm" label-width="100px" :model="addForm">

        <el-form-item
          label="类型名称："
          prop="grouptypename"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
        <el-input v-model="addForm.grouptypename" placeholder="必填项" clearable />
        </el-form-item>

        <el-form-item
          label="排它："
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
        <input type="radio" id="yes" value="1" v-model="addForm.isexclusive">是
        <input type="radio" id="no" value="0" v-model="addForm.isexclusive">否

        </el-form-item>

        <el-form-item
          label="描述："
          prop="description"
        >
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="addForm.description">
        </el-input>
        </el-form-item>

        <el-form-item style="margin-bottom: 20px">
          <el-button @click="dialogVisible = false"> 取 消 </el-button>
          <el-button
            type="primary"
            :disabled="submitBtnDisabled"
            style="margin-left: 20px"
            @click="submitForm('addForm')"
          >
            确 定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑学生弹窗 -->
    <el-dialog title="编辑分组" :visible.sync="editDialogVisible" width="45%">
      <el-form ref="editForm" label-width="100px" :model="editForm">

        <el-form-item
          label="编号："
          prop="id"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="editForm.id" placeholder="必填项" clearable />
        </el-form-item>

        <el-form-item
          label="类型："
          prop="grouptypename"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
        <el-input v-model="editForm.grouptypename" placeholder="必填项" clearable />
        </el-form-item>

        <el-form-item
          label="排它："
          prop="isexclusive"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
        <input type="radio" id="yes" value="1" v-model="addForm.isexclusive">是
        <input type="radio" id="no" value="0" v-model="addForm.isexclusive">否

        </el-form-item>

        <el-form-item style="margin-bottom: 20px">
          <el-button @click="editDialogVisible = false"> 取 消 </el-button>
          <el-button
            type="primary"
            :disabled="submitBtnDisabled"
            style="margin-left: 20px"
            @click="editSubmitForm('editForm')"
          >
            确 定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getGroupTypeList,
  addGroupType,
  updateGroupType,
  deleteGroupType,
  getGroupTypeByName,
  pagination,
} from "@/api/type";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      userList: [],
      listLoading: true,
      stuNum: "",
      name: "",
      schoolid:"",
      total: 0,
      pageNum:1,
      dialogVisible: false,
      editDialogVisible: false,
      listQuery: { page: 1, size: 10 },
      pageSize: 1,
      submitBtnDisabled: false,
      specialOptions: [],
      passwordType: "password",
      typeOptions: [],
      parentOption: [],
      userOptions: [],
      idList: [],
      addForm: {
        id: "",
        grouptypename: "",
        isexclusive: 1,
        description: "",
      },
      editForm: {
        id: "",
        grouptypename: "",
        isexclusive: 1,
        description: "",
      },
      multipleSelection: [],
      pageSize:5
    };
  },
  created() {
    this.fetchData();
    //this.options();
    getGroupTypeList().then((res)=>{
      this.total = res.data.length;
    });
  },
  methods: {
    format(isexclusive){
     if(isexclusive === 0){
       isexclusive = '否'
     }else if(isexclusive === 1){
       isexclusive = '是'
     }else{
       isexclusive = '/'
     }
     return isexclusive;
    },
    sizeChange(size){
      this.pageSize = size;
      this.fetchData();
    },
    async currentPageChange(currentPage){
      this.listLoading = true;
      let res = await pagination(currentPage,this.pageSize);
      this.list = res.data;
      this.listLoading = false;
    },

    editType(row) {
      this.editDialogVisible = true;
      this.editForm.id = row.id;
      this.editForm.grouptypename = row.grouptypename;
      this.editForm.isexclusive = row.isexclusive;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val; //当前选中行的数据
      this.multipleSelection.forEach((el) => {
        this.idList.push(el.id);
      });
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    addDateZero(num) {
      return num < 10 ? "0" + num : num;
    },
    dateFormat(date) {
      let d = new Date(date);
      date =
        d.getFullYear() +
        "-" +
        this.addDateZero(d.getMonth() + 1) +
        "-" +
        this.addDateZero(d.getDate());
      return date;
    },
    async fetchData() {
      this.listLoading = true;
      let res = await pagination(this.pageNum,this.pageSize);
      this.list = res.data;
      this.listLoading = false;
    },
    async search() {
      //this.listLoading = true;
      if (this.name !== "") {
        let res = await getGroupTypeByName(this.name);
        this.list = [];
        this.list.push(res.data);
        this.listLoading = false;
      } else {
        await this.fetchData();
      }
    },
    // 展开行效果
    toogleExpand(row) {
      const $table = this.$refs.table;
      // 注意，这里的 this.list 是上面 data 中的 list
      // 通过比对数据与行里的数据，对展开行进行控制，获取对应值
      this.list.map((item) => {
        if (row.id !== item.id) {
          $table.toggleRowExpansion(item, false);
        }
      });
      $table.toggleRowExpansion(row);
    },
    addType() {
      this.dialogVisible = true;
      this.addForm = {};
    },
    async deleteGroup(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await deleteGroupType(id);
          if (res.message === "success") {
            this.$message({
              message: "删除成功！",
              type: "success",
            });
          }
          await this.search();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async deleteAllGroup() {
      if(this.idList.length>0){
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await allDeleteGroupType(this.idList);
          if (res.message === "success") {
            this.$message({
              message: "批量删除成功！",
              type: "success",
            });
          }
          this.idList = [];
          await this.search();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      }else{
         this.$message({
            type: "info",
            message: "未选中数据",
          });
      } 
    },
    submitForm(formName) {
      const form = this.$refs[formName];
      form.validate(async (valid) => {
        if (valid) {
          let res = await addGroupType(this.addForm);
          if (res.message === "success") {
            this.$message({
              message: "新增成功！",
              type: "success",
            });
          }
          await this.search();
          this.dialogVisible = false;
        }
      });
    },
    editSubmitForm(formName) {
      const form = this.$refs[formName];
      form.validate(async (valid) => {
        if (valid) {
          let res = await updateGroupType(this.editForm);
          if (res.message === "success") {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
          }
          await this.search();
          this.editDialogVisible = false;
        }
      });
    },
  },
};
</script>
