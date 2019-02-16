package packet

import (
	"encoding/binary"
	"math"
	"bytes"
)

func Unpack(buffer []byte) Packet {
	packet := Packet{}
	var index, size int

	size = 1
	packet.MsgType = buffer[index]
	index += size

	switch packet.MsgType {
	case LOGIN:
		size = 12
		packet.Name = string(bytes.Trim(buffer[index:index+size], "\x00"))
		index += size
	case JOIN:
		size = 1
		packet.PlayerId = buffer[index]
		index += size
	case MOVEMENT:
		size = 1
		packet.PlayerId = buffer[index]
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
