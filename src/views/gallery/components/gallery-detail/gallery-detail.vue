<template>
    <div class="gallery-detail">
        <div class="text-center">
            <a v-if="picture" @click="openImage(picture.id)" href="#" class="d-block mb-4 h-100">
                <b-img :src="picture.full_picture" fluid :alt="picture.tags" />
            </a>
        </div>
    </div>
</template>

<script src="./gallery-detail.ts" />
<style src="./gallery-detail.scss" lang="scss" />
