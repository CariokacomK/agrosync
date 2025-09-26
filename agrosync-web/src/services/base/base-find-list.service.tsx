import http from '../../helpers/http-common';
import type { IAxiosResponseCustom } from '../../models/http.model';

export const baseFindList = <C, D, F>(resourceURL: string) => {
    return {
        findCleanList: (body: any): Promise<IAxiosResponseCustom<C>> => http.get(`${resourceURL}/clean`, body),
        findList: (body: any): Promise<IAxiosResponseCustom<D>> => http.get(`${resourceURL}`, body),
        findFullList: (body: any): Promise<IAxiosResponseCustom<F>> => http.get(`${resourceURL}/full`, body),
    }
}