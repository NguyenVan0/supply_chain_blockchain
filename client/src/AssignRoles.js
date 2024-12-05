import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { useNavigate } from "react-router-dom";
import { preLoader } from "./Assets/Img";

function AssignRoles() {
  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [RMSname, setRMSname] = useState();
  const [MANname, setMANname] = useState();
  const [DISname, setDISname] = useState();
  const [RETname, setRETname] = useState();
  const [RMSplace, setRMSplace] = useState();
  const [MANplace, setMANplace] = useState();
  const [DISplace, setDISplace] = useState();
  const [RETplace, setRETplace] = useState();
  const [RMSaddress, setRMSaddress] = useState();
  const [MANaddress, setMANaddress] = useState();
  const [DISaddress, setDISaddress] = useState();
  const [RETaddress, setRETaddress] = useState();
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Đã phát hiện trình duyệt không phải Ethereum. Bạn nên cân nhắc dùng thử MetaMask!"
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
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      const retCtr = await supplychain.methods.retCtr().call();
      const ret = {};
      for (i = 0; i < retCtr; i++) {
        ret[i] = await supplychain.methods.RET(i + 1).call();
      }
      setRET(ret);
      setloader(false);
    } else {
      window.alert("Hợp đồng thông minh không được triển khai vào mạng hiện tại");
    }
  };
  if (loader) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <img src={preLoader} alt="pre-loader" />
      </div>
    );
  }
  const redirect_to_home = () => {
    navigate("/");
  };
  const handlerChangeAddressRMS = (event) => {
    setRMSaddress(event.target.value);
  };
  const handlerChangePlaceRMS = (event) => {
    setRMSplace(event.target.value);
  };
  const handlerChangeNameRMS = (event) => {
    setRMSname(event.target.value);
  };
  const handlerChangeAddressMAN = (event) => {
    setMANaddress(event.target.value);
  };
  const handlerChangePlaceMAN = (event) => {
    setMANplace(event.target.value);
  };
  const handlerChangeNameMAN = (event) => {
    setMANname(event.target.value);
  };
  const handlerChangeAddressDIS = (event) => {
    setDISaddress(event.target.value);
  };
  const handlerChangePlaceDIS = (event) => {
    setDISplace(event.target.value);
  };
  const handlerChangeNameDIS = (event) => {
    setDISname(event.target.value);
  };
  const handlerChangeAddressRET = (event) => {
    setRETaddress(event.target.value);
  };
  const handlerChangePlaceRET = (event) => {
    setRETplace(event.target.value);
  };
  const handlerChangeNameRET = (event) => {
    setRETname(event.target.value);
  };
  const handlerSubmitRMS = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addRMS(RMSaddress, RMSname, RMSplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Đã xảy ra lỗi!!");
    }
  };
  const handlerSubmitMAN = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addManufacturer(MANaddress, MANname, MANplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitDIS = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addDistributor(DISaddress, DISname, DISplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Đã xảy ra lỗi!!");
    }
  };
  const handlerSubmitRET = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addRetailer(RETaddress, RETname, RETplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("Đã xảy ra lỗi!!!");
    }
  };

  return (
    <div className="mt-[10vh]" style={{padding: '30px'}}>
      <span>
        <b>Địa Chỉ Tài Khoản Hiện Tại:</b> {currentaccount}
      </span>
      <span
        onClick={redirect_to_home}
        className="btn btn-outline-danger btn-sm"
      >
        TRANG CHỦ
      </span>
      <h4>Nhà Cung Cấp Nguyên Liệu:</h4>
      <form onSubmit={handlerSubmitRMS}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeAddressRMS}
          placeholder="Địa Chỉ Ethereum"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeNameRMS}
          placeholder="Tên Nhà Cung Cấp Nguyên Liệu"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangePlaceRMS}
          placeholder="Nơi Cung Cấp"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitRMS}
        >
          Đăng Ký
        </button>
      </form>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên</th>
            <th scope="col">Nơi Cung Cấp</th>
            <th scope="col">Địa Chỉ Ethereum</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(RMS).map(function (key) {
            return (
              <tr key={key}>
                <td>{RMS[key].id}</td>
                <td>{RMS[key].name}</td>
                <td>{RMS[key].place}</td>
                <td>{RMS[key].addr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Nhà Sản Xuất:</h4>
      <form onSubmit={handlerSubmitMAN}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeAddressMAN}
          placeholder="Địa Chỉ Ethereum"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeNameMAN}
          placeholder="Tên Nhà Sản Xuất"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangePlaceMAN}
          placeholder="Nơi Sản Xuất"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitMAN}
        >
          Đăng Ký
        </button>
      </form>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên</th>
            <th scope="col">Nơi Sản Xuất</th>
            <th scope="col">Địa Chỉ Ethereum</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(MAN).map(function (key) {
            return (
              <tr key={key}>
                <td>{MAN[key].id}</td>
                <td>{MAN[key].name}</td>
                <td>{MAN[key].place}</td>
                <td>{MAN[key].addr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Nhà Phân Phối:</h4>
      <form onSubmit={handlerSubmitDIS}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeAddressDIS}
          placeholder="Địa Chỉ Ethereum"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeNameDIS}
          placeholder="Tên Nhà Phân Phối"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangePlaceDIS}
          placeholder="Nơi Phân Phối"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitDIS}
        >
          Đăng Ký
        </button>
      </form>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên</th>
            <th scope="col">Nơi Phân Phối</th>
            <th scope="col">Địa Chỉ Ethereum</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(DIS).map(function (key) {
            return (
              <tr key={key}>
                <td>{DIS[key].id}</td>
                <td>{DIS[key].name}</td>
                <td>{DIS[key].place}</td>
                <td>{DIS[key].addr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h4>Nhà Bán Lẻ:</h4>
      <form onSubmit={handlerSubmitRET}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeAddressRET}
          placeholder="Địa Chỉ Ethereum"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeNameRET}
          placeholder="Tên Nhà Bán Lẻ"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangePlaceRET}
          placeholder="Nơi Bán Lẻ"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitRET}
        >
          Đăng Ký
        </button>
      </form>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên</th>
            <th scope="col">Nơi Bán Lẻ</th>
            <th scope="col">Địa Chỉ Ethereum</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(RET).map(function (key) {
            return (
              <tr key={key}>
                <td>{RET[key].id}</td>
                <td>{RET[key].name}</td>
                <td>{RET[key].place}</td>
                <td>{RET[key].addr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  
}

export default AssignRoles;
