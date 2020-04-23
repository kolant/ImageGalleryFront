<template>
    <div class="gallery">
        <h1 class="pb-3">{{ msg }}</h1>
        
        <div class="container">
            <div class="text-center">
                <b-spinner v-if="!croppedPictures.length" variant="primary" label="Loading..." />
            </div>
            <div class="row" v-if="croppedPictures">
            <div v-for="picture in croppedPictures" :key="picture.id" class="col-lg-3 col-md-4 col-6">
                <a @click="openImage(picture.id)" href="#" class="d-block mb-4 h-100">
                    <b-img :src="picture.cropped_picture" fluid :alt="picture.tags" />
                </a>
            </div>
            </div>
        </div>

        <b-modal id="photo-view" ref="modal" title="Photo View" size="lg">
            <div class="text-center">
                <div class="row">
                    <div class="col-1">
                        <b-icon
                            v-if="detailedPicture && showPrevArrow(detailedPicture.id)"
                            @click="showPrevPicture(detailedPicture.id)"
                            icon="chevron-left"></b-icon>
                    </div>
                    <div class="col-10">
                        <b-spinner v-if="!detailedPicture" variant="primary" label="Loading..." />
                        <div v-if="detailedPicture" class="image-container">
                            <b-img  :src="detailedPicture.full_picture" fluid :alt="detailedPicture.tags" />
                            <div class="overlay">
                                <div class="content">
                                    <p v-if="detailedPicture.author">Author: {{ detailedPicture.author }}</p>
                                    <p v-if="detailedPicture.camera">Camera: {{ detailedPicture.camera }}</p>
                                    <p v-if="detailedPicture.tags">Tags: {{ detailedPicture.tags }}</p>
                                </div>
                                <b-button @click="shareLink(detailedPicture.id)" class="btn btn-secondary share-link">
                                    <b-icon icon="link45deg"></b-icon>
                                </b-button>
                                <p class="share-link-text" v-show="showShareLinkText">{{getShareLink( detailedPicture.id )}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-1">
                        <b-icon
                            v-if="detailedPicture && showNextArrow(detailedPicture.id)"
                            @click="showNextPicture(detailedPicture.id)"
                            icon="chevron-right"></b-icon>
                    </div>
                </div>
            </div>

            <template v-slot:modal-footer>
                <b-button type="button" class="btn btn-secondary mt-3" @click="closeModal()">Ok</b-button>
            </template>
        </b-modal>
  </div>
</template>

<script src="./gallery.ts" />
<style src="./gallery.scss" lang="scss" />
