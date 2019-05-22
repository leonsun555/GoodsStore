<template>
  <navbar
    position="fixed"
    type="info"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template slot-scope="{ toggle, isToggled }">
      <router-link v-if="!isTransparentF" v-popover:popover1 class="navbar-brand" to="/">
        <p style="font-size: 16px">北藝大宣傳品訂購</p>
      </router-link>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="250"
        trigger="hover"
      >
        <div class="popover-body">Designed by TNUA-Admission</div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <n-button
          id="nav-btn"
          v-if="!isTransparentF"
          type="neutral"
          @click.native="modals.classic = true"
        >
          <i class="now-ui-icons arrows-1_cloud-download-93"></i>
          <p style="font-size: 16px">商品訂購</p>
        </n-button>
        <modal id="modalOrder" :show.sync="modals.classic" headerClasses="justify-content-center">
          <h4 slot="header" class="title title-up">訂購列表</h4>
          <!-- <n-button type="success" data-toggle="collapse" data-target="#collapseGoods" block>訂購項目</n-button> -->
          <div class="pre-scrollable">
            <card style="margin:0 auto;" v-for="(good, i) in cartgoods" :key="good.Name">
              <button
                type="button"
                class="close"
                aria-label="Close"
                @click="deleteCartItem(i)"
                style="float: right; font-size: 12px;"
              >
                <span aria-hidden="true">
                  <i class="now-ui-icons ui-1_simple-remove"></i>
                </span>
              </button>
              <!-- <h5 id="Goods_id" v-show="false" class="card-title" style="margin-top: -10px">{{ good.Goods_id }}</h5> -->
              <h5 class="card-title" style="margin-top: -10px">{{ good.Name }}</h5>
              <div class="card-text">
                <label style="float: left;font-size:15px;" for="order_amount">數量：</label>
                <input
                  id="order_amount"
                  class="form-control"
                  type="text"
                  style="float: left; width: 55px;"
                  v-model="cartgoods[i].inputOrder_Amount"
                >
              </div>
              <div class="card-text">
                <label style="float: left; margin-left: 10px" for="price">價格：</label>
                <p id="price">{{ good.Price }}</p>
              </div>
            </card>
          </div>
          <div class="modal-body">
            <div class="form-group form-row md-4">
              <label for="inputEmail" class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-9">
                <input
                  type="email"
                  class="form-control"
                  :class="[inputDetect ? { 'is-valid': !authError, 'is-invalid': authError } : '']"
                  id="inputEmail"
                  v-model="inputEmail"
                >
              </div>
            </div>
            <div v-if="authError" class="form-group row">
              <p class="col-sm-3"></p>
              <p class="col-sm-9 authMessage">{{ authMessage }}</p>
            </div>
            <div class="form-group row">
              <label for="inputFullName" class="col-sm-3 col-form-label">收件人</label>
              <div class="col-sm-9">
                <input
                  id="inputFullName"
                  v-model="inputFullName"
                  :class="[inputDetect1 ? { 'is-valid': !authError1, 'is-invalid': authError1 } : '']"
                  class="form-control"
                  type="text"
                >
              </div>
            </div>
            <div v-if="authError1" class="form-group row">
              <p class="col-sm-3"></p>
              <p class="col-sm-9 authMessage">{{ authMessage1 }}</p>
            </div>
            <div class="form-group row">
              <label for="inputDepartment" class="col-sm-3 col-form-label">系所</label>
              <div class="col-sm-9">
                <input
                  id="inputDepartment"
                  v-model="inputDepartment"
                  class="form-control"
                  type="text"
                  :class="[inputDetect2 ? { 'is-valid': !authError2, 'is-invalid': authError2 } : '']"
                >
              </div>
            </div>
            <div v-if="authError2" class="form-group row">
              <p class="col-sm-3"></p>
              <p class="col-sm-9 authMessage">{{ authMessage2 }}</p>
            </div>
            <div class="form-group row">
              <label for="inputPhone" class="col-sm-3 col-form-label">連絡電話</label>
              <div class="col-sm-9">
                <input
                  id="inputPhone"
                  v-model="inputPhone"
                  class="form-control"
                  type="text"
                  :class="[inputDetect3 ? { 'is-valid': !authError3, 'is-invalid': authError3 } : '']"
                  :placeholder="[authError3 ? authMessage3 : '']"
                >
              </div>
            </div>
            <div v-if="authError3" class="form-group row">
              <p class="col-sm-3"></p>
              <p class="col-sm-9 authMessage">{{ authMessage3 }}</p>
            </div>
            <div class="form-group row">
              <label for="inputOrder_Time" class="col-sm-3 col-form-label">訂購時間</label>
              <div class="col-sm-9">
                <input id="inputOrder_Time" v-model="now" class="form-control" type="text" readonly>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputDemand_Time" class="col-sm-3 col-form-label">需求時間</label>
              <div class="col-sm-9">
                <fg-input>
                  <el-date-picker
                    v-model="datePicker"
                    popper-class="date-picker-primary"
                    type="date"
                    placeholder="Select date"
                    id="inputDemand_Time"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </fg-input>
              </div>
            </div>
          </div>
          <template slot="footer">
            <button type="button" class="btn btn-secondary" @click.prevent="deleteCart">清空列表</button>
            <button
              v-if="authError && authError1 && authError2 && authError3"
              type="button"
              class="btn btn-danger"
              @click.prevent="sendOrder"
            >訂購</button>
            <alert type="success" v-if="sendAlert" dismissible>
              <div class="alert-icon">
                <i class="now-ui-icons ui-2_like"></i>
              </div>
              <strong>{{ serverRes }}</strong>
            </alert>
          </template>
        </modal>
      </li>
    </template>
  </navbar>
