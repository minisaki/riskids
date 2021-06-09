import {
  container,
  title,
  mainRaised,
  whiteColor,
  grayColor,
} from '../ProductPage/material-kit-pro-react.js';

const styles = (theme) => ( {
  main: {
    marginTop: '140px !important',
    
  },
  mainRaised: {
    ...mainRaised,
    maxWidth: 1140,
    margin: '0 auto',
    backgroundColor: 'var(--white-color)',
  },
  container: {
    ...container,
    zIndex: 1,
  },
  title: {
    ...title,
    '&, & + h4': {
      color: whiteColor,
    },
  },
  block: {
    color: 'inherit',
    padding: '0.9375rem',
    fontWeight: '500',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    textDecoration: 'none',
    position: 'relative',
    display: 'block',
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0px',
    width: 'auto',
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0',
  },
  left: {
    float: 'left!important',
    display: 'block',
  },
  right: {
    padding: '15px 0',
    margin: '0',
    float: 'right',
  },
  icon: {
    width: '18px',
    height: '18px',
    top: '3px',
    position: 'relative',
  },
  imgContainer: {
    width: '120px',
    maxHeight: '160px',
    overflow: 'hidden',
    display: 'block',
    '& img': {
      width: '100%',
    },
  },
  description: {
    maxWidth: '150px',
  },
  tdName: {
    minWidth: '200px',
    fontWeight: '400',
    fontSize: '1.5em',
  },
  tdNameAnchor: {
    color: grayColor[1],
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: '0.75em',
    fontWeight: '300',
  },
  tdNumber: {
    textAlign: 'right',
    minWidth: '150px',
    fontWeight: '300',
    fontSize: '1.125em !important',
  },
  tdNumberSmall: {
    marginRight: '3px',
  },
  tdNumberAndButtonGroup: {
    lineHeight: '1 !important',
    '& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
      marginRight: '0',
    },
  },
  customFont: {
    fontSize: '16px !important',
  },
  actionButton: {
    margin: '0px',
    padding: '5px',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  resetUl: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    borderRadius: 5,
  },
  cartTitle: {
    color: 'var(--white-color)',
    fontSize: '1.6rem',
    fontWeight: 500,
    padding: '12px 6px',
    margin: 0,
    backgroundColor: 'var(--primary-color)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    [theme.breakpoints.down('sm')]: {
      
      
    }
    
  },
  cartItemDetail: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    backgroundColor: 'var(--white-color)',
    borderBottom: '1px solid #e5e5e5',
    [theme.breakpoints.down('sm')]: {
      marginTop: 20,
      marginBottom: 20
    }
    
  },
  cartItemImg: {
    width: '16%',
    margin: 5,
  },
  cartItemContent: {
    padding: 8,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
      '&>p': {
        fontSize: '1.2rem'
      },
      '&>button': {
        height: 20,
        minWidth: 20,
        maxWidth: 20,
      },
      '&>input': {
        height: 20,
        minWidth: 20,
        maxWidth: 20,
        fontSize: '1rem'
      },
      
    },
    [theme.breakpoints.down('xs')]: {
      '&>p': {
        fontSize: '1rem'
      },
      '&>button': {
        height: 20,
        minWidth: 16,
        maxWidth: 16,
      },
      '&>input': {
        height: 20,
        minWidth: 16,
        maxWidth: 16,
        fontSize: '1rem'
      },
    },
  },
  cartItemDescription: {
    padding: 8,
    margin: 0,
    color: 'var(--primary-color)',
    fontSize: '1.8rem',
    fontWeight: 500,
    
  },
  cartItemPrice: {
    padding: '4px 4px 4px 10px',
    margin: 0,
    color: '#8e8e8e',
    fontSize: '1.2rem',
    fontWeight: 400,
    lineHeight: '1.2rem',
  },
  cartItemClose: {
    display: 'block',
    paddingTop: 6,
    paddingRight: 6,
    color: '#a9a9a9',
    '& > svg': {
      fontSize: '1.6rem',
    },
    '& > svg:hover': {
      backgroundColor: 'var(--primary-color)',
      color: 'var(--white-color)',
      borderRadius: '50%',
      fontSize: '1.6rem',
      cursor: 'pointer',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
      paddingRight: 0,
      '& > svg': {
        fontSize: '1rem',
      },
    }
  },
  iconCloseCartProduct: {},
  input: {
    width: 38,
    fontSize: '1.6rem',
    // borderTop: '1px solid rgba(63, 81, 181, 0.5)',
    // borderBottom: '1px solid rgba(63, 81, 181, 0.5)',
    border: '1px solid rgba(63, 81, 181, 0.5)',
    borderLeft: 'none',
    borderRight: 'none',
    textAlign: 'center',
    color: '#616161',
    height: 31,
    padding: '5px',
    // '& > div': {
    //   width: 38,
    //   borderRadius: 'unset',
    // },
    // '& > div > input': {
    //   padding: 10,
    //   fontSize: '1.4rem',
    // },
  },
  buttonLeft: {
    height: 31,
    minWidth: 36,
    borderBottomRightRadius: 'unset',
    borderTopRightRadius: 'unset',
    // '&$disabled': {
      
    // },
  },
  buttonRight: {
    height: 31,
    minWidth: 36,
    borderBottomLeftRadius: 'unset',
    borderTopLeftRadius: 'unset',
  },
  disabledButton: {
    border: '1px solid rgba(63, 81, 181, 0.5) !important',
  },
  cartContent: {
    minWidth: 350,
    [theme.breakpoints.down('sm')]: {
      minWidth: 100,
      paddingRight: 10,
      '& > p': {
        fontSize: '1rem',
        lineHeight: '1rem'
      }
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 60,
      paddingRight: 5,
      '& > p': {
        fontSize: '1rem',
        lineHeight: '1rem'
      }
    },
  },
  asideWrapper: {
    backgroundColor: 'var(--white-color)',
    // height: 250,
    borderRadius: 5,
    marginBottom: 20,
    border: '1px solid #e5e5e5 !important',
  },
  asideTitle: {
    color: 'var(--white-color)',
    backgroundColor: '#ec2154',
    fontSize: '1.6rem',
    padding: '12px 6px',
    margin: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    lineHeight: '1.4rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
      padding: '6px',
    }
  },
  asideCheckout: {
    padding: 10,
    height: 50,
    // borderBottom: '1px solid #e5e5e5',
    lineHeight: '3rem',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    '& > span:first-child': {
      fontSize: '1.2rem',
      color: '#a9a9a9',
    },
    '& > span:last-child': {
      fontSize: '1.6rem',
      color: 'var(--primary-color)',
      fontWeight: 500,
    },
  },
  asideCheckoutInfo: {
    padding: 10,
    height: 60,
    lineHeight: '3rem',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    '& > span:first-child': {
      fontSize: '1.2rem',
      color: '#a9a9a9',
    },
    '& > span:last-child': {
      fontSize: '1.6rem',
      color: 'var(--primary-color)',
      fontWeight: 500,
    },
  },
  buttonCart: {
    width: '100%',
    fontSize: '1.4rem',
    backgroundColor: 'var(--primary-color)',
    '&:hover': {
      backgroundColor: '#da449f',
    },
    marginTop: 20
  },
  inputFiled: {
    '& > label': {
      fontSize: '1.3rem',
    },
  },
  // breadcrumb: {
  //   margin: 10,
  // }
}
);

export default styles;
