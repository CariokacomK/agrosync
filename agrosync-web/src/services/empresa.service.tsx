import { baseFindById } from "./base/base-find-id.service";
import { baseFindList } from "./base/base-find-list.service";
import { baseCreate } from "./base/base-create.service";
import { baseDelete } from "./base/base-delete.service";
import { baseUpdate } from "./base/base-update.service";
import type { IEmpresaDTO } from "../models/empresa.model"

export const usePessoaService = () => {
    const resourceURL = '/empresa'

    return{
        ...baseCreate<IEmpresaDTO, IEmpresaDTO, IEmpresaDTO>(resourceURL),
        ...baseFindList<IEmpresaDTO, IEmpresaDTO, IEmpresaDTO >(resourceURL),
        ...baseFindById<IEmpresaDTO, IEmpresaDTO, IEmpresaDTO >(resourceURL),
        ...baseUpdate<IEmpresaDTO, IEmpresaDTO, IEmpresaDTO >(resourceURL),
        ...baseDelete< void >(resourceURL)
    }
}