<template>
  <div class="people">
    <div class="item">
      <div class="avatar">
        <img src="/Member001.jpg" alt="">
      </div>
      <div class="username">admin</div>
    </div>
    <div class="item">
      <div class="avatar">
        <img src="/Member001.jpg" alt="">
      </div>
      <div class="username">admin</div>
    </div>
    <div class="item">
      <div class="avatar">
        <img src="/Member001.jpg" alt="">
      </div>
      <div class="username">admin</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'people'
}
</script>

<style scope>
  .chat-content .people {
    padding: 10px;
    /* flex: 1 1 auto; */
    width: 14rem;
    background: rgb(248, 243, 243);
  }

  .people .item {
    position: relative;
    display: flex;
  }

  .people .item+.item {
    margin-top: 10px;
  }

  .people .item .username {
    margin-left: 0.5rem;
  }
</style>
