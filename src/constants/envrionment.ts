const EP_SERVER = process.env.EP_SERVER
const EP_DEMO = process.env.EP_DEMO
const IS_DEMO = process.env.IS_DEMO === 'true'
const IS_BETA = process.env.IS_BETA === 'true'
const IS_PROD = process.env.IS_PROD === 'true'

export { EP_SERVER, EP_DEMO, IS_DEMO, IS_BETA, IS_PROD }
