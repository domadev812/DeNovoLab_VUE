<template>
	<ul v-if="0 !== totalPages" class="pagination">
		<li>
			<a href="#" @click.prevent="pageChanged(1)" aria-label="Previous" v-if="currentPage !== 1">
				<span aria-hidden="true">❮</span>
			</a>
		</li>
		<li v-for="n in paginationRange" :class="activePage(n)">
			<a href="#" @click.prevent="pageChanged(n)">{{ n }}</a>
		</li>
		<li>
			<a href="#" @click.prevent="pageChanged(lastPage)" aria-label="Next" v-if="currentPage !== totalPages">
				<span aria-hidden="true">❯</span>
			</a>
		</li>
	</ul>
</template>

<script>
	const Util = require('./services/Util');
	module.exports = {
		name: 'pagination',
		props: {
			// Current Page
			currentPage: {
				type: Number,
				required: true
			},
			// Total page
			totalPages: Number,
			// Items per page
			itemsPerPage: Number,
			// Total items
			totalItems: Number,
			// Visible Pages
			visiblePages: {
				type: Number,
				default: 3,
				coerce: (val) => parseInt(val)
			}
		},
		data() {
			return {}
		},
		computed: {
			lastPage() {
				if (this.totalPages) {
					return this.totalPages
				} else {
					return this.totalItems % this.itemsPerPage === 0 ?
						this.totalItems / this.itemsPerPage :
						Math.floor(this.totalItems / this.itemsPerPage) + 1
				}
			},
			paginationRange() {
				let start = this.currentPage - this.visiblePages / 2 <= 0 ?
					1 : this.currentPage + this.visiblePages / 2 > this.lastPage ?
					Util.lowerBound(this.lastPage - this.visiblePages + 1, 1) :
					Math.ceil(this.currentPage - this.visiblePages / 2)
				let range = []
				for (let i = 0; i < this.visiblePages && i < this.lastPage; i++) {
					range.push(start + i)
				}
				return range
			}
		},
		methods: {
			pageChanged(pageNum) {
				this.$emit('page-changed', pageNum)
			},
			activePage(pageNum) {
				return this.currentPage === pageNum ? 'active' : ''
			}
		}
	}
</script>

<style>
	.pagination>li>a {
		border: 1px solid #dee0e3;
		border-radius: 5px;
		background-color: #fff;
		box-shadow: 0px 2px 7px 0px rgba(184, 187, 196, 0.2);
		width: 32px;
		height: 32px;
		color: #4f5357;
		line-height: 17px;
		text-align: center;
		padding: 6px 1px 0 0;
		margin: 0 2px;
	}
	.pagination>.active>a,
	.pagination>.active>a:focus,
	.pagination>.active>a:hover,
	.pagination>.active>span,
	.pagination>.active>span:focus,
	.pagination>.active>span:hover {
		background: #52565b;
		border: none;
		line-height: 20px;
	}
	.pagination>li>a span {
		font-family: sans-serif;
		font-size: 13px;
	}
</style>
