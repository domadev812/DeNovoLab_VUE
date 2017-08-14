<template id="tabs">
	<div class="tabs">
		<div class="tabs_header">
			<a class="tab" :class="{ active: (activeTab === tab.name) }" v-for="(tab, index) in tabs" @click="activate(tab, index)">
				<span :class="tab.icon"></span>
				{{ tab.name }}
				<span class="step">{{tab.p}}</span>
			</a>
		</div>
		<div class="tabs_container">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	module.exports = {
	 data: function() {
		return {
		  activeTab: '',
		  tabs: []
		}
	  },
	  methods: {
		activate (tab, index) {
		  this.activeTab = tab.name;
		  this.$emit('activateTab', tab, index);
		}
	  }
	}
</script>

<style>
	.tabs_header {
		background: #edeff5;
		border-radius: 5px 5px 0 0;
		border-bottom: 1px solid #dee0e3;
	}

	.tabs {
		background: #fff;
		border-radius: 5px;
    	border: 1px solid #dee0e3;
    	box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
		margin-top: 10px;
	}

	.tabs_container {
		padding: 25px;
	}

	a.tab {
		color: #222;
		height: 50px;
		display: inline-block;
		padding: 15px 20px;
		cursor: pointer;
		margin-bottom: -1px;
		border-left: 1px solid #edeff5;
		border-right: 1px solid #edeff5;
	}

	a.tab:hover,
	a.tab:focus {
		text-decoration: none;
	}

	a.tab span {
		color: #8d94a1;
	}

	a.tab.active {
		background: #fff;
		border-left: 1px solid #dee0e3;
		border-right: 1px solid #dee0e3;
	}

	a.tab.active:first-child {
		border-radius: 5px 0 0 0;
		border-left: 1px solid #fff;
	}

</style>
