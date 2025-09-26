import type { AxiosResponse } from 'axios';
import http from '../../helpers/http-common';

export const baseFindById = <C, D, F>(resourceURL: string) => {
    return {
        findCleanById: (id: number | string, params?: Record<string,any>): Promise<AxiosResponse<C>> => http.get(`${resourceURL}/clean/${id}`, {params}),
        findById: (id: number | string, params?: Record<string,any>): Promise<AxiosResponse<D>> => http.get(`${resourceURL}/${id}`, {params}),
        findFullById: (id: number | string, params?: Record<string,any>): Promise<AxiosResponse<F>> => http.get(`${resourceURL}/full/${id}`, {params}),
    }
}