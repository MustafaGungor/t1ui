import React from "react";
import Card from "app/card/Card";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import DataGrid from "robe-react-ui/lib/datagrid/DataGrid";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import DateInput from "robe-react-ui/lib/inputs/DateInput";
import SelectInput from "robe-react-ui/lib/inputs/SelectInput";
import {Nav,Table,Tabs,Tab,Grid,ControlLabel} from 'react-bootstrap';
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Button from "react-bootstrap/lib/Button";
import Image from "react-bootstrap/lib/Image";
import Modal from "react-bootstrap/lib/Modal";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import { LocalEndPoint } from "robe-react-commons";
import AjaxRequest from "robe-react-commons/lib/connections/AjaxRequest";
import Assertions from "robe-react-commons/lib/utils/Assertions";
import RemoteEndPoint from "robe-react-commons/lib/endpoint/RemoteEndPoint";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Store from "robe-react-commons/lib/stores/Store";
import SHA256 from "crypto-js/sha256";
import PerformanceModel from "./PerformanceDeModel.json";
import DataGridModel from "./DataGridModel.json";
import {AreaChart,LineChart,BarChart,Bar,Line, Area, XAxis, YAxis, CartesianGrid, Tooltip,Legend} from "recharts";
import Performance from "./Performance";
//import AreaChart from "react-d3/areachart/AreaChart";

let dataPerformansUcusSayisi = [
    { name: "Ocak", uv: 37, pv: 28,av:65 },
    { name: "Şubat", uv: 11, pv: 48,av:59 },
    { name: "Mart", uv: 40, pv: 40,av:80 },
    { name: "Nisan", uv: 19, pv: 62,av:81},
    { name: "Mayıs", uv: 4, pv:52,av:56 },
    { name: "Haziran", uv: 20, pv: 35,av:55,},
    { name: "Temmuz", uv: 8, pv: 32,av:40},
    { name: "Ağustos", uv: 15, pv: 55, av:70 },
    { name: "Eylül", uv: 7, pv: 55,av:62 },
    { name: "Ekim", uv: 15, pv: 37,av:52 },
    { name: "Kasım", uv: 15, pv:30,av:45 },
    { name: "Aralık", uv: 0, pv: 0,av:0 },
];

let dataPerformansYuzdesi = [
    { name: "Ocak", uv: 40, pv: 70, fill: "#8884d8" },
    { name: "Şubat", uv: 81, pv: 70, fill: "#83a6ed" },
    { name: "Mart", uv: 50, pv: 70,  fill: "#8dd1e1" },
    { name: "Nisan", uv: 77, pv: 70,  fill: "#82ca9d" },
    { name: "Mayıs", uv: 93, pv: 70, fill: "#a4de6c" },
    { name: "Haziran", uv: 64, pv: 70,  fill: "#d0ed57" },
    { name: "Temmuz", uv: 80, pv: 70,  fill: "#ffc658" },
    { name: "Ağustos", uv: 79, pv: 79, fill: "#a4de6c" },
    { name: "Eylül", uv: 89, pv: 70,  fill: "#d0ed57" },
    { name: "Ekim", uv: 71, pv: 70,  fill: "#ffc658" },
    { name: "Kasım", uv: 67, pv: 70,  fill: "#d0ed57" },
    { name: "Aralık", uv: 0, pv: 70, fill: "#ffc658" },
];
let dataIcHatDisHat = [
  { name: "Ocak", uv: 65, pv: 28 },
  { name: "Şubat", uv: 59, pv: 48 },
  { name: "Mart", uv: 80, pv: 40 },
  { name: "Nisan", uv: 81, pv: 19},
  { name: "Mayıs", uv: 56, pv: 86},
  { name: "Haziran", uv: 55, pv: 27 },
  { name: "Temmuz", uv: 40, pv: 90 },
  { name: "Ağustos", uv: 59, pv: 48 },
  { name: "Eylül", uv: 80, pv: 40 },
  { name: "Ekim", uv: 81, pv: 19 },
  { name: "Kasım", uv: 56, pv: 86 },
  { name: "Aralık", uv: 55, pv: 27 },
];
let dataZamanindaTehirliDagilimi = [
  { name: "Ocak", uv: 65, pv: 86 },
  { name: "Şubat", uv: 40, pv: 27},
  { name: "Mart", uv: 59, pv: 90},
  { name: "Nisan", uv: 80, pv: 48 },
  { name: "Mayıs", uv: 81, pv: 40 },
  { name: "Haziran", uv: 56, pv: 19 },
  { name: "Temmuz", uv: 55, pv: 86 },
  { name: "Ağustos", uv: 59, pv: 27 },
  { name: "Eylül", uv: 80, pv: 28 },
  { name: "Ekim", uv: 81, pv: 48 },
  { name: "Kasım", uv: 56, pv: 40 },
  { name: "Aralık", uv: 55, pv: 19},
];
const propsOfFields = {
    job: {
        items: [
            {
                value: "sd",
                text: "Software Developer"
            },
            {
                value: "sa",
                text: "Software Architect"
            }
        ]
    },
    gender: {
        items: [
            {
                value: "male",
                text: "Male"
            },
            {
                value: "female",
                text: "Female"
            }
        ]
    }
};
export default class Performancedetail extends ShallowComponent {
    static idField = "id";
    constructor(props) {
        super(props);
        let storyy={
          obj:Performance
        }
      

        const data =[
          { id: 1, tarih: "01.01.2016", yon: "Int", ucusno:"TK 1661", des:"HAM", pos:"219", std:"0925", atd:"0918",fark:"13",tehir:"-",sure:"32",tip:"32M"},
          { id: 2, tarih: "03.02.2016", yon: "Dom", ucusno:"TK 2312", des:"ADB", pos:"219", std:"0835", atd:"0758",fark:"2",tehir:"32R",sure:"43",tip:"320"},
          { id: 3, tarih: "16.03.2016", yon: "Int", ucusno:"TK 332", des:"HAM", pos:"219", std:"43", atd:"0918",fark:"13",tehir:"-",sure:"32",tip:"32M"},
          { id: 4, tarih: "28.04.2016", yon: "Dob", ucusno:"TK 2312", des:"MNG", pos:"219", std:"0835", atd:"0758",fark:"2",tehir:"-",sure:"43",tip:"320"},
          { id: 5, tarih: "31.01.2017", yon: "Int", ucusno:"TK 3399", des:"TRY", pos:"219", std:"121", atd:"098",fark:"56",tehir:"-",sure:"32",tip:"32M"},
          { id: 6, tarih: "03.01.2017", yon: "Kob", ucusno:"TK 3544", des:"TGS", pos:"219", std:"654", atd:"0758",fark:"20",tehir:"32R",sure:"43",tip:"320"},
          { id: 7, tarih: "04.02.2017", yon: "Int", ucusno:"TK 2333", des:"THS", pos:"219", std:"222", atd:"0768",fark:"18",tehir:"-",sure:"32",tip:"32M"},
          { id: 8, tarih: "08.05.2017", yon: "Dom", ucusno:"TK 7655", des:"ADK", pos:"219", std:"111", atd:"058",fark:"29",tehir:"32R",sure:"43",tip:"320"},
        ];

        let storeDarGovdeGecmisKaydi = new Store({
            endPoint: new LocalEndPoint({
                 data: data,
                 idField: Performancedetail.idField
            }),
            idField: Performancedetail.idField,
            autoLoad: true
        });

        this.state = {
            fields: DataGridModel.fields,
            store: storeDarGovdeGecmisKaydi,
            showModal: false,
            show:false,
            item: {}
        };

    }

