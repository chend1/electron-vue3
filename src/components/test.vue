<template>
    <el-card class="administrator">
        <template #header>
            <span>管理员列表</span>
            <el-button type="primary" round @click="(isShowDialog = true), (isUpdated = false)">
                添加管理员
            </el-button>
        </template>
        <!-- <easy-table :table-params="tableParams">
            <template #operation="{ row, index }">
                <el-button @click="editAdminInfo(row)" type="text">编辑</el-button>
                <el-button @click.native.prevent="removeAdmin(row, index)" type="text">
                    删除
                </el-button>
            </template>
        </easy-table> -->
        <!-- 添加/编辑管理员弹窗 -->
        <el-dialog
            :title="isUpdated ? '编辑管理员' : '添加管理员'"
            width="1200px"
            top="50px"
            center
            destroy-on-close
            :close-on-click-modal="false"
            v-model:visible="isShowDialog"
            @closed="resetDialogData"
        >
            <div class="formTop">
                <easy-form
                    ref="form"
                    :form-params="formParams"
                    :options="changeSelectOptions"
                ></easy-form>
                <el-checkbox
                    v-model="allChecked"
                    class="all-checked"
                    label="全部"
                    @change="handleCheckAllChange"
                ></el-checkbox>
                <div class="formTop">
                    <el-checkbox-group
                        class="checkbox-group-class"
                        v-model="checkboxGroup"
                        size="small"
                        @change="handleCheckedCitiesChange"
                    >
                        <el-checkbox
                            class="checkbox-class"
                            v-for="item in hospitalList"
                            :label="item.hid"
                            border
                            :key="item.hid"
                        >
                            {{ item.name }}
                        </el-checkbox>
                    </el-checkbox-group>

                    <easy-pagination
                        :total="paginationParams.total"
                        v-model:page="paginationParams.page"
                        v-model:limit="paginationParams.length"
                        :hide-on-single-page="true"
                        @pagination="getHospitalList"
                    ></easy-pagination>
                </div>
            </div>
            <template #footer>
                <el-button @click="isShowDialog = false" round>取 消</el-button>
                <el-button type="primary" @click="confirmDialogForm" round>确 定</el-button>
            </template>
        </el-dialog>
    </el-card>
</template>

<script>
// import permissionManagement from "@/api/permissionManagement";
// import systemManagement from "@/api/systemManagement.js";

