<template>
    <span class="table_time pull-right main_time">
        <span class="dnl_icon dnl_calendar"></span>
        <!-- 09/23/2016 17:34:52 +0000 -->
        {{datenow}}
    </span>
</template>

<script>
const moment = require('moment');
module.exports = {
	data () {
        return {
            datenow: ''
        }
     },
    methods: {
        time() {
            this.datenow = moment.utc().format("MM/DD/YYYY HH:mm:ss") + " +0000"
        },
    },
    mounted: function() {
         this.interval = setInterval(this.time, 1000)
    },
    beforeDestroy() {
        clearInterval(this.interval)
    }    
}
</script>