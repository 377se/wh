<template>
<div v-if="$fetchState.pending">
	<div id="sc-page-wrapper">
		{{ this.showPageOverlaySpinner() }}
	</div>
</div>
<div v-else>
 	<div id="sc-page-wrapper">
		<div id="sc-page-top-bar" class="sc-top-bar">
			<div class="sc-top-bar-content sc-padding-medium-top sc-padding-medium-bottom uk-flex-1">
				<div class="uk-flex-1">
						<img :src="this.customer.ImageName" alt="Shop-logo" class="uk-margin-medium-right"><h1 class="sc-top-bar-title uk-display-inline"> {{ customer.FirstName }} {{ customer.LastName }}</h1>
				</div>
			</div>
		</div>
		<div id="sc-page-content">
			<ScCard>
				<ScCardBody>
                <div class="uk-child-width-1-2@s uk-grid" data-uk-grid>
                    <!-- CUSTOMER -->
                    <div>
                        <ScCard>
                            <ScCardHeader separator>
                                <div class="uk-flex uk-flex-middle">
                                    <div class="uk-flex-1">
                                        <ScCardTitle>
                                            {{ customer.FirstName }} {{ customer.LastName }}
                                        </ScCardTitle>
                                    </div>
                                    <ScCardActions>

                                    </ScCardActions>
                                </div>
                            </ScCardHeader>
                            <ScCardContent>
                                <ScCardBody>
                                    <!-- Kundnummer -->
                                    <ScInput :value="customer.CustomerId.toString()" state="fixed" mode="outline" :disabled="true" extra-classes="uk-form-small">
                                    </ScInput>
                                    <!-- MedlemsId -->
                                    <div v-if="customer.ErrorList != null" class="uk-alert-danger" data-uk-alert>
                                        {{ customer.ErrorList[0].Value }}
			                        </div>
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.MemberId" state="fixed" mode="outline" v-on:blur="updateCustomer()" extra-classes="uk-form-small">
                                            <label>MedlemsId</label>
                                        </ScInput>
                                    </div>
                                    <!-- Förnamn -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.FirstName" state="fixed" mode="outline" v-on:blur="updateCustomer()" extra-classes="uk-form-small">
                                            <label>Förnamn</label>
                                        </ScInput>
                                    </div>
                                    <!-- Efternamn -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.LastName" state="fixed" mode="outline" v-on:blur="updateCustomer()" extra-classes="uk-form-small">
                                            <label>Efternamn</label>
                                        </ScInput>
                                    </div>
                                    <!-- Email -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.Email" state="fixed" mode="outline" v-on:blur="updateCustomer()" extra-classes="uk-form-small">
                                            <label>Email</label>
                                        </ScInput>
                                    </div>
                                    <!-- Mobilnummer -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.CellPhone" state="fixed" mode="outline" v-on:blur="updateCustomer()" extra-classes="uk-form-small">
                                            <label>Mobilnummer</label>
                                        </ScInput>
                                    </div>
                                    <!-- Rabattsats -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.Discount" state="fixed" mode="outline" v-on:blur="updateCustomer()" extra-classes="uk-form-small">
                                            <label>Rabattsats</label>
                                        </ScInput>
                                    </div>
                                    <!-- Senaste inloggningen -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.LatestLogin" state="fixed" mode="outline"  extra-classes="uk-form-small" :disabled="true">
                                            <label>Senaste inloggningen</label>
                                        </ScInput>
                                    </div>
                                    <!-- Antal inloggningar -->
                                    <div class="uk-margin">
                                        <ScInput v-model="customer.NumberOfLogin" state="fixed" mode="outline"  extra-classes="uk-form-small" disabled>
                                            <label>Antal inloggningar</label>
                                        </ScInput>
                                    </div>
                                    <div>
                                        <button v-waves.button.light class="sc-button sc-button-primary" @click.prevent="getResetLink()">
                                            GENERERA ÅTERSTÄLLNINGSLÄNK
                                        </button>
                                        <div v-if="resetLinkVisible" class="uk-margin-medium-top">
                                            <p>Följande länk har genererats och är giltig i 24 timmar: </p><p>{{ this.resetLink }}</p>
                                            <button @click.prevent="resetLinkVisible = false" class="sc-button sc-button-primary waves-effect waves-button waves-light" type="button">
                                                OK
                                            </button>
                                        </div>
                                    </div>
                                </ScCardBody>
                            </ScCardContent>
                        </ScCard>
                    </div>
                    <!-- ORDRAR & COINS -->
                    <div>
                        <!-- ORDRAR -->
                        <div>
                            <ScCard>
                                <ScCardHeader separator>
                                    <div class="uk-flex uk-flex-middle">
                                        <div class="uk-flex-1">
                                            <ScCardTitle>
                                                Ordrar
                                            </ScCardTitle>
                                        </div>
                                        <ScCardActions>
                                        </ScCardActions>
                                    </div>
                                </ScCardHeader>
                                <ScCardContent>
                                    <ScCardBody>
                                        <!-- <VueGoodTable
                                            :columns="this.searchHeaders"
                                            :rows="this.searchList"
                                            style-class="vgt-table"
                                        >
                                            <template slot="table-row" slot-scope="props">
                                                <span v-if="props.column.field === 'ImageName'">
                                                    <img :src="props.row.ImageName">
                                                </span>
                                                <span v-else-if="props.column.field === 'Column1'">
                                                    <nuxt-link :to="props.row.Url">
                                                        {{ props.row.Column1 }}
                                                    </nuxt-link>
                                                </span>
                                                <span v-else-if="props.column.field === 'Column2'">
                                                    {{ props.row.Column2 }}
                                                </span>
                                                <span v-else>
                                                    {{ props.row.Column3 }}
                                                </span>
                                            </template>
                                        </VueGoodTable> -->
                                    </ScCardBody>
                                </ScCardContent>
                            </ScCard>
                        </div>
                        <!-- COINS -->
                        <div class="uk-margin-medium-top">
                            <ScCard>
                                <ScCardHeader separator>
                                    <div class="uk-flex uk-flex-middle">
                                        <div class="uk-flex-1">
                                            <ScCardTitle>
                                                Nuvarande antal coins: {{ customer.Coins }}
                                            </ScCardTitle>
                                        </div>
                                        <ScCardActions>
                                        </ScCardActions>
                                    </div>
                                </ScCardHeader>
                                <ScCardContent>
                                    <ScCardBody>

                                    </ScCardBody>
                                </ScCardContent>
                            </ScCard>
                        </div>
                    </div>
                </div>
				</ScCardBody>
			</ScCard>
		</div>
    </div>
