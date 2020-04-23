import { isNull } from "@/utils/utils";
import { authService, IAuthenticationProvider } from "@/services/auth.service";
import { PictureDetail } from "./../models/pictures/picture-detail";
import { Picture } from "@/models/pictures/picture";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

export class PictureService implements IPictureProvider {
    private baseUrl: string = "http://interview.agileengine.com/images";
    private http: AxiosInstance = null;
    private token: string = null;
    private deferredRequests: any[] = []

    get authService(): IAuthenticationProvider { return authService }

    constructor() {
        this.http = axios.create({
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });

        this.http.interceptors.request.use(c => this.addAuthorizationHeaderInterceptor(c));
    }

    private addAuthorizationHeaderInterceptor(config: AxiosRequestConfig) {
        if (isNull(this.authService.token)) {
            this.authService.logIn();
            return config
        }
        config.headers = config.headers || {}
        Object.assign(config.headers, { Authorization: `Bearer ${this.authService.token}` })
        return config
    }

    async getPicturesByPage(page: number = 1): Promise<Picture[]> {
        const response = await this.getPicture(page);
        return response.data.pictures;
    }

    async getAllPictures(): Promise<Picture[]> {
        let pictures: Picture[] = [];
        let hasMore = true;
        let pageNumber = 1;

        do {
            const pictureResponse = await this.getPicture(pageNumber);
            hasMore = pictureResponse.data.hasMore;
            pictures = pictures.concat(pictureResponse.data.pictures);
            pageNumber++;
        } while (hasMore);

        return pictures;
    }

    async getPictureDetail(id: string): Promise<PictureDetail> {
        return await this.fetchPictureDetails(id);
    }

    async getAllDetailedPictures(): Promise<PictureDetail[]> {
        const pictures = await this.getAllPictures();

        const pictureIds = pictures.map(x => x.id);

        return Promise.all(pictureIds.map(this.fetchPictureDetails));
    }

    private async getPicture(page: number): Promise<any> {
        return await this.http.get(`${this.baseUrl}/?page=${page}`)
            .then(response => response);
    }

    private async fetchPictureDetails(id: string): Promise<PictureDetail> {
        return await axios.get(`http://interview.agileengine.com/images/${id}`, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `Bearer ${authService.token}`
                }
            })
            .then(response => response.data)
            .catch(error => console.log(error));
    }
}

export interface IPictureProvider {
    getAllDetailedPictures(): Promise<PictureDetail[]>;
    getPicturesByPage(page: number): Promise<Picture[]>;
    getAllPictures(): Promise<Picture[]>;
    getPictureDetail(id: string): Promise<PictureDetail>;
}

export const pictureService = new PictureService();
