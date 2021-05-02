</<template>
  <div style="padding:30px;">
    <div>
        <el-button plain>从EXCEL批量导入</el-button>
    </div>
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
  </div>
</template>
<script>
import {
  addGroupType,
  getGroupTypeList,
  pagination
} from "@/api/type";
import { getAcademyList } from "@/api/academy";
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
      options: [],
      listLoading: true,
      total: 0,
      pageNum:1,
      dialogVisible: false,
      editDialogVisible: false,
      listQuery: { page: 1, size: 10 },
      pageSize: 1,
      submitBtnDisabled: false,
      passwordType: "password",
      typeOptions: [],
      parentOptions: [],
      uidList: [],
      addForm: {
        id: "",
        name: "",
        parentid: 1,
        typeid: 1,
        username: "",
      },
      multipleSelection: [],
      pageSize:5
    };
  },
  created() {
    this.fetchData();
    this.getTypes();
    this.getParentids();
    this.getUsers();
    addGroupType().then((res)=>{
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
    handleSelectionChange(val) {
      this.multipleSelection = val; //当前选中行的数据
      this.multipleSelection.forEach((el) => {
        this.uidList.push(el.userUid);
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
    addGroup() {
      this.dialogVisible = true;
      this.addForm = {};
    },
    submitForm(formName) {
      const form = this.$refs[formName];
      form.validate(async (valid) => {
        if (valid) {
          console
          let res = await addType(this.addForm);
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
  },
};
</script>
