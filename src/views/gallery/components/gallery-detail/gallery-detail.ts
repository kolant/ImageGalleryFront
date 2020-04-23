import { isNull } from "@/utils/utils";
import { pictureService } from "./../../../../services/picture.service";
import { PictureDetail } from "@/models/pictures/picture-detail";
import { Picture } from "./../../../../models/pictures/picture";
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";


@Component
export default class GalleryDetailComponent extends Vue {
    @Prop() croppedPictures: Picture[];
    private pictureId: string;
    private picture: PictureDetail;

    mounted() {
        this.pictureId = this.$route.params.pictureId;
        this.loadPicture();
    }

    async loadPicture() {
        if  (!isNull(this.pictureId)) {
            this.picture = await pictureService.getPictureDetail(this.pictureId);
        }
    }
}
