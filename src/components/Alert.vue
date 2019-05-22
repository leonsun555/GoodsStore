<template>
  <fade-transition>
    <div class="alert" :class="[`alert-${type}`]" role="alert" v-if="visible" style="position: fixed;right: 0;bottom: 0; z-index: 1000;">
      <slot v-if="!dismissible"></slot>
      <div v-else class="container">
        <slot></slot>
        <slot name="dismiss-icon">
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="dismissAlert"
          >
            <span aria-hidden="true">
              <i class="now-ui-icons ui-1_simple-remove"></i>
            </span>
          </button>
        </slot>
      </div>
    </div>
  </fade-transition>
</template>
<script>
import { FadeTransition } from 'vue2-transitions';
import { globalboolean } from "../main";

export default {
  name: 'alert',
  components: {
    FadeTransition
  },
  props: {
    type: {
      type: String,
      default: 'default',
      description: 'Alert type'
    },
    dismissible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: true
    };
  },
  methods: {
    dismissAlert() {
      this.visible = false;
      globalboolean.$emit("setB", false);
      globalboolean.$emit("setE", false);
    }
  }
};
</script>
