<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container" style="font-size: 20px">
      <nav>
        <ul>
          <li>
            <a href="https://w3.tnua.edu.tw/">
              北藝大官網
            </a>
          </li>
          <li>
            <a href="mailto:jacksoon703212@academic.tnua.edu.tw">Email us</a>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }}, Coded by Leon.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
