<template id="tab">
	<div v-show="visible" class="tab_wrapper">
		<slot></slot>
	</div>
</template>

<script>
module.exports = {
	name: 'tab',
	props: ['label', 'p', 'selected', 'icon'],
	template: '#tab',
	data () {
	 return {
		 visible: false
	 }
 },
 	created () {
		let self = this;
		const selected = this.selected
		if (typeof selected !== 'undefined' && selected === '' || selected) {
		  this.$parent.$data.activeTab = this.label;
		  this.visible = true;
		}
		this.$parent.$data.tabs.push({name: this.label, icon: this.icon, p: this.p});
		this.$parent.$on('activateTab', function(tab) {
			self.visible = self.label === tab.name
		})
  }
}
</script>

<style>

</style>
