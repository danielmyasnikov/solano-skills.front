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
          fontSize: '16px',
          letterSpacing: 0.4,
          fontWeight: 700,
          padding: '8px 20px',
          textTransform: 'none',
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
          props: { variant: 'containedWhite', disabled: true },
          style: {
            background: '#4A4856!important',
            color: '#646370!important',
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
          props: { variant: 'outlineWhite', disabled: true },
          style: {
            background: 'none',
            color: '#4A4856!important',
            border: '1px solid #4A4856!important',
          },
        },
        {
          props: { variant: 'outlineBlack' },
          style: {
            height: '33px',
            background: 'none',
            color: '#2D2D2D',
            border: '1px solid #2D2D2D',
            '&:hover': {
              background: 'none',
              transition: '0.2s ease-in-out',
              color: '#7469EF',
              border: '1px solid #7469EF',
            },
          },
        },
        {
          props: { variant: 'outlineBlack', disabled: true },
          style: {
            color: '#D6D6D6',
            border: '1px solid #D6D6D6',
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

export const menuTheme = createTheme({
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: '0',
          paddingBottom: '0',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          minWidth: '200px',
          cursor: 'pointer',
          borderRadius: '5px',
          margin: '1px 0',
          ':hover': {
            transition: '.2s ease-in-out',
            background: '#7469EF',
            color: '#fff',
            svg: {
              path: {
                fill: '#fff',
              },
            },
            span: {
              color: '#fff',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '1px',
          marginRight: '14px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          span: {
            fontFamily: 'Jost',
            color: '#8A92A6',
            fontWeight: 400,
            fontSize: '16px',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '12px 36px 20px 36px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          marginTop: '73px',
          height: 'calc(100% - 73px)',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          marginTop: '73px',
        },
      },
    },
  },
});
