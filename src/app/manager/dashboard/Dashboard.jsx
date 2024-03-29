import React from "react";
import {ShallowComponent, AjaxRequest} from "robe-react-commons";
import Col from "react-bootstrap/lib/Col";
import Panel from "react-bootstrap/lib/Panel";
import Card from "app/card/Card";
import BarChart from "robe-react-ui/lib/charts/BarChart";
import PieChart from "robe-react-ui/lib/charts/PieChart";

export default class Dashboard extends ShallowComponent {

    constructor(props:Object) {
        super(props);

        this.state = {
            notFound: false,
            isLoading: true,
            jsonData: undefined,
            logData: [],
            vmTotal: [],
            vmHeap: [],
            vmNonHeap: []
        };
    }

    render():Object {
        if (!this.state.jsonData)
            return (
                <Card header="Yükleniyor..."/>);

        return (
            <Card header="Sistem Bilgileri" style={{background:"#fff"}}>
                <Col xs={12} style={{padding:0}}>
                    <Panel header="VM Detayları">
                        <Col xs={12} lg={6}>
                            <h4>Memory (MB)</h4>

                        </Col>
                        <Col xs={12} lg={6}>
                            <div style={{float:"left"}}>
                                <h4>Pool (%)</h4>

                            </div>
                            <div style={{float:"left"}}>
                                <h4>Threads (count)</h4>

                            </div>
                        </Col>
                    </Panel>
                </Col>
                <Col xs={12} style={{padding:0}}>
                    <Panel header="HTTP Yanıt Detayları">
                        <Col xs={12} lg={6}>
                            <h4>Toplam</h4>

                        </Col>
                        <Col xs={12} lg={6}>
                            <h4>Response (events/second)</h4>

                        </Col>
                    </Panel>
                </Col>
                <Col xs={12} lg={6} style={{padding:0}}>
                    <Panel header="Servis Detayları">

                    </Panel>
                </Col>
                <Col xs={12} lg={6} style={{padding:0}}>
                    <Panel header="Log Detayları">

                    </Panel>
                </Col>
            </Card>

        );
    }

    __serviceList():array {
        let loginMax = 0;
        let loginMin = 0;
        let loginMean = 0;
        let logoutMax = 0;
        let logoutMin = 0;
        let logoutMean = 0;

        try {
            loginMax = parseFloat((this.state.jsonData.timers[`io.robe.admin.resources.AuthResource.login`]["max"]).toFixed(4));
            logoutMax = parseFloat((this.state.jsonData.timers[`io.robe.admin.resources.AuthResource.logout`]["max"]).toFixed(4));
        } catch (e) {
        }
        try {
            loginMin = parseFloat((this.state.jsonData.timers[`io.robe.admin.resources.AuthResource.login`]["min"]).toFixed(4));
            logoutMin = parseFloat((this.state.jsonData.timers[`io.robe.admin.resources.AuthResource.logout`]["min"]).toFixed(4));
        } catch (e) {
        }
        try {
            loginMean = parseFloat((this.state.jsonData.timers[`io.robe.admin.resources.AuthResource.login`]["mean"]).toFixed(4));
            logoutMean = parseFloat((this.state.jsonData.timers[`io.robe.admin.resources.AuthResource.logout`]["mean"]).toFixed(4));
        } catch (e) {
        }

        let service = [
            {name: "Login", min: loginMin, max: loginMax, mean: loginMean},
            {name: "Logout", min: logoutMin, max: logoutMax, mean: logoutMean}
        ];

        return service;

    }

    __logData() {
        let debug = parseFloat(this.state.jsonData.meters["ch.qos.logback.core.Appender.debug"].count.toFixed(4));
        let info = parseFloat(this.state.jsonData.meters["ch.qos.logback.core.Appender.info"].count.toFixed(4));
        let warn = parseFloat(this.state.jsonData.meters["ch.qos.logback.core.Appender.warn"].count.toFixed(4));
        let error = parseFloat(this.state.jsonData.meters["ch.qos.logback.core.Appender.error"].count.toFixed(4));

        let log = [
            {name: "Debug", log: debug, fill: "#5cb85c"},
            {name: "Warn", log: warn, fill: "#f0ad4e"},
            {name: "Info", log: info, fill: "#5bc0de"},
            {name: "Error", log: error, fill: "#d9534f"}
        ];
        return log;
    }

