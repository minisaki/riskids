import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="grid wide">
          <div className="row">
            <div className="col l-4 m-6 c-12">
              <div className="footer__introduce">
                <div className="footer__introduce-wap">
                  <i className="fas fa-check check-icon"></i>
                  <span className="footer__introduce-info"> 380/9B Nam Kỳ Khởi Nghĩa, P.8, Q.3, TpHCM </span>
                </div>
                <div className="footer__introduce-wap">
                  <i className="fas fa-check check-icon"></i>
                  <span className="footer__introduce-info"> ĐT: 0932.064.588</span>
                </div>
                <div className="footer__introduce-wap">
                  <i className="fas fa-check check-icon"></i>
                  <span className="footer__introduce-info"> Giờ mở cửa: T2 - T7: 9h - 21h; CN: 9h - 20h</span>
                </div>
                <div className="footer__introduce-wap">
                  <i className="fas fa-check check-icon"></i>
                  <span className="footer__introduce-info"> Hotline: 1900 54 54 77 hoặc 028.3848 3945</span>
                </div>
                <h2 className="footer__introduce-title">BABI - THỜI TRANG TRẺ EM</h2>
                <div className="footer__introduce-text">
                  <p>Babi chuyên bán quần áo trẻ em online với hàng ngàn mẫu mã baby để quý khách lựa chọn cho bé yêu của bạn.
                  Hãy đặt hàng online để được hưởng nhiều ưu đãi hơn tại siêu thị mẹ và bé Babi.</p>
                  <p>Chọn mua ngay các mẫu quần áo thời trang trẻ em mới nhất 2020 tại Babi.vn, hàng đẹp giá cực tốt.</p>
                </div>
              </div>
            </div>
            <div className="col l-4 m-6 c-12"> 
              <h2 className="footer__introduce-title">CHÍNH SÁCH BÁN HÀNG BAB</h2>
              <ul className="footer__introduce-list">
                <li className="footer__introduce-item">Bạn Cần Biết</li>
                <li className="footer__introduce-item">Cách nhận diện sản phẩm Babi</li>
                <li className="footer__introduce-item">Phương thức thanh toán</li>
                <li className="footer__introduce-item">Phương thức vận chuyển</li>
                <li className="footer__introduce-item">Hướng dẫn mua hàng baby</li>
                <li className="footer__introduce-item">Xuất xứ sản phẩm Babi</li>
                <li className="footer__introduce-item">Địa chỉ shop quần áo trẻ em Babi</li>
                <li className="footer__introduce-item">Chính sách bảo mật</li>           </ul>
            </div>
            <div className="col l-4 m-6 c-12"> 
              <h2 className="footer__introduce-title">TÀI KHOẢN</h2>
              <ul className="footer__introduce-list">
                <li className="footer__introduce-item">Đăng nhập</li>
                <li className="footer__introduce-item">Tạo tài khoản</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer