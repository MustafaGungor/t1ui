import React from "react";
import Card from "app/card/Card";
import {Nav,Table,Image,Modal,Tabs,Tab,Grid,ControlLabel,Col,Row,Button} from 'react-bootstrap';
import {ModalDataForm,DataGrid,FaIcon,TextInput,DateInput,SelectInput} from 'robe-react-ui';
import { LocalEndPoint } from "robe-react-commons";
import BarChart from "robe-react-ui/lib/charts/BarChart";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import AreaChart from "robe-react-ui/lib/charts/AreaChart";
import LineChart from "robe-react-ui/lib/charts/LineChart";
import PieChart from "robe-react-ui/lib/charts/PieChart";

let barchart = [
    {name: "Ocak", public: 4000, private: 2400},
    {name: "Şubat", public: 3000, private: 1398},
    {name: "Mart", public: 2000, private: 9800},
    {name: "Nisan", public: 2780, private: 3908},
    {name: "Mayıs", public: 1890, private: 4800},
    {name: "Haziran", public: 2390, private: 3800},
    {name: "Son 6", public: 3490, private: 4300}
];
let areadata = [
    {name: "O", public: 10, private: 50, protected: 24},
    {name: "Ş", public: 40, private: 13, protected: 22},
    {name: "M", public: 20, private: 123, protected: 78},
    {name: "N", public: 16, private: 30, protected: 17},
    {name: "M", public: 22, private: 56, protected: 60},
    {name: "H", public: 124, private: 38, protected: 50},
    {name: "T", public: 160, private: 30, protected: 90},
    {name: "A", public: 34, private: 170, protected: 21},
    {name: "E", public: 11, private: 43, protected: 45},
    {name: "E", public: 67, private: 40, protected: 34},
    {name: "K", public: 90, private: 11, protected: 67},
    {name: "A", public: 101, private: 43, protected: 124},
];
let linedata = [
    {name: "A", public: 4000, private: 2400, protected: 2400},
    {name: "B", public: 3000, private: 1398, protected: 2210},
    {name: "C", public: 2000, private: 9800, protected: 2290},
    {name: "D", public: 2780, private: 3908, protected: 2000},
    {name: "E", public: 1890, private: 4800, protected: 2181},
    {name: "F", public: 2390, private: 3800, protected: 2500},
    {name: "G", public: 3490, private: 4300, protected: 2100}
];
let meta = [
    {dataKey: "public", name: "Tehir Süresi", unit: "piece"},
    {dataKey: "private", name: "Zamanında", unit: "piece"},
    {dataKey: "protected", name: "Protected", unit: "piece"}
];
let metaArea=[
  {dataKey: "public", name: "Assigned", unit: "piece"},
  {dataKey: "private", name: "on-Time", unit: "piece"},
  {dataKey: "protected", name: "Delayed", unit: "piece"}
];
let data = [
    {
        value: 1500,
        label: "A",
        key: "0",
        unit: "ms",
        children: [
            {
                value: 1000,
                label: "A1",
                key: "01",
                unit: "ms"
            },
            {
                value: 2000,
                label: "A2",
                key: "02",
                unit: "ms"
            }
        ]
    },
    {
        value: 2500,
        label: "B",
        key: "1",
        unit: "ms",
        children: [
            {
                value: 1000,
                label: "B1",
                key: "11",
                unit: "ms"
            },
            {
                value: 4000,
                label: "B2",
                key: "12",
                unit: "ms"
            },
            {
                value: 2000,
                label: "B3",
                key: "13",
                unit: "ms"
            }
        ]
    },
    {
        value: 3000,
        label: "C",
        key: "3",
        unit: "ms",
        children: [
            {
                value: 1000,
                label: "C1",
                key: "31",
                unit: "ms"
            },
            {
                value: 2000,
                label: "C2",
                key: "32",
                unit: "ms"
            },
            {
                value: 1000,
                label: "C3",
                key: "33",
                unit: "ms"
            },
            {
                value: 2000,
                label: "C4",
                key: "34",
                unit: "ms"
            }
        ]
    }
];


export default class NotFound extends ShallowComponent {

    static style = {
        verticalAlign: "middle",
        textAlign: "center",
        paddingTop: 150
    };

    render(): Object {
        return (

       <div>
         
           <Col md={6}>
         <Card header={(
             <div>
               Zamanında-Tehirli (Performans Yüzdesi)
             </div>)}>

             <div className="form-group">
                 <BarChart data={barchart} width={500} height={250} meta={meta}/>
            </div>
          </Card>
          </Col>
          <Col md={6}>
         <Card header={(
             <div>
               Performans(Uçuş Sayısı)

             </div>)}>
           <div className="form-group">
                   <AreaChart data={areadata} width={500} height={250} meta={metaArea}/>
               </div>
         </Card>
         </Col>
       
      
         <Col md={6}>
         <Card header={(
             <div>
               Performans(Performans Yüzdesi)
             </div>)}>
            <LineChart data={linedata} width={500} height={250} meta={meta}/>
         </Card>
         </Col>
         <Col md={6}>
           <Card header={(
               <div>Tehir-Zaman(Performans Yüzdesi)

               </div>)}>
               <Col md={6}>
               <PieChart size={250} data={data}/>
               </Col>
               <Col md={6}>
               <PieChart size={250} data={data}/>
               </Col>
          </Card>

         </Col>
       
      </div>
        );
    }
}
