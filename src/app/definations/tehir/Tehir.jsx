import React from "react";
import Card from "app/card/Card";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import DataGrid from "robe-react-ui/lib/datagrid/DataGrid";
import AjaxRequest from "robe-react-commons/lib/connections/AjaxRequest";
import Assertions from "robe-react-commons/lib/utils/Assertions";
import RemoteEndPoint from "robe-react-commons/lib/endpoint/RemoteEndPoint";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Store from "robe-react-commons/lib/stores/Store";
import SHA256 from "crypto-js/sha256";
import TehirModel from "./TehirModel.json";

export default class Tehir extends ShallowComponent {

    static idField = "id";

    constructor(props) {
        super(props);

        let store1 = new Store({
             endPoint: new RemoteEndPoint({
                 url:"/resources/tehirTanims",
                 read:{
                     url:"/resources/tehirTanims"
                 }
             }),
            idField: Tehir.idField,
            autoLoad: true
        });
        

        this.state = {
            fields: TehirModel.fields,
            store: store1,
            showModal: false,
            item: {},
            propsOfFields: {
                roleOid: {
                    items: []
                }
            }
        };
    }

    render() {
        return (
            <Card header="Tehir Yönetimi">
                <DataGrid
                    fields={this.state.fields}
                    store={this.state.store}
                    propsOfFields={this.state.propsOfFields}
                    ref={"table"}
                    toolbar={[{name: "create", text: "Ekle"}, {name: "edit", text: "Düzenle"}, {name: "delete", text: "Sil"}]}
                    onNewClick={this.__add}
                    onEditClick={this.__edit}
                    onDeleteClick={this.__remove}
                    pagination={{ emptyText: "No data.", pageSize: 20 }}
                    modalConfirm={{ header: "Silme Onayı" }}
                    editable={true}
                    exportButton={true}
                    refreshable={true}
                    pageable={true}
                    pageSizeButtons={["20", "50", "100"]}
                />
                <ModalDataForm
                    ref="detailModal"
                    header="Tehir Yönetimi"
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
        let id = newData[Tehir.idField];
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
}
