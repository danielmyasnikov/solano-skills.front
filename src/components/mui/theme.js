import { createTheme } from '@mui/material';

export const buttonTheme = createTheme({
  shape: {
    borderRadius: 50,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Jost',
          fontSize: '14px',
          letterSpacing: 0.4,
          fontWeight: 700,
          padding: '8px 20px',
          borderRadius: 30,
        },
      },
      variants: [
        {
          props: { variant: 'containedWhite' },
          style: {
            background: '#fff',
            color: '#7469EF',
            '&:hover': {
              background: '#fff',
              color: '#CBC7FA',
            },
          },
        },
        {
          props: { variant: 'containedPurple' },
          style: {
            border: 'none',
            background: '#7469EF',
            color: '#fff',
            boxShadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
            '&:hover': {
              background: '#CBC7FA',
            },
          },
        },
        {
          props: { variant: 'outlinePurple' },
          style: {
            background: 'none',
            color: '#7469EF',
            border: '2px solid #7469ef',
            '&:hover': {
              background: '#7469ef',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'outlineWhite' },
          style: {
            background: 'none',
            color: '#fff',
            border: '1px solid #fff',
            '&:hover': {
              transition: '0.2s ease-in-out',
              background: '#474650',
            },
          },
        },
        {
          props: { variant: 'outlineRed' },
          style: {
            background: 'none',
            color: '#D15555',
            border: '2px solid #D15555',
            '&:hover': {
              background: '#D15555',
              color: '#fff',
            },
          },
        },
      ],
    },
  },
});

export const ratingTheme = createTheme({
  components: {
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#F7CC35',
        },
      },
    },
  },
});
