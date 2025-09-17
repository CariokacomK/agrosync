import { AddCircleOutline as AddIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Link, Pagination, TextField, Typography } from '@mui/material';
import React from 'react';
import UserTable from '../../components/users/UserTable';
import type { DisplayUser } from "../../components/users/UserTable"
import { usePessoaService } from '../../services/pessoa.service';
import { useUsuarioService } from '../../services/usuario.service';
import AddUserModal from '../../components/users/AddUserModal';
import EditUserModal from '../../components/users/EditUserModal';

const UserManagementPage: React.FC = () => {
  const pessoaService = usePessoaService();
  const usuarioService = useUsuarioService();

  const [users, setUsers] = React.useState<DisplayUser[]>([]);
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<DisplayUser | null>(null);

  const loadUsers = React.useCallback(async () => {
    try {
      const resp = await (usuarioService.findList?.(null));
      const raw: any[] = (resp?.data as any)?.content ?? resp?.data ?? resp ?? [];

      const usuarios = raw.map((u: any) => ({
        ...u,
        id: u.id == null ? '' : String(u.id),
        pessoa_id: u.pessoa_id == null ? null : String(u.pessoa_id),
      }));

      const hasPessoaNested = usuarios.length > 0 && usuarios[0]?.pessoa != null;
      if (hasPessoaNested) {
        const mapped = usuarios.map((u: any) => ({
          id: String(u.id),
          nome: u.nome ?? u.pessoa?.nome ?? '—',
          email: u.email ?? u.pessoa?.email ?? null,
          tipo_pessoa: u.pessoa?.tipo_pessoa ?? u.pessoa?.tipoPessoa ?? null,
          ativo: u.ativo ?? true,
          criado_em: u.criado ?? u.createdAt ?? null,
          atualizado_em: u.atualizado ?? u.updatedAt ?? null,
          pessoa_id: u.pessoa_id,
        }));
        setUsers(mapped);
        return;
      }

      const pessoaIds = Array.from(new Set(usuarios.map(u => u.pessoa_id).filter(Boolean)));
      const pessoasMap = new Map<string, any>();
      if (pessoaIds.length > 0) {
        const respP = await (pessoaService.findList?.(null));
        const listaP: any[] = (respP?.data as any)?.content ?? respP?.data ?? respP ?? [];
        listaP.forEach(p => pessoasMap.set(String(p.id), p));
      }

      const mapped = usuarios.map((u: any) => {
        const p = u.pessoa_id ? pessoasMap.get(String(u.pessoa_id)) : undefined;
        return {
          id: String(u.id),
          nome: u.nome ?? p?.nome ?? '—',
          email: u.email ?? p?.email ?? null,
          tipo_pessoa: p?.tipo_pessoa ?? p?.tipoPessoa ?? null,
          ativo: u.ativo ?? true,
          criado_em: u.criado ?? u.createdAt ?? null,
          atualizado_em: u.atualizado ?? u.updatedAt ?? null,
          pessoa_id: u.pessoa_id,
        } as DisplayUser;
      });

      setUsers(mapped);
    } catch (err) {
      console.error('[API] erro ao carregar usuarios:', err);
      setUsers([]);
    }
  }, []);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await loadUsers();
    })();
    return () => {
      mounted = false;
    };
  }, [loadUsers]);

  const handleEdit = (u: DisplayUser) => {
    setEditingUser(u);
    setEditOpen(true);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        backgroundColor: '#fff',
        borderRadius: 9,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Box>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, fontSize: '0.875rem' }}>
          <Link underline="none" color="text.secondary" href="/" sx={{ '&:hover': { textDecoration: 'none' } }}>
            Agro Sync
          </Link>
          <Link underline="none" color="text.secondary" href="/usuarios">
            Usuários & Permissões
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.875rem' }}>
            Gerenciador
          </Typography>
        </Breadcrumbs>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          Gerenciador de Usuários
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Gerencie sua equipe e as permissões de conta aqui.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1" fontWeight="bold" color="text.secondary">
          Total de Usuários <span style={{ color: '#2e7d32' }}>{users.length}</span>
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <TextField size="small" placeholder="Pesquisar" />
          <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ borderRadius: '8px', color: 'text.primary', borderColor: '#e0e0e0' }}>
            Filtro
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            disableElevation
            sx={{ borderRadius: '8px', backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' } }}
            onClick={() => setAddOpen(true)}
          >
            Adicionar Usuário
          </Button>
        </Box>
      </Box>

      <AddUserModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={async () => {
          setAddOpen(false);
          await loadUsers();
        }}
      />

      <UserTable users={users} onEdit={handleEdit} />

      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
        <Pagination
          count={10}
          variant="text"
          shape="rounded"
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              fontWeight: 'medium',
            },
            '& .Mui-selected': {
              backgroundColor: 'rgba(46, 125, 50, 0.1) !important',
              color: '#2e7d32',
            },
          }}
        />
      </Box>

      <EditUserModal
        open={editOpen}
        user={editingUser ?? undefined}
        onClose={() => {
          setEditOpen(false);
          setEditingUser(null);
        }}
        onSaved={async () => {
          setEditOpen(false);
          setEditingUser(null);
          await loadUsers();
        }}
      />
    </Box>
  );
};

export default UserManagementPage;