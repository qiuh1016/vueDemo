<template>
  <div>
    <nav-bread>
      <li class="breadcrumb-item" aria-current="page"><a href="#/address">Address</a></li>
      <li class="breadcrumb-item" aria-current="page"><a href="#/address/add">Add</a></li>
    </nav-bread>
    <el-form class="container" ref="form" :model="form" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="默认">
        <el-switch v-model="form.isDefault"></el-switch>
      </el-form-item>
      <el-form-item label="标签">
        <el-radio-group v-model="form.tag">
          <el-radio label="家"></el-radio>
          <el-radio label="单位"></el-radio>
          <el-radio label="其他"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import NavBread from '@/components/NavBread';
import axois from 'axios';

export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
        isDefault: false,
        tag: '',
        description: '',
      },
    };
  },
  components: {
    NavBread,
  },
  methods: {
    onSubmit() {
      if (this.form.name === '' || this.form.phone === '' || this.form.address === '') {
        this.$message.error('请输入必要信息');
        return;
      }
      axois.post('/api/address/add', {
        name: this.form.name,
        phone: this.form.phone,
        address: this.form.address,
        isDefault: this.form.isDefault,
        tag: this.form.tag,
        description: this.form.description,
      }).then((result) => {
        const res = result.data;
        if (res.code === 1) {
          this.$message({
            message: res.msg,
            type: 'success',
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