    render() {
        return (

          <Col md={12} className="gray-bg">
            <Card header="Personel detay" className="new-bg">
              <Row>
                <Col md={3}>
                <Card className="grey-bg">
                    <div className="center-con">
                      <h4>Mustafa Güngör <FaIcon code="fa-check-circle" /></h4>
                      <center>
                        <Image src="./user.jpg" rounded />
                      </center>
                    </div>
                    <div className="center-con">
                        <h4>Harekat Memuru</h4>


                          <Table className="tablepersonel">

                            <tbody>
                              <tr>
                                <td>Sicil No</td>
                                <td>H4j7V7</td>
                              </tr>
                              <tr>
                                <td>Ad Soyad</td>
                                <td>Mustafa Güngör</td>
                              </tr>
                              <tr>
                                <td>Ünvan</td>
                                <td>Maliyeci</td>
                              </tr>
                              <tr>
                                <td>Ekip</td>
                                <td>A76</td>
                              </tr>
                              <tr>
                                <td>İşe Giriş Tarihi</td>
                                <td>22.04.2016</td>
                              </tr>
                              <tr>
                                <td>Yöneticisi</td>
                                <td>Ahmet Yılmaz</td>
                              </tr>
                            </tbody>
                          </Table>
                    </div>
                </Card>
                <Card>


                  <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title={(<div><FaIcon code="fa-info-circle"/>Genel Bilgiler</div>)} renderIcon={<FaIcon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='whatshot' size={33} />}>
                      <Table striped  hover>

                        <tbody>
                          <tr>
                            <td>Cep Telefonu</td>
                            <td>0569 356 25 32</td>
                          </tr>
                          <tr>
                            <td>Ehliyet Bilgisi</td>
                            <td>B</td>
                          </tr>
                          <tr>
                            <td>Apron Ehliyeti</td>
                            <td>Yok</td>
                          </tr>
                          <tr>
                            <td>Semt</td>
                            <td>Ankara</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Tab>
                    <Tab eventKey={2} title={(<div><FaIcon code="fa-book"/>Eğitim Bilgileri</div>)}>
                      <Table striped  hover>

                        <tbody>
                          <tr>
                            <td>Eğitim Düzeyi</td>
                            <td>Lisans</td>
                          </tr>
                          <tr>
                            <td>Okul Adı</td>
                            <td>Dumlupınar Üniversitesi</td>
                          </tr>
                          <tr>
                            <td>Bölüm</td>
                            <td>İşletme</td>
                          </tr>
                          <tr>
                            <td>Durumu</td>
                            <td>Mezun</td>
                          </tr>
                          <tr>
                            <td>Mezuniyet Tarihi</td>
                            <td>2016.06.22</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Tab>
                  </Tabs>


                </Card>
                <Card>
                  <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} className="marg-tp-20" title={(<div><FaIcon code="fa-star"/>Ödül & Ceza</div>)}>
                      <Table striped  hover>

                        <tbody>
                          <tr>
                            <td>Ödül Sayısı</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Ceza Sayısı</td>
                            <td><span className="badgee badge-danger"> 3</span></td>
                          </tr>
                          <tr>
                            <td>Teşekkür</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Uyarı</td>
                            <td>3</td>
                          </tr>
                          <tr>
                            <td>Kınama</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Ceza</td>
                            <td>0</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Tab>
                    <Tab eventKey={2} title={(<div><FaIcon code="fa-calendar"/>Devamsızlık</div>)} >
                      <Table striped  hover>

                        <tbody>
                          <tr>
                            <td>Rapor(Ücretli)</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Rapor(Ücretsiz)</td>
                            <td>3</td>
                          </tr>
                          <tr>
                            <td>Devamsızlık(Habersiz)</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Devamsızlık(PDKS Habersiz)</td>
                            <td>2</td>
                          </tr>
                          <tr>
                            <td>İzin(Ücretsiz)</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>İzin(Ücretli)</td>
                            <td>0</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Tab>
                  </Tabs>
                </Card>

                <Card className="txt-red" header="Personel Yöneticileri">
                  <span >this place will be filled with employee's connected managers from bottom to top (title tree view)</span>
                </Card>
                <Card header="Bu kişiye e-posta gönder">
                  <textarea placeholder="Mesajinizi bu alana girin" rows="6" className="txtArea"></textarea>
                  <button className="btn btn-color-primary btn-block" id="sendEmail">Gönder</button>
                </Card>
              </Col>
              <Col md={9}>
                <Card>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Genel Performans">
                        <Row>
                              <Col md={12}>
                                <Col className="my-bg1 widget widget-kart">

                                     <Row>
                                       <Col md={6}>
                                      <div className="left-con">
                                          <FaIcon code="fa fa-plane fa-4x"/>

                                      </div>
                                        </Col>
                                        <Col md={6}>
                                      <div className="left-con">
                                        <h5 className="tab-btn-text"><b>Toplam Atanan</b></h5>
                                        <h5>DEGER</h5>
                                      </div>
                                      </Col>
                                      </Row>


                                </Col>
                                <Col className="my-bg1 widget widget-kart">

                                     <Row>
                                       <Col md={6}>
                                      <div className="left-con">
                                          <FaIcon code="fa fa-check fa-4x"/>

                                      </div>
                                        </Col>
                                        <Col md={6}>
                                      <div className="left-con">
                                        <h5 className="tab-btn-text"><b>Zamanında &Erken</b></h5>
                                        <h5>DEGER</h5>
                                      </div>
                                      </Col>
                                      </Row>

                                </Col>
                                <Col className="my-bg1 widget widget-kart">

                                     <Row>
                                       <Col md={6}>
                                      <div className="left-con">
                                          <FaIcon code="fa fa-times fa-4x"/>

                                      </div>
                                        </Col>
                                        <Col md={6}>
                                      <div className="left-con">
                                        <h5 className="tab-btn-text"><b>Tehirli</b></h5>
                                        <h5>DEGER</h5>
                                      </div>
                                      </Col>
                                      </Row>

                                </Col>
                                <Col className="my-bg1 widget widget-kart navy-bg">

                                   <Row>
                                     <Col md={6}>
                                    <div className="left-con">
                                        <FaIcon code="fa fa-area-chart fa-4x"/>

                                    </div>
                                      </Col>
                                      <Col md={6}>
                                    <div className="left-con">
                                      <h5 className="tab-btn-text"><b>Performans Yüzdesi</b></h5>
                                      <h5>DEGER</h5>
                                    </div>
                                    </Col>
                                    </Row>

                              </Col>
                              </Col>
                            </Row>

                            <Card header={(
                                <div><h5>Performans(Uçuş Sayısı)</h5>
                                  <div className="pull-right">
                                    <span className="label label-custom1 chart-infoo">Assigned</span>
                                    <span className="label label-success chart-infoo">On-Time</span>
                                    <span className="label label-custom1 bgm-red chart-infoo">Delayed</span>
                                  </div>
                                </div>)}>
                              <AreaChart
                                propsOfLegend
                                propsOfChildrens={[{ dataKey: "uv", stroke: "#ed5565", fill: "#ed5565" },
                                                  { dataKey: "pv", stroke: "#1ab394", fill: "#1ab394" },
                                                  { dataKey: "av", stroke: "#848484", fill: "#ddd" }]}
                                width={895} height={238}
                                data={dataPerformansUcusSayisi}
                                margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend/>
                                
                                <Area type='monotone' dataKey='av' stroke='#848484' fill='#ddd'  />
                                <Area type='monotone' dataKey='pv' stroke='#1ab394'  fill='#1ab394'  />
                                <Area type='monotone' dataKey='uv' stroke='#ed5565'  fill='#ed5565'  />
                                
                                
                              </AreaChart>
                            </Card>
                            <Card header={(
                                <div><h5>Performans(Performans Yüzdesi)</h5>
                                  <div className="pull-right">
                                    <span className="label label-success chart-infoo"> Gerçekleşen Yüzde </span>
                                    <span className="label label-custom1 bgm-red chart-infoo">Hedef Yüzde</span>
                                  </div>
                                </div>)}>
                              <div className="form-group">
                              
                                <LineChart width={895} height={238} data={dataPerformansYuzdesi}
                                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="5 5"/>
                                <Tooltip/>
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#ed5565" activeDot={{r: 3}}  strokeWidth={2}/>
                                <Line type="monotone" dataKey="uv" stroke="#1ab394" activeDot={{r: 3}}  strokeWidth={2} />
                                </LineChart>                               

                            </div>

                            </Card>
                            <Card header="Personel Aktivite Geçmişi">
                              <Row className="vertical-container dark-timeline verticall-timelinee ">
                                <div className="vertical-timeline-block">
                                  <div className="vertical-timeline-icon navy-bg">
                                    <FaIcon className="fa fa-line-chart"/>
                                  </div>
                                  <div className="vertical-timeline-content">
                                    <h2 className="cls1">En İyi 10 Performans Yüzdesi İçinde</h2>
                                    <p>Mayıs ayında atanmış olan <span className="label label-custom1">56</span> uçağın 52'sini zamanında kapatarak
                                      %93'lük performans başarısı göstermiştir.</p>
                                    <span className="vertical-date label date-label"> <FaIcon className="fa fa-calendar"/>  31/05/2016</span>
                                  </div>
                                </div>

                                <div className="vertical-timeline-block">
                                  <div className="vertical-timeline-icon red-bg">
                                    <FaIcon className="fa fa-exclamation"/>
                                  </div>
                                  <div className="vertical-timeline-content">
                                    <h2 className="cls1">Uyarı E-Postası Gönderildi</h2>
                                    <p>Mart ayında atanmış olan 80 uçağın 40'ında tehir yaşanması ve performansın
                                      %50'ye düşmesi sebebiyle uyarı e-postası gönderildi.</p>
                                    <span className="vertical-date label date-label"> <FaIcon className="fa fa-calendar"/> 31/03/2016</span>
                                  </div>
                                </div>

                                <div className="vertical-timeline-block">
                                  <div className="vertical-timeline-icon red-bg">
                                    <FaIcon className="fa fa-exclamation"/>
                                  </div>
                                  <div className="vertical-timeline-content">
                                    <h2 className="cls1">Uyarı E-Postası Gönderildi</h2>
                                    <p>Ocak ayında atanmış olan 65 uçağın 37'sinde tehir yaşanması ve performansın
                                      %43'e düşmesi sebebiyle uyarı e-postası gönderildi.</p>
                                    <span className="vertical-date label date-label"> <FaIcon className="fa fa-calendar"/> 31/01/2016</span>
                                  </div>
                                </div>
                              </Row>
                            </Card>

                          </Tab>
                    <Tab eventKey={2}  title="Geniş Gövde Pereformansı">
                      <Row>
                            <Col md={12}>
                              <Col className="my-bg1 widget widget-kart">

                                   <Row>
                                     <Col md={6}>
                                    <div className="left-con">
                                        <FaIcon code="fa fa-plane fa-4x"/>

                                    </div>
                                      </Col>
                                      <Col md={6}>
                                    <div className="left-con cls2">
                                      <h5><b>Toplam Atanan</b></h5>
                                      <h5>DEGER</h5>
                                    </div>
                                    </Col>
                                    </Row>


                              </Col>
                              <Col className="my-bg1 widget widget-kart">

                                   <Row>
                                     <Col md={6}>
                                    <div className="left-con">
                                        <FaIcon code="fa fa-map-marker fa-4x"/>

                                    </div>
                                      </Col>
                                      <Col md={6}>
                                    <div className="left-con">
                                      <h5><b>İç Hat</b></h5>
                                      <h5>DEGER</h5>
                                    </div>
                                    </Col>
                                    </Row>

                              </Col>
                              <Col className="my-bg1 widget widget-kart">

                                   <Row>
                                     <Col md={6}>
                                    <div className="left-con">
                                        <FaIcon code="fa fa-globe fa-4x"/>

                                    </div>
                                      </Col>
                                      <Col md={6}>
                                    <div className="left-con">
                                      <h5><b>Dış Hat</b></h5>
                                      <h5>DEGER</h5>
                                    </div>
                                    </Col>
                                    </Row>

                              </Col>
                              <Col className="my-bg1 widget widget-kart navy-bg">

                                 <Row>
                                   <Col md={6}>
                                  <div className="left-con">
                                      <FaIcon code="fa fa-area-chart fa-4x"/>

                                  </div>
                                    </Col>
                                    <Col md={6}>
                                  <div className="left-con">
                                    <h5><b>Performans Yüzdesi</b></h5>
                                    <h5>DEGER</h5>
                                  </div>
                                  </Col>
                                  </Row>

                            </Col>
                            </Col>
                          </Row>
                    </Tab>
                    <Tab eventKey={3} title="Dar Gövde Performansı" >
                      <Row>
                            <Col md={12}>
                              <Col className="my-bg1 widget widget-kart">

                                   <Row>
                                     <Col md={6}>
                                    <div className="left-con">
                                        <FaIcon code="fa fa-plane fa-4x"/>

                                    </div>
                                      </Col>
                                      <Col md={6}>
                                    <div className="left-con">
                                      <h5><b>Toplam Atanan</b></h5>
                                      <h5>DEGER</h5>
                                    </div>
                                    </Col>
                                    </Row>


                              </Col>
                              <Col className="my-bg1 widget widget-kart">

                                   <Row>
                                     <Col md={6}>
                                    <div className="left-con">
                                        <FaIcon code="fa fa-map-marker fa-4x"/>

                                    </div>
                                      </Col>
                                      <Col md={6}>
                                    <div className="left-con">
                                      <h5><b>İç Hat</b></h5>
                                      <h5>DEGER</h5>
                                    </div>
                                    </Col>
                                    </Row>

                              </Col>
                              <Col className="my-bg1 widget widget-kart">

                                   <Row>
                                     <Col md={6}>
                                    <div className="left-con">
                                        <FaIcon code="fa fa-globe fa-4x"/>

                                    </div>
                                      </Col>
                                      <Col md={6}>
                                    <div className="left-con">
                                      <h5><b>Dış Hat</b></h5>
                                      <h5>DEGER</h5>
                                    </div>
                                    </Col>
                                    </Row>

                              </Col>
                              <Col className="my-bg1 widget widget-kart navy-bg">

                                 <Row>
                                   <Col md={6}>
                                  <div className="left-con">
                                      <FaIcon code="fa fa-area-chart fa-4x"/>

                                  </div>
                                    </Col>
                                    <Col md={6}>
                                  <div className="left-con">
                                    <h5><b>Performans Yüzdesi</b></h5>
                                    <h5>DEGER</h5>
                                  </div>
                                  </Col>
                                  </Row>

                            </Col>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="widget-kart"></Col>
                            <Col className="my-bg1 widget widget-kart">

                              <Row>
                                <Col md={4}>
                               <div className="left-con">
                                     Erken <br/>181
                               </div>
                                 </Col>
                                 <Col md={4}>
                               <div className="left-con">
                                     Geç <br/>43
                               </div>
                               </Col>
                               <Col md={4}>
                             <div className="left-con">
                                     Perf <br/>%71.54
                             </div>
                             </Col>
                               </Row>

                          </Col>
                          <Col className="my-bg1 widget widget-kart">

                             <Row>
                               <Col md={4}>
                              <div className="left-con">
                                    Erken <br/>181
                              </div>
                                </Col>
                                <Col md={4}>
                              <div className="left-con">
                                    Geç <br/>43
                              </div>
                              </Col>
                              <Col md={4}>
                            <div className="left-con">
                                    Perf <br/>%71.54
                            </div>
                            </Col>
                              </Row>

                        </Col>
                        <Col className="widget-kart"></Col>
                          </Row>
                          <Card header={(<div>İç Hat-Dış Hat Dağılımı<div className="pull-right"><span className="label label-success bgm-gray"> İç Hat </span><span className="label label-custom1 bgm-blue"> Dış Hat </span></div></div>)}>
                            <div className="form-group">
                              
                                <BarChart width={895} height={280} data={dataIcHatDisHat}
                                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend />
                                    <Bar className="sercan" dataKey="pv" fill="#e7eaec" stroke= "gray" />
                                    <Bar dataKey="uv" fill="#a4ffff" stroke= "#a4ffff" />
                                </BarChart>
                            </div>
                          </Card>

                          <Card header={(<div>Zamanında - Tehirli Dağılımı<div className="pull-right"><span className="label label-success"> Zamanında </span><span className="label label-custom1 bgm-red"> Tehirli </span></div></div>)}>
                            <div className="form-group">
                              
                                <BarChart width={895} height={238} data={dataZamanindaTehirliDagilimi}
                                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend />
                                    <br/>
                                    <Bar dataKey="pv" fill="rgba(0, 128, 0, 0.45)" stroke= "rgb(0, 128, 0)" />
                                    <Bar dataKey="uv" fill="rgba(255, 0, 0, 0.49)" stroke= "#ed5565" />
                                </BarChart>

                            </div>
                          </Card>
                          <Card header="Dar Gövde Geçmiş Kaydı">
                            <ControlLabel>DataGrid (Custom Toolbar and Pagination)</ControlLabel>
                            <DataGrid
                                fields={this.state.fields}
                                propsOfFields={propsOfFields}
                                store={this.state.store}
                                toolbar={[{ name:"copy",text:"Kopyala",icon: "fa-clone"},
                                          { name:"csv",text:"CSV",icon: "fa-university"},
                                          { name:"excel",text:"Excel",icon: "fa-university"},
                                          { name:"pdf",text:"PDF",icon: "fa-university"},
                                          { name:"print",text:"Print",icon: "fa-university"}]}
                                onNewClick={this.__add}
                                onEditClick={this.__edit}
                                onDeleteClick={this.__remove}
                                exportButton={true}
                                editable={true}
                                refreshable={true}
                                pageable={true}
                                pagination={{ pageSize: 10 }}
                                pageSizeButtons={["20", "50", "100"]}
                                />
                              <ModalDataForm
                                show={this.state.showModal}
                                onSubmit={this.__onSave}
                                onCancel={this.__onCancel}
                                defaultValues={this.state.item}
                                fields={this.state.fields}
                                propsOfFields={propsOfFields}
                               />
                          </Card>
                    </Tab>
                    <Tab eventKey={4} title="Personele Ait Tehirler" >
                      <Card>

                        <DataGrid
                            fields={this.state.fields}
                            propsOfFields={propsOfFields}
                            store={this.state.store}
                            toolbar={[{ name:"copy",text:"Kopyala",icon: "fa-clone"},
                                      { name:"csv",text:"CSV",icon: "fa-ravelry"},
                                      { name:"excel",text:"Excel",icon: "fa-table"},
                                      { name:"pdf",text:"PDF",icon: "fa-file-pdf-o"},
                                      { name:"print",text:"Print",icon: "fa-print"}]}
                            onNewClick={this.__add}
                            onEditClick={this.__edit}
                            onDeleteClick={this.__remove}
                            exportButton={true}
                            editable={true}
                            pageable={true}
                            pagination={{ pageSize: 10 }}
                            pageSizeButtons={["20", "50", "100"]}
                            exportButton={true}
                            refreshable={true}
                            />

                      </Card>
                    </Tab>
                  </Tabs>
                </Card>

              </Col>
              </Row>

            </Card>
            </Col>

        );
    }
    __add() {
        let empty = {};
        this.__showModal(empty);
    }

    __edit() {
        let selectedRows = this.refs.table1.getSelectedRows();
        if (!selectedRows || !selectedRows[0]) {
            return;
        }
        this.__showModal(selectedRows[0]);
    }

    __onCancel() {
        this.setState({ showModal: false });
    }

    __onSave(newData: Object, callback: Function) {
        let id = newData[DataGridSample.idField];
        if (Assertions.isNotEmpty(id)) {
            this.state.store1.update(newData);
        } else {
            this.state.store1.create(newData);
        }
        if (newData) {
            callback(true);
            this.setState({
                showModal: true
            });
        }
    }

    __remove() {
        let selectedRows = this.refs.table1.getSelectedRows();
        this.state.store1.delete(selectedRows[0]);
    }

    __showModal(newItem: Object) {
        this.setState({ showModal: true, item: newItem });
    }


}
