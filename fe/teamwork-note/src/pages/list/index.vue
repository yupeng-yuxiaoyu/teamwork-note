<template>
  <div class="list">
    <div class="createbox">
      markdown列表
      <el-button type="primary" @click="createAirticle" class="create" v-if="list.length > 0">创建文章</el-button>
      <el-button type="primary" v-else @click="createAirticle">还没有文章，点击创建</el-button>
    </div>
    <ul class="airticle-list" v-if="list.length > 0">
      <li class="list-item" v-for="(item, index) in list" :key="index">
        <div class="msg">
          <div class="title">{{item.title}}</div>
          <div class="content">{{item.content}}</div>
        </div>
        <div class="button-group">
          <el-button type="primary" icon="el-icon-edit" circle @click="goEditor(index)"></el-button>
          <el-button type="success" icon="el-icon-view" circle @click="goPreview(index)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteAirticle(index)"></el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
      }
    },
    mounted () {
      this.$axios.get('http://localhost:3000/api/airticleList').then(res => {
        console.log(res);
        this.list = res.data.data.airticle_list;
      });
    },
    methods: {
      createAirticle() {
        this.$router.push('/edit');
        this.$router.push({path: '/edit', query: {
          create: true,
        }})
      },
      goEditor(i) {
        this.$router.push({path: '/edit', query: {
          id: i,
        }})
      },
      goPreview(i) {
        this.$router.push({path: '/preview', query: {
          id: i,
        }})
      },
      deleteAirticle(i) {
        this.list.splice(i, 1);
        this.$axios.post('http://localhost:3000/api/delete_airticle', {
          id: i,
        }).then(res => {
          console.log('删除成功');
        });
      },
    },
  }
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.list {
  padding: 20px 36px;
  overflow: hidden;
}
.createbox {
  font-size: 30px;
  font-weight: 700;
  overflow: hidden;
}
.create {
  float: right;
}
ul, li {
  list-style: none;
}
.list-item {
  display: flex;
  margin-top: 20px;
  align-items: center;
  .msg {
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .button-group {
    height: 40px;
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }
}

.title {
  font-size: 24px;
  line-height: 30px;
  color: #333;
}
.content {
  font-size: 16px;
  line-height: 20px;
  color: #ccc;
}
</style>