<template>
  <transition name="fade" mode="out-in">
    <div>

              <div class="panel-between">
                <div class="panel-start">
                  <button class="ui-btn ui-btn-default" @click="multiDel(null,'删除')"><Icon type="trash-a" color="#FF3333"></Icon>&nbsp;&nbsp;批量删除</button>
                  <button class="ui-btn ui-btn-default" @click="getPubList()"><Icon type="loop" color="#00CC66"></Icon>&nbsp;&nbsp;刷新</button>
                </div>
                <div class="panel-end">
                  <input type="text" v-model="pubSearchText" class="search-input" placeholder="搜索" @input="pubSearch()">
                  <button class="ui-btn ui-btn-default">&nbsp;&nbsp;<Icon type="ios-search" color="#0099ff"></Icon>&nbsp;&nbsp;</button>
                </div>
              </div>
              <el-table style="margin-top:15px;width: 100%" :data="pubList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="remark1" label="类型" > </el-table-column>
                <el-table-column prop="title" label="小区名称" > </el-table-column>
                <el-table-column prop="config.lnum" label="楼栋号" > </el-table-column>
                <el-table-column prop="config.mnum" label="单元号" > </el-table-column>
                <el-table-column prop="config.pnum" label="门牌号" > </el-table-column>
                <el-table-column prop="minPrice" label="售价/租金"> </el-table-column>
                <el-table-column prop="config.name" label="联系人"> </el-table-column>
                <el-table-column prop="config.phone" label="联系方式"> </el-table-column>
                <el-table-column prop="createTime" label="发布时间" width="180"> </el-table-column>
                <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-dropdown size="mini" split-button type="default" trigger="click">
                      <div @click="scope.row.remark1 == '二手房' ? navTo('/houseAgentHandRoomAdd',{id:scope.row.sunwouId}):navTo('/houseAgentRentRoomAdd',{id:scope.row.sunwouId})">编辑</div> 
                      <el-dropdown-menu slot="dropdown">
                        
                        <el-dropdown-item><div style="width:100px;text-align:Center" @click="multiDel(scope.row.sunwouId,'删除')">删除</div></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination style="float:right;margin-top:30px" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="pubQuery.pages.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pubQuery.pages.size"
                layout="total, sizes, prev, pager, next, jumper" :total="pubTotal">
              </el-pagination>
              <div class="clearfix"></div>
    </div>
  </transition>
</template>


<script>
export default {
  data() {
    return {
      pubList: [],
      pubTotal: 0,
      pubSearchText: "",
      multipleSelection: [],
      pubQuery: {
        fields: [],
        wheres: [
          {
            value: "userId",
            opertionType: "equal",
            opertionValue: localStorage.getItem("userId")
          },
          {
            value: "miniId",
            opertionType: "equal",
            opertionValue: localStorage.getItem("miniId")
          },
          {
            value: "isDelete",
            opertionType: "equal",
            opertionValue: false
          },
          {
            value: "remark2",
            opertionType: "equal",
            opertionValue: "userpub"
          }
        ],
        sorts: [
            {value:'createTime',asc:false}
        ],
        pages: {
          currentPage: 1,
          size: 10
        }
      }
    };
  },
  mounted() {
    this.getPubList();
  },
  methods: {
    addToTui(id) {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "collection/add",
        type: "POST",
        data: {
          userId: localStorage.getItem("userId"),
          tableName: "Exhibition",
          tableId: id,
          miniId: localStorage.getItem("miniId"),
          type: JSON.stringify({ type: "首页推荐" })
        },
        dataType: "json",
        success(res) {
          if (res.code) {
            that.$Message.success(res.msg);
          } else {
            that.$Message.error(res.msg);
          }
        }
      });
    },
    getIds() {
      var ids = [];
      for (var i in this.multipleSelection) {
        ids.push(this.multipleSelection[i].sunwouId);
      }
      return ids;
    },
    //批量操作
    multiDel(id, name) {
      var ids = null;
      if (this.getIds().length == 0) {
        ids = id;
      } else {
        ids = this.getIds().toString();
      }
      var that = this;
      this.$Modal.confirm({
        title: "警告",
        content:
          name == "删除"
            ? "<p>删除后数据将无法恢复，确定要继续吗？</p>"
            : "<p>这是批量修改操作，确定要继续吗？</p>",
        loading: true,
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          var ui = this;
          var data = {
            sunwouId: ids
          };
          if (name == "删除") {
            data.isDelete = true;
          } else {
            data.remark2 = name;
          }
          $.ajax({
            url: sessionStorage.getItem("API") + "exh/update",
            type: "POST",
            data: data,
            dataType: "json",
            success(res) {
              if (res.code) {
                ui.$Modal.remove();
                that.$Message.success(res.msg);
                that.getPubList();
              } else {
                that.$Message.error(res.msg);
              }
            }
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //上架下架状态改变
    changeStatus(id, st) {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "exh/update",
        type: "POST",
        data: {
          sunwouId: id,
          remark2: st
        },
        dataType: "json",
        success(res) {
          if (res.code) {
            that.$Message.success(res.msg);
            that.getPubList();
          } else {
            that.$Message.error(res.msg);
          }
        }
      });
    },
    navTo(path, query, params, target) {
      this.$router.push({
        path: path,
        query: query,
        params: params,
        target: target
      });
    },
    pubSearch() {
      if (this.pubQuery.wheres.length == 2) {
        this.pubQuery.wheres.push({
          value: "modelName",
          opertionType: "like",
          opertionValue: this.pubSearchText
        });
      } else {
        this.pubQuery.wheres[2].opertionValue = this.pubSearchText;
      }
      this.getPubList();
    },
    filterTagStatus(value, row) {
      return row.status === value;
    },
    handleSizeChange(val) {
      this.pubQuery.pages.size = val;
      this.getPubList();
    },
    handleCurrentChange(val) {
      this.pubQuery.pages.currentPage = val;
      this.getPubList();
    },
    getPubList() {
      var that = this;
      $.ajax({
        url: sessionStorage.getItem("API") + "exh/find",
        type: "POST",
        data: {
          query: JSON.stringify(this.pubQuery)
        },
        dataType: "json",
        success(res) {
          if (res.code) {
            that.pubList = res.params.result;
            that.pubTotal = res.params.total;
          } else {
            that.$Message.error(res.msg);
          }
        }
      });
    }
  }
};
</script>
