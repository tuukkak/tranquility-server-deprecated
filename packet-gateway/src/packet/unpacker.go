package packet

import (
	"encoding/binary"
	"math"
)

func Unpack(buffer []byte) Packet {
	packet := Packet{}
	var index, size int

	size = 1
	packet.MsgType = buffer[index]
	index += size

	switch packet.MsgType {
	case MOVEMENT:
		var size int

		size = 1
		packet.PlayerID = buffer[index]
		index += size

		size = 4
		packet.CordX = float32FromBytes(buffer[index:index+size])
		index += size

		size = 4
		packet.CordZ = float32FromBytes(buffer[index:index+size])
		index += size

		size = 4
		packet.Rotation = float32FromBytes(buffer[index:index+size])
		index += size

		size = 1
		packet.InputX = int8(buffer[index])
		index += size

		size = 1
		packet.InputZ = int8(buffer[index])
		index += size
	}

	return packet
}

func float32FromBytes(bytes []byte) float32 {
	bits := binary.LittleEndian.Uint32(bytes)
	return math.Float32frombits(bits)
}
