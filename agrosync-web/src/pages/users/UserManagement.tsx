import "./Gerenciador.css";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import HistoryIcon from "@mui/icons-material/History";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import ellipse67 from "./ellipse-67.svg";
import borgesAvatar from './borges.png';
import maranAvatar from './japones.png';

const usuarios = [
  {
    id: 1,
    nome: "Rodrigo Rossetto",
    email: "rodrigorossetto@gmail.com",
    acesso: "Administrador",
    ultimaAtividade: "10 de set, 2025",
    dataInclusao: "4 de ago, 2025",
    avatar: ellipse67,
  },
  {
    id: 2,
    nome: "Gabriel Borges",
    email: "gbborges@gmail.com",
    acesso: "Usuario",
    ultimaAtividade: "4 de set, 2025",
    dataInclusao: "4 de ago, 2025",
    avatar: borgesAvatar,
  },
  {
    id: 3,
    nome: "Gabriel de Moura Motta",
    email: "gabrieldemmoura12@gmail.com",
    acesso: "Gestor",
    ultimaAtividade: "10 de set, 2025",
    dataInclusao: "4 de ago, 2025",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    nome: "Nicolas Maran",
    email: "niclasm7rna@gmail.com",
    acesso: "Administrador",
    ultimaAtividade: "11 de set, 2025",
    dataInclusao: "2 de ago, 2025",
    avatar: maranAvatar,
  },
  {
    id: 5,
    nome: "Julia Alencar",
    email: "julia.alencar@gmail.com",
    acesso: "Usuario",
    ultimaAtividade: "25 de set, 2025",
    dataInclusao: "12 de set, 2025",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    nome: "Pedro Souza",
    email: "pedro.souza@gmail.com",
    acesso: "Gestor",
    ultimaAtividade: "20 de ago, 2025",
    dataInclusao: "15 de jul, 2025",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    nome: "Ana Clara Lima",
    email: "ana.clara@gmail.com",
    acesso: "Administrador",
    ultimaAtividade: "15 de set, 2025",
    dataInclusao: "10 de set, 2025",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    nome: "Lucas Ferreira",
    email: "lucas.f@gmail.com",
    acesso: "Usuario",
    ultimaAtividade: "10 de jul, 2025",
    dataInclusao: "10 de jul, 2025",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    nome: "Mariana Santos",
    email: "mariana.santos@gmail.com",
    acesso: "Gestor",
    ultimaAtividade: "12 de set, 2025",
    dataInclusao: "8 de set, 2025",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    nome: "Carlos Eduardo",
    email: "carlos.e@gmail.com",
    acesso: "Usuario",
    ultimaAtividade: "5 de set, 2025",
    dataInclusao: "1 de set, 2025",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469e3a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    nome: "Fernanda Costa",
    email: "fernanda.c@gmail.com",
    acesso: "Administrador",
    ultimaAtividade: "30 de ago, 2025",
    dataInclusao: "25 de ago, 2025",
    avatar: "https://images.unsplash.com/photo-1491349174775-aa3449195c52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    nome: "Rafael Oliveira",
    email: "rafael.o@gmail.com",
    acesso: "Gestor",
    ultimaAtividade: "22 de ago, 2025",
    dataInclusao: "18 de ago, 2025",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0f128c1c53?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    nome: "Beatriz Nogueira",
    email: "beatriz.n@gmail.com",
    acesso: "Usuario",
    ultimaAtividade: "15 de ago, 2025",
    dataInclusao: "10 de ago, 2025",
    avatar: "https://images.unsplash.com/photo-1593529458925-5f32b137f8f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  
];

const Gerenciador = () => {
  return (
    <div className="gerenciador-container">
      <div className="gerenciador-header">
        <div className="header-info">
          <h1>Gerenciador de Usuários</h1>
          <p>Gerencie sua equipe e as permissões de conta aqui</p>
        </div>
      </div>

      <div className="gerenciador-actions">
        <div className="filtros-e-busca">
          <div className="barra-pesquisa-container">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Pesquisar"
              className="barra-pesquisa"
            />
          </div>
          <button className="btn-filtro">
            <FilterListIcon />
            Filtro
          </button>
        </div>
        <button className="btn-adicionar-usuario">
          <AddIcon />
          Adicionar Usuário{" "}
        </button>
      </div>

      <div className="total-usuarios">
        Total de Usuários{" "}
        <span className="total-numero">{usuarios.length}</span>
      </div>

      <div className="tabela-usuarios-container">
        <table>
          <thead>
            <tr>
              <th>
                <div className="header-content">
                  <PersonOutlineIcon className="header-icon" /> Usuário
                </div>
              </th>
              <th>
                <div className="header-content">
                  <VpnKeyIcon className="header-icon" /> Acesso
                </div>
              </th>
              <th>
                <div className="header-content">
                  <HistoryIcon className="header-icon" /> Última atividade
                </div>
              </th>
              <th>
                {" "}
                <div className="header-content">
                  <CalendarMonthIcon className="header-icon" /> Data de Inclusão
                </div>
              </th>
              <th></th>
            </tr>
          </thead>{" "}
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  <div className="info-usuario-tabela">
                    <img src={usuario.avatar} alt="Avatar" className="avatar" />
                    <div className="detalhes">
                      <strong>{usuario.nome}</strong>
                      <span>{usuario.email}</span>
                    </div>{" "}
                  </div>
                </td>
                <td>
                  <span
                    className={`tag-acesso tag-${usuario.acesso.toLowerCase()}`}
                  >
                    {usuario.acesso}
                  </span>
                </td>
                <td>{usuario.ultimaAtividade}</td>
                <td>{usuario.dataInclusao}</td>
                <td>
                  <button className="btn-opcoes">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="paginacao">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
      </div>
    </div>
  );
};

export default Gerenciador;