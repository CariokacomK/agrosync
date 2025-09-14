import React, { useState } from "react";
import {
    Drawer, List, ListItemButton, ListItemIcon, ListItemText,
    Collapse, Divider, Avatar, Typography, Box
} from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleIcon from "@mui/icons-material/People";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutline";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AssessmentIcon from "@mui/icons-material/AssessmentOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../assets/logo_texto.png";

const Sidebar: React.FC = () => {
    const [openUsers, setOpenUsers] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    const listItemButtonStyles = {
        margin: '4px 12px',
        borderRadius: '8px',

        '&:hover': {
            backgroundColor: '#eaefe9',
        },

        '&.Mui-selected': {
            backgroundColor: '#B4C4B2',
            color: '#1b5e20',
            '& .MuiListItemIcon-root': {
                color: '#1b5e20',
            },
            '&:hover': {
                backgroundColor: 'rgba(46, 125, 50, 0.15)',
            }
        },
    };


    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                    backgroundColor: "#fff",
                    borderRight: 'none',
                },
            }}
        >
            <Box p={2} display="flex" alignItems="center" gap={1}>
                <img src={logo} alt="Agro Sync" width={120} />
            </Box>

            <Divider variant="middle" sx={{ borderColor: "#2e7d32", borderBottomWidth: 2, opacity: 1, marginBottom: '8px' }} />

            <List component="nav">
                <ListItemButton
                    sx={listItemButtonStyles}
                    selected={selectedIndex === 0}
                    onClick={() => handleListItemClick(0)}
                >
                    <ListItemIcon sx={{ minWidth: "35px" }}>
                        <HomeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Início" />
                </ListItemButton>

                <ListItemButton
                    sx={listItemButtonStyles}
                    selected={selectedIndex === 1}
                    onClick={() => {
                        handleListItemClick(1);
                        setOpenUsers(v => !v);
                    }}
                >
                    <ListItemIcon sx={{ minWidth: "35px" }}>
                        {openUsers ? <PeopleIcon /> : <PeopleOutlinedIcon />}
                    </ListItemIcon>
                    <ListItemText
                        primary="Usuários & Permissões"
                    />
                    {openUsers ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openUsers} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding
                        sx={{
                            position: 'relative',
                            '&::before': {
                                content: '""',        
                                position: 'absolute',  
                                left: '25px',          
                                top: '8px',           
                                bottom: '8px',        
                                width: '1px',        
                                backgroundColor: '#33363F', 
                            },
                        }}
                    >
                        <ListItemButton sx={{ pl: 4, py: 0.5 }}>
                            <ListItemText primary="Gerenciador" slotProps={{ primary: { fontSize: '0.8rem' } }} />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4, py: 0.5 }}>
                            <ListItemText primary="Convites" slotProps={{ primary: { fontSize: '0.8rem' } }} />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4, py: 0.5 }}>
                            <ListItemText primary="Grupos/Unidades" slotProps={{ primary: { fontSize: '0.8rem' } }} />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton
                    sx={listItemButtonStyles}
                    selected={selectedIndex === 2}
                    onClick={() => handleListItemClick(2)}
                >
                    <ListItemIcon sx={{ minWidth: "35px" }}>
                        <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Relatórios" />
                </ListItemButton>

                <ListItemButton
                    sx={listItemButtonStyles}
                    selected={selectedIndex === 3}
                    onClick={() => handleListItemClick(3)}
                >
                    <ListItemIcon sx={{ minWidth: "35px" }}>
                        <HelpOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ajuda" />
                </ListItemButton>
            </List>


            <Box mt="auto" p={0.5} mb={2}>
                <ListItemButton sx={listItemButtonStyles}>
                    <ListItemIcon sx={{ minWidth: "35px" }}>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Configurações" />
                </ListItemButton>

                <Divider variant="middle" sx={{ borderColor: "#2e7d32", borderBottomWidth: 2, opacity: 1, marginBottom: '8px' }} />

                <Box display="flex" alignItems="center" mt={2} gap={1} pl={2}>
                    <Avatar sx={{ bgcolor: "#2e7d32" }}>GB</Avatar>
                    <Box>
                        <Typography variant="body2">Gabriel Borges</Typography>
                        <Typography variant="caption" color="text.secondary" fontSize={9}>
                            gabriel.borges@gmail.com
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;