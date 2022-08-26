import Socket from 'socket.io-client'

const socket = Socket('http://192.168.1.137:3001/', {
  autoConnect: true,
})

export default socket
