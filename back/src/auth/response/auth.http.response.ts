import { BaseHttpResponse } from "../../shared/response/http.response";

export class AuthHttpResponse  extends BaseHttpResponse{

    constructor(lenguage: string | undefined) {
        super(lenguage);
    }
}