    __vmData() {
        let totalAll = parseInt(this.state.jsonData.gauges["jvm.memory.total.max"].value / (1024 * 1024), 10);
        let usedTotal = parseInt(this.state.jsonData.gauges["jvm.memory.total.used"].value / (1024 * 1024), 10);
        let freeTotal = totalAll - usedTotal;

        let heapAll = parseInt(this.state.jsonData.gauges["jvm.memory.heap.max"].value / (1024 * 1024), 10);
        let usedHeap = parseInt(this.state.jsonData.gauges["jvm.memory.heap.used"].value / (1024 * 1024), 10);
        let freeHeap = heapAll - usedHeap;

        let nonHeapTotal = parseInt(this.state.jsonData.gauges["jvm.memory.non-heap.max"].value / (1024 * 1024), 10);
        let usedNonHeap = parseInt(this.state.jsonData.gauges["jvm.memory.non-heap.used"].value / (1024 * 1024), 10);
        if (nonHeapTotal < 0) {
            nonHeapTotal = usedNonHeap;
        }
        let freeNonHeap = nonHeapTotal - usedNonHeap;


        let vm = [
            {name: "Total", used: usedTotal, free: freeTotal},
            {name: "Heap", used: usedHeap, free: freeHeap},
            {name: "Non-Heap", used: usedNonHeap, free: freeNonHeap}
        ];
        return vm;
    }

    __poolData():array {
        let eden = 0;
        let old = 0;
        let perm = 0;
        let survior = 0;

        try {
            eden = parseFloat((this.state.jsonData.gauges[`jvm.memory.pools.PS-Eden-Space.usage`].value).toFixed(4));
        } catch (e) {
        }
        try {
            old = parseFloat((this.state.jsonData.gauges[`jvm.memory.pools.PS-Old-Gen.usage`].value).toFixed(4));
        } catch (e) {
        }
        try {
            perm = parseFloat((this.state.jsonData.gauges[`jvm.memory.pools.PS-Perm-Gen.usage`].value).toFixed(4));
        } catch (e) {
        }
        try {
            survior = parseFloat((this.state.jsonData.gauges[`jvm.memory.pools.PS-Survivor-Space.usage`].value).toFixed(4));
        } catch (e) {
        }
        let all = eden + old + perm + survior;
        eden = parseFloat((100 * eden / all).toFixed(4));
        old = parseFloat((100 * old / all).toFixed(4));
        perm = parseFloat((100 * perm / all).toFixed(4));
        survior = parseFloat((100 * survior / all).toFixed(4));

        let pool = [
            {name: "Eden", pool: eden, fill: "#5cb85c", unit: " %"},
            {name: "Old", pool: old, fill: "#5bc0de", unit: " %"},
            {name: "Survior", pool: survior, fill: "#d9534f", unit: " %"},
            {name: "Perm", pool: perm, fill: "#8dd1e1", unit: " %"}
        ];

        return pool;
    }

    __jvm():array {

        let runnable = 0;
        let news = 0;
        let timed = 0;
        let waiting = 0;
        let blocked = 0;
        let terminated = 0;

        try {
            runnable = parseFloat((this.state.jsonData.gauges[`jvm.threads.runnable.count`].value).toFixed(4));
        } catch (e) {
        }
        try {
            news = parseFloat((this.state.jsonData.gauges[`jvm.threads.new.count`].value).toFixed(4));
        } catch (e) {
        }
        try {
            timed = parseFloat((this.state.jsonData.gauges[`jvm.threads.timed.count`].value).toFixed(4));
        } catch (e) {
        }
        try {
            waiting = parseFloat((this.state.jsonData.gauges[`jvm.threads.waiting.count`].value).toFixed(4));
        } catch (e) {
        }
        try {
            blocked = parseFloat((this.state.jsonData.gauges[`jvm.threads.blocked.count`].value).toFixed(4));
        } catch (e) {
        }
        try {
            terminated = parseFloat((this.state.jsonData.gauges[`jvm.threads.terminated.count`].value).toFixed(4));
        } catch (e) {
            terminated = 0;
        }

        let threads = [
            {name: "Runnable", threads: runnable, fill: "#5cb85c"},
            {name: "New", threads: news, fill: "#5bc0de"},
            {name: "Timed-W ", threads: timed, fill: "#8dd1e1"},
            {name: "Waiting", threads: waiting, fill: "#d9534f"},
            {name: "Blocked", threads: blocked, fill: "#f0ad4e"},
            {name: "Terminated", threads: terminated, fill: "#ddd"}
        ];

        return threads;
    }

