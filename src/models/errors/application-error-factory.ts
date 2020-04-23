import { AxiosError } from "axios";
import { ApplicationError } from "./application-error";
import { NotFoundError } from "./not-found-error";
import { ValidationError } from "./validation-error";
import { AccessError } from "./access-error";
import { GeneralError } from "./general-error";
import { isNull, get } from "@/utils/utils";

export const createApplicationError = async (e: AxiosError): Promise<ApplicationError> => {
    if (isNull(e)) { return null }
    if (isNull(e.response)) { return new GeneralError(e.message, null, false) }

    const responseData = e.response.data instanceof Blob ? await tryParseBlob(e.response.data) : e.response.data;
    const isGenericError = isNull(responseData) ||
        ((responseData.id && responseData.error) ||
        !isNull(responseData.general));

    if ([401, 403].indexOf(e.response.status) >= 0) {
        return new AccessError(e.message)
    }

    if (e.response.status === 404) {
        return new NotFoundError(e.message)
    }

    if ([400, 500].indexOf(e.response.status) >= 0) {
        return isGenericError
            ? new GeneralError(get(responseData, "error") ||
                            get(responseData, "general[0]") ||
                            e.message, responseData, get(responseData, "silent"))
            : new ValidationError(responseData)
    }

    return new GeneralError(e.message, null, false)
};

const tryParseBlob = async (data: Blob): Promise<any> => {
    let json = null;
    try {
        const resText =  await new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener("loadend", () => {
                resolve(reader.result);
            });
            reader.readAsText(data);
        }) as any;
        json = JSON.parse(resText);
    } catch (err) {
        // TODO: add error handling
    }

    return json;
}
