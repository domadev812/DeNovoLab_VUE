module.exports = {
    protocol: 'http',
    address: '88.99.175.131',
    //address: 'localhost',
    //port: null,
    //port: '8080',
    port: '8000',
    //basePath: '/v1',

    address_report: '192.99.10.113',
    port_cdr: '8888',
    port_report:'8890',
    getEndpointUrl() {
        return this.protocol + '://' + this.address + (this.port ? (":" + this.port) : "");
	//return this.protocol + '://' + this.address + (this.port ? (':' + this.port) : '') + (this.basePath ? this.basePath : '');
    },
    getCDR_URL(){
        return this.protocol + '://' + this.address_report + (this.port_cdr ? (":" + this.port_cdr) : "");
    },
    getReport_URL(){
        return this.protocol + '://' + this.address_report + (this.port_report ? (":" + this.port_report) : "");
    }
};