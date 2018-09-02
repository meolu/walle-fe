<template>
    <div class="wl-content">
        <slot></slot>
    </div>
</template>

<style lang="scss">
@import 'scss';

@include b(content) {
    height: 100%;
    flex-grow: 1;
    overflow: auto;
}

</style>
