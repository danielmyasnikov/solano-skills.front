import { createTheme } from '@mui/material';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1344,
      xl: 1536,
    },
  },
  shape: {
    borderRadius: 50,
  },
  typography: {
    h1: {
      fontSize: '3rem',
      fontWeight: 'Bold',
      fontFamily: 'Jost',
      lineHeight: '58px',
    },
    h2: {
      fontSize: '2.3rem',
      fontWeight: 'Bold',
      fontFamily: 'Jost',
      lineHeight: '42px',
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 'Bold',
      fontFamily: 'Jost',
      lineHeight: '35px',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 'Bold',
      fontFamily: 'Jost',
      lineHeight: '30px',
    },
    modalHeader: {
      fontSize: '1.3rem',
      fontWeight: 'Regular',
      fontFamily: 'Jost',
      lineHeight: '25px',
    },
    subTitle: {
      fontSize: '1.3rem',
      fontWeight: 'Regular',
      fontFamily: 'Nunito',
      lineHeight: '25px',
    },
    textBar: {
      fontSize: '1.1rem',
      fontWeight: 'Medium',
      fontFamily: 'Jost',
      lineHeight: '19px',
    },
    mainText: {
      fontSize: '1rem',
      fontWeight: 'Regular',
      fontFamily: 'Nunito',
      lineHeight: '22px',
    },
    textCourse: {
      fontSize: '0.9rem',
      fontWeight: 'Regular',
      fontFamily: 'Nunito',
      lineHeight: '16px',
    },
    menuChapter: {
      fontSize: '1rem',
      fontWeight: 'Medium',
      fontFamily: 'Jost',
      lineHeight: '18px',
    },
    menuText: {
      fontSize: '1rem',
      fontWeight: 'Regular',
      fontFamily: 'Jost',
      lineHeight: '18px',
    },
    filters: {
      fontSize: '1rem',
      fontWeight: 'Regular',
      fontFamily: 'Nunito',
      lineHeight: '18px',
    },
    sorting: {
      fontSize: '1rem',
      fontWeight: 'Regular',
      fontFamily: 'Nunito',
      lineHeight: '18px',
    },
    name: {
      fontSize: '0.9rem',
      fontWeight: 'SemiBold',
      fontFamily: 'Jost',
      lineHeight: '15px',
    },
    small: {
      fontSize: '0.8rem',
      fontWeight: 'Regular',
      fontFamily: 'Nunito',
      lineHeight: '13px',
    },
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
            background: '#fff!important',
            color: '#7469EF!important',
          },
        },
        {
          props: { variant: 'containedPurple' },
          style: {
            border: '2px solid transparent',
            background: '#7469EF',
            color: '#fff',
            boxShadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
            '&:disabled': {
              background: '#DDDDDD',
              color: '#fff',
              boxShadow: 'none',
            },
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
            border: '1px solid #7469ef',
            '&:hover': {
              background: '#7469ef',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'outlinePurple', disabled: true },
          style: {
            border: '1px solid #C4C7CC!important',
          },
        },
        {
          props: { variant: 'outlinePurpleWithoutBorder' },
          style: {
            background: 'none',
            color: '#7469EF',
            boxShadow: '11px 12px 25px rgba(116, 105, 239, 0.35)',
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
              background: 'rgba(255, 255, 255, 0.17)',
            },
          },
        },
        {
          props: { variant: 'outlineWhite', disabled: true },
          style: {
            background: 'rgba(255, 255, 255, 0.24)',
            color: '#fff!important',
            border: '1px solid #fff!important',
          },
        },
        {
          props: { variant: 'outlineWhiteHome' },
          style: {
            background: 'rgba(255, 255, 255, 0.24)',
            color: '#fff',
            border: '1px solid #fff',
            '&:hover': {
              transition: '0.2s ease-in-out',
              background: '#fff',
              color: '#7469EF;',
            },
          },
        },
        {
          props: { variant: 'outlineWhiteHome', disabled: true },
          style: {
            background: 'rgba(255, 255, 255, 0.24)',
            color: '#fff!important',
            border: '1px solid #fff!important',
          },
        },
        {
          props: { variant: 'outlineGreen' },
          style: {
            background: 'none',
            color: '#67C080',
            border: '1px solid #67C080',
            '&:hover': {
              transition: '0.2s ease-in-out',
              background: '#67C080',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'containedGreen' },
          style: {
            background: '#67C080',
            color: '#fff',
            boxShadow: '0px 3px 18px rgba(0, 0, 0, 0.23)',
            '&:hover': {
              background: '#67c0808a',
              color: '#fff',
            },
          },
        },
        {
          props: { variant: 'containedGreen', disabled: true },
          style: {
            background: '#4A4856!important',
            color: '#646370!important',
          },
        },
        {
          props: { variant: 'outlineGreen', disabled: true },
          style: {
            background: 'none',
            color: '#4A4856!important',
            border: '1px solid #4A4856!important',
          },
        },
        {
          props: { variant: 'outlineBlack' },
          style: {
            background: 'none',
            color: '#46445C',
            border: '2px solid #46445C',
            '&:hover': {
              background: 'none',
              transition: '0.2s ease-in-out',
              color: '#7469EF',
              border: '1px solid #7469EF',
              path: {
                transition: '0.2s ease-in-out',
                fill: '#7469EF',
              },
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
          props: { variant: 'containedBlack', disabled: true },
          style: {
            color: '#fff !important',
            background: '#46445C',
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
        {
          props: { variant: 'containedRed' },
          style: {
            background: 'rgba(215, 116, 116, 1)',
            color: '#fff',
            '&:hover': { background: 'rgba(215, 116, 116, 0.8)' },
          },
        },
        {
          props: { variant: 'outlineBlue' },
          style: {
            background: 'none',
            color: '#46445C',
            border: '2px solid #46445C',
            '&:hover': {
              background: '#7469EF',
              color: '#fff',
              border: '2px solid #7469EF',
            },
          },
        },
        {
          props: { variant: 'outlineBlue', disabled: true },
          style: {
            background: 'none',
            color: '#46445C!important',
            border: '2px solid #46445C',
          },
        },
      ],
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#F7CC35',

          '.MuiRating-iconEmpty': {
            svg: {
              fill: 'gray',
            },
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: '0',
          paddingBottom: '0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
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
  },
});
