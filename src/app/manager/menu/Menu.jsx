import React from "react";
import Card from "app/card/Card";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import DataGrid from "robe-react-ui/lib/datagrid/DataGrid";
import AjaxRequest from "robe-react-commons/lib/connections/AjaxRequest";
import Assertions from "robe-react-commons/lib/utils/Assertions";
import RemoteEndPoint from "robe-react-commons/lib/endpoint/RemoteEndPoint";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Store from "robe-react-commons/lib/stores/Store";
import MenuModel from "./MenuModel.json";

export default class Menu extends ShallowComponent {

    static idField = "id";

    constructor(props) {
        super(props);

        let store = new Store({
            endPoint: new RemoteEndPoint({
                url: "resources/menus"
            }),
            idField: Menu.idField,
            autoLoad: true
        });

        this.state = {
            fields: MenuModel.fields,
            store: store,
            showModal: false,
            item: {},
            propsOfFields: {
                parent: {
                       items: []
                }
            }
        };
    }

    render() {
        return (
            <Card header="Menü Yönetimi">
                <DataGrid
                    fields={this.state.fields}
                    store={this.state.store}
                    propsOfFields={this.state.propsOfFields}
                    ref={"table"}
                    toolbar={[{name: "create", text: "Ekle"}, {name: "edit", text: "Düzenle"}, {name: "delete", text: "Sil"}]}
                    onNewClick={this.__add}
                    onEditClick={this.__edit}
                    onDeleteClick={this.__remove}
                    cellRenderer={Menu.cellRenderer}
                    pagination={{ emptyText: "No data.", pageSize: 20 }}
                    modalConfirm={{ header: "Please do not delete me." }}
                    pageSizeButtons={["10", "20", "100"]}
                    refreshable={true}
                    pageable={true}
                    editable={true}
                />
                <ModalDataForm
                    ref="detailModal"
                    header="Menü Yönetimi"
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
        let id = newData[Menu.idField];
        console.log(newData);
        console.log(newData.parent);
        newData.parent = {id:newData.parent}
        console.log(newData);
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
        // this.refs[DataGridSample.tableRef].__readData();
    }

    __remove() {
        let selectedRows = this.refs.table.getSelectedRows();
    }

    __showModal(newItem) {
        this.setState({showModal: true, item: newItem});
    }

    componentDidMount() {
        let readRequest = new AjaxRequest({
            url: "resources/menus/roots",
            type: "GET"
        });

        readRequest.call(undefined, undefined, function (response) {
            let state = {};
            state.propsOfFields = this.state.propsOfFields;
            for (let i = 0; i < response.length; i++) {
                let res = response[i];
                state.propsOfFields.parent.items.push({
                    value: res.id,
                    text: res.text
                });
            }
            this.setState(state);
            this.forceUpdate();
        }.bind(this));

    };

    static cellRenderer(idx:number, fields:Array, row:Object){
        if(fields[idx].name === "parent"){
            return (<td key={fields[idx].name}>{row.parent != undefined ? row.parent.text : ""}</td>);
        }

        if(fields[idx].name === "id")
            return;
        return <td key={fields[idx].name}>{row[fields[idx].name]}</td>;
    }
}
