import http from './../../helpers/http-common';
import type { IAxiosResponseCustom } from './../../models/http.model';

export const baseUpdate = <C, D, F>(resourceURL: string) => {
    return {
        updateClean: (toUpdate: any): Promise<IAxiosResponseCustom<C>> => http.put(`${resourceURL}/clean/${toUpdate.id}`, toUpdate),
        update: (toUpdate: any): Promise<IAxiosResponseCustom<D>> => http.put(`${resourceURL}/${toUpdate.id}`, toUpdate),
        updateFull: (toUpdate: any): Promise<IAxiosResponseCustom<F>> => http.put(`${resourceURL}/full/${toUpdate.id}`, toUpdate),
        patchClean: (toUpdate: any): Promise<IAxiosResponseCustom<C>> => http.patch(`${resourceURL}/clean/${toUpdate.id}`, toUpdate),
        patch: (toUpdate: any): Promise<IAxiosResponseCustom<D>> => http.patch(`${resourceURL}/${toUpdate.id}`, toUpdate),
        patchAll: (toUpdate: any): Promise<IAxiosResponseCustom<D>> => http.patch(`${resourceURL}/all`, toUpdate),
        patchFull: (toUpdate: any): Promise<IAxiosResponseCustom<D>> => http.patch(`${resourceURL}/full/${toUpdate.id}`, toUpdate),
    }
}