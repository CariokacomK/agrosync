import http from '../../helpers/http-common';
import type { IAxiosResponseCustom } from '../../models/http.model';

export const baseCreate = <C, D, F>(resourceURL: string) => {
    return {
        createClean: (body: any): Promise<IAxiosResponseCustom<C>> => http.post(`${resourceURL}/clean`, body),
        create: (body: any): Promise<IAxiosResponseCustom<D>> => http.post(`${resourceURL}`, body),
        createFull: (body: any): Promise<IAxiosResponseCustom<F>> => http.post(`${resourceURL}/full`, body),
        saveAll: (body: any): Promise<IAxiosResponseCustom<D[]>> => http.post(`${resourceURL}/all`, body),
    }
}