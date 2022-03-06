
javascript: {
    var arraySanPham = new Array();
    var a = document.getElementsByClassName('shopee-form filter-form shopee-form--label-right')[0];
    var XuongDong = document.createElement('br');
    a.appendChild(XuongDong);
    var b = document.createElement('div');
    var lb = document.createElement('lable');
    lb.textContent = "Id Product:";
    lb.style = 'margin-right: 16px';
    b.appendChild(lb);
    var classInput = new Array(document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'), document.createElement('input'));
    for (var i = 0; i < classInput.length; i++) {
        classInput[i].className = "IdProduct";
        classInput[i].type = 'input';
        classInput[i].style = 'height: 30px';
        classInput[i].style = 'with: 70px';
        classInput[i].style = 'margin-right: 16px';
        var strSave = window.localStorage.getItem('Input' + i);
        if (strSave != null) {
            var ObjSave = JSON.parse(strSave);
            classInput[i].value = ObjSave.id;
        }
        classInput[i].onclick = function () {
            var strSaves = window.localStorage.getItem('Input' + i);
            if (strSaves != null) {
                var ObjSave = JSON.parse(strSaves);
                document.getElementById('labelThongBao').value = ObjSave.name;
            }
        };

        b.appendChild(classInput[i]);
    }
    a.appendChild(b);
    var XuongDong = document.createElement('br');
    a.appendChild(XuongDong);
    var c = document.createElement('div');
    var lb = document.createElement('lable');
    lb.textContent = "List Product:";
    lb.style = 'margin-right: 16px';
    c.appendChild(lb);
    var ComboBox = document.createElement("select");
    ComboBox.id = "ActiveSelect";
    ComboBox.style = "height: 30px";
    ComboBox.style = 'margin-right: 16px';

    var spc = SPCCDS();
    if (spc == "") {
        alert("Lỗi SPC isEmtry");
    }
    GetPage(spc, ComboBox);
    ComboBox.onchange = function () {
        onChangeOptionSelect();
    };
    c.appendChild(ComboBox);
    a.appendChild(c);
    var d = document.createElement('div');
    var XuongDong = document.createElement('br');
    d.appendChild(XuongDong);
    var lb = document.createElement('lable');
    lb.textContent = "Search:";
    lb.style = 'margin-right: 16px';
    d.appendChild(lb);
    var inputSearchProduct = document.createElement('input');
    inputSearchProduct.id = "SearchProduct";
    inputSearchProduct.style = "height: 30px";
    inputSearchProduct.style = 'margin-right: 16px';
    d.appendChild(inputSearchProduct);
    var ButtonSearchOptions = document.createElement('button');
    ButtonSearchOptions.textContent = "Tìm Kiếm";
    ButtonSearchOptions.type = "button";
    ButtonSearchOptions.id = "btnTimKiemOption";
    ButtonSearchOptions.className = "shopee-button shopee-button--primary shopee-button--normal";
    var cssClass = document.getElementsByClassName("shopee-button shopee-button--primary shopee-button--normal")[0].style;
    ButtonSearchOptions.style = cssClass;
    ButtonSearchOptions.style = 'margin-right: 16px';
    ButtonSearchOptions.onclick = function () {
        TimKiemSanPham();
        console.log("success");
    };
    d.appendChild(ButtonSearchOptions);
    var labelHienThi = document.createElement('label');
    labelHienThi.id = "labelThongBao";
    labelHienThi.textContent = "Thông Báo: ";
    labelHienThi.style = "height: 30px";
    labelHienThi.style = 'margin-right: 16px';
    labelHienThi.style = 'margin-left: 16px';
    d.appendChild(labelHienThi);
    a.appendChild(d);
    var clActions = document.getElementsByClassName('actions');
    var btnDaySanpham = document.createElement('button');
    btnDaySanpham.id = "btnDay";
    btnDaySanpham.className = "shopee-button shopee-button--primary shopee-button--normal";
    btnDaySanpham.type = "button";
    btnDaySanpham.textContent = "Đẩy Sản Phẩm";
    btnDaySanpham.style = cssClass;
    btnDaySanpham.style = 'margin-right: 16px';
    btnDaySanpham.style = 'margin-left: 16px';
    btnDaySanpham.onclick = function () {
        DaySanPham();
        console.log("success");
    };
    clActions[0].appendChild(btnDaySanpham);
}
function GetPage(spc, ComboBox) {
    var loopRequest = 1;
    var strurl = 'https://banhang.shopee.vn/api/v3/mpsku/get_mpsku_list/?SPC_CDS=' + spc + '&SPC_CDS_VER=2&page_number=1&page_size=24&list_type=all&source=seller_center&version=1.0.0';
    var data = null;
    var xhrs = new XMLHttpRequest();
    xhrs.withCredentials = true;
    xhrs.addEventListener("readystatechange", function () {
        if (xhrs.readyState === 4) {
            var strObject = xhrs.responseText;
            var ObjData = JSON.parse(strObject);
            var TinNhan = ObjData.message;
            var objDatas = ObjData.data;
            var ObjectPage = objDatas.page_info;
            var TotalProduct = ObjectPage.total;
            var SizeProduct = ObjectPage.page_size;
            var PhepTinhDu = TotalProduct % SizeProduct;
            if (PhepTinhDu > 0) {
                loopRequest = Math.floor(TotalProduct / SizeProduct) + 1;
            } else {
                loopRequest = Math.floor(TotalProduct / SizeProduct);
            }
            console.log("loopRequest:" + loopRequest + " " + TinNhan);
            for (let i = 1; i <= loopRequest; i++) {
                setTimeout(function () {
                    console.log("Page:" + i);
                    ListProduct(spc, ComboBox, i);
                }, 200);
            }
        }
    });
    xhrs.open("GET", strurl);
    xhrs.send(data);
}
function ListProduct(spc, ComboBox, strpage) {
    var strurl = 'https://banhang.shopee.vn/api/v3/mpsku/get_mpsku_list/?SPC_CDS=' + spc + '&SPC_CDS_VER=2&page_number=' + strpage + '&page_size=24&list_type=all&source=seller_center&version=1.0.0';
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
            var strObject = xhr.responseText;
            var ObjData = JSON.parse(strObject);
            var TinNhan = ObjData.message;
            var objDatas = ObjData.data;
            var ListData = objDatas.list;
            console.log(TinNhan + " Page:" + strpage);
            for (var i = 0; i < ListData.length; i++) {
                var idProduct = ListData[i].id;
                var strName = ListData[i].name;
                const ObjectProuct = {
                    name: strName,
                    id: idProduct
                };
                arraySanPham.push(ObjectProuct);
                console.log("ID:" + idProduct + " Name:" + strName);
                var option1 = document.createElement("option");
                option1.className = "OptionProduct";
                option1.textContent = strName;
                option1.value = idProduct;
                ComboBox.appendChild(option1);
            }
        }
    });
    xhr.open("GET", strurl);
    xhr.send(data);
}

