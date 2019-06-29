package udpin

import (
	"conn"
	"encoding/json"
	"err"
	"log"
	"net"
	"packet"
	"rabbitmq"
)

const (
	ACK = iota
	LOGIN
	JOIN
	MOVEMENT
	SPELL
)

// Listener ...
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
	packet := packet.Unpack(buf)

	switch packet.MsgType {
	case LOGIN:
		log.Println("LOGIN received")
		packet.Address = addr.String()
		rabbitmq.Publish("login", packetToJSON(packet))
	case JOIN:
		log.Println("JOIN received")
		rabbitmq.Publish("join", packetToJSON(packet))
	case MOVEMENT:
		log.Println("MOVEMENT received")
		rabbitmq.Publish("movement", packetToJSON(packet))
	case SPELL:
		log.Println("SPELL received")
		rabbitmq.Publish("spell", packetToJSON(packet))
	}
}

func packetToJSON(packet packet.Packet) []byte {
	json, e := json.Marshal(packet)
	err.Handler(e, "Couldn't json marshal the packet")
	return json
}
