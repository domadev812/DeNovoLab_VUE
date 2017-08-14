<template>
  <select>
    <slot></slot>
  </select>
</template>

<script>
	require('select2');
	module.exports = {
	  props: ['options', 'value'],
	  mounted: function () {
			var vm = this;
			console.log(this.options);
			$(this.$el)
				.val(this.value)
				// init select2
				.select2({ data: this.options })
				// emit event on change.
				.on('change', function (e) {
						vm.$emit('input', this.value)
				})
		},
	  watch: {
			value: function (value) {
				// update value
				$(this.$el).val(value)
			},
			options: function (options) {
				// update options
				$(this.$el).select2({ data: options })
			}
	  },
	  destroyed: function () {
			$(this.$el).off().select2('destroy')
	  }
	}
</script>

<style>
	select {
	  min-width: 180px;
	  width: 100%;
	}
</style>