package packet

import (
	"rabbitmq"
	"encoding/json"
	"err"
	"net"
	"log"
	"conn"
)

func Handler(buf []byte, addr net.Addr) {
	log.Println(addr.String())

	packet := Unpack(buf);

	switch packet.MsgType {
	case LOGIN:
		log.Println("Sending data back")
		conn.Udp.WriteTo([]byte("hi"), addr)
		packet.Address = addr.String()
		rabbitmq.Publish("login", packetToJson(packet))
	case JOIN:
		rabbitmq.Publish("join", packetToJson(packet))
	case MOVEMENT:
		rabbitmq.Publish("movement", packetToJson(packet))
	}
}

func packetToJson(packet Packet) []byte {
	json, e := json.Marshal(packet)
	err.Handler(e, "Couldn't json marshal the packet")
	return json
}
