import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { preLoader } from "./Assets/Img";

function Supply() {
  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();
  const [ID, setID] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Trình duyệt không hỗ trợ Ethereum. Bạn nên thử sử dụng MetaMask!"
      );
    }
  };

  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      var i;
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];
      for (i = 0; i < medCtr; i++) {
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      setloader(false);
    } else {
      window.alert("Hợp đồng thông minh không được triển khai trên mạng hiện tại");
    }
  };

  if (loader) {
    return (
      <div>
        <div className="h-screen flex flex-col justify-center items-center mt-[11vh]">
          <img src={preLoader} alt="pre-loader" />
        </div>
      </div>
    );
  }

  const redirect_to_home = () => {
    navigate("/");
  };

  const handlerChangeID = (event) => {
    setID(event.target.value);
  };

  const handlerSubmitRMSsupply = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .RMSsupply(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Đã xảy ra lỗi!!!");
    }
  };

  const handlerSubmitManufacturing = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Manufacturing(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Đã xảy ra lỗi!!!");
    }
  };

  const handlerSubmitDistribute = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Distribute(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Đã xảy ra lỗi!!!");
    }
  };

  const handlerSubmitRetail = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Retail(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Đã xảy ra lỗi!!!");
    }
  };

  const handlerSubmitSold = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .sold(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Đã xảy ra lỗi!!!");
    }
  };

  return (
    <div className="mt-[11vh]" style={{padding: '20px'}}>
      <span>
        <b>Địa chỉ tài khoản hiện tại:</b> {currentaccount}
      </span>
      <span
        onClick={redirect_to_home}
        className="btn btn-outline-danger btn-sm"
      >
        {" "}
        TRANG CHỦ
      </span>
      <h6>
        <b>Chuỗi cung ứng:</b>
      </h6>
      <p>
        Đặt hàng thuốc -&gt; Nhà cung cấp nguyên liệu -&gt; Nhà sản xuất -&gt;
        Nhà phân phối -&gt; Nhà bán lẻ -&gt; Người tiêu dùng
      </p>
      <table className="table table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">Mã thuốc</th>
            <th scope="col">Tên</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Giai đoạn xử lý hiện tại</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(MED).map(function (key) {
            return (
              <tr key={key}>
                <td>{MED[key].id}</td>
                <td>{MED[key].name}</td>
                <td>{MED[key].description}</td>
                <td>{MedStage[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h5>
        <b>Bước 1: Cung cấp nguyên liệu thô</b>(Chỉ có Nhà cung cấp nguyên liệu đã đăng ký mới có thể thực hiện bước này):
      </h5>
      <form onSubmit={handlerSubmitRMSsupply}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Nhập mã thuốc"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitRMSsupply}
        >
          Cung cấp
        </button>
      </form>
      <hr />
      <br />
      <h5>
        <b>Bước 2: Sản xuất</b>(Chỉ có Nhà sản xuất đã đăng ký mới có thể thực hiện bước này):
      </h5>
      <form onSubmit={handlerSubmitManufacturing}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Nhập mã thuốc"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitManufacturing}
        >
          Sản xuất
        </button>
      </form>
      <hr />
      <br />
      <h5>
        <b>Bước 3: Phân phối</b>(Chỉ có Nhà phân phối đã đăng ký mới có thể thực hiện bước này):
      </h5>
      <form onSubmit={handlerSubmitDistribute}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Nhập mã thuốc"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitDistribute}
        >
          Phân phối
        </button>
      </form>
      <hr />
      <br />
      <h5>
        <b>Bước 4: Bán lẻ</b>(Chỉ có Nhà bán lẻ đã đăng ký mới có thể thực hiện bước này):
      </h5>
      <form onSubmit={handlerSubmitRetail}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Nhập mã thuốc"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitRetail}
        >
          Bán lẻ
        </button>
      </form>
      <hr />
      <br />
      <h5>
        <b>Bước 5: Đánh dấu đã bán</b>(Chỉ có Nhà bán lẻ đã đăng ký mới có thể thực hiện bước này):
      </h5>
      <form onSubmit={handlerSubmitSold}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Nhập mã thuốc"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitSold}
        >
          Đã bán
        </button>
      </form>
    </div>
  );
}

export default Supply;