</div>

</template>

<script>
import {mapGetters} from 'vuex'
import ScInput from '~/components/Input'
import contentOverlay from '~/components/Overlay'
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

export default {
	components: {
		ScInput,
    },
	data () {
		return {
			customer: {},
            resetLink: '',
            resetLinkVisible: false,
        }
    },
    methods: {
		async updateCustomer() {
			let _this = this
            _this.showPageOverlaySpinnerNew()
			_this.isLoading = true
			await this.$axios.$post('/webapi/Customer/PostUpdateCustomer', _this.customer)
			.then(function (response) {
                _this.customer = response
                _this.isLoading = false
                _this.hidePageOverlaySpinner()
                _this.isLoading = false
			})
			.catch(function (error) {
                console.log(error)
                _this.hidePageOverlaySpinner()
			})
		},
		async getResetLink() {
			let _this = this
			_this.isLoading = true
            _this.showPageOverlaySpinner()
			await this.$axios.$get('/webapi/Customer/GetResetLink?customerid=' + _this.customer.CustomerId )
			.then(function (response) {
					_this.resetLink = response
					_this.isLoading = false
                    _this.resetLinkVisible = true
			})
			.catch(function (error) {
				console.log(error)
			})
		},
        showPageOverlaySpinner () {
            this.$store.commit('togglePageOverlay', true)
            this.$store.commit('toggleProgressOverlay', true);
            setTimeout(() => {
                this.$store.commit('toggleProgressOverlay', false);
                setTimeout(() => {
                    this.$store.commit('togglePageOverlay', false)
                })
            }, 500)
        },
    },
    watch: {
    },
    async fetch () {
		try {
			const [customer] = await Promise.all([
				this.$axios.$get('/webapi/Customer/GetCustomer?customerid=' + this.$route.params.id),
      		])
			this.customer = customer
		} catch (err) {
      		console.log(err);
		}
    },
}
</script>

<style lang="scss">
    table.vgt-table {
        font-size: 0.75rem;
    }
    table.vgt-table td {
        vertical-align: middle;
        border-right: 1px solid #dcdfe6;
        padding: .35em .65em .35em .65em;
    }
    .vgt-assortment-th {
        font-size: 0.6rem;
    }
	.vgt-table th.vgt-row-header {
        font-size: 0.7rem;
	}
	.uk-input {
		height: 30px;
		border-radius: 0;
		color: rgba(0, 0, 0, 0.87);
		background-color: #fff;
		padding: 8px 8px 7px;
		font-size: 0.75rem;
	}
</style>