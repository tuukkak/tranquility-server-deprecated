package packet

import (
	"bytes"
	"encoding/binary"
)

// Pack ...
func Pack(msgType uint8, content Content) []byte {
	size := 1024
	data := make([]byte, size)
	switch msgType {
	case 1:
		size = 2
		data[0] = 1
		data[1] = content.Id
		data = data[:size]
	case 2:
		size = 2 + int(content.Length)*14
		data[0] = 2
		data[1] = content.Length
		index := 2
		for _, player := range content.Players {
			data[index] = player.Id
			index += 1
			copy(data[index:index+12], []byte(player.Name))
			index += 12
			data[index] = player.Team
			index += 1
		}
		data = data[:size]
	case 3:
		size = 16
		data[0] = 3
		data[1] = content.PlayerId
		copy(data[2:6], bytesFromFloat32(content.CordX))
		copy(data[6:10], bytesFromFloat32(content.CordZ))
		copy(data[10:14], bytesFromFloat32(content.Rotation))
		data[14] = byte(content.InputX)
		data[15] = byte(content.InputZ)
		data = data[:size]
	}
	return data
}

func bytesFromFloat32(f float32) []byte {
	var buf bytes.Buffer
	binary.Write(&buf, binary.LittleEndian, f)
	return buf.Bytes()
}
