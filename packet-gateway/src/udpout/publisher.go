package udpout

import (
	"log"
	"packet"
	"encoding/json"
	"err"
	"conn"
	"net"
)

func Publish(data []byte) {
	packetOut := jsonToPacket(data)
	log.Println(packetOut)
	packetData := packet.Pack(packetOut.MsgType, packetOut.Content)
	for _, addr := range packetOut.To {
		addr, e := net.ResolveUDPAddr("udp", addr)
		err.Handler(e, "Couldn't resolve UDP address")
		conn.Udp.WriteTo(packetData, addr)
	}
}

func jsonToPacket(data []byte) packet.PacketOut {
	var packet packet.PacketOut
	e := json.Unmarshal(data, &packet)
	err.Handler(e, "Couldn't json unmarshal the data")
	return packet
}
