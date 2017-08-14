<template>
	<div class="container-fluid">
      <div class="row">
		<div class="wrapper single">
			<time-display></time-display>
			<ol class="breadcrumb">
				  <li class="breadcrumb-item"><a>Monitoring</a></li>
                  <li class="breadcrumb-item">
                    <router-link to="/monitoring/blackhole_ip">Blackhole Ip</router-link>
                  </li>
				  <li class="breadcrumb-item active">Upload</li>
			</ol>
			<h1 class="page-header">Upload</h1>
			<router-link to="/monitoring/blackhole_ip" class="btn btn_white back">
                <span class="dnl_icon dnl_import"></span> Back 
            </router-link>
			<div class="white_pad table_wrap">
				<div class="row">
					  <div class="col-md-3 col-sm-4">
                        <label>Import File:</label>
                        <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="success"></dropzone>
                    </div>
                    <div class="col-md-3 col-sm-4">
                        <div class="form-group">
                           <label>Duplicate Handling:</label>
                           <select2 :options="options" v-model="selected">
                                <option disabled value="0">Show/Hide Columns</option>
                            </select2>
                        </div>
                        <div class="button_set little-space">
                            <a class="btn btn-primary mini">
                                Show Example
                            </a>
                        </div>
                    </div>
                    <div class="clearfix little-space"></div>
				  </div>
                  <div class="button_set">
                        <a class="btn btn-primary mini">
                            Upload
                        </a>
                  </div>
			</div>
		</div>
	  </div>
	</div>
</template>

<script>   
	const vSelect = require('vue!../main_components/select.vue'),
          Dropzone = require('vue!../main_components/dropzone.vue');
	module.exports = {
		components: {
			'select2': vSelect,
            Dropzone
		},
		data: function(){
            return {
			 selected: 1,
			 options: [
				  { id: 1, text: 'Overwrite' },
				  { id: 2, text: 'Ignore' }
			  ],
            }
        },
        methods: {
            'success': function (file) {
                console.log('A file was successfully uploaded')
            },
            'process': function () {
                var newArr = this.$children.filter(function(item){
                  return item.id === "myVueDropzone";
                });
                var component = newArr[0];
                component.processQueue()
            }
		}
	}
</script>

<style>
</style>
