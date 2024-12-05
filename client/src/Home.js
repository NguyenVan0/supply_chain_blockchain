import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header/Header";

function Home() {
  const navigate = useNavigate();
  const redirect_to_roles = () => {
    navigate("/roles");
  };
  const redirect_to_addmed = () => {
    navigate("/addmed");
  };
  const redirect_to_supply = () => {
    navigate("/supply");
  };
  const redirect_to_track = () => {
    navigate("/track");
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="header">
          <h3>Quy trình chuỗi cung ứng dược phẩm:</h3>
        </div>
        <br />
        <div className="register">
          <h6>
            (Lưu ý: "Chủ sở hữu" là người đã triển khai hợp đồng thông minh
            trên blockchain)
          </h6>
          <h5>
            Bước 1: Chủ sở hữu cần đăng ký các nhà cung cấp nguyên liệu thô,
            nhà sản xuất, nhà phân phối và các nhà bán lẻ
          </h5>
          <h6>(Lưu ý: Đây là bước một lần. Bỏ qua bước này nếu đã thực hiện)</h6>
          <button
            onClick={redirect_to_roles}
            className="btn btn-outline-primary btn-sm"
          >
            Đăng ký
          </button>
        </div>
        <br />
        <div className="ordermedicines">
          <h5>Bước 2: Chủ sở hữu cần đặt mua thuốc</h5>
          <button
            onClick={redirect_to_addmed}
            className="btn btn-outline-primary btn-sm"
          >
            Đặt thuốc
          </button>
        </div>
        <br />
        <div className="controlchain">
          <h5>Bước 3: Kiểm soát chuỗi cung ứng</h5>
          <button
            onClick={redirect_to_supply}
            className="btn btn-outline-primary btn-sm"
          >
            Kiểm soát chuỗi cung ứng
          </button>
        </div>
        <br />
        <div className="track">
          <h5>
            <b>Theo dõi</b> thuốc:
          </h5>
          <button
            onClick={redirect_to_track}
            className="btn btn-outline-primary btn-sm"
          >
            Theo dõi thuốc
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
