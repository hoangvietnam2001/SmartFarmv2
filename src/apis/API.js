import axios from 'axios'
import { getAPIUrl } from '../resources/static'

export default class API {
	constructor() {
		this.api_token = null
		this.client = null
		this.api_url = getAPIUrl()
	}
	init = () => {
		// this.api_token = getCookie('ACCESS_TOKEN')
		let headers = {
			Accept: 'application/json',
		}
		if (this.api_token) {
			headers.Authorization = `Bearer ${this.api_token}`
		}
		this.client = axios.create({
			baseURL: this.api_url,
			timeout: 31000,
			headers: headers,
		})
		return this.client
	}
	// getUserList = (params) => {
	// 	return this.init().get('/users', { params: params })
	// }
	// addNewUser = (data) => {
	// 	return this.init().post('/users', data)
	// }

	login = (data) => {
		return this.init().post('/auth/login', data)
	}
	getGreenHouse = (id, params) => {
		return this.init().get(`/greenhouses/${id}`, { params })
	}
	getNotification = (id, params) => {
		return this.init().get(`/users/${id}/notifications`, { params })
	}
	sendReadStatus = (id, params) => {
		return this.init().patch(`/notifications/${id}`, params)
	}

	sendScanSensors = (id, params) => {
		return this.init().get(`greenhouses/${id}/scanSensors`, { params })
	}
	// device
	getRelayList = (params) => {
		return this.init().get(`/relays`, { params })
	}
	getRelayOfGreenhouse = (greenhouseId, params) => {
		return this.init().get(`/greenhouses/${greenhouseId}/relays`, { params })
	}
	getRelay = (id, params) => {
		return this.init().get(`/relays/${id}`, { params })
	}

	updateRelay = (id, params) => {
		return this.init().patch(`/relays/${id}`, params)
	}

	updateSensor = (id, params) => {
		return this.init().patch(`/sensors/${id}`, params)
	}
	//edit users
	updateUser = (id, params) => {
		return this.init().patch(`/users/${id}`, params)
	}
	// sensor
	getSensorList = (params) => {
		return this.init().get('/sensors', { params })
	}
	getSensorOfGreenhouse = (greenhouseId, params) => {
		return this.init().get(`/greenhouses/${greenhouseId}/sensors`, { params })
	}
	getSensorValues = (sensorId, params) => {
		const now = new Date()
		var nextDate = new Date()
		nextDate = new Date(nextDate.setDate(now.getDate() + 1))
		params.gte_time = now.toISOString().slice(0, 10)
		params.lte_time = nextDate.toISOString().slice(0, 10)
		return this.init().get(`/sensors/${sensorId}/sensor_values`, { params })
	}

	// rules
	getRulesList = (greenhouseId, params) => {
		return this.init().get(`/greenhouses/${greenhouseId}/rules`, { params })
	}
	sendRules = (id, data) => {
		if (id) return this.init().patch(`/rules/${id}`, data)
		return this.init().post('/rules', data)
	}
	deleteRule = (id) => {
		return this.init().delete(`/rules/${id}`)
	}

	// schedule
	getScheduleList = (greenhouseId, params) => {
		return this.getRulesList(greenhouseId, { ...params, type: 0 })
	}
	sendSchedule = (id, data) => {
		return this.sendRules(id, { ...data, type: 0 })
	}

	// script
	getScriptList = (greenhouseId, params) => {
		return this.getRulesList(greenhouseId, { ...params, type: 2 })
	}
	sendScript = (id, data) => {
		return this.sendRules(id, { ...data, type: 2 })
	}

	// rule
	getAllRuleList = (greenhouseId, params) => {
		return this.getRulesList(greenhouseId, { ...params})
	}

	getRuleList = (greenhouseId, params) => {
		return this.getRulesList(greenhouseId, { ...params, type: 1 })
	}

	sendRule = (id, data) => {
		return this.sendRules(id, { ...data})
	}
	//data
	downloadStats = (sensorId, params) => {
		return this.init().get(`/sensors/6348e4ca35b48180902125f7/sensor_values/export`, { params })
	}

	//change mode gateway
	changeModeGateway = (greenhouseId,data) => {
		return this.init().patch(`/greenhouses/${greenhouseId}`, data)
	}

	//get farm
	getFarm = (currentFarmID) => {
		return this.init().get(`/farms/${currentFarmID}`)
	}
	getGatewayList = (farmId) => {
		return this.init().get(`/greenhouses?farmId=${farmId}`)
	}

	//get modbus device
	getModbus = (greenhouseId) => {
		return this.init().get(`/modbus?greenhouseId=${greenhouseId}`)
	}
	getModbusDevice = (modbusId) => {
		return this.init().get(`/modbus/${modbusId}`)
	}
	getModbusButton = (modbusId) => {
		return this.init().get(`/modbus/button/${modbusId}`)
	}
	controlModbusButton = (modbusId, data) => {
		return this.init().patch(`modbus/${modbusId}`, data)
	}
}