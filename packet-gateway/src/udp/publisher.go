package udp

import (
	"log"
	"packet"
	"conn"
)

func Publisher(data []byte) {
	packetData := packet.Pack(data)
	log.Println("Sending data back")
	conn.Udp.WriteTo(packetData, addr)
}
