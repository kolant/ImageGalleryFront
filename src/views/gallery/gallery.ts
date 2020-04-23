import { Picture } from "../../models/pictures/picture";
import { pictureService } from "../../services/picture.service";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { PictureDetail } from "@/models/pictures/picture-detail";

@Component
export default class GalleryComponent extends Vue {
    $refs: {
        modal: any
    }

    @Prop() private msg!: string;

    private croppedPictures: Picture[] = [];
    private detailedPicture: PictureDetail = null;
    private showShareLinkText: boolean = false;

    async mounted() {
        this.croppedPictures = await pictureService.getAllPictures();
    }

    async openImage(pictureId: string) {
        this.$refs.modal.show();

        this.detailedPicture = await pictureService.getPictureDetail(pictureId);
    }

    closeModal() {
        this.$refs.modal.hide();
    }

    showPrevArrow(pictureId: string): boolean {
        return this.croppedPictures.map(x => x.id).indexOf(pictureId) > 0;
    }

    showNextArrow(pictureId): boolean {
        return this.croppedPictures.map(x => x.id).indexOf(pictureId) < this.croppedPictures.length - 1;
    }

    getCropedPictureById(pictureId: string) {
        const currentPictureIndex = this.croppedPictures.map(x => x.id).indexOf(pictureId);

        if (currentPictureIndex >= 0) {
            return this.croppedPictures[currentPictureIndex];
        }

        return null;
    }

    async showNextPicture(currentPictureId: string) {
        const currentPictureIndex = this.croppedPictures.map(x => x.id).indexOf(currentPictureId);
        const nextPictureIndex = currentPictureIndex + 1;
        const nextPictureId = this.croppedPictures[nextPictureIndex].id
        this.detailedPicture = await pictureService.getPictureDetail(nextPictureId);
    }

    async showPrevPicture(currentPictureId: string) {
        const currentPictureIndex = this.croppedPictures.map(x => x.id).indexOf(currentPictureId);
        const nextPictureIndex = currentPictureIndex - 1;
        const nextPictureId = this.croppedPictures[nextPictureIndex].id
        this.detailedPicture = await pictureService.getPictureDetail(nextPictureId);
    }

    async shareLink(pictureId: string) {
        this.showShareLinkText = true;

        setTimeout(() => {
            this.showShareLinkText = false
        }, 5000);
    }

    getShareLink(pictureId: string) {
        return `${window.location.origin}/gallery/${pictureId}`;
    }
}