function onChangeOptionSelect() {
    var select = document.getElementById('ActiveSelect');
    var value = select.options[select.selectedIndex].value;
    document.getElementById('labelThongBao').textContent = "Id: " + value;
    var nameProduct = select.options[select.selectedIndex].textContent;

}

function TimKiemSanPham() {
    const container = document.querySelector('#ActiveSelect');
    removeAllChildNodes(container);
    var txtSearch = document.getElementById("SearchProduct").value;
    console.log("Tìm Kiếm: " + txtSearch);
    if (txtSearch == "") {
        for (var i = 0; i < arraySanPham.length; i++) {
            var obj = arraySanPham[i];
            var strTen = obj.name;
            var idPr = obj.id;
            var option1 = document.createElement("option");
            option1.className = "OptionProduct";
            option1.textContent = strTen;
            option1.value = idPr;
            container.appendChild(option1);

        }
        onChangeOptionSelect();
    } else {
        var arraySearch = new Array();
        for (var i = 0; i < arraySanPham.length; i++) {
            var obj = arraySanPham[i];
            var strTen = obj.name;
            var idPr = obj.id;
            console.log("Tìm Kiếm Vị Trí " + txtSearch.toLowerCase().search(strTen.toLowerCase()));
            if (strTen.toLowerCase().search(txtSearch.toLowerCase()) > -1) {
                arraySearch.push(obj);
                var option1 = document.createElement("option");
                option1.className = "OptionProduct";
                option1.textContent = strTen;
                option1.value = idPr;
                container.appendChild(option1);
            }
        }
        onChangeOptionSelect();
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function DaySanPham() {
    if (document.getElementById('btnDay').disabled == false) {
        document.getElementById('btnDay').disabled = true;
        document.getElementById('btnDay').style = 'background-color: #a3a3';
    }
    var myVar = setInterval(function () {

        var arrayValue = new Array(document.getElementsByClassName("IdProduct")[0].value, document.getElementsByClassName("IdProduct")[1].value, document.getElementsByClassName("IdProduct")[2].value, document.getElementsByClassName("IdProduct")[3].value, document.getElementsByClassName("IdProduct")[4].value);
        for (var i = 0; i < arrayValue.length; i++) {
            var ObjSanPham = ObjectDaySanPham(arrayValue[i], i);
            var strSaves = window.localStorage.getItem('Input' + i);
            if (strSaves == null) {
                /**
                Thực hiện đẩy
                 */

                if (ObjSanPham != null) {
                    RequestDaySanPham(ObjSanPham);
                }

            } else {
                var ObjSave = JSON.parse(strSaves);
                var endTime = ObjSave.EndTimes;
                var intEndtime = Number(endTime);
                var date = new Date().getTime();
                var end = date + 14400000;
                if (date > intEndtime) {
                    /**
                    nếu thời gian hiện tại lớn hơn thời gian đã save thì thực hiện đẩy
                     */

                    if (ObjSanPham != null) {
                        RequestDaySanPham(ObjSanPham);
                    }
                } else {
                    /**
                    setup thông báo đang đẩy sản phẩm và setimeout chờ đợi
                     */
                    var TimeConLai = intEndtime - date;
                    var SoPhutDoi = Number(TimeConLai / 60000);
                    var GioDoi = Math.floor(SoPhutDoi / 60);
                    if (Number(GioDoi) > 0) {
                        var Phut = SoPhutDoi % 60;
                        document.getElementById('btnDay').textContent = GioDoi + " Giờ :" + Number(Phut) + " Phút";
                    } else {
                        document.getElementById('btnDay').textContent = "0 Giờ :" + SoPhutDoi + " Phút";
                    }
                }
            }

        }

    }, 5000);

}
function RequestDaySanPham(ObjectSanPham) {
    var SPC = SPCCDS();
    if (SPC == "") {
        alert("Lỗi SPC isEmtry");
    }
    var id = ObjectSanPham.id;
    var tenSanPham = ObjectSanPham.name;
    var strInput = ObjectSanPham.ip;

    var data = "{\"id\":" + id + "}";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
            var date = new Date().getTime();
            var end = date + 14400000;
            const ObjectProuct = {
                name: tenSanPham,
                id: id,
                EndTimes: end
            };
            window.localStorage.setItem(strInput, JSON.stringify(ObjectProuct));

            console.log(xhr.responseText);
        }
    });

    xhr.open("POST", "https://banhang.shopee.vn/api/v3/product/boost_product/?version=3.1.0&SPC_CDS=" + SPC + "&SPC_CDS_VER=2");

    xhr.send(data);

}

function ObjectDaySanPham(idSanPham, ViTri) {

    if (idSanPham != "") {
        idSanPham = Number(idSanPham);
        for (var j = 0; j < arraySanPham.length; j++) {
            var obj = arraySanPham[j];
            var strTen = obj.name;
            var idPr = obj.id;
            idPr = Number(idPr);
            if (idPr == idSanPham) {
                const ObjectProuct = {
                    name: strTen,
                    id: idPr,
                    ip: "Input" + ViTri,
                    TimeCheck: "EndTimes" + ViTri
                };
                return ObjectProuct;
            }
        }
    }

    return null;
}

function SPCCDS() {
    var ck = document.cookie;
    var split = ck.split(";");
    var spccds = "";
    for (var i = 0; i < split.length; i++) {
        if (split[i].search("SPC_CDS") > -1) {
            spccds = split[i];
            spccds = spccds.replace("SPC_CDS=", "");
            return spccds;

        }
    }
    return spccds;
}

