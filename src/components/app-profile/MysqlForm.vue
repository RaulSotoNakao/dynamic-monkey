<template>
	<v-card class="mr-10" color="secondary">
		<v-card-title class="text-h6">
			<v-row>
				<v-col>Conexión a mysql </v-col>
			</v-row>
		</v-card-title>

		<v-row class="mx-3">
			<v-col :cols="12" :sm="6" :md="4">
				<v-text-field label="host" v-model="mysql.host" />
			</v-col>
			<v-col :cols="12" :sm="6" :md="4">
				<v-text-field label="port" v-model="mysql.port" />
			</v-col>
			<v-col :cols="12" :sm="6" :md="4">
				<v-text-field label="database" v-model="mysql.database" />
			</v-col>
			<v-col :cols="12" :sm="6" :md="6">
				<v-text-field label="user" v-model="mysql.user" />
			</v-col>
			<v-col :cols="12" :sm="6" :md="6">
				<v-text-field label="password" v-model="mysql.password" />
			</v-col>
		</v-row>
		<v-row class="mx-3">
			<v-col class="d-flex justify-end">
				<v-btn
					color="primary"
					:disabled="!mysql.host || !mysql.user || !mysql.database || !mysql.password || !mysql.port"
					class="mx-2"
					@click="() => saveMysqlData()"
				>
					Guardar
					<v-icon right> mdi-content-save </v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	data: () => ({
		mysql: {
			host: '',
			user: '',
			password: '',
			database: '',
			port: '',
		},
	}),
	computed: {
		...mapGetters(['userData']),
	},
	methods: {
		...mapActions(['UPDATE_USER_DATA', 'SHOW_MESSAGE_BOX_SUCCESS']),
		saveMysqlData() {
			window.ipc
				.SAVE_USER_DATA({ ...this.userData, mysql: { ...this.mysql } })
				.then((payload) => this.UPDATE_USER_DATA(payload))
				.then(() => this.SHOW_MESSAGE_BOX_SUCCESS('La conexión a bdd se ha guardado correctamente :)'));
		},
	},
	mounted() {
		if (this.userData.mysql) {
			this.mysql = this.userData.mysql || {};
		}
	},
};
</script>

<style></style>
