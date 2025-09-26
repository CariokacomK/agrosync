import type { AxiosResponse } from 'axios';
import http from '../../helpers/http-common';

export const baseDelete = <R = void>(resourceURL: string) => {
  return {
    remove: (id: number | string): Promise<AxiosResponse<R>> => {
      return http.delete<R>(`${resourceURL}/${id}`);
    },
  };
};
