package udpin

import (
	"log"
	"packet"
	"conn"
	"rabbitmq"
	"net"
	"encoding/json"
	"err"
)

const (
	ACK	= iota
	LOGIN
	JOIN
	MOVEMENT
	SPELL
)

func Listener() {
	log.Println("Starting UDP listener...")
	for {
		buf := make([]byte, 1024)
		n, addr, e := conn.Udp.ReadFrom(buf)
		if e != nil {
			continue
		}
		go handlePacket(buf[:n], addr)
	}
}

func handlePacket(buf []byte, addr net.Addr) {
	packet := packet.Unpack(buf);

	switch packet.MsgType {
	case LOGIN:
		packet.Address = addr.String()
		rabbitmq.Publish("login", packetToJson(packet))
	case JOIN:
		rabbitmq.Publish("join", packetToJson(packet))
	case MOVEMENT:
		rabbitmq.Publish("movement", packetToJson(packet))
	}
}

func packetToJson(packet packet.Packet) []byte {
	json, e := json.Marshal(packet)
	err.Handler(e, "Couldn't json marshal the packet")
	return json
}
