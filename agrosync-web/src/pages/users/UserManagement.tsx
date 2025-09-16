import { Add as AddIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Link, Pagination, TextField, Typography } from '@mui/material';
import React from 'react';
import UserTable from '../../components/users/UserTable';

export type User = {
    id: number;
    name: string;
    email: string;
    avatarUrl?: string;
    access: 'Administrador' | 'Gestor' | 'Usuário';
    lastActivity: string;
    includeDate: string;
};

export const mockUsers: User[] = [
    { id: 1, name: 'Rodrigo Rossetto', email: 'rodrigorossetto@gmail.com', access: 'Administrador', lastActivity: '10 de set, 2025', includeDate: '4 de ago, 2025' },
    { id: 2, name: 'Nicolas Maran', email: 'nicolasmaran@gmail.com', access: 'Usuário', lastActivity: '10 de set, 2025', includeDate: '4 de ago, 2025' },
    { id: 3, name: 'Gabriel Borges', email: 'gabrielborges@gmail.com', access: 'Gestor', lastActivity: '10 de set, 2025', includeDate: '4 de ago, 2025' },
    { id: 4, name: 'Bruno Zotarelli', email: 'bruno@gmail.com', access: 'Usuário', lastActivity: '09 de set, 2025', includeDate: '4 de ago, 2025' },
    { id: 5, name: 'Maria Pavezi', email: 'maria@gmail.com', access: 'Usuário', lastActivity: '08 de set, 2025', includeDate: '3 de ago, 2025' },
];

const UserManagementPage: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 2.5, backgroundColor: '#fff', borderRadius: 9, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <Box>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, fontSize: '0.875rem' }}>
                    <Link underline="none" color="text.secondary"  href="/" sx={{'&:hover': {textDecoration: 'none'}}}>Agro Sync</Link>
                    <Link underline="none" color="text.secondary" href="/usuarios">Usuários & Permissões</Link>
                    <Typography color="text.primary" sx={{ fontSize: '0.875rem' }}>Gerenciador</Typography>
                </Breadcrumbs>
                <Typography variant="h5" fontWeight="bold" color='text.primary'>Gerenciador de Usuários</Typography>
                <Typography color="text.secondary" variant="body2">Gerencie sua equipe e as permissões de conta aqui.</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" fontWeight="bold" color='text.secondary'>
                    Total de Usuários <span style={{ color: '#2e7d32' }}>{mockUsers.length}</span>
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5}}>
                    <TextField
                        size="small"
                        placeholder="Pesquisar"
                    />
                    <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ borderRadius: '8px', color: 'text.primary', borderColor: '#e0e0e0' }}>Filtro</Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        disableElevation
                        sx={{
                            borderRadius: '8px',
                            backgroundColor: '#2e7d32',
                            '&:hover': { backgroundColor: '#1b5e20' }
                        }}
                    >
                        Adicionar Usuário
                    </Button>
                </Box>
            </Box>

            <UserTable users={mockUsers} />

            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                <Pagination
                    count={10}
                    variant="text" 
                    shape="rounded"
                    color="primary"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            fontWeight: 'medium'
                        },
                        '& .Mui-selected': {
                            backgroundColor: 'rgba(46, 125, 50, 0.1) !important',
                            color: '#2e7d32'
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default UserManagementPage;