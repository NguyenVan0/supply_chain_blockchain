import "./AddMed.css"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";

function AddMed() {
  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedName, setMedName] = useState();
  const [MedDes, setMedDes] = useState();
  const [MedStage, setMedStage] = useState();

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
      window.alert("Hợp đồng thông minh chưa được triển khai trên mạng hiện tại");
    }
  };
  if (loader) {
    return (
      <div>
        <h1 className="wait">Đang tải...</h1>
      </div>
    );
  }
  const redirect_to_home = () => {
    navigate("/");
  };
  const handlerChangeNameMED = (event) => {
    setMedName(event.target.value);
  };
  const handlerChangeDesMED = (event) => {
    setMedDes(event.target.value);
  };
  const handlerSubmitMED = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addMedicine(MedName, MedDes)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Đã có lỗi xảy ra!!!");
    }
  };
  return (
    <div className="py-10 mt-[11vh]" style={{padding: '20px'}}>
      <div className="container mx-auto">
        <div className="w-[90%] mx-auto">
          <span >
            <b>Địa chỉ tài khoản hiện tại:</b> {currentaccount}
          </span>
        </div>
      </div>


      <br />
      <div className="2xl:container mx-auto py-10 space-y-4">

        <div className="w-[90%] mx-auto grid grid-cols-1">
          <h5>Thêm Đơn Hàng Thuốc:</h5>
        </div>
        <div className="mx-auto w-[90%] grid grid-cols-1 md:grid-cols-2">
          <form onSubmit={handlerSubmitMED}>
            <div className="flex flex-col justify-center items-start space-y-4">
              <input
                className="form-control-sm border border-red-500"
                type="text"
                onChange={handlerChangeNameMED}
                placeholder="Tên Thuốc"
                required
              />
              <input
                className="form-control-sm border border-red-500"
                type="text"
                onChange={handlerChangeDesMED}
                placeholder="Mô Tả Thuốc"
                required
              />
              <button
                className="btn btn-outline-success btn-sm"
                onSubmit={handlerSubmitMED}
              >
                Đặt Hàng
              </button>
            </div>

          </form>
          <div>
            <h5>Thuốc Đã Đặt:</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Mô Tả</th>
                  <th scope="col">Giai Đoạn Hiện Tại</th>
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
          </div>
        </div>

      </div>

      <br />

    </div>

  );
}

export default AddMed;
