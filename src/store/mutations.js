import state from './state'

console.log(state)
function settoken(state, token) {
  state.token=token
}
export default{
  settoken,
}