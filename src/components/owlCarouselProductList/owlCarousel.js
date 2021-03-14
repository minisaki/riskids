import React, { Component } from "react";
import Slider from "react-slick";
import "../page/home/products/node_modules/slick-carousel/slick/slick.css";
import "../page/home/products/node_modules/slick-carousel/slick/slick-theme.css";
import './owlCarousel.css';
import CardItems from "../page/home/cardItem/CardItems";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5
    };
    return (
      <div className="gird wide">
        <h2> Single Item</h2>
        <Slider {...settings}>
          <CardItems
            cardStyle="col-product c-12"
            src="image/giay-co-dien-1.jpg"
            description="Set Áo Dài Gấm Cho Bé Gái Tay Phồng Đính Ngọc Trai Sang Chảnh"
            lable="New"
            price="259.000 đ"
          />
          <CardItems
            cardStyle="col-product c-12"
            src="image/giay-co-dien-1.jpg"
            description="Set Áo Dài Gấm Cho Bé Gái Tay Phồng Đính Ngọc Trai Sang Chảnh"
            lable="New"
            price="259.000 đ"
          />
          <CardItems
            cardStyle="col-product c-12"
            src="image/giay-co-dien-1.jpg"
            description="Set Áo Dài Gấm Cho Bé Gái Tay Phồng Đính Ngọc Trai Sang Chảnh"
            lable="New"
            price="259.000 đ"
          />
          <CardItems
            cardStyle="col-product c-12"
            src="image/giay-co-dien-1.jpg"
            description="Set Áo Dài Gấm Cho Bé Gái Tay Phồng Đính Ngọc Trai Sang Chảnh"
            lable="New"
            price="259.000 đ"
          />
          <CardItems
            cardStyle="col-product c-12"
            src="image/giay-co-dien-1.jpg"
            description="Set Áo Dài Gấm Cho Bé Gái Tay Phồng Đính Ngọc Trai Sang Chảnh"
            lable="New"
            price="259.000 đ"
          />
          <CardItems
            cardStyle="col-product c-12"
            src="image/giay-co-dien-1.jpg"
            description="Set Áo Dài Gấm Cho Bé Gái Tay Phồng Đính Ngọc Trai Sang Chảnh"
            lable="New"
            price="259.000 đ"
          />
          <CardItems
            cardStyle="col-product c-12"
            src="image/giay-co-dien-1.jpg"
            description="Set Áo Dài Gấm Cho Bé Gái Tay Phồng Đính Ngọc Trai Sang Chảnh"
            lable="New"
            price="259.000 đ"
          />
          <CardItems
            cardStyle="col-product c-12"
            src="image/giay-co-dien-1.jpg"
            description="Set Áo Dài Gấm Cho Bé Gái Tay Phồng Đính Ngọc Trai Sang Chảnh"
            lable="New"
            price="259.000 đ"
          />
          <div>
            <CardItems
              cardStyle="col-product c-12"
              src="image/giay-co-dien-1.jpg"
              description="Set Áo Dài Gấm Cho Bé Gái Tay Phồng Đính Ngọc Trai Sang Chảnh"
              lable="New"
              price="259.000 đ"
            />
          </div>
        </Slider>
      </div>
    );
  }
}