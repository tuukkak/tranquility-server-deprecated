package packet

type Packet struct {
	msgType uint8
	playerID uint8
	inputX, inputZ int8
	cordX, cordZ, rotation float32
} 