import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { ThemeProvider } from '@mui/material/styles';
import styles from './styles.module.less';
import { profileItems, studyItems } from './menuItems';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import { menuTheme } from '../theme';
import Logo from '@assets/Logo';

const Menu = ({ isOpen }) => {
  const [activeTab, setActiveTab] = useState('');
  return (
    <ThemeProvider theme={menuTheme}>
      <Drawer open={isOpen}>
        <Box className={styles.logo}>
          <Logo />
        </Box>
        <Box className={styles.label}>Профиль</Box>
        {profileItems.map((item) => (
          <React.Fragment key={item.label}>
            <Box
              sx={{
                margin: '0 20px',
              }}
            >
              <List>
                <ListItem onClick={() => setActiveTab(item.label)} className={activeTab === item.label ? styles.activeTab : ''}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </List>
            </Box>
          </React.Fragment>
        ))}
        <Divider />
        <Box className={styles.label}>Обучение</Box>
        {studyItems.map((item) => (
          <React.Fragment key={item.label}>
            <Box
              sx={{
                margin: '0 20px',
              }}
            >
              <List>
                <ListItem onClick={() => setActiveTab(item.label)} className={activeTab === item.label ? styles.activeTab : ''}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </List>
            </Box>
          </React.Fragment>
        ))}
      </Drawer>
    </ThemeProvider>
  );
};

export default Menu;