    __totalRequests():array {
        let xx2 = 0;
        let xx3 = 0;
        let xx4 = 0;
        let xx5 = 0;

        try {
            xx2 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.2xx-responses`].count).toFixed(4));
        } catch (e) {
        }
        try {
            xx3 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.3xx-responses`].count).toFixed(4));
        } catch (e) {
        }
        try {
            xx4 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.4xx-responses`].count).toFixed(4));
        } catch (e) {
        }
        try {
            xx5 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.5xx-responses`].count).toFixed(4));
        } catch (e) {
        }

        let xx = [
            {name: "2xx", xx: xx2, fill: "#5cb85c", unit: " %"},
            {name: "3xx", xx: xx3, fill: "#5bc0de", unit: " %"},
            {name: "4xx", xx: xx4, fill: "#f0ad4e", unit: " %"},
            {name: "5xx", xx: xx5, fill: "#d9534f", unit: " %"}
        ];

        return xx;
    }

    __httpResponse():array {

        let xx2m1 = 0;
        let xx2m5 = 0;
        let xx2m15 = 0;
        let xx2mean = 0;
        let xx3m1 = 0;
        let xx3m5 = 0;
        let xx3m15 = 0;
        let xx3mean = 0;
        let xx4m1 = 0;
        let xx4m5 = 0;
        let xx4m15 = 0;
        let xx4mean = 0;
        let xx5m1 = 0;
        let xx5m5 = 0;
        let xx5m15 = 0;
        let xx5mean = 0;

        try {
            xx2m1 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.2xx-responses`]["m1_rate"]).toFixed(4));
            xx3m1 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.3xx-responses`]["m1_rate"]).toFixed(4));
            xx4m1 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.4xx-responses`]["m1_rate"]).toFixed(4));
            xx5m1 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.5xx-responses`]["m1_rate"]).toFixed(4));
        } catch (e) {
        }
        try {
            xx2m5 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.2xx-responses`]["m5_rate"]).toFixed(4));
            xx3m5 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.3xx-responses`]["m5_rate"]).toFixed(4));
            xx4m5 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.4xx-responses`]["m5_rate"]).toFixed(4));
            xx5m5 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.5xx-responses`]["m5_rate"]).toFixed(4));
        } catch (e) {
        }
        try {
            xx2m15 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.2xx-responses`]["m15_rate"]).toFixed(4));
            xx3m15 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.3xx-responses`]["m15_rate"]).toFixed(4));
            xx4m15 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.4xx-responses`]["m15_rate"]).toFixed(4));
            xx5m15 = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.5xx-responses`]["m15_rate"]).toFixed(4));
        } catch (e) {
        }
        try {
            xx2mean = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.2xx-responses`]["mean_rate"]).toFixed(4));
            xx3mean = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.3xx-responses`]["mean_rate"]).toFixed(4));
            xx4mean = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.4xx-responses`]["mean_rate"]).toFixed(4));
            xx5mean = parseFloat((this.state.jsonData.meters[`io.dropwizard.jetty.MutableServletContextHandler.5xx-responses`]["mean_rate"]).toFixed(4));
        } catch (e) {
        }

        let http = [
            {name: "1 min", xx2: xx2m1, xx3: xx3m1, xx4: xx4m1, xx5: xx5m1},
            {name: "5 min", xx2: xx2m5, xx3: xx3m5, xx4: xx4m5, xx5: xx5m5},
            {name: "15 min", xx2: xx2m15, xx3: xx3m15, xx4: xx4m15, xx5: xx5m15},
            {name: "Mean", xx2: xx2mean, xx3: xx3mean, xx4: xx4mean, xx5: xx5mean}
        ];

        return http;
    }

    componentDidMount() {
        let readRequest = new AjaxRequest({
            url: "metrics",
            type: "GET"
        });

        readRequest.call(undefined, undefined,
            function (response) {
                this.setState({jsonData: response});
            }.bind(this), undefined);
    }
}
