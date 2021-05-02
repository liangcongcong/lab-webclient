<template>
  <div style="padding:30px;">
    <div style="margin-bottom: 20px">
      <el-button size="mini" type="primary" @click="addGroup"
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
      名称：
      <el-input
        placeholder="请输入内容"
        style="width: 20%; margin-right: 20px"
        size="mini"
        v-model="name"
      >
      </el-input>
      
      分组类型：
      <el-select v-model="typeId" placeholder="分组类型" style="width: 20%; margin-right: 20px">
        <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.grouptypename"
            :value="item.id">
            </el-option>
      </el-select>

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
      <el-table-column label="名称" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="分组类型" width="280" align="center">
        <template slot-scope="scope">
            {{ scope.row.grouptypename}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="toogleExpand(scope.row)"
            >查看</el-button
          >
          <el-button type="text" size="mini" @click="editStudent(scope.row)"
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

        <!-- <el-form-item
          label="编号："
          prop="id"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="addForm.id" placeholder="必填项" clearable />
        </el-form-item> -->

        <el-form-item
          label="名称："
          prop="name"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="addForm.name" placeholder="必填项" clearable />
        </el-form-item>
        <el-form-item
          label="父级分组："
        >
          <el-select
            v-model="addForm.parentid"
            placeholder="根分组"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in parentOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分组类型："
        >
          <el-select
            v-model="addForm.typeid"
            placeholder="选择分组类型"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.id"
              :label="item.grouptypename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择用户"
        >
          搜索：
        <el-input
            placeholder="请输入内容"
            style="width: 20%; margin-right: 20px"
            size="mini"
        >
        </el-input>
        <el-button
        type="primary"
        size="mini"
        icon="el-icon-search"
        @click="search" >
        搜索</el-button>
        </br>
          <el-checkbox-group v-model="addForm.username">
          <el-checkbox
              v-for="item in userList"
              :lable="item.username"
          >
          </el-checkbox>
          </el-checkbox-group>
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
          <el-input v-model="editForm.id" placeholder="" disabled />
        </el-form-item>

          <el-form-item
          label="名称："
          prop="name"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="editForm.name" placeholder="" clearable />
        </el-form-item>

        <el-form-item
          label="父级分组："
          prop="parentid"
        >
          <el-select v-model="editForm.parentid" filterable style="width: 100%" clearable>
            <el-option
              v-for="item in parentOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="分组类型："
          prop="typeid"
        >
          <el-select
            v-model="editForm.typeid"
            placeholder="选择分组类型"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.id"
              :label="item.grouptypename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="选择用户"
          prop="registerdate"
        >
          搜索：
        <el-input
            placeholder="请输入内容"
            style="width: 20%; margin-right: 20px"
            size="mini"
            v-model="stuNum"
        >
        </el-input>
        <el-button
        type="primary"
        size="mini"
        icon="el-icon-search"
        @click="search" >
        搜索</el-button>
        </br>
          <el-checkbox v-model="checked">备选项</el-checkbox>
          <el-checkbox v-model="checked">备选项</el-checkbox>
          <el-checkbox v-model="checked">备选项</el-checkbox>
          <el-checkbox v-model="checked">备选项</el-checkbox>
        </br>
          <el-checkbox v-model="checked">备选项</el-checkbox>
          <el-checkbox v-model="checked">备选项</el-checkbox>
          <el-checkbox v-model="checked">备选项</el-checkbox>
          <el-checkbox v-model="checked">备选项</el-checkbox>
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
  getGroupList,
  addGroup,
  updateGroup,
  deleteGroup,
  allDeleteGroup,
  getGroupByName,
  getGroupByType,
  pagination,
} from "@/api/group";
import { getAcademyList } from "@/api/academy";
import { getGroupTypeList } from "@/api/type";
import { getUserList } from "@/api/user";
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
      schoolid: "",
      total: 0,
      pageNum: 1,
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
      typeId:1,
      addForm: {
        id: "",
        name: "",
        parentid: 1,
        typeid: 1,
        username: "",
      },
      editForm: {
        id: "",
        name: "",
        parentid: 1,
        typeid: 1,
        username: "",
      },
      multipleSelection: [],
      pageSize: 5,
    };
  },
  created() {
    this.fetchData();
    this.getTypes();
    this.getParentids();
    this.getUsers();
    //this.options();
    getGroupList().then((res) => {
      this.total = res.data.length;
    });
  },
  methods: {
    sizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },
    async currentPageChange(currentPage) {
      this.listLoading = true;
      let res = await pagination(currentPage, this.pageSize);
      this.list = res.data;
      this.listLoading = false;
    },

    editStudent(row) {
      this.editDialogVisible = true;
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.parentid = row.parentid;
      this.editForm.typeid = row.typeid;
      this.editForm.username = row.username;
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
    getTypes() {
      getGroupTypeList().then((res) => {
        this.typeOptions = res.data;
      });
    },
    getParentids() {
      getAcademyList().then((res) => {
        this.parentOptions = res.data;
      });
    },
    getUsers() {
      getUserList().then((res) => {
        this.userList = res.data;
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
      let res = await pagination(this.pageNum, this.pageSize);
      this.list = res.data;
      this.listLoading = false;
    },
    async search() {
      let res;
      if (this.name !== "") {
       res= await getGroupByName(this.name);
      } else if(this.typeId !== ""){
       res = await getGroupByType(this.typeId);
      }else{
        await this.fetchData();
      }
        if(res.data.length>=1){
          this.list= res.data;
        }else{
          this.list = [];
          this.list.push(res.data);
        }
        this.total = this.list.length;
        this.listLoading = false;
      
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
    addGroup() {
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
          let res = await deleteGroup(id);
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
      if (this.idList.length > 0) {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let res = await allDeleteGroup(this.idList);
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
      } else {
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
          let res = await addGroup(this.addForm);
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
          let res = await updateGroup(this.editForm);
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
