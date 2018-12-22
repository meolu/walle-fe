<template>
    <div class="wl-home">
        <h2>更快，更优，更 Cool !<br>欢迎使用 walle 2.0</h2>
    </div>
</template>
<style lang="scss">
@import 'scss';

@include b(home) {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-image: url('~assets/img/welcom.jpg');

    h2 {
        text-align: center;
        color: rgb(255, 255, 255);
        letter-spacing: 1.94px;
        line-height: 48px;
        font-size: 32px;
        font-weight: 500;
    }
}
</style>