</template>

<script>
import * as d3 from "d3";
import {
  DropDown,
  NavbarToggleButton,
  Navbar,
  NavLink,
  Modal,
  Button,
  Card,
  FormGroupInput as FgInput
} from "@/components";
import { Alert } from "@/components";
import { cartElement } from "@/main";
import { mapState } from "vuex";
import { Popover, DatePicker } from "element-ui";
import axios from "axios";
import qs from "querystring";

export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    DropDown,
    Navbar,
    NavbarToggleButton,
    NavLink,
    [Popover.name]: Popover,
    Modal,
    [Button.name]: Button,
    Card,
    FgInput,
    [DatePicker.name]: DatePicker,
    Alert
  },
  data() {
    return {
      modals: {
        classic: false,
        classic2: false
      },
      cartgoods: [],
      now: "",
      datePicker: "",
      inputFullName: "",
      inputDepartment: "",
      inputEmail: "",
      inputPhone: "",
      sendAlert: false,
      serverRes: "",
      authMessage: "",
      authMessage1: "",
      authMessage2: "",
      authMessage3: "",
      authError: false,
      authError1: false,
      authError2: false,
      authError3: false,
      inputDetect: false,
      inputDetect1: false,
      inputDetect2: false,
      inputDetect3: false,
      pickerOptions: {
        disabledDate(time) {
          let myDate = new Date();
          myDate.setDate(myDate.getDate() + 7);
          return time.getTime() <= myDate;
        }
      }
    };
  },
  watch: {
    inputEmail(newVal, oldVal) {
      this.inputDetect = true;
      if (!this._validEmail(newVal)) {
        this.authMessage = "Email格式錯誤!";
        this.authError = true;
      } else {
        this.authError = false;
      }
    },
    inputFullName(newVal, oldVal) {
      this.inputDetect1 = true;
      if (this._validText(newVal)) {
        this.authMessage1 = "請輸入收件人";
        this.authError1 = true;
      } else if (!this._validIlegal(newVal)) {
        this.authMessage1 = "禁止輸入非法字元!";
        this.authError1 = true;
      } else if (!this._validFullName(newVal)) {
        this.authMessage1 = "開頭不得為數字!";
        this.authError1 = true;
      } else {
        this.authError1 = false;
      }
    },
    inputDepartment(newVal, oldVal) {
      this.inputDetect2 = true;
      if (this._validText(newVal)) {
        this.authMessage2 = "請輸入系所!";
        this.authError2 = true;
      } else if (!this._validIlegal(newVal)) {
        this.authMessage2 = "禁止輸入非法字元!";
        this.authError2 = true;
      } else {
        this.authError2 = false;
      }
    },
    inputPhone(newVal, oldVal) {
      this.inputDetect3 = true;
      if (this._validText(newVal)) {
        this.authMessage3 = "請輸入連絡電話!";
        this.authError3 = true;
      } else if (!this._validPhone(newVal)) {
        this.authMessage3 = "請輸入數字!";
        this.authError3 = true;
      } else if (!this._validIlegal(newVal)) {
        this.authMessage3 = "禁止輸入非法字元!";
        this.authError3 = true;
      }
      else {
        this.authError3 = false;
      }
    }
  },
  updated() {
    //監看每個cartgood的Order_Amount有沒有超過剩餘數量
    for (let index in this.cartgoods) {
      this.$watch(
        ["cartgoods", index, "inputOrder_Amount"].join("."),
        (newVal, oldVal) => {
          //超過就設定為剩餘數量
          if (newVal > this.cartgoods[index].Amount) {
            this.cartgoods[index].inputOrder_Amount = this.cartgoods[
              index
            ].Amount;
          }
        }
      );
    }
  },
  created() {
    cartElement.$on("cart", c => {
      this.cartgoods = c;
    });
    var myDate = new Date();
    this.now = myDate.toLocaleString();
  },
  methods: {
    deleteCartItem: function(index) {
      this.cartgoods.splice(index, 1);
    },
    deleteCart: function() {
      this.cartgoods.splice(0, this.cartgoods.length);
    },
    sendOrder: function() {
      if (!this.cartgoods.length == 0) {
        for (var i = 0; i < this.cartgoods.length; i++) {
          this.cartgoods[i].inputFullName = this.inputFullName;
          this.cartgoods[i].inputDepartment = this.inputDepartment;
          this.cartgoods[i].inputEmail = this.inputEmail;
          this.cartgoods[i].inputPhone = this.inputPhone;
          this.cartgoods[i].inputOrder_Time = this.now;
          this.cartgoods[i].inputDemand_Time = this.datePicker;
        }
        axios
          .post(
            "http://localhost:5000/api/order",
            this.$qs.stringify(this.cartgoods)
          )
          .then((this.serverRes = "訂購成功!"));

        this.sendAlert = true;
        setTimeout(() => {
          this.sendAlert = false;
          window.location.href = "/";
        }, 1500);
      } else {
        this.serverRes = "請加入宣傳品";
        this.sendAlert = true;
        setTimeout(() => {
          this.sendAlert = false;
        }, 1500);
      }
    },
    _validEmail: function(email) {
      //email regex驗證
      return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
    },
    _validText: function(text) {
      if (text.length == 0) {
        return true
      } else {
        return false;
      }
    },
    _validFullName: function(name) {
      //輸入開頭不得為數字
      return /^[^0-9][\u4E00-\u9FA5A-Za-z0-9]*$/.test(name);
    },
    _validPhone: function(phone) {
      //僅能輸入數字
      return /^[0-9]*$/.test(phone);
    },
    _validIlegal: function(text) {
      return /[\u4E00-\u9FA5A-Za-z0-9]+$/.test(text);
    }
  },
  computed: {
    //下拉至商品列表時才顯示Navbar
    isTransparentF: function() {
      if (this.$store.state.currentScrollValue > 470) {
        return false;
      } else {
        return true;
      }
    }
  }
};

function replacer(key, value) {
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}
</script>

<style scoped>
#nav-btn {
  margin: -10px 0px;
  padding: 10px;
}
.authMessage {
  color: crimson;
}
</style>
