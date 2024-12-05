import HeroSection from "../HeroSection/HeroSection";
import "./Home.css";
import { useNavigate } from "react-router-dom";

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
      <section className="py-10">
        <HeroSection />
        <div className="2xl:container mx-auto py-10" id="Home">
          <div className="w-[90%] mx-auto grid grid-cols-1 place-items-center pb-5">
            <h2 className="text-5xl">Quy trình chuỗi cung ứng ProjectX</h2>
          </div>
          <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col justify-center items-center">
              <div className="plan">
                <div className="inner">
                  <span className="pricing">
                    <span className="font-[poppins] text-gray-500">Bước 1</span>
                  </span>
                  <p className="title pt-3 font-[poppins]">
                    Chủ sở hữu cần đăng ký
                  </p>
                  <p className="info text-red-500 font-[poppins] font-bold">
                    Đây là bước chỉ cần thực hiện một lần. Bỏ qua bước này nếu
                    đã làm xong.
                  </p>
                  <ul className="features p-0">
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                      <span>Các nhà cung cấp nguyên liệu thô</span>
                    </li>
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                      <span>Nhà sản xuất</span>
                    </li>
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                      <span>Nhà phân phối</span>
                    </li>
                  </ul>
                  <div className="button" onClick={redirect_to_roles}>
                    Đăng ký
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="plan">
                <div className="inner">
                  <span className="pricing">
                    <span className="font-[poppins] text-gray-500">Bước 2</span>
                  </span>
                  <p className="title pt-3 font-[poppins]">Đặt mua thuốc</p>
                  <p className="info text-red-500 font-[poppins] font-bold">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <ul className="features p-0">
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                      <span>Các nhà cung cấp nguyên liệu thô</span>
                    </li>
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                      <span>Nhà sản xuất</span>
                    </li>
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                      <span>Nhà phân phối</span>
                    </li>
                  </ul>
                  <div className="button" onClick={redirect_to_addmed}>
                    Đặt thuốc
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="plan">
                <div className="inner">
                  <span className="pricing">
                    <span className="font-[poppins] text-gray-500">Bước 3</span>
                  </span>
                  <p className="title pt-3 font-[poppins]">
                    Kiểm soát chuỗi cung ứng
                  </p>
                  <p className="info text-red-500 font-[poppins] font-bold">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <ul className="features p-0">
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                      <span>Các nhà cung cấp nguyên liệu thô</span>
                    </li>
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                      <span>Nhà sản xuất</span>
                    </li>
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                      <span>Nhà phân phối</span>
                    </li>
                  </ul>
                  <div className="button" onClick={redirect_to_supply}>
                    Kiểm soát chuỗi cung ứng
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="plan">
                <div className="inner">
                  <span className="pricing">
                    <span className="font-[poppins] text-gray-500">Bước 4</span>
                  </span>
                  <p className="title pt-3 font-[poppins]">
                    Theo dõi thuốc
                  </p>
                  <p className="info text-red-500 font-[poppins] font-bold">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <ul className="features p-0">
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                      <span>Các nhà cung cấp nguyên liệu thô</span>
                    </li>
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                      <span>Nhà sản xuất</span>
                    </li>
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </span>
                      <span>Nhà phân phối</span>
                    </li>
                  </ul>
                  <div className="button" onClick={redirect_to_track}>
                    Theo dõi thuốc
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
