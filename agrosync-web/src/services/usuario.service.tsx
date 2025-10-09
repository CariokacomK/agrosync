import { baseFindById } from "./base/base-find-id.service";
import { baseFindList } from "./base/base-find-list.service";
import { baseCreate } from "./base/base-create.service";
import { baseDelete } from "./base/base-delete.service";
import { baseUpdate } from "./base/base-update.service";
import type { IUsuarioDTO } from "../models/usuario.model"

export const useUsuarioService = () => {
    const resourceURL = '/usuario'

    return{
        ...baseCreate<IUsuarioDTO, IUsuarioDTO, IUsuarioDTO>(resourceURL),
        ...baseFindList<IUsuarioDTO, IUsuarioDTO, IUsuarioDTO >(resourceURL),
        ...baseFindById<IUsuarioDTO, IUsuarioDTO, IUsuarioDTO >(resourceURL),
        ...baseUpdate<IUsuarioDTO, IUsuarioDTO, IUsuarioDTO >(resourceURL),
        ...baseDelete< void >(resourceURL)
    }
}