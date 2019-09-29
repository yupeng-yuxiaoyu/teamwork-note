<template>
  <div>
    <mavon-editor v-model="value" @change="changeValue" @save="save" />
    <el-dialog :visible.sync="showGetTitle" title="输入一个文章的标题吧">
      <el-input v-model="airticalTitle" placeholder="请输入内容"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showGetTitle = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import io from "socket.io-client";
  export default {
    socket: null,
    data() {
      return {
        value: "",
        updateFlag: false,
        textarea: null,
        airticalTitle: "",
        showGetTitle: false,
        id: null,
      };
    },
    mounted() {
      if (!this.$route.query.create) {
        this.id = this.$route.query.id;
        this.$axios.get('http://localhost:3000/api/airticle', {
          params: {
            id: this.$route.query.id
          }
        }).then(res => {
          this.airticalTitle = res.data.data.title;
          this.value = res.data.data.content;
        });
      }

      this.socket = io("http://localhost:3000");
      this.socket.on("connect", () => {});
      this.socket.on("changeMessage", res => {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        this.updateFlag = false;
        this.value = res;
        this.$nextTick(() => {
          this.textarea.selectionStart = start;
          this.textarea.selectionEnd = end;
        });
      });
      this.textarea = document.getElementsByTagName("textarea")[0];
    },
    methods: {
      changeValue(val) {
        if (!this.updateFlag) {
          this.updateFlag = true;
          return;
        }
        this.socket.emit("changeMessage", val);
      },
      save() {
        this.showGetTitle = true;
      },
      ok() {
        this.showGetTitle = false;
        if (!this.$route.query.create) {
          this.$axios.post("http://localhost:3000/api/airticle", {
            title: this.airticalTitle,
            content: this.value,
            id: this.id,
          }).then(res => {
            this.$message({
              type: 'success',
              message: '创建成功,3秒后返回列表',
            })
            setTimeout(() => {
              this.$router.push('/list');
            }, 3000);
          });
        } else {
          this.$axios.post('http://localhost:3000/api/create_airticle', {
            title: this.airticalTitle,
            content: this.value,
          }).then(res => {
            this.$message({
              type: 'success',
              message: '更新成功,3秒后返回列表',
            })
            setTimeout(() => {
              this.$router.push('/list');
            }, 3000);
          });
        }
      }
    }
  };
</script>

<style lang="less">
  html,
  body,
  #app,
  #app>div,
  .v-note-wrapper {
    height: 100%;
  }
</style>