import { baseFindById } from "./base/base-find-id.service";
import { baseFindList } from "./base/base-find-list.service";
import { baseCreate } from "./base/base-create.service";
import { baseDelete } from "./base/base-delete.service";
import { baseUpdate } from "./base/base-update.service";
import type { IPessoaDTO } from "../models/pessoa.model"

export const usePessoaService = () => {
    const resourceURL = '/pessoa'

    return{
        ...baseCreate<IPessoaDTO, IPessoaDTO, IPessoaDTO>(resourceURL),
        ...baseFindList<IPessoaDTO, IPessoaDTO, IPessoaDTO >(resourceURL),
        ...baseFindById<IPessoaDTO, IPessoaDTO, IPessoaDTO >(resourceURL),
        ...baseUpdate<IPessoaDTO, IPessoaDTO, IPessoaDTO >(resourceURL),
        ...baseDelete< void >(resourceURL)
    }
}