import { Picture } from "./picture";

export class PictureResponse {
    pictures: Picture[];
    page: number;
    pageCount: number;
    hasMore: boolean;
}
