<template lang="html">
  <div>
    <ul ref="container" class="picLists">
      <li v-for="(item,index) in exhLists" @mouseenter="item.visible=true" @mouseleave="item.visible=false">
        <img v-lazy="item.imgObj"/>
        <div v-if="item.visible" class="dialog">
          <div class="btnGroup">
            <span class="btn" @click="trigger('edit',item,index)">编辑</span>
            <span class="btn" @click="trigger('preview',item,index)">查看</span>
            <span class="btn" @click="trigger('delete',item,index)">删除</span>
          </div>
        </div>
      </li>
   </ul>
    <el-dialog :visible.sync="visible"  :title="title" :size="size">
      <Exhibition-Form ref="updateExh">
        <el-row class="btns" slot="btns">
          <el-button type="primary"  @click="update" :disabled="disabled">立即更新</el-button>
          <el-button  icon="delete" @click="cancel" :disabled="disabled">取消</el-button>
        </el-row>
      </Exhibition-Form>
    </el-dialog>
  </div>

</template>

<script>
import {getWorks,deleteWork} from "@/api"
import {mapActions,mapState} from "vuex"
import utils from "@/utils"
import ExhibitionForm from "@/admin/components/ExhibitionForm.vue"
var origin = '';
export default {
  data(){
    return {
      isShow:true,
      imageUrl:"",
      loading:false,
      disabled:false,
      // picLists:[],
      visible:false,
      type:'',
      size:'',
      title:'',
      isDelete:false
    }
  },
  watch:{
    workInfo:{
      handler(oldVal,newVal){
        if(newVal.works.length<=1){
          this.isDelete = false
        }else{
          this.isDelete = true
        }
      },
      deep:true
    }
  },
  methods:{
    update(){

      this.$refs["updateExh"].$refs["exhForm"].validate(valid=>{
        if(valid){
          this.disabled = true
          console.log(this.exhInfo)
          this.$store.dispatch("updateExhibition",this.exhInfo)
                      .then(()=>{
                        this.$message({
                          message:"保存成功",
                          type: 'success',
                          onClose:()=>{
                            this.visible = false
                            this.disabled = false
                          }
                        })
                      })
        }else{
          this.$message({
            type: 'error',
            message: '请填写完必要的表单字段!',
            onClose:()=>{
              // this.visible = false
              this.disabled = false
            }
          });
        }
      })
    },
    cancel(){
      this.visible = false
    },
    remove(){
      this.$store.commit("REMOVE_FIELD")
    },
    trigger(type,item,index){
      this.type=type
      switch(type){
        case "edit":
        this.size= "full"
        this.title="编辑展览物"
        this.visible=true
        this.$store.dispatch("editExh",item._id).then(re=>{

            console.log(new Date(Date.parse(this.exhInfo.create_time)))
        })
          // 显示编辑的弹出框
          break;
        case "preview":
          // 预览
          break;
        case "delete":
        this.$confirm('此操作将永久删除该作品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("deleteExh",{id:item._id,index})
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
        });
          break;
      }
    }
  },
  components:{
    "Exhibition-Form":ExhibitionForm
  },
  computed:{
    ...mapState(["actionUrl","exhInfo","rules","headRule","exhLists"])
  },
  created(){
    this.$store.dispatch("getExhs")
  }
}
</script>

<style lang="css" scoped>
.picLists{
  display: flex;
  flex-wrap: wrap;
}
.picLists li{
  position: relative;
  margin: 6px;
}
[lazy]{
  width: 230px;
  height: 160px;
  vertical-align: middle;
}
.dialog{
  position: absolute;
  background: rgba(0,0,0,0.4);
  top:0;
  bottom:0;
  left:0;
  right:0;
  color:white;
}
.btnGroup{
  position: absolute;
  top:50%;
  left:50%;

  transform: translate(-50%,-50%);
}
.btn:hover{
  cursor: pointer;
}
.wrap{
  border-radius: 6px;
  box-shadow: 1px 1px 10px  #333333;
  margin-bottom: 30px;
  margin-top: 30px;
}
.form-wrap{
  box-shadow: 1px 1px 10px  #333333;
    border-radius: 6px;
    margin: 40px 60px;
    margin-top:0;
}
.work-form{
  padding: 30px 60px 30px 40px;
  border-top:2px solid  #d9d9d9 ;
  margin-bottom: 30px;
  text-align: left;
}
 .avatar-uploader-icon:hover {
   border-color: #20a0ff;
 }
 .avatar-uploader-icon {
   font-width: 28px;
   color: #8c939d;
   width: 178px;
   height: 178px;
   line-height: 178px;
   text-align: center;
   border: 2px dashed #d9d9d9 ;
   border-radius: 6px;
 }
 .avatar {
   width: 178px;
   height: 178px;
   display: block;
   border-radius: 6px;
 }
.btns{
  padding-bottom: 20px;
  padding-top: 20px;
  border-top:2px solid  #d9d9d9 ;
}
h3{
  margin:16px 0;
  font-width: 18px;
}
.text-center{
  text-align: center;
}
</style>
