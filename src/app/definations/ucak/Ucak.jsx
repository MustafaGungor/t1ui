import React from "react";
import Card from "app/card/Card";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import DataGrid from "robe-react-ui/lib/datagrid/DataGrid";
import {Store,Arrays,ShallowComponent,RemoteEndPoint,Assertions,AjaxRequest } from "robe-react-commons";
import SHA256 from "crypto-js/sha256";
import UcakModel from "./UcakModel.json";


export default class Ucak extends ShallowComponent {

    static idField = "id";
    

   //Ajax Sorgusu->componentDidMount fonksiyonu esnasında yükleniyor 
   readRequest = new AjaxRequest({
            url:"/resources/ucakTipis",
            type:"GET"
        });

    constructor(props) {
        super(props);

    let store = new Store({
            endPoint: new RemoteEndPoint({
                url:"/resources/ucaks"
            }),
            idField: Ucak.idField,
            autoLoad: true
        });
      
            
       

    this.state = {
            fields: UcakModel.fields,
            store: store,
            showModal: false,
            item: {},
            items:[],
            propsOfFields: {
                roleOid: {
                    items: []
                },
                ucakTipi:{
                    items: []
                }
            },

        };
    }
    
    render() {
        
        return (
            <Card header="Uçak Yönetimi">
                <DataGrid
                    fields={this.state.fields}
                    store={this.state.store}
                    propsOfFields={this.state.propsOfFields}
                    ref={"table"}
                    toolbar={[{name: "create", text: "Ekle"}, 
                              {name: "edit", text: "Düzenle"}, 
                              {name: "delete", text: "Sil"}]}
                    onNewClick={this.__add}
                    onEditClick={this.__edit}
                    onDeleteClick={this.__remove}
                    cellRenderer={Ucak.cellRenderer}
                    pagination={{ emptyText: "No data.", pageSize: 20 }}
                    modalConfirm={{ header: "Silme Onayı" }}
                    pageSizeButtons={["20", "50", "100"]}
                    refreshable={true}
                    pageable={true}
                    editable={true}
                />
                <ModalDataForm
                    ref="detailModal"
                    header="Uçak Yönetimi"
                    show={this.state.showModal}
                    propsOfFields={this.state.propsOfFields}
                    fields={this.state.fields}
                    onSubmit={this.__onSave}
                    onCancel={this.__onCancel}
                    defaultValues={this.state.item}
                />
            </Card>
        );
    }
   //DataGrid içerisindeki her bir hücreyi değiştirebilmek için kullanılır
   static cellRenderer(idx: number, fields: Array, row: Object) {
        if (fields[idx].name == 'kodu') {
            return <td key={fields[idx].name}>{row.kodu}</td>;
        }

        if (fields[idx].name == 'adi') {
            return <td key={fields[idx].name}>{row.adi}</td>;
        }
        
        if (fields[idx].name == 'ucakTipi') {
            return <td key={fields[idx].name}>{row.ucakTipi != undefined ? row.ucakTipi.adi : ""}</td>;
        }
      
    }

    __add() {
        let empty = {};
        this.__showModal(empty);
    }

    __edit() {
        let selectedRows = this.refs.table.getSelectedRows();
        if (!selectedRows || !selectedRows[0]) {
            return;
        }
        this.__showModal(selectedRows[0]);
    }

    __onCancel() {
        this.setState({showModal: false});
    }

    __onSave(newData, callback) {
        let id = newData[Ucak.idField];
        newData.ucakTipi = {id:newData.ucakTipi};
        if (Assertions.isNotEmpty(id)) {
            this.state.store.update(newData);
        } else {
            this.state.store.create(newData);
        }
        if (newData) {
            callback(true);
            this.setState({
                showModal: true
            });
           
        }
        
    }

    __remove() {
        let selectedRows = this.refs.table.getSelectedRows();
        this.state.store.delete(selectedRows[0]);
    }

    __showModal(newItem) {
        this.setState({showModal: true, item: newItem});
    }
    //Sayfa Yüklenmeden önce 
    componentDidMount() {
        this.readRequest.call(undefined, undefined, function (response) {
            let state = {};
            state.propsOfFields = this.state.propsOfFields;
            
            for (let i = 0; i < response.length; i++) {
                let res = response[i];
                if (Arrays.indexOfByKey(state.propsOfFields.ucakTipi.items, "value", res.id) === -1) {
                    state.propsOfFields.ucakTipi.items.push({
                           text: res.adi,
                           value:res.id
                    });
                }
               
            }
            this.setState(state);
            this.forceUpdate();
        }.bind(this));
    }
}
