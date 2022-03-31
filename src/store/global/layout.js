import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    sidebar: (localStorage.getItem('ds-layout-sidebar') || 'open') === 'open',
  },
  reducers: {
    openSidebar: (state, action) => {
      localStorage.setItem('ds-layout-sidebar', 'open');
      state.sidebar = true;
    },
    closeSidebar: (state, action) => {
      localStorage.setItem('ds-layout-sidebar', 'close');
      state.sidebar = false;
    },
    toggleSidebar: (state, action) => {
      localStorage.setItem('ds-layout-sidebar', state.sidebar ? 'close' : 'open');
      state.sidebar = !state.sidebar;
    },
  },
});

export const { openSidebar, closeSidebar, toggleSidebar } = layoutSlice.actions;
