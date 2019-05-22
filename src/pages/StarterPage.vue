<template>
  <div>
    <div class="page-header clear-filter" filter-color="black">
      <parallax class="page-header-image" style="background-image:url('img/tnua02.jpg')"></parallax>
      <div class="container">
        <div class="content-center brand">
          <img class="n-logo" src="img/tnuaLogo.png" alt>
          <h1 style="color: #000; font-weight: 900;" class="h1-seo">招生宣傳品訂購</h1>
          <h3 style="color: #000; font-weight: 500;">Choose your favor</h3>
        </div>
        <!-- <h6 class="category category-absolute">Paragraph 2</h6> -->
      </div>
    </div>
    <div class="main">
      <div class="container">
        <alert type="success" v-if="clickE" dismissible>
          <div class="alert-icon">
            <i class="now-ui-icons ui-2_like"></i>
          </div>
          <strong>已加入購物車！</strong>
        </alert>
        <alert type="danger" v-if="clickE2" dismissible>
          <strong>宣傳品已存在列表中！</strong>
        </alert>
        <!-- <button type="info" v-on:click="loadData">Refresh</button> -->
        <h2 class="title" style="text-align: center;">宣傳品列表</h2>
        <div class="row justify-content-center">
          <card
            v-for="good in pagedListdata"
            :key="good.Name"
            style="width: 17rem; margin:10px 5px"
          >
            <form>
              <img
                v-if="imgExist"
                slot="image"
                class="card-img-top"
                :src="'Goods_img/' + good.Goods_id.trim() + '/' + good.Goods_id.trim() + '.jpg'"
                alt="Card image cap"
                style="width:250px;height:150px"
              >
              <div>
                <h4 class="card-title">{{ good.Name }}</h4>
                <h6 class="card-subtitle mb-2 text-muted">剩餘數量：{{ good.Amount }}</h6>
                <p class="card-text">價格：{{ good.Price }}</p>
                <n-button
                  type="info"
                  @click.prevent="addCart(good.Name, good.Amount, good.Goods_id, good.Price)"
                >加入購物車</n-button>
              </div>
            </form>
          </card>
        </div>
        <div>
          <paginate
            class="justify-content-center pagination-info"
            :page-count="pageCount"
            :page-range="1"
            :init-page="0"
            :margin-pages="pageCount"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :container-class="'pagination pagination-sm'"
            :prev-class="'page-item prev-page'"
            :prev-link-class="'page-link'"
            :next-class="'page-item page-pre next-page'"
            :next-link-class="'page-link'"
            :click-handler="pageCallback"
          ></paginate>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue';
import { Parallax, Pagination } from "@/components";
import { Card } from "@/components";
import { Button } from "@/components";
import { Alert } from "@/components";
import axios from "axios";
import { cartElement } from "../main";
import { globalboolean } from "../main";

// import VueAxios from 'vue-axios';
// import $ from "jquery";
const PAGE_SIZE = 8;
export default {
  name: "starter",
  bodyClass: "index-page",
  components: {
    Parallax,
    Card,
    [Button.name]: Button,
    Alert
  },
  data() {
    return {
      imgSrc: "",
      imgExist: true,
      servergoods: [],
      globalboolean: false,
      cartgoods: [],
      clickE: false,
      isExist: false,
      clickE2: false,
      currentPage: 1,
      pageCount: 1
    };
  },
  mounted() {
    axios
      .get("http://10.36.3.30:5000/api/get")
      .then(response => (this.servergoods = response.data.recordset));
  },
  watch: {
    servergoods: function(val) {
      this._setPage2Model();
    }
  },
  computed: {
    pagedListdata: function() {
      var vm = this;
      if (vm.servergoods && vm.servergoods.length > 0) {
        return vm.servergoods.filter(function(x) {
          return x.page === vm.currentPage;
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    addCart: function(name, amount, id, price) {
      this.isExist = false;
      for (var i = 0; i < this.cartgoods.length; i++) {
        if (this.cartgoods[i].Name.trim() == name.trim()) {
          this.isExist = true;
        }
      }
      if (!this.isExist) {
        this.cartgoods.push({
          Name: name.trim(),
          Goods_id: id.trim(),
          Amount: amount,
          inputOrder_Amount: "",
          Price: price
        });
        cartElement.$emit("cart", this.cartgoods);
        globalboolean.$emit("setB", true);
        setTimeout(() => {
          globalboolean.$emit("setB", false);
        }, 1500);
      } else {
        globalboolean.$emit("setE", true);
        setTimeout(() => {
          globalboolean.$emit("setE", false);
        }, 1500);
      }
    },
    _setPage2Model: function() {
      var vm = this;

      if (!vm.servergoods || vm.servergoods.length <= 0) {
        vm.pageCount = 1;
      } else {
        vm.pageCount =
          parseInt(vm.servergoods.length / PAGE_SIZE) +
          (vm.servergoods.length % PAGE_SIZE > 0 ? 1 : 0);
        for (let i = 0; i < vm.servergoods.length; i++) {
          vm.$set(vm.servergoods[i], "page", parseInt(i / PAGE_SIZE) + 1);
        }
      }
    },
    pageCallback: function(page) {
      var vm = this;
      this.$set(vm, "currentPage", page);
    }
  },
  created() {
    globalboolean.$on("setB", s => {
      this.clickE = s;
    });
    globalboolean.$on("setE", s => {
      this.clickE2 = s;
    });
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Cinzel');
.starter-page {
  min-height: calc(100vh - 95px);
}
.brand {
  font-family: "Cinzel","FangSong_GB2312","Arial","SimSun",sans-serif;
  
}
</style>

