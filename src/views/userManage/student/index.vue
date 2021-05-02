<template>
  <div style="padding:30px;">
    <div style="margin-bottom: 20px">
      <el-button size="mini" type="primary" @click="addStudent"
        >添加学生</el-button
      >
      <el-button size="mini" type="warning" @click="deleteAllStudent()"
        >批量删除</el-button
      >
      <el-button size="mini" type="danger" @click="allChangeStatus(-1)"
        >批量禁用</el-button
      >
      <el-button size="mini" type="success" @click="allChangeStatus(0)"
        >批量启用</el-button
      >
      <el-button size="mini" type="info"
        >学生导入<i class="el-icon-upload2 el-icon--right"
      /></el-button>
      <el-button size="mini" type="info"
        >学生导出<i class="el-icon-download el-icon--right"
      /></el-button>
    </div>
    <div style="margin-bottom: 20px">
      学号：
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
        @click="search"
        >搜索</el-button
      >
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
            <el-form-item label="账号名称">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="账户密码">
              <span>{{ props.row.password }}</span>
            </el-form-item>
            <el-form-item label="邮箱" v-if="props.row.email != null">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="手机号" v-if="props.row.mobile != null">
              <span>{{ props.row.mobile }}</span>
            </el-form-item>
            <el-form-item label="微信号" v-if="props.row.wecharid != null">
              <span>{{ props.row.wecharid }}</span>
            </el-form-item>
            <el-form-item label="QQ号" v-if="props.row.qqid != null">
              <span>{{ props.row.qqid }}</span>
            </el-form-item>
            <el-form-item label="性别" v-if="props.row.sex != null">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="出生日期" v-if="props.row.birthday != null">
              <span>{{ dateFormat(props.row.birthday) }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="学号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.sno }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.realname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学校" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.schoolname }}
        </template>
      </el-table-column>
      <el-table-column label="专业" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.specialtyname }}
        </template>
      </el-table-column>
      <el-table-column label="年级" width="60" align="center">
        <template slot-scope="scope">
          {{ gradeFormat(scope.row.njgrade) }}
        </template>
      </el-table-column>
      <el-table-column label="入学年份" width="110" align="center">
        <template slot-scope="scope">
          {{ dateFormat(scope.row.registerdate) }}
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
            @click="deleteStudent(scope.row.useruid)"
            >删除</el-button
          >
          <el-button
            style="color: red"
            v-if="scope.row.status === 0"
            type="text"
            size="mini"
            @click="changeStatus(scope.row.useruid, -1)"
            >禁用</el-button
          >
          <el-button
            style="color: green"
            v-if="scope.row.status === -1"
            type="text"
            size="mini"
            @click="changeStatus(scope.row.userUid, 0)"
            >启用</el-button
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
          label="学号："
          prop="sno"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="addForm.sno" placeholder="输入学号" clearable />
        </el-form-item>
        <el-form-item
          label="账户："
          prop="realname"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="addForm.realname"
            placeholder="输入学生名称"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="学校："
          prop="schoolid"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-select
            v-model="addForm.schoolid"
            placeholder="请选择学校"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in schoolOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="专业："
          prop="specialid"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-select
            v-model="addForm.specialid"
            placeholder="选择专业"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in specialOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="年级："
          prop="njgrade"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-select
            v-model="addForm.njgrade"
            placeholder="选择年级"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in gradeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="入学年份"
          prop="registerdate"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-date-picker
            v-model="addForm.registerdate"
            type="date"
            style="width: 100%"
            placeholder="选择日期"
          >
          </el-date-picker>
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
    <el-dialog title="编辑学生" :visible.sync="editDialogVisible" width="45%">
      <el-form ref="editForm" label-width="100px" :model="editForm">
        <el-form-item label="学号：" prop="sno">
          <el-input v-model="editForm.sno" disabled />
        </el-form-item>
        <el-form-item label="账户：" prop="realname">
          <el-input v-model="editForm.realname" disabled />
        </el-form-item>
        <el-form-item
          label="学校："
          prop="schoolid"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-select v-model="editForm.schoolid" filterable style="width: 100%">
            <el-option
              v-for="item in schoolOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="专业："
          prop="specialid"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-select v-model="editForm.specialid" style="width: 100%">
            <el-option
              v-for="item in specialOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="年级："
          prop="grade"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-select
            v-model="editForm.grade"
            placeholder="选择年级"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in gradeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="入学年份"
          prop="registerdate"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-date-picker
            v-model="editForm.registerdate"
            type="date"
            style="width: 100%"
          >
          </el-date-picker>
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
  getList,
  addStudent,
  updateStudent,
  deleteStudent,
  allDeleteStudent,
  getStudentInfoViewByStuNum,
  pagination
} from "@/api/student";
import { getSchoolList } from "@/api/school";
import { getSpecialtyList } from "@/api/specialty";
import { allUpdateStatusByUid, updateStatusByUid } from "@/api/user";
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
      gradeOptions:[
        {id:1,name:'大一'},
        {id:2,name:'大二'},
        {id:3,name:'大三'},
        {id:4,name:'大四'}
      ],
      list: null,
      userList: [],
      listLoading: true,
      stuNum: "",
      total: 0,
      pageNum:1,
      dialogVisible: false,
      editDialogVisible: false,
      listQuery: { page: 1, size: 10 },
      pageSize: 1,
      submitBtnDisabled: false,
      specialOptions: [],
      passwordType: "password",
      schoolOptions: [],
      uidList: [],
      addForm: {
        sno: "",
        realname: "",
        schoolid: 1,
        specialid: 1,
        njgrade: "",
        registerdate: "",
      },
      editForm: {
        id:'',
        useruid: "",
        sno: "",
        grade: "",
        realname: "",
        schoolid: 1,
        specialid: 1,
        registerdate: "",
      },
      multipleSelection: [],
      pageSize:5
    };
  },
  created() {
    this.fetchData();
    this.getSchools();
    this.getSpecialtys();
    getList().then((res)=>{
      this.total = res.data.length;
    });    
  },
  methods: {
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

    editStudent(row) {
      this.editDialogVisible = true;
      this.editForm.useruid = row.useruid;
      this.editForm.sno = row.sno;
      this.editForm.grade = row.njgrade;
      this.editForm.realname = row.realname;
      this.editForm.specialid = row.specialid;
      this.editForm.schoolid = row.schoolid;
      this.editForm.registerdate = row.registerdate;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val; //当前选中行的数据
      this.multipleSelection.forEach((el) => {
        this.uidList.push(el.useruid);
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
    getSchools() {
      getSchoolList().then((res) => {
        this.schoolOptions = res.data;
      });
    },
    getSpecialtys() {
      getSpecialtyList().then((res) => {
        this.specialOptions = res.data;
      });
    },
    addDateZero(num) {
      return num < 10 ? "0" + num : num;
    },
    gradeFormat(grade){
      let njgrade ;
      this.gradeOptions.forEach(el=>{
        if(grade === el.id){
          console.log(el.name)
          njgrade =  el.name;
        }
      }) 
      return grade === null ? '/' : njgrade;
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
      if (this.stuNum !== "") {
        let res = await getStudentInfoViewByStuNum(this.stuNum);
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
    addStudent() {
      this.dialogVisible = true;
      this.addForm = {};
    },
    async deleteStudent(uid) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await deleteStudent(uid);
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
    async deleteAllStudent() {
      if(this.uidList.length>0){
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await allDeleteStudent(this.uidList);
          if (res.message === "success") {
            this.$message({
              message: "批量删除成功！",
              type: "success",
            });
          }
          this.uidList = [];
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
          let res = await addStudent(this.addForm);
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
          let res = await updateStudent(this.editForm);
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
    async allChangeStatus(status) {
      //{uidList:this.uidList,status:status}
      if(this.uidList.length>0){
        let res = await allUpdateStatusByUid({
        uidList: this.uidList,
        status: status,
      });
      if (res.message === "success") {
        this.$message({
          message: "批量更新账户状态成功！",
          type: "success",
        });
      }
      this.uidList = [];
      await this.search();
      }else{
        this.$message({
          message: "未选中数据",
          type: "info",
        });
      } 
    },
    async changeStatus(uid, status) {
      let res = await updateStatusByUid(uid, status);
      if (res.message === "success") {
        this.$message({
          message: "更新账户状态成功！",
          type: "success",
        });
      }
      await this.search();
    },
  },
};
</script>
