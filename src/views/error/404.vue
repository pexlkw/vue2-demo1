<template>
<section class="box">
  <div class="notfound">
    <div class="notfound-404"><p>404</p></div>
    <div class="notfound-title">SORRY! PAGE NOT FOUND</div>
    <p class="notfound-text">很抱歉，您正在尋找的頁面不存在或是已刪除，暫時不能使用。</p>
    <router-link :to="'user-manage'" class="notfound-btn">回 首 頁</router-link>
  </div>
</section>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/_settings.scss';
  .box {
    position: relative;
    height: 100vh;
    border-top: 8px solid $color-primary;
    .notfound {
      font-family: 'Maven Pro', sans-serif;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 920px;
      width: 100%;
      line-height: 1.4;
      text-align: center;
      padding-left: 15px;
      padding-right: 15px;
      .notfound-404 {
        position: absolute;
        height: 100px;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: -1;
        p {
          color: $color-primary-light;
          font-weight: 900;
          font-size: 280px;
          margin: 0px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .notfound-title {
        font-size: 46px;
        color: $color-primary-dark;
        font-weight: 900;
        text-transform: uppercase;
        margin: 0px
      }
      .notfound-text {
        font-size: 16px;
        color: $color-primary-dark;
        font-weight: 400;
        text-transform: uppercase;
        margin-top: 15px;
      }
      .notfound-btn {
        font-size: 14px;
        text-decoration: none;
        text-transform: uppercase;
        background: $color-primary;
        display: inline-block;
        padding: 12px 30px;
        border: 2px solid transparent;
        border-radius: 40px;
        color: #fff;
        font-weight: 400;
        margin-top: 20px;
        -webkit-transition: 0.2s all;
        transition: 0.2s all;
        &:hover {
          background-color: #f7f7f8;
          border-color: $color-primary;
          color: $color-primary;
        }
      }
    }
  }
</style>
