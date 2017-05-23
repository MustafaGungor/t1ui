import React from "react";
import Card from "app/card/Card";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import DataGrid from "robe-react-ui/lib/datagrid/DataGrid";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import DateInput from "robe-react-ui/lib/inputs/DateInput";
import SelectInput from "robe-react-ui/lib/inputs/SelectInput";
import { Line } from 'rc-progress';
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Button from "react-bootstrap/lib/Button";
import Image from "react-bootstrap/lib/Image";
import Modal from "react-bootstrap/lib/Modal";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import AjaxRequest from "robe-react-commons/lib/connections/AjaxRequest";
import Assertions from "robe-react-commons/lib/utils/Assertions";
import RemoteEndPoint from "robe-react-commons/lib/endpoint/RemoteEndPoint";
import { LocalEndPoint } from "robe-react-commons";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Store from "robe-react-commons/lib/stores/Store";
import SHA256 from "crypto-js/sha256";
import PerformanceModel from "./PerformanceModel.json";
//import WorkspaceStore from "../../workspace/WorkspaceStore";
const ekips = [
    {
        key: "60A",
        value: "60A"
    },
    {
        key: "60B",
        value: "60B"
    },
    {
        key: "60C",
        value: "60C"
    }
];

const destinasyon = [
    {
        key: "JFK",
        value: "JFK"
    },
    {
        key: "ORD",
        value: "ORD"
    },
    {
        key: "60C",
        value: "60C"
    }
];

export default class Performance extends ShallowComponent {

    static idField = "id";

