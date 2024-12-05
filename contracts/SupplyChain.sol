// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SupplyChain {
    // Chủ sở hữu hợp đồng thông minh sẽ là người triển khai hợp đồng. Chỉ người này có thể ủy quyền các vai trò khác như Nhà bán lẻ, Nhà sản xuất, v.v.
    address public Owner;

    // Hàm khởi tạo sẽ được gọi khi hợp đồng thông minh được triển khai trên blockchain
    constructor() public {
        Owner = msg.sender;
    }

    // Các vai trò trong chuỗi cung ứng dược phẩm
    // Nhà cung cấp nguyên liệu thô: Nơi mà nhà sản xuất sẽ lấy nguyên liệu thô để sản xuất thuốc
    // Nhà sản xuất: Người sản xuất thuốc và cần tuân theo các hướng dẫn của WHO
    // Nhà phân phối: Người phân phối thuốc đến các nhà bán lẻ
    // Nhà bán lẻ: Khách hàng thông thường mua từ nhà bán lẻ

    // Modifier đảm bảo chỉ chủ sở hữu mới được sử dụng hàm
    modifier onlyByOwner() {
        require(msg.sender == Owner);
        _;
    }

    // Các giai đoạn của một loại thuốc trong chuỗi cung ứng dược phẩm
    enum STAGE {
        Init, // Giai đoạn khởi tạo
        RawMaterialSupply, // Cung cấp nguyên liệu thô
        Manufacture, // Sản xuất
        Distribution, // Phân phối
        Retail, // Nhà bán lẻ
        sold // Đã bán
    }
    // Dùng để theo dõi từng loại thuốc mà chủ sở hữu đặt hàng

    // Bộ đếm thuốc
    uint256 public medicineCtr = 0;
    // Bộ đếm nhà cung cấp nguyên liệu thô
    uint256 public rmsCtr = 0;
    // Bộ đếm nhà sản xuất
    uint256 public manCtr = 0;
    // Bộ đếm nhà phân phối
    uint256 public disCtr = 0;
    // Bộ đếm nhà bán lẻ
    uint256 public retCtr = 0;

    // Lưu thông tin về thuốc
    struct medicine {
        uint256 id; // ID duy nhất của thuốc
        string name; // Tên của thuốc
        string description; // Mô tả về thuốc
        uint256 RMSid; // ID của nhà cung cấp nguyên liệu thô
        uint256 MANid; // ID của nhà sản xuất
        uint256 DISid; // ID của nhà phân phối
        uint256 RETid; // ID của nhà bán lẻ
        STAGE stage; // Giai đoạn hiện tại của thuốc
    }

    // Lưu trữ tất cả các loại thuốc trên blockchain
    mapping(uint256 => medicine) public MedicineStock;

    // Hiển thị trạng thái của thuốc để các ứng dụng khách có thể theo dõi
    function showStage(uint256 _medicineID)
        public
        view
        returns (string memory)
    {
        require(medicineCtr > 0);
        if (MedicineStock[_medicineID].stage == STAGE.Init)
            return "Thuốc đã được đặt hàng";
        else if (MedicineStock[_medicineID].stage == STAGE.RawMaterialSupply)
            return "Giai đoạn cung cấp nguyên liệu thô";
        else if (MedicineStock[_medicineID].stage == STAGE.Manufacture)
            return "Giai đoạn sản xuất";
        else if (MedicineStock[_medicineID].stage == STAGE.Distribution)
            return "Giai đoạn phân phối";
        else if (MedicineStock[_medicineID].stage == STAGE.Retail)
            return "Giai đoạn bán lẻ";
        else if (MedicineStock[_medicineID].stage == STAGE.sold)
            return "Thuốc đã được bán";
    }

    // Lưu thông tin về nhà cung cấp nguyên liệu thô
    struct rawMaterialSupplier {
        address addr;
        uint256 id; // ID nhà cung cấp
        string name; // Tên của nhà cung cấp nguyên liệu thô
        string place; // Địa chỉ của nhà cung cấp nguyên liệu thô
    }

    // Lưu trữ tất cả các nhà cung cấp nguyên liệu thô trên blockchain
    mapping(uint256 => rawMaterialSupplier) public RMS;

    // Lưu thông tin về nhà sản xuất
    struct manufacturer {
        address addr;
        uint256 id; // ID nhà sản xuất
        string name; // Tên của nhà sản xuất
        string place; // Địa chỉ của nhà sản xuất
    }

    // Lưu trữ tất cả các nhà sản xuất trên blockchain
    mapping(uint256 => manufacturer) public MAN;

    // Lưu thông tin về nhà phân phối
    struct distributor {
        address addr;
        uint256 id; // ID nhà phân phối
        string name; // Tên của nhà phân phối
        string place; // Địa chỉ của nhà phân phối
    }

    // Lưu trữ tất cả các nhà phân phối trên blockchain
    mapping(uint256 => distributor) public DIS;

    // Lưu thông tin về nhà bán lẻ
    struct retailer {
        address addr;
        uint256 id; // ID nhà bán lẻ
        string name; // Tên của nhà bán lẻ
        string place; // Địa chỉ của nhà bán lẻ
    }

    // Lưu trữ tất cả các nhà bán lẻ trên blockchain
    mapping(uint256 => retailer) public RET;

    // Thêm nhà cung cấp nguyên liệu thô. Chỉ chủ sở hữu hợp đồng mới có thể thêm
    function addRMS(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        rmsCtr++;
        RMS[rmsCtr] = rawMaterialSupplier(_address, rmsCtr, _name, _place);
    }

    // Thêm nhà sản xuất. Chỉ chủ sở hữu hợp đồng mới có thể thêm
    function addManufacturer(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        manCtr++;
        MAN[manCtr] = manufacturer(_address, manCtr, _name, _place);
    }

    // Thêm nhà phân phối. Chỉ chủ sở hữu hợp đồng mới có thể thêm
    function addDistributor(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        disCtr++;
        DIS[disCtr] = distributor(_address, disCtr, _name, _place);
    }

    // Thêm nhà bán lẻ. Chỉ chủ sở hữu hợp đồng mới có thể thêm
    function addRetailer(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        retCtr++;
        RET[retCtr] = retailer(_address, retCtr, _name, _place);
    }

    // Cung cấp nguyên liệu thô từ nhà cung cấp đến nhà sản xuất
    function RMSsupply(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findRMS(msg.sender);
        require(_id > 0);
        require(MedicineStock[_medicineID].stage == STAGE.Init);
        MedicineStock[_medicineID].RMSid = _id;
        MedicineStock[_medicineID].stage = STAGE.RawMaterialSupply;
    }

    // Kiểm tra xem nhà cung cấp nguyên liệu thô có tồn tại trên blockchain không
    function findRMS(address _address) private view returns (uint256) {
        require(rmsCtr > 0);
        for (uint256 i = 1; i <= rmsCtr; i++) {
            if (RMS[i].addr == _address) return RMS[i].id;
        }
        return 0;
    }

    // Sản xuất thuốc
    function Manufacturing(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findMAN(msg.sender);
        require(_id > 0);
        require(MedicineStock[_medicineID].stage == STAGE.RawMaterialSupply);
        MedicineStock[_medicineID].MANid = _id;
        MedicineStock[_medicineID].stage = STAGE.Manufacture;
    }

    // Kiểm tra xem nhà sản xuất có tồn tại trên blockchain không
    function findMAN(address _address) private view returns (uint256) {
        require(manCtr > 0);
        for (uint256 i = 1; i <= manCtr; i++) {
            if (MAN[i].addr == _address) return MAN[i].id;
        }
        return 0;
    }

    // Phân phối thuốc từ nhà sản xuất đến nhà phân phối
    function Distribute(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findDIS(msg.sender);
        require(_id > 0);
        require(MedicineStock[_medicineID].stage == STAGE.Manufacture);
        MedicineStock[_medicineID].DISid = _id;
        MedicineStock[_medicineID].stage = STAGE.Distribution;
    }

    // Kiểm tra xem nhà phân phối có tồn tại trên blockchain không
    function findDIS(address _address) private view returns (uint256) {
        require(disCtr > 0);
        for (uint256 i = 1; i <= disCtr; i++) {
            if (DIS[i].addr == _address) return DIS[i].id;
        }
        return 0;
    }

    // Cung cấp thuốc từ nhà phân phối đến nhà bán lẻ
    function Retail(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findRET(msg.sender);
        require(_id > 0);
        require(MedicineStock[_medicineID].stage == STAGE.Distribution);
        MedicineStock[_medicineID].RETid = _id;
        MedicineStock[_medicineID].stage = STAGE.Retail;
    }

    // Kiểm tra xem nhà bán lẻ có tồn tại trên blockchain không
    function findRET(address _address) private view returns (uint256) {
        require(retCtr > 0);
        for (uint256 i = 1; i <= retCtr; i++) {
            if (RET[i].addr == _address) return RET[i].id;
        }
        return 0;
    }

    // Bán thuốc từ nhà bán lẻ đến người tiêu dùng
    function sold(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCtr);
        uint256 _id = findRET(msg.sender);
        require(_id > 0);
        require(_id == MedicineStock[_medicineID].RETid); // Chỉ nhà bán lẻ đúng mới được đánh dấu thuốc đã bán
        require(MedicineStock[_medicineID].stage == STAGE.Retail);
        MedicineStock[_medicineID].stage = STAGE.sold;
    }

    // Thêm thuốc mới vào kho
    function addMedicine(string memory _name, string memory _description)
        public
        onlyByOwner()
    {
        require((rmsCtr > 0) && (manCtr > 0) && (disCtr > 0) && (retCtr > 0));
        medicineCtr++;
        MedicineStock[medicineCtr] = medicine(
            medicineCtr,
            _name,
            _description,
            0,
            0,
            0,
            0,
            STAGE.Init
        );
    }
}
