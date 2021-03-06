import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ReactImageZoom from 'react-image-zoom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Product.css';
import Button from '../../../Button';
import CardItems from '../cardItem/CardItems';
import SelectColor from './SelectColor';
import productApi from '../../../../api/productApi';
import { useParams } from 'react-router-dom';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../../constants/conmon';

function Product() {
  const id = useParams();
  console.log(id);
  const [filters, setFilters] = useState(id);
  const [product, setProduct] = useState({});
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
// '/image/1.jpg'
  const propsZoomImage = { width: 400, img: thumbnailUrl, zoomPosition: 'right', scale: 1.5 };

  const optionsSize = [
    { value: 's', label: '9kg - 13kg' },
    { value: 'm', label: '13kg - 18kg' },
    { value: 'l', label: '18kg - 25kg' },
  ];

  const optionsQuanlity = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const cartFix = document.getElementById('fix-cart');

    const scrollCallBack = window.addEventListener('scroll', () => {
      if (window.pageYOffset > 2460 && window.pageYOffset < 4000) {
        cartFix.classList.add('sticky');
      } else {
        cartFix.classList.remove('sticky');
      }
    });
    return () => {
      window.removeEventListener('scroll', scrollCallBack);
    };
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getAll(filters);
        setProduct(data[0]);
      } catch (error) {
        console.log('Failed to fetch product: ', error);
      }

      //   setLoading(false);
    })();
  }, [filters]);

  console.log(product);

  return (
    <div className="product-container">
      <div className="grid wide">
        <div className="product-container__title">
          <h3 className="product-container__title-text">
            Trang ch??? / Qu???n ??o B?? G??i / ????? b??? b?? g??i / Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh
            Ng???c Trai Sang Ch???nh (2 - 11 tu???i)
          </h3>
        </div>
        <div className="row product-container__wrapper">
          <div className="col l-9 m-12 c-12">
            <div className="product-container__detail">
              <div className="row">
                <div className="col l-6 m-12 c-12">
                  <figure className="product-container__detail-picture">
                    {/* <Link to="/testZoom" >zoom</Link>
                    <img className="product-container__detail-picture__img" 
                      src="./image/1.jpg"
                      alt="anh"
                    ></img> */}
                    <ReactImageZoom {...propsZoomImage} className="zoom" />
                  </figure>
                </div>
                <div className="col l-6 m-12 c-12">
                  <div className="product-container__detail-info">
                    <div className="product-container__header">
                      <h2 className="product-container__header-title">{product.name}</h2>
                      <p className="product-container__header-paragrap">{product.shortDescription}</p>
                    </div>
                    <div className="product-container__list">
                      <h2 className="product-container__list-rate">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(product.salePrice)}
                      </h2>
                      <p className="product-container__list-price">
                        Ch???n k??ch c???
                        <i className="far fa-question-circle question-icon"></i>:<span> *</span>
                      </p>
                      <div className="product-container__list-size">
                        <Select options={optionsSize} />
                        <span className="product-container__list-size--note">
                          <i className="fas fa-long-arrow-alt-left arow-icon"></i> Bam chon size
                        </span>
                      </div>
                      <SelectColor></SelectColor>
                      <div className="row footer-list">
                        <div className="col l-7 ">
                          <div className="footer-list__item">
                            <p className="footer-list__item-quanlity--title">so luong</p>
                            {/* <select className="footer-list__item-quanlity--content" placeholder="chon mau" >
                              {optionsQuanlity.map((user, index) => {
                                return <option>{user.label}</option>;
                              })}
                            </select>  */}
                            <Select options={optionsQuanlity} />
                          </div>
                        </div>
                        <div className="col l-5 footer-list__item">
                          <Button
                            btnContent="Dat Hang"
                            btnStyle="btn-primary"
                            btnSize="btn-medium"
                          />
                        </div>
                        {/* <div className="col l-4 footer-list__item">
                          <div className="footer-list__item-contact">
                            <i className="fas fa-sms call-icon">
                              <span className="footer-list__item-phone">
                                <span className="footer-list__item-phone--text">Ho tro dat hang</span>
                                <p className="pfooter-list__item-phone--phone">0818000028</p>
                              </span>
                            </i>
                            
                            <p className="footer-list__item-phone">
                              <span className="footer-list__item-phone--text">Ma Sp</span>
                              <span className="footer-list__item-phone--phone">123456</span>
                            </p>
                          </div>
                        </div> */}
                      </div>
                      <div className="footer-list__item-promotion">Th??ng tin & Khuy???n m??i</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col l-12">
                  <div className="product__detail-title">
                    <ul className="product__detail-title__list">
                      <li className="product__detail-title__item">
                        <p className="product__detail-title__text active">CHI TI???T S???N PH???M</p>
                      </li>
                      <li className="product__detail-title__item ">
                        <p className="product__detail-title__text">C??CH B???O QU???N QU???N ??O</p>
                      </li>
                      <li className="product__detail-title__item ">
                        <p className="product__detail-title__text">TAGS</p>
                      </li>
                    </ul>
                  </div>
                  <div className="product__detail-content">
                    <h4 className="product__detail-content__name">
                      ??o d??i c??ch t??n cho b?? g??i vui xu??n T??n S???u size t??? 11.5kg ?????n 45kg
                      </h4>
                    <p className="product__detail-content__description">
                      Kh??ng kh?? ????n t???t 2021 ???? b???t ?????u nh???n nh???p h???n r???i.
                     Kh??u chu???n b??? ??o d??i t???t cho b??
                      M??? ???? ti???n h??nh ?????n ????u r???i nh???.
                       C?? ch??ng v???n c??n thi???u b??? ??o d??i g???m cho b?? g??i nh?? m??nh ?
                        Xem ngay thi???t k??? m???i v??? h??ng h??m nay. 
                        Ki???u d??ng ??o tay ph???ng l???ng, c??? ????nh ng???c trai ph???i c??ng qu???n
                         b?? ba to??t l??n n??t c??? ??i???n pha l???n s??? hi???n ?????i
                          ?????p nao l??ng. G???m 2 m??u: ?????, h???ng cho b?? l???a ch???n.
                           S???m ????? t???t cho b?? t??? h??m nay th??i n??.</p>
                    <ul className="product__detail-content__wrapper">
                      <li className="product__detail-content__piture">
                        <figure className="product__detail-content__img">
                          <img className="product__detail-content__img-name" src="image/3.jpg" alt="anh"></img>
                        </figure>
                        <p className="product__detail-content__text">
                          Di???n ??o d??i t???t cho b?? g??i m??u h???ng d???u d??ng
                          </p>
                      </li>
                      <li className="product__detail-content__piture">
                        <figure className="product__detail-content__img">
                          <img className="product__detail-content__img-name" src="image/3.jpg" alt="anh"></img>
                        </figure>
                        <p className="product__detail-content__text">
                          Di???n ??o d??i t???t cho b?? g??i m??u h???ng d???u d??ng
                          </p>
                      </li>
                      <li className="product__detail-content__piture">
                        <figure className="product__detail-content__img">
                          <img className="product__detail-content__img-name" src="image/3.jpg" alt="anh"></img>
                        </figure>
                        <p className="product__detail-content__text">
                          Di???n ??o d??i t???t cho b?? g??i m??u h???ng d???u d??ng
                          </p>
                      </li>
                      <li className="product__detail-content__piture">
                        <figure className="product__detail-content__img">
                          <img className="product__detail-content__img-name" src="image/3.jpg" alt="anh"></img>
                        </figure>
                        <p className="product__detail-content__text">
                          Di???n ??o d??i t???t cho b?? g??i m??u h???ng d???u d??ng
                          </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">                
                <div className="product__info">
                  <h2 className="product__info-title">TH??NG TIN S???N PH???M</h2>
                  <table className="table">                    
                    <tbody className="table__body">
                      <tr>
                        <td className="table__td">T??n s???n ph???m</td>
                        <td>Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh (2 - 11 tu???i)</td>                        
                      
                      </tr>
                      <tr>
                        <td>M?? s???n ph???m</td>
                        <td>	361782</td> 
                      </tr> 
                      <tr>
                        <td>M??u s???c</td>
                        <td>1 - M??u ?????, 2 - M??u h???ng</td> 
                      </tr> 
                      <tr>
                        <td>M?? t???</td>
                        <td>??o tay ph???ng l???ng c??? tr??n, c??? c?? ????nh ng???c trai, d??y k??o ph??a sau, qu???n l???ng d??i l??ng thun( m???c ng???n, t???i m???c c?? ch??n ), chi ti???t s???n ph???m nh?? h??nh ch???p</td> 
                      </tr> 
                      <tr>
                        <td>Ch???t li???u </td>
                        <td>	??o v???i g???m thun cao c???p, (r??t nh???), qu???n phi</td> 
                      </tr> 
                      <tr>
                        <td>Size Qu???n ??o</td>
                        <td>2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15</td> 
                      </tr> 
                      <tr>
                        <td>Size Babi</td>
                        <td>02, 03, 04, 05(5,6), 06(7,8), 07(9,10), 08(11,12), 09, 10, 11</td> 
                      </tr> 
                      <tr>
                        <td>Tu???i</td>
                        <td>T??? 2 tu???i - 11 tu???i</td> 
                      </tr> 
                      <tr>
                        <td>C??n n???ng</td>
                        <td>T??? 11kg - 45kg</td> 
                      </tr> 
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            </div>
            <div className="col l-3">
              <div className="aside">
                <div className="aside-wrapper">
                  <h3 className="aside-title">N??N MUA H??NG T???I BABI</h3>
                  <ul className="aside-list">
                    <li className="aside-item">L???ch s??? Uy t??n tr??n 10 n??m</li>
                    <li className="aside-item">Cam k???t h??ng Ch???t l?????ng T???t</li>
                    <li className="aside-item">?????m b???o H??ng nh?? H??nh</li>
                    <li className="aside-item">Kh??ng v???a ???????c ?????i size</li>
                    <li className="aside-item">Giao h??ng To??n qu???c</li>
                  </ul>
                </div>
                <div className="aside-wrapper">
                  <h3 className="aside-title">Gi??? h??ng c???a b???n ??ang c??</h3>
                  <ul className="aside-list">
                    <li className="aside-item">B???n ch??a th??m s???n ph???m v??o Gi???</li>
                  </ul>
                </div>
                <div className="aside-wrapper">
                  <h3 className="aside-title">Th???i trang tr??? em Babi</h3>
                  <ul className="aside-list">
                    <li className="aside-item"> ?????a ch???: 380/9B Nam K??? Kh???i Ngh??a, Q.3, TpHCM</li>
                    <li className="aside-item">??T: 0932.064.588</li>
                    <li className="aside-item"> Hotline: 1900 54 54 77 ho???c 028.3848 3945</li>
                  </ul>
                </div>
                {/* <div className="aside-wrapper__product">
                <h3 className="aside-title">????? cho b?? c??ng lo???i</h3>
                <CardItems
                  cardStyle="col-product c-12"
                  src="image/giay-co-dien-1.jpg"
                  description="Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh"
                  lable="New"
                  price="259.000 ??"
                />
                <CardItems
                  cardStyle="col-product c-12"
                  src="image/giay-co-dien-1.jpg"
                  description="Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh"
                  lable="New"
                  price="259.000 ??"
                />
                <CardItems
                  cardStyle="col-product c-12"
                  src="image/giay-co-dien-1.jpg"
                  description="Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh"
                  lable="New"
                  price="259.000 ??"
                />
                <CardItems
                  cardStyle="col-product c-12"
                  src="image/giay-co-dien-1.jpg"
                  description="Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh"
                  lable="New"
                  price="259.000 ??"
                />
              </div> */}
                <div className="aside-wrapper sticky" id="fix-cart">
                  <h3 className="aside-title__fix">Ch???t ????n ngay k???o h???t</h3>
                  <ul className="aside-list">
                    <li className="aside-item">B???n ch??a th??m s???n ph???m v??o Gi???</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="product-container__title">
            <h3 className="product-container__text">Th???i trang tr??? em n??m m???i 2021</h3>
          </div>
          {/* <Card text="TH???I TRANG TR??? EM T???T 2021"/> */}
          {/* <Slider {...settings} >
          <CardItems
           cardStyle="col-product c-12"
           src="image/giay-co-dien-1.jpg"
           description="Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh"
           lable="New"
           price="259.000 ??"
         />
         <CardItems
           cardStyle="col-product c-12"
           src="image/giay-co-dien-1.jpg"
           description="Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh"
           lable="New"
           price="259.000 ??"
         />
         <CardItems
           cardStyle="col-product c-12"
           src="image/giay-co-dien-1.jpg"
           description="Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh"
           lable="New"
           price="259.000 ??"
         />
         <CardItems
           cardStyle="col-product c-12"
           src="image/giay-co-dien-1.jpg"
           description="Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh"
           lable="New"
           price="259.000 ??"
         />
          <CardItems
           cardStyle="col-product c-12"
           src="image/giay-co-dien-1.jpg"
           description="Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh"
           lable="New"
           price="259.000 ??"
         />
         <CardItems
           cardStyle="col-product c-12"
           src="image/giay-co-dien-1.jpg"
           description="Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh"
           lable="New"
           price="259.000 ??"
         />
         <CardItems
           cardStyle="col-product c-12"
           src="image/giay-co-dien-1.jpg"
           description="Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh"
           lable="New"
           price="259.000 ??"
         />
         <CardItems
           cardStyle="col-product c-12"
           src="image/giay-co-dien-1.jpg"
           description="Set ??o D??i G???m Cho B?? G??i Tay Ph???ng ????nh Ng???c Trai Sang Ch???nh"
           lable="New"
           price="259.000 ??"
         />
        </Slider> */}
        </div>
      </div>
    // </div>
  );
}

export default Product;
