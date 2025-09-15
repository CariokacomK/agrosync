import React, { useState } from "react";
import {
    Drawer, List, ListItemButton, ListItemIcon, ListItemText,
    Collapse, Divider, Avatar, Typography, Box,
    Popper, Paper
} from "@mui/material";
import { Link } from "react-router-dom";
// Ícones
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleIcon from "@mui/icons-material/People";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutline";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AssessmentIcon from "@mui/icons-material/AssessmentOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// Logos
import logo from "../assets/logo_texto.png";
import logoIcon from "../assets/logo_icone.svg";

const Sidebar: React.FC = () => {
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openUsers, setOpenUsers] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedSubIndex, setSelectedSubIndex] = useState<number | null>(null);

    const handleToggleDrawer = () => setOpen(!open);
    const handlePopperOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handlePopperClose = () => setAnchorEl(null);
    const popperOpen = Boolean(anchorEl);

    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
        setSelectedSubIndex(null);
    };

    const handleSubListItemClick = (index: number) => {
        setSelectedSubIndex(index);
        setSelectedIndex(1);
    };

    const listItemButtonStyles = {
        margin: '4px 12px', borderRadius: '8px',
        '&:hover': { backgroundColor: '#eaefe9', color: 'inherit', textDecoration: 'none', },
        '&.Mui-selected': {
            backgroundColor: '#B4C4B2', color: '#1b5e20',
            '& .MuiListItemIcon-root': { color: '#1b5e20' },
            '&:hover': { backgroundColor: 'rgba(46, 125, 50, 0.15)' }
        },
    };

    const collapsedListItemButtonStyles = {
        margin: '4px 8px', borderRadius: '8px', color: 'inherit', textDecoration: 'none',
        justifyContent: 'center',
        '&:hover': { backgroundColor: '#eaefe9' },
        '&.Mui-selected': {
            backgroundColor: '#B4C4B2', color: '#1b5e20',
            '& .MuiListItemIcon-root': { color: '#1b5e20' },
            '&:hover': { backgroundColor: 'rgba(46, 125, 50, 0.15)' }
        },
    };

    const drawerWidthOpen = 350;
    const drawerWidthClosed = 80;

    const UserSubmenu = (
        <List component="div" disablePadding>
            <ListItemButton sx={{ ...listItemButtonStyles, pl: 4, py: 0.5 }} component={Link} to="/usuarios" selected={selectedSubIndex === 0} onClick={() => handleSubListItemClick(0)}>
                <ListItemText primary="Gerenciador" slotProps={{ primary: { style: { fontSize: '0.8rem' } } }} />
            </ListItemButton>
            <ListItemButton sx={{ ...listItemButtonStyles, pl: 4, py: 0.5 }}>
                <ListItemText primary="Convites" slotProps={{ primary: { style: { fontSize: '0.8rem' } } }} />
            </ListItemButton>
            <ListItemButton sx={{ ...listItemButtonStyles, pl: 4, py: 0.5 }}>
                <ListItemText primary="Grupos/Unidades" slotProps={{ primary: { style: { fontSize: '0.8rem' } } }} />
            </ListItemButton>
        </List>
    );

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: open ? drawerWidthOpen : drawerWidthClosed,
                transition: theme => theme.transitions.create('width', { duration: theme.transitions.duration.enteringScreen }),
                "& .MuiDrawer-paper": {
                    width: open ? drawerWidthOpen : drawerWidthClosed,
                    boxSizing: "border-box", backgroundColor: "#fff", borderRight: 'none', overflowX: 'hidden',
                    transition: theme => theme.transitions.create('width', { duration: theme.transitions.duration.enteringScreen }),
                },
            }}
        >
            <Box
                onClick={handleToggleDrawer}
                sx={{
                    p: 2, display: 'flex', alignItems: 'center', cursor: 'pointer',
                    justifyContent: open ? 'space-between' : 'center',
                }}
            >
                <img src={open ? logo : logoIcon} alt="Agro Sync" height={35} style={{ transition: 'all 0.2s', width: 'auto' }} />
                {open && <ChevronLeftIcon />}
            </Box>

            <Divider variant="middle" sx={{ borderColor: "#2e7d32", borderBottomWidth: 2, opacity: 1, marginBottom: '8px' }} />

            <List component="nav">
                <ListItemButton component={Link} to="/" sx={open ? listItemButtonStyles : collapsedListItemButtonStyles} selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
                    <ListItemIcon sx={{ minWidth: 0 }}><HomeOutlinedIcon /></ListItemIcon>
                    {open && <ListItemText primary="Início" sx={{marginLeft: '5%'}} />}
                </ListItemButton>

                <ListItemButton
                    sx={open ? listItemButtonStyles : collapsedListItemButtonStyles}
                    selected={selectedIndex === 1}
                    onClick={() => { if (open) { handleListItemClick(1); setOpenUsers(v => !v); } }}
                    onMouseEnter={!open ? handlePopperOpen : undefined}
                    onMouseLeave={!open ? handlePopperClose : undefined}
                >
                    <ListItemIcon sx={{ minWidth: 0 }}>
                        {openUsers ? <PeopleIcon /> : <PeopleOutlinedIcon />}
                    </ListItemIcon>
                    {open && <ListItemText primary="Usuários & Permissões" sx={{marginLeft: '5%'}} />}
                    {open && (openUsers ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>

                <Collapse in={open && openUsers} timeout="auto" unmountOnExit>
                    <Box sx={{ position: 'relative', '&::before': { content: '""', position: 'absolute', left: '25px', top: '8px', bottom: '8px', width: '1px', backgroundColor: '#33363F' } }}>
                        {UserSubmenu}
                    </Box>
                </Collapse>

                <ListItemButton sx={open ? listItemButtonStyles : collapsedListItemButtonStyles} selected={selectedIndex === 2} onClick={() => handleListItemClick(2)}>
                    <ListItemIcon sx={{ minWidth: 0 }}><AssessmentIcon /></ListItemIcon>
                    {open && <ListItemText primary="Relatórios" sx={{marginLeft: '5%'}} />}
                </ListItemButton>
                <ListItemButton sx={open ? listItemButtonStyles : collapsedListItemButtonStyles} selected={selectedIndex === 3} onClick={() => handleListItemClick(3)}>
                    <ListItemIcon sx={{ minWidth: 0 }}><HelpOutlineIcon /></ListItemIcon>
                    {open && <ListItemText primary="Ajuda" sx={{marginLeft: '5%'}} />}
                </ListItemButton>
            </List>

            <Popper
                open={popperOpen}
                anchorEl={anchorEl}
                placement="right-start"
                onMouseEnter={() => setAnchorEl(anchorEl)}
                onMouseLeave={handlePopperClose}
                sx={{ zIndex: 1201 }}
            >
                <Paper sx={{ p: 1, mt: 1, ml: 1, borderRadius: 2 }} elevation={3}>
                    <Typography variant="overline" sx={{ pl: 2, display: 'block' }}>Usuários & Permissões</Typography>
                    {UserSubmenu}
                </Paper>
            </Popper>

            <Box mt="auto" p={0.5} mb={2}>
                {(
                    <>
                        <ListItemButton sx={listItemButtonStyles}>
                            <ListItemIcon sx={{ minWidth: 0 }}><SettingsIcon /></ListItemIcon>
                            {open && <ListItemText primary="Configurações" />}
                        </ListItemButton>
                        <Divider variant="middle" sx={{ borderColor: "#2e7d32", borderBottomWidth: 2, opacity: 1, marginBottom: '8px' }} />
                    </>
                )}
                <Box display="flex" alignItems="center" mt={2} gap={1} p={1} justifyContent={open ? 'flex-start' : 'center'}>
                    <Avatar sx={{ bgcolor: "#2e7d32" }}>GB</Avatar>
                    {open && (
                        <Box>
                            <Typography variant="body2">Gabriel Borges</Typography>
                            <Typography variant="caption" color="text.secondary" fontSize={9}>
                                gabriel.borges@gmail.com
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;