import { Add as AddIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Link, Pagination, TextField, Typography } from '@mui/material';
import React from 'react';
import UserTable from '../../components/users/UserTable';
import { usePessoaService } from '../../services/pessoa.service';
import type { IPessoaDTO } from '../../models/pessoa.model';

const UserManagementPage: React.FC = () => {
  const pessoaService = usePessoaService();
  const [users, setUsers] = React.useState<IPessoaDTO[]>([]);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const resp = await pessoaService.findList(null);

        if (mounted && resp.data) {
          const lista: IPessoaDTO[] = (resp.data as any).content ?? resp.data;
          setUsers(lista);
        }
      } catch (err) {
        console.error('[API] erro em pessoa.findList:', err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [pessoaService]);

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
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{ borderRadius: '8px', color: 'text.primary', borderColor: '#e0e0e0' }}
          >
            Filtro
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            disableElevation
            sx={{
              borderRadius: '8px',
              backgroundColor: '#2e7d32',
              '&:hover': { backgroundColor: '#1b5e20' },
            }}
          >
            Adicionar Usuário
          </Button>
        </Box>
      </Box>

      <UserTable users={users} />

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
    </Box>
  );
};

export default UserManagementPage;
