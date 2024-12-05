import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { preLoader } from "./Assets/Img";

function Track() {
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
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();
  const [TrackTillSold, showTrackTillSold] = useState(false);
  const [TrackTillRetail, showTrackTillRetail] = useState(false);
  const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
  const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
  const [TrackTillRMS, showTrackTillRMS] = useState(false);
  const [TrackTillOrdered, showTrackTillOrdered] = useState(false);

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
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];
      for (i = 0; i < medCtr; i++) {
        med[i + 1] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i + 1] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i + 1] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i + 1] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i + 1] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      const retCtr = await supplychain.methods.retCtr().call();
      const ret = {};
      for (i = 0; i < retCtr; i++) {
        ret[i + 1] = await supplychain.methods.RET(i + 1).call();
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
  if (TrackTillSold) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Thuốc:</u>
            </b>
          </h3>
          <span>
            <b>Mã Thuốc: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Tên:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Mô Tả: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Giai Đoạn Hiện Tại: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Nguyên Liệu Cung Cấp Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Cung Cấp: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Tên:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Sản Xuất Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Sản Xuất: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Tên:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Phân Phối Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Phân Phối: </b>
              {DIS[MED[ID].DISid].id}
            </p>
            <p>
              <b>Tên:</b> {DIS[MED[ID].DISid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {DIS[MED[ID].DISid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Bán Lẻ Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Bán Lẻ: </b>
              {RET[MED[ID].RETid].id}
            </p>
            <p>
              <b>Tên:</b> {RET[MED[ID].RETid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {RET[MED[ID].RETid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Đã Bán</u>
            </h4>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillSold(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Theo Dõi Mặt Hàng Khác
        </button>
      </div>
    );
  }
  
  if (TrackTillRetail) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Thuốc:</u>
            </b>
          </h3>
          <span>
            <b>Mã Thuốc: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Tên:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Mô Tả: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Giai Đoạn Hiện Tại: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Nguyên Liệu Cung Cấp Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Cung Cấp: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Tên:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Sản Xuất Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Sản Xuất: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Tên:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Phân Phối Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Phân Phối: </b>
              {DIS[MED[ID].DISid].id}
            </p>
            <p>
              <b>Tên:</b> {DIS[MED[ID].DISid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {DIS[MED[ID].DISid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Bán Lẻ Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Bán Lẻ: </b>
              {RET[MED[ID].RETid].id}
            </p>
            <p>
              <b>Tên:</b> {RET[MED[ID].RETid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {RET[MED[ID].RETid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillRetail(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Theo Dõi Mặt Hàng Khác
        </button>
        <span
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          TRANG CHỦ
        </span>
      </div>
    );
  }
  if (TrackTillDistribution) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Thuốc:</u>
            </b>
          </h3>
          <span>
            <b>Mã Thuốc: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Tên:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Mô Tả: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Giai Đoạn Hiện Tại: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Nguyên Liệu Cung Cấp Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Cung Cấp: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Tên:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Sản Xuất Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Sản Xuất: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Tên:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Phân Phối Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Phân Phối: </b>
              {DIS[MED[ID].DISid].id}
            </p>
            <p>
              <b>Tên:</b> {DIS[MED[ID].DISid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {DIS[MED[ID].DISid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillDistribution(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Theo Dõi Mặt Hàng Khác
        </button>
        <span
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          TRANG CHỦ
        </span>
      </div>
    );
  }
  if (TrackTillManufacture) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Thuốc:</u>
            </b>
          </h3>
          <span>
            <b>Mã Thuốc: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Tên:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Mô Tả: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Giai Đoạn Hiện Tại: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Nguyên Liệu Cung Cấp Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Cung Cấp: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Tên:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Sản Xuất Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Sản Xuất: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Tên:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillManufacture(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Theo Dõi Mặt Hàng Khác
        </button>
        <span
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          TRANG CHỦ
        </span>
      </div>
    );
  }  
  if (TrackTillRMS) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Thuốc:</u>
            </b>
          </h3>
          <span>
            <b>Mã Thuốc: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Tên:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Mô Tả: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Giai Đoạn Hiện Tại: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Nguyên Liệu Được Cung Cấp Bởi:</u>
            </h4>
            <p>
              <b>Mã Nhà Cung Cấp: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Tên:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Địa Điểm: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillRMS(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Theo Dõi Mặt Hàng Khác
        </button>
        <span
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          TRANG CHỦ
        </span>
      </div>
    );
    
  }
  if (TrackTillOrdered) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Thuốc:</u>
            </b>
          </h3>
          <span>
            <b>Mã Thuốc: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Tên:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Mô Tả: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Giai Đoạn Hiện Tại: </b>
            {MedStage[ID]}
          </span>
          <hr />
          <br />
          <h5>Thuốc Chưa Được Xử Lý...</h5>
          <button
            onClick={() => {
              showTrackTillOrdered(false);
            }}
            className="btn btn-outline-success btn-sm"
          >
            Theo Dõi Mặt Hàng Khác
          </button>
        </article>
        {/* <section className="row">
                        
                        <article className="col-3">
                            <h4><u>Nguyên Liệu Được Cung Cấp Bởi:</u></h4>
                            <p><b>Mã Nhà Cung Cấp: </b>{RMS[MED[ID].RMSid].id}</p>
                            <p><b>Tên:</b> {RMS[MED[ID].RMSid].name}</p>
                            <p><b>Địa Điểm: </b>{RMS[MED[ID].RMSid].place}</p>
                        </article>
                    </section> */}
      </div>
    );
    
  }
  const handlerChangeID = (event) => {
    setID(event.target.value);
  };
  const redirect_to_home = () => {
    navigate("/");
  };
  const handlerSubmit = async (event) => {
    event.preventDefault();
    var ctr = await SupplyChain.methods.medicineCtr().call();
    if (!(ID > 0 && ID <= ctr)) alert("Invalid Medicine ID!!!");
    else {
      // eslint-disable-next-line
      if (MED[ID].stage == 5) showTrackTillSold(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 4) showTrackTillRetail(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 3) showTrackTillDistribution(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 2) showTrackTillManufacture(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 1) showTrackTillRMS(true);
      else showTrackTillOrdered(true);
    }
  };

  return (
    <div className="mt-[11vh]" style={{padding: '10px'}}>
  <span>
    <b>Địa Chỉ Tài Khoản Hiện Tại:</b> {currentaccount}
  </span>
  <span
    onClick={redirect_to_home}
    className="btn btn-outline-danger btn-sm"
  >
    TRANG CHỦ
  </span>

  <h5 className="pt-5">Nhập Mã Thuốc Để Theo Dõi</h5>
      <form onSubmit={handlerSubmit} className="py-10">
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeID}
          placeholder="Nhập ID thuốc"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmit}
        >
          Theo dõi
        </button>
      </form>
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
          <th scope="col">Mã Thuốc</th>
<th scope="col">Tên Thuốc</th>
<th scope="col">Mô Tả</th>
<th scope="col">Giai Đoạn Xử Lý Hiện Tại</th>

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
  );
}

export default Track;
