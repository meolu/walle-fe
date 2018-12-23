<template>
    <div class="wl-content">
        <div class="wl-content__main">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
@import 'scss';

@include b(content) {
    height: 100%;
    flex-grow: 1;
    overflow: auto;

    @include e(main) {
        min-width: 1200px;
        height: 100%;
        overflow: auto;
    }
}

</style>
