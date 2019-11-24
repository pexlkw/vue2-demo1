<template>
  <div class="login">
    <div class="card">
        <h1>LOGIN <span>VEGETABLES</span></h1>
        <form>
            <div class="form-group text-left">
                <label for="exampleInputEmail1 ">帳號</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">請輸入你的E-mail.</small>
            </div>
            <div class="form-group text-left">
                <label for="exampleInputPassword1">密碼</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
             <div id="formFooter" class="text-right">
                <a class="underlineHover" href="#">Forgot Password?</a>
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
        </form>
    </div>

  </div>
</template>

<style lang="scss">
    .login {
        background: url('../assets/login_background.jpg') no-repeat center;
        height: 100vh;
        padding-top: 2em;
        h1 {
            span {
                display: inline-block;
                padding: 0 .2em;
                background-color: #28a745;
                color: #fff;
                font-size: 20px;
                vertical-align: middle;
            }
        }
        .card {
            width: 500px;
            padding: 2em;
            margin: auto;
            background-color: rgba($color: #fff, $alpha: .9);
            border-bottom: 6px solid #28a745;
        }
        label {
            margin-bottom: 0;
            margin-left: 2px;
        }
    }
</style>
