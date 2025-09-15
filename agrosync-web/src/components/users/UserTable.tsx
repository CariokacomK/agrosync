import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableRow,
    Checkbox, Avatar, Box, Typography, Chip, IconButton
} from '@mui/material';
import {
    DragHandle as DragHandleIcon, // Ícone de menu correto
    PersonOutlined as PersonIcon,
    VpnKeyOutlined as VpnKeyIcon,
    ScheduleOutlined as ScheduleIcon,
    DateRangeOutlined as DateRangeIcon,
} from '@mui/icons-material';
import type { User } from '../../pages/users/UserManagement';

// Cores customizadas e mais suaves para os chips
const accessChipStyles = {
    'Administrador': { backgroundColor: '#FFDCE0', color: '#D32F2F', fontWeight: 600 },
    'Gestor': { backgroundColor: '#FFF0C7', color: '#E69800', fontWeight: 600 },
    'Usuário': { backgroundColor: '#D6EFFF', color: '#1976D2', fontWeight: 600 },
};

// Componente para o ícone do cabeçalho
const HeaderIcon = ({ children }: { children: React.ReactNode }) => (
    <Box sx={{
        width: 32, height: 32, borderRadius: '50%', backgroundColor: '#F4F5F7',
        display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1
    }}>
        {children}
    </Box>
);

interface UserTableProps {
    users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex', alignItems: 'center', p: 1.5,
                    backgroundColor: '#F4F5F7', borderRadius: '12px',
                    fontWeight: 'bold', color: 'text.secondary', fontSize: '0.875rem'
                }}
            >
                <Box sx={{ width: '5%', textAlign: 'center' }}><Checkbox size="small" sx={{p:0}} /></Box>
                <Box sx={{ width: '30%', display: 'flex', alignItems: 'center' }}><HeaderIcon><PersonIcon fontSize="small"/></HeaderIcon> Usuário</Box>
                <Box sx={{ width: '15%', display: 'flex', alignItems: 'center' }}><HeaderIcon><VpnKeyIcon fontSize="small"/></HeaderIcon> Acesso</Box>
                <Box sx={{ width: '20%', display: 'flex', alignItems: 'center' }}><HeaderIcon><ScheduleIcon fontSize="small"/></HeaderIcon> Última atividade</Box>
                <Box sx={{ width: '20%', display: 'flex', alignItems: 'center' }}><HeaderIcon><DateRangeIcon fontSize="small"/></HeaderIcon> Data de Inclusão</Box>
                <Box sx={{ width: '10%' }}></Box>
            </Box>

            {/* 2. TABELA SEM CABEÇALHO, SÓ COM O CORPO */}
            <TableContainer>
                <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    backgroundColor: 'white',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                                    borderRadius: '12px',
                                    '& > td': { border: 'none' }
                                }}
                            >
                                <TableCell width="5%" align="center" sx={{ borderRadius: '12px 0 0 12px' }}>
                                    <Checkbox sx={{ borderRadius: '6px' }} />
                                </TableCell>
                                <TableCell width="30%">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Avatar variant="rounded">{user.name.charAt(0)}</Avatar>
                                        <Box>
                                            <Typography variant="body2" fontWeight="600">{user.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell width="15%">
                                    <Chip
                                        label={user.access}
                                        size="small"
                                        sx={accessChipStyles[user.access]}
                                    />
                                </TableCell>
                                <TableCell width="20%">{user.lastActivity}</TableCell>
                                <TableCell width="20%">{user.includeDate}</TableCell>
                                <TableCell width="10%" align="center" sx={{ borderRadius: '0 12px 12px 0' }}>
                                    <IconButton size="small"><DragHandleIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserTable;