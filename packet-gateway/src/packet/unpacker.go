package packet

import (
	"log"
	"encoding/binary"
	"math"
)

const (
	ACK = iota
	MOVEMENT
)

func Unpack(buffer []byte) {
	packet := Packet{}
	var index, size int

	size = 1
	packet.msgType = buffer[index]
	index += size

	switch packet.msgType {
	case MOVEMENT:
		var size int

		size = 1
		packet.playerID = buffer[index]
		index += size

		size = 4
		packet.cordX = float32FromBytes(buffer[index:index+size])
		index += size

		size = 4
		packet.cordZ = float32FromBytes(buffer[index:index+size])
		index += size

		size = 4
		packet.rotation = float32FromBytes(buffer[index:index+size])
		index += size

		size = 1
		packet.inputX = int8(buffer[index])
		index += size

		size = 1
		packet.inputZ = int8(buffer[index])
		index += size
	}

	log.Println(packet)
}

func float32FromBytes(bytes []byte) float32 {
	bits := binary.LittleEndian.Uint32(bytes)
	return math.Float32frombits(bits)
}