export default {
//     name: "Admin",
//     data() {
//         return {
//             tableParams: {
//                 loading: false,
//                 columnProps: [
//                     { label: "账号", prop: "phone" },
//                     { label: "姓名", prop: "name" },
//                     { label: "最近登陆时间", prop: "last_time" },
//                     { label: "创建时间", prop: "create_time" },
//                     { label: "操作", slots: { default: "operation" } },
//                 ],
//                 data: [],
//             },

//             //编辑医院
//             changeSelectOptions: {}, //easyForm option
//             formParams: {
//                 data: {}, // 表单数据对象
//                 formList: {
//                     name: {
//                         type: "text",
//                         label: "姓名",
//                         placeholder: "请输入姓名",
//                         disabled: false,
//                     },
//                     phone: {
//                         type: "text",
//                         label: "手机号",
//                         placeholder: "请输入手机号",
//                         disabled: false,
//                     },
//                     password: {
//                         type: "text",
//                         label: "密码",
//                         placeholder: "请输入密码",
//                         isPassword: true,
//                     },
//                     // hospitalList: {
//                     //     type: "select",
//                     //     label: "医院",
//                     //     placeholder: "请选择关联医院",
//                     //     multiple: true,
//                     //     options: [],
//                     // },
//                 },
//                 rules: {
//                     name: [{ required: true, message: "请输入名称", trigger: "blur" }],
//                     // phone: [
//                     //     {
//                     //         required: true,
//                     //         pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
//                     //         message: "请输入正确的手机号码",
//                     //         trigger: "blur",
//                     //     },
//                     // ],
//                     password: [
//                         {
//                             required: true,
//                             pattern: /^.{6,}$/,
//                             message: "请输入6位数以上密码",
//                             trigger: "blur",
//                         },
//                     ],
//                 },
//                 labelWidth: "100px",
//             },
//             isShowDialog: false,
//             isUpdated: null, // 是否编辑
//             checkboxGroup: [],
//             allChecked: false,
//             paginationParams: {
//                 //分页参数
//                 total: 0,
//                 page: 1,
//                 length: 20,
//             },
//             // 医院列表
//             hospitalList: [],
//             //所有选中的医院列表
//             hospitaAlllList: [],
//             // 全选初始状态
//             startAllType: false,
//             // 初始选中项
//             startSelect: [],
//             // 当前页之外的选中项
//             outSideSelect: [],
//         };
//     },
//     watch: {
//         isUpdated() {
//             this.formParams.formList["name"].disabled = this.isUpdated;
//             this.formParams.formList["phone"].disabled = this.isUpdated;
//             this.formParams.formList["password"].label = this.isUpdated ? "新密码" : "密码";
//             this.formParams.rules["password"][0].required = !this.isUpdated;
//         },
//     },
//     created() {
//         this.getAdminList();
//         this.getHospitalList();
//     },
//     methods: {
//         // 管理员列表
//         async getAdminList() {
//             this.tableParams.loading = true;
//             const result = await permissionManagement.getAdminList();
//             this.tableParams.loading = false;
//             this.tableParams.data = [];
//             result.list.forEach((item) => {
//                 this.tableParams.data.push(item);
//             });
//         },
//         // 医院列表
//         async getHospitalList() {
//             const { page, length } = this.paginationParams;
//             const data = {
//                 page,
//                 length,
//                 // keyword: "",
//             };
//             await systemManagement
//                 .getHospitalList(data)
//                 .then((result) => {
//                     this.hospitalList = result.list;
//                     this.paginationParams.total = result.count; //用于分页
//                     // 更新全选
//                     let allList = this.hospitalList.map((item) => {
//                         return item.hid;
//                     });
//                     // --------------
//                     console.log("page", page);
//                     if (this.startAllType && this.hospitaAlllList[page - 1] === undefined) {
//                         this.hospitaAlllList[page - 1] = allList;
//                         console.log("ces:123");
//                     }
//                     if (!this.startAllType && this.hospitaAlllList[page - 1] === undefined) {
//                         let newArr = new Set(this.startSelect);
//                         this.hospitaAlllList[this.paginationParams.page - 1] = allList.filter(
//                             (item) => newArr.has(item)
//                         );
//                         // 获取剩余选项
//                         let checkArr = new Set(
//                             this.hospitaAlllList[this.paginationParams.page - 1]
//                         );
//                         this.outSideSelect = this.outSideSelect.filter(
//                             (item) => !checkArr.has(item)
//                         );
//                         console.log("this.outSideSelect", this.outSideSelect);
//                     }
//                     this.checkboxGroup = this.hospitaAlllList[this.paginationParams.page - 1];
//                     this.allChecked = this.checkboxGroup.length === this.hospitalList.length;
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         },
//         editAdminInfo(row) {
//             console.log(row);
//             let allList = this.hospitalList.map((item) => {
//                 return item.hid;
//             });
//             // 获取选中项
//             if (row.select_hid && row.select_hid !== 0) {
//                 this.startSelect = row.select_hid.split(",").map(Number);
//                 let newArr = new Set(this.startSelect);
//                 this.checkboxGroup = allList.filter((item) => newArr.has(item));
//                 // 获取剩余选项
//                 let checkArr = new Set(this.checkboxGroup);
//                 this.outSideSelect = this.startSelect.filter((item) => !checkArr.has(item));
//                 console.log(newArr, this.checkboxGroup, this.outSideSelect);
//             }
//             if (row.select_hid === 0) {
//                 // 全选
//                 this.startAllType = true;
//                 this.allChecked = true;
//                 this.checkboxGroup = allList;
//             }
//             this.hospitaAlllList = [];
//             this.hospitaAlllList[this.paginationParams.page - 1] = this.checkboxGroup;
//             console.log(this.hospitaAlllList);
//             console.log("this.checkboxGroup", this.checkboxGroup);
//             this.isShowDialog = this.isUpdated = true;
//             this.formParams.data = { ...row, phone: row.phone };
//         },
//         //绑定医院
//         addBindHospital() {
//             console.log("绑定医院", this.checkboxGroup);
//         },
//         confirmDialogForm() {
//             this.$refs["form"].validate((valid) => {
//                 if (!valid) {
//                     return;
//                 }
//                 this.isUpdated ? this.update() : this.create();
//                 // this.getHospitalList();
//                 // this.getAdminList();
//                 // this.isShowDialog = false;
//             });
//         },
//         // 添加
//         async create() {
//             let select_hid = "";
//             if (this.startAllType) {
//                 select_hid = 0;
//             } else {
//                 this.hospitaAlllList.forEach((element) => {
//                     select_hid = select_hid + "," + element;
//                 });
//                 select_hid = select_hid.substring(1);
//             }
//             await permissionManagement.createAdmin({
//                 ...this.formParams.data,
//                 select_hid,
//             });
//             this.isShowDialog = false;
//             this.$message.success("添加成功");
//             this.getAdminList();
//         },
//         // 编辑
//         async update() {
//             let select_hid = "";
//             let total = 0;
//             this.hospitaAlllList.forEach((item) => (total += item.length));
//             total += this.outSideSelect.length;
//             let isAll = this.paginationParams.total === total;
//             console.log(isAll);
//             if (isAll) {
//                 // 判断全选
//                 select_hid = 0;
//             } else {
//                 // 选中选项
//                 this.hospitaAlllList.forEach((item) => {
//                     item.forEach((element) => {
//                         if (typeof element === "number") {
//                             select_hid = select_hid + "," + element;
//                         }
//                     });
//                 });
//                 if (this.outSideSelect.length > 0) {
//                     this.outSideSelect.forEach((item) => {
//                         select_hid = select_hid + "," + item;
//                     });
//                 }
//                 select_hid = select_hid.substring(1);
//             }
//             // select_hid = 0;
//             console.log(select_hid);
//             // console.log(select_hid.split(",").length);
//             const { did, name, password } = this.formParams.data;
//             await permissionManagement.updateAdmin({
//                 did,
//                 name,
//                 password: password,
//                 select_hid,
//             });
//             if (name === this.$store.state.user.name) {
//                 this.$message.success("修改成功，请重新登陆");
//                 await this.$store.dispatch("user/logout");
//             } else {
//                 this.$message.success("修改成功");
//             }
//             // 更新列表
//             this.getAdminList();
//             this.isShowDialog = false;
//         },
//         //删除
//         removeAdmin(row, index) {
//             this.$confirm("是否删除管理员", "提示", {
//                 confirmButtonText: "确定",
//                 cancelButtonText: "取消",
//                 type: "warning",
//             }).then(async () => {
//                 await permissionManagement.removeAdmin({ did: row.did });
//                 this.tableParams.data.splice(index, 1);
//                 this.$message.success("删除成功");
//             });
//         },
//         resetDialogData() {
//             this.formParams.data = {};
//         },
//         // 全选事件
//         handleCheckAllChange(val) {
//             console.log(this.hospitalList);
//             // 全选列表
//             this.allChecked = val;
//             let allList = this.hospitalList.map((item) => {
//                 return item.hid;
//             });
//             console.log("this.allChecked", this.allChecked, allList);
//             this.checkboxGroup = val ? allList : [];
//             this.hospitaAlllList[this.paginationParams.page - 1] = val
//                 ? allList
//                 : [{ isNull: true }];
//         },
//         // 选项点击事件
//         handleCheckedCitiesChange(value) {
//             console.log(value);
//             let checkedCount = value.length;
//             this.hospitaAlllList[this.paginationParams.page - 1] =
//                 checkedCount === 0 ? [{ isNull: true }] : value;
//             this.allChecked = checkedCount === this.hospitalList.length;
//         },
//     },
};
</script>
<style scoped lang="less">
// .administrator {
//     /deep/ .el-card__header {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//     }

//     .formTop {
//         /deep/ .el-input {
//             width: 230px;
//         }
//     }
//     .checkbox-group-class {
//         .checkbox-class {
//             min-width: 230px;
//             margin: 10px 20px;
//         }
//     }
//     .all-checked {
//         margin: 10px 20px;
//     }
// }
</style>
