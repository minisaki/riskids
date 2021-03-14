import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import ReactImageZoom from 'react-image-zoom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Product.css';
import Button from '../../../Button';
import CardItems from '../cardItem/CardItems';
import SelectColor from './SelectColor';
import productApi from '../../../../api/productApi';
import { useParams } from 'react-router-dom';


function Product() { 
  const id = useParams()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  // const [productId, setproductId] = useState(id)

  const propsZoomImage = {width: 400, img: "image/1.jpg", zoomPosition: 'right', scale: 1.5};

  const optionsSize = [
    { value: 's', label: '9kg - 13kg' },
    { value: 'm', label:  '13kg - 18kg'},
    { value: 'l', label: '18kg - 25kg' },
  ];  

  const optionsQuanlity = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
  ]
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  
  useEffect(() => {
    const cartFix = document.getElementById("fix-cart");
    
    const scrollCallBack = window.addEventListener("scroll", () => {
     
      if (window.pageYOffset > 2460 && window.pageYOffset < 4000) {
        cartFix.classList.add("sticky");
       
      } 
      else {
        cartFix.classList.remove("sticky");
        
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.get(id);
        setProduct(data);
        console.log({ data});
      } catch (error) {
        console.log('Failed to fetch product: ', error);
      }

      setLoading(false);
    })();
  }, [id]);

  return (
    <div className="product-container">
      <div className="grid wide">
        <div className="product-container__title">
          <h3 className="product-container__title-text">
            Trang chủ / Quần Áo Bé Gái / Đồ bộ bé gái / 
            Set Áo Dài Gấm Cho Bé Gái Tay Phồng Đính Ngọc Trai Sang Chảnh (2 - 11 tuổi)
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
                    <ReactImageZoom {...propsZoomImage} className="zoom"/>
                  </figure>
                </div>
                <div className="col l-6 m-12 c-12">
                  <div className="product-container__detail-info">
                    <div className="product-container__header">
                      <h2 className="product-container__header-title">Set Áo Dài Gấm Cho Bé Gái Tay Phồng Đính Ngọc Trai Sang Chảnh (2 - 11 tuổi)</h2>
                      <p className="product-container__header-paragrap">Áo dài tết cho bé gái từ 11.5kg đến 45kg đính ngọc trai diện đẹp đón xuân.</p>
                    </div>
                    <div className="product-container__list">
                      <h2 className="product-container__list-rate">259.000 đ</h2>
                      <p className="product-container__list-price">
                        Chọn kích cỡ 
                        <i className="far fa-question-circle question-icon"></i>:
                        <span > *</span>
                      </p>
                      <div className="product-container__list-size">
                        <Select options={optionsSize} />
                        <span className="product-container__list-size--note"><i className="fas fa-long-arrow-alt-left arow-icon"></i> Bam chon size</span>
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
                          <Button btnContent="Dat Hang" btnStyle="btn-primary" btnSize="btn-medium"/>
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
                      <div className="footer-list__item-promotion">Thông tin & Khuyến mãi</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col l-12">
                  <div className="product__detail-title">
                    <ul className="product__detail-title__list">
                      <li className="product__detail-title__item">
                        <p className="product__detail-title__text active">CHI TIẾT SẢN PHẨM</p>
                      </li>
                      <li className="product__detail-title__item ">
                        <p className="product__detail-title__text">CÁCH BẢO QUẢN QUẦN ÁO</p>
                      </li>
                      <li className="product__detail-title__item ">
                        <p className="product__detail-title__text">TAGS</p>
                      </li>
                    </ul>
                  </div>
                  <div className="product__detail-content">
                    <h4 className="product__detail-content__name">
                      Áo dài cách tân cho bé gái vui xuân Tân Sửu size từ 11.5kg đến 45kg
                      </h4>
                    <p className="product__detail-content__description">
                      Không khí đón tết 2021 đã bắt đầu nhộn nhịp hẳn rồi.
                     Khâu chuẩn bị áo dài tết cho bé
                      Mẹ đã tiến hành đến đâu rồi nhỉ.
                       Có chăng vẫn còn thiếu bộ áo dài gấm cho bé gái nhà mình ?
                        Xem ngay thiết kế mới về hàng hôm nay. 
                        Kiểu dáng áo tay phồng lửng, cổ đính ngọc trai phối cùng quần
                         bà ba toát lên nét cổ điển pha lẫn sự hiện đại
                          đẹp nao lòng. Gồm 2 màu: đỏ, hồng cho bé lựa chọn.
                           Sắm đồ tết cho bé từ hôm nay thôi nè.</p>
                    <ul className="product__detail-content__wrapper">
                      <li className="product__detail-content__piture">
                        <figure className="product__detail-content__img">
                          <img className="product__detail-content__img-name" src="image/3.jpg" alt="anh"></img>
                        </figure>
                        <p className="product__detail-content__text">
                          Diện áo dài tết cho bé gái màu hồng dịu dàng
                          </p>
                      </li>
                      <li className="product__detail-content__piture">
                        <figure className="product__detail-content__img">
                          <img className="product__detail-content__img-name" src="image/3.jpg" alt="anh"></img>
                        </figure>
                        <p className="product__detail-content__text">
                          Diện áo dài tết cho bé gái màu hồng dịu dàng
                          </p>
                      </li>
                      <li className="product__detail-content__piture">
                        <figure className="product__detail-content__img">
                          <img className="product__detail-content__img-name" src="image/3.jpg" alt="anh"></img>
                        </figure>
                        <p className="product__detail-content__text">
                          Diện áo dài tết cho bé gái màu hồng dịu dàng
                          </p>
                      </li>
                      <li className="product__detail-content__piture">
                        <figure className="product__detail-content__img">
                          <img className="product__detail-content__img-name" src="image/3.jpg" alt="anh"></img>
                        </figure>
                        <p className="product__detail-content__text">
                          Diện áo dài tết cho bé gái màu hồng dịu dàng
                          </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">                
                <div className="product__info">
                  <h2 className="product__info-title">THÔNG TIN SẢN PHẨM</h2>
                  <table className="table">                    
                    <tbody className="table__body">
                      <tr>
                        <td className="table__td">Tên sản phẩm</td>
                        <td>Set Áo Dài Gấm Cho Bé Gái Tay Phồng Đính Ngọc Trai Sang Chảnh (2 - 11 tuổi)</td>                        
                      
                      </tr>
                      <tr>
                        <td>Mã sản phẩm</td>
                        <td>	361782</td> 
                      </tr> 
                      <tr>
                        <td>Màu sắc</td>
                        <td>1 - Màu đỏ, 2 - Màu hồng</td> 
                      </tr> 
                      <tr>
                        <td>Mô tả</td>
                        <td>Áo tay phồng lửng cổ tròn, cổ có đính ngọc trai, dây kéo phía sau, quần lửng dài lưng thun( mặc ngắn, tới mắc cá chân ), chi tiết sản phẩm như hình chụp</td> 
                      </tr> 
                      <tr>
                        <td>Chất liệu </td>
                        <td>	Áo vải gấm thun cao cấp, (rút nhẹ), quần phi</td> 
                      </tr> 
                      <tr>
                        <td>Size Quần áo</td>
                        <td>2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15</td> 
                      </tr> 
                      <tr>
                        <td>Size Babi</td>
                        <td>02, 03, 04, 05(5,6), 06(7,8), 07(9,10), 08(11,12), 09, 10, 11</td> 
                      </tr> 
                      <tr>
                        <td>Tuổi</td>
                        <td>Từ 2 tuổi - 11 tuổi</td> 
                      </tr> 
                      <tr>
                        <td>Cân nặng</td>
                        <td>Từ 11kg - 45kg</td> 
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
                <h3 className="aside-title">NÊN MUA HÀNG TẠI BABI</h3>
                <ul className="aside-list">
                  <li className="aside-item">Lịch sử Uy tín trên 10 năm</li>
                  <li className="aside-item">Cam kết hàng Chất lượng Tốt</li>
                  <li className="aside-item">Đảm bảo Hàng như Hình</li>
                  <li className="aside-item">Không vừa được đổi size</li>
                  <li className="aside-item">Giao hàng Toàn quốc</li>
                </ul>
              </div>
              <div className="aside-wrapper">
                <h3 className="aside-title">Giỏ hàng của bạn đang có</h3>
                <ul className="aside-list">
                  <li className="aside-item">Bạn chưa thêm sản phẩm vào Giỏ</li>
                </ul>
              </div>
              <div className="aside-wrapper">
                <h3 className="aside-title">Thời trang trẻ em Babi</h3>
                <ul className="aside-list">
                  <li className="aside-item"> Địa chỉ: 380/9B Nam Kỳ Khởi Nghĩa, Q.3, TpHCM</li>
                  <li className="aside-item">ĐT: 0932.064.588</li>
                  <li className="aside-item"> Hotline: 1900 54 54 77 hoặc 028.3848 3945</li>
                  
                </ul>
              </div>
              <div className="aside-wrapper__product">
                <h3 className="aside-title">Đồ cho bé cùng loại</h3>
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
              </div>
              <div className="aside-wrapper sticky" id="fix-cart">
                <h3 className="aside-title__fix">Chốt đơn ngay kẻo hết</h3>
                <ul className="aside-list">
                  <li className="aside-item">Bạn chưa thêm sản phẩm vào Giỏ</li>
                </ul>
              </div>
            </div> 
          </div>
        </div>
        <div className="product-container__title">
          <h3 className="product-container__text">
          Thời trang trẻ em năm mới 2021
            </h3>
        </div>
        {/* <Card text="THỜI TRANG TRẺ EM TẾT 2021"/> */}
        {/* <Slider {...settings} >
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
        </Slider> */}
      </div>
    </div>
  )
}

export default Product