    constructor(props) {
        super(props);

        let data=[
            {id:"1",name:"Kemal",sicilno:"T347Hxc",ekip:"AD43",:"Mustafa Yılmaz",genis:"değerli"},
            {id:"2",name:"Ahmet",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"3",name:"Meral",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"4",name:"Ayşe",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"5",name:"Sevinç",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"6",name:"Seda",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"7",name:"Samet",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"8",name:"Kamil",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"9",name:"Uğur",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"10",name:"Mustafa",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"11",name:"Akın",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"12",name:"Demet",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"13",name:"Kübra",sicilno:"T347Hxc",ekip:"AD43",atanan:"Kahraman Tanım",genis:"değerli"},
            {id:"14",name:"Kübra",sicilno:"T347Hxc",ekip:"AD43",atanan:"Yaşar Dertsizoğlu",genis:"değerli"},
            {id:"15",name:"Büşra",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"16",name:"Hazal",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"17",name:"Sevda",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"18",name:"Melih",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"19",name:"Derya",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"20",name:"Murat",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            {id:"21",name:"Demet",sicilno:"T347Hxc",ekip:"AD43",atanan:"Mustafa Yılmaz",genis:"değerli"},
            ];

        

        let store = new Store({
            endPoint: new LocalEndPoint({
                data: data,
                idField: Performance.idField
            }),
            idField: Performance.idField,
            autoLoad: true
        });

       
        this.state = {
            fields: PerformanceModel.fields,
            store: store,
            showPersonelModal: false,
            item: {}
        };
    }

    render() {
        return (
          <Col md={12}>
            <Card header="Personel Performans">
                <Row className="personel-card">
                    <Col md={4}>
                        <Card>
                            <div className="left-con">
                                <Image src="./user.jpg" rounded />
                            </div>
                            <div className="right-con">
                                <h4><b>Zafer Ülkü</b></h4>
                                <p><b>Hareket Memuru</b></p>
                                <p>Sicil No: 13334</p>
                                <p>Yöneticisi: Sinan Şahin</p>
                                <Row>
                                    <Col md={4}>
                                        <span><b>%95</b></span>
                                    </Col>
                                    <Col md={8}>
                                        <Line percent="95" strokeWidth="5" strokeColor="#1ab394" />
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <div className="left-con">
                                <Image src="./user.jpg" rounded />
                            </div>
                            <div className="right-con">
                                <h4><b>Turgay Gemici</b></h4>
                                <p><b>Hareket Memuru</b></p>
                                <p>Sicil No: 13334</p>
                                <p>Yöneticisi: Sinan Şahin</p>
                                <Row>
                                    <Col md={4}>
                                        <span><b>%56</b></span>
                                    </Col>
                                    <Col md={8}>
                                        <Line percent="56" strokeWidth="5" strokeColor="#f8ac59" />
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <div className="left-con">
                                <Image src="./user.jpg" rounded />
                            </div>
                            <div className="right-con">
                                <h4><b>Fatih Yıldırım</b></h4>
                                <p><b>Hareket Memuru</b></p>
                                <p>Sicil No: 13334</p>
                                <p>Yöneticisi: Sinan Şahin</p>
                                <Row>
                                    <Col md={4}>
                                        <span><b>%24</b></span>
                                    </Col>
                                    <Col md={8}>
                                        <Line percent="24" strokeWidth="5" strokeColor="#ed5565" />
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={11}>
                        <Row>
                            <Col md={2}>
                                <TextInput
                                    label="Sicil No"
                                    name="sicilno"
                                />
                            </Col>
                            <Col md={2}>
                                <TextInput
                                    label="Personel Adı"
                                    name="personel"
                                />
                            </Col>
                            <Col md={2}>
                                <SelectInput
                                    label="Ekip"
                                    name="ekip"
                                    items={ekips}
                                    textField="value"
                                    valueField="key"
                                />
                            </Col>
                            <Col md={2}>
                                <SelectInput
                                    label="Destinasyon"
                                    name="destinasyon"
                                    items={destinasyon}
                                    textField="value"
                                    valueField="key"
                                />
                            </Col>
                            <Col md={2}>
                                <TextInput
                                    label="Uçuş No"
                                    name="ucusno"
                                />
                            </Col>
                            <Col md={2}>
                                <DateInput
                                    label="Tarih Aralığı"
                                    name="tarih"
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={1}>
                        <div className="sorgula">
                            <Button onClick={this.__onFilterClick} bsStyle="primary"><FaIcon code="fa-search" /></Button>
                        </div>
                    </Col>
                </Row>
                <DataGrid
                    fields={this.state.fields}
                    store={this.state.store}
                    ref={"table"}
                    toolbar={[{ name: "performans-kirilimi", text: "Performans Kırılımı", icon: "fa-university",onClick:this.__performansClick },{ name: "performans-detay", text: "Personel Performans Detayı", icon: "fa-university",onClick:this.__performansDetayClick }]}
                    pagination={{ emptyText: "No data.", pageSize: 20 }}
                    pageSizeButtons={["20", "50", "100"]}
                    refreshable={true}
                    cellRenderer={this.__cellRenderer}
                    pageable={true}
                    searchable={false}
                />
                <Modal show={this.state.showPersonelModal} onHide={this.closeModal} bsSize="lg" className="personelModal">
                    <Modal.Header closeButton>
                        <Modal.Title>Performans Kırılımı</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={4} mdOffset={2}>
                                <h3>Zafer Ülkü</h3>
                                <Row>
                                    <Col md={3}>
                                        <span><b>%95</b></span>
                                    </Col>
                                    <Col md={9}>
                                        <Line percent="95" strokeWidth="5" strokeColor="#1ab394" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4} mdOffset={2}>
                                <Image src="./user.jpg" rounded />
                            </Col>
                            <Col md={12}>
                                    <Card className="kirilimDetay">
                                        <Row>
                                            <Col md={6} className="bgDarkBlue">
                                                <Col md={12}>
                                                    <div className="kirilim-con"><span>Geniş Gövde Performansı</span><span>%95</span></div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="kirilim-con"><span>İç Hat</span><span>%95</span></div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="kirilim-con"><span>Dış Hat</span><span>%95</span></div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="kirilim-con"><p>Zamanında</p><p>%95</p></div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="kirilim-con"><p>Tehirli</p><p>%95</p></div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="kirilim-con"><p>Zamanında</p><p>%95</p></div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="kirilim-con"><p>Tehirli</p><p>%95</p></div>
                                                </Col>
                                            </Col>
                                            <Col md={6} className="bgGreen">
                                                <Col md={12}>
                                                    <div className="kirilim-con"><span>Geniş Gövde Performansı</span><span>%95</span></div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="kirilim-con"><span>İç Hat</span><span>%95</span></div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="kirilim-con"><span>Dış Hat</span><span>%95</span></div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="kirilim-con"><p>Zamanında</p><p>%95</p></div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="kirilim-con"><p>Tehirli</p><p>%95</p></div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="kirilim-con"><p>Zamanında</p><p>%95</p></div>
                                                </Col>
                                                <Col md={3}>
                                                    <div className="kirilim-con"><p>Tehirli</p><p>%95</p></div>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </Card>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Kapat</Button>
                    </Modal.Footer>
                </Modal>
            </Card>
          </Col>
        );
    }
    __onFilterClick() {
        debugger;
    }

    __performansClick() {
        this.setState({ showPersonelModal: true });
    }

    closeModal() {
        this.setState({ showPersonelModal: false });
    }

    __performansDetayClick() {
        debugger;
    }

   __detailOnClick(){
       //console.log("Tıkladın");h
       location.href="index.html#/Performancedetail";
   }

    __cellRenderer(idx:number,fields: Array, row:Object){
      debugger;
      if (fields[idx].name === "buttonSearch") {
          return (
              <td key={fields[idx].name}>
                  <Button className="btn-color-primary" onClick={this.__performansClick}><FaIcon code="fa-search"/></Button>
              </td>);
      }
      if (fields[idx].name === "buttonDivert") {
          return (
              <td key={fields[idx].name}>
                  <Button className="btn-color-primary" onClick={this.__detailOnClick}> <FaIcon code="fa-arrow-right"/></Button>
              </td>);
      }
      if (fields[idx].name === "id") {
          return;
      }
       return <td key={fields[idx].name}>{row[fields[idx].name]}</td>;
    }

    
}
