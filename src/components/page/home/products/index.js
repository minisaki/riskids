import { default as React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productApi from '../../../../api/productApi';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../../constants/conmon';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Container, GridList } from '@material-ui/core';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './Product.css';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 200,
    width: '100%',
    zIndex: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 15,
    paddingRight: 15,
    maxWidth: 1140,
  },
  container: {
    backgroundColor: 'var(--white-color)',
    height: 700,    
    borderRadius: 6,
    padding: 40,
    boxShadow: '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
    
  },
  gridContainer: {
    width: 'auto',
    marginLeft: -15,
    marginRight: -15,
  },
  gridItem: {
    width: '100%',
    position: 'relative',
    minHeight: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  imageGallery: {
    userSelect: 'none',
    '-webkitTapHighlightColor': 'rgba(0,0,0,0)',
    position: 'relative',
  },
  imageGalleryContent: {
    position: 'relative',
    lineHeight: 0,
    top: 0,
  },
  imageGallerySlideWrapper :{
    position: 'relative',
  },
  imageGallerySwipe: {
    width: '100%',
    height: 'auto',
    margin: '30px 0px',
    overflow: 'hidden',
    textAlign: 'center',
  },
  imageGallerySwipes: {
    lineHeight: 0,
    overflow: 'hidden',
    position: 'relative',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  }
}));

export default function Index() {
  const classes = useStyles();
  const { id } = useParams();

  const [filters, setFilters] = useState(id ? { id: id } : {});
  const [product, setProduct] = useState({});
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;

  console.log(filters);
  const images = [
    {
      original: 'https://api.ezfrontend.com/uploads/6858c731526834013c23d3fb5ea7a78c_f67cc14060.jpg',
      thumbnail: 'https://api.ezfrontend.com/uploads/6858c731526834013c23d3fb5ea7a78c_f67cc14060.jpg',
    },
    {
      original: 'https://api.ezfrontend.com/uploads/6858c731526834013c23d3fb5ea7a78c_f67cc14060.jpg',
      thumbnail: 'https://api.ezfrontend.com/uploads/6858c731526834013c23d3fb5ea7a78c_f67cc14060.jpg',
    },
    {
      original: 'https://api.ezfrontend.com/uploads/6858c731526834013c23d3fb5ea7a78c_f67cc14060.jpg',
      thumbnail: 'https://api.ezfrontend.com/uploads/6858c731526834013c23d3fb5ea7a78c_f67cc14060.jpg',
    },
    {
      original: 'https://api.ezfrontend.com/uploads/6858c731526834013c23d3fb5ea7a78c_f67cc14060.jpg',
      thumbnail: 'https://api.ezfrontend.com/uploads/6858c731526834013c23d3fb5ea7a78c_f67cc14060.jpg',
    },
  ];
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await productApi.getAll(filters);
  //       setProduct(data[0]);
  //     } catch (error) {
  //       console.log('Failed to fetch product: ', error);
  //     }

  //     //   setLoading(false);
  //   })();
  // }, [filters]);

  console.log(product);
  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={6}>
            <ImageGallery
                showFullscreenButton={false}
                showPlayButton={false}
                startIndex={3}
                items={images}
                showThumbnails={true}
                renderLeftNav={(onClick, disabled) => {
                  return (
                    <button
                      className="image-gallery-custom-left-nav"
                      disabled={disabled}
                      onClick={onClick}
                    />
                  );
                }}
                renderRightNav={(onClick, disabled) => {
                  return (
                    <button
                      className="image-gallery-right-nav"
                      disabled={disabled}
                      onClick={onClick}
                    />
                  );
                }}
            ></ImageGallery>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

