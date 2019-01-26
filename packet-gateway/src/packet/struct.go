package packet

const (
	ACK	= iota
	MOVEMENT
)

type Packet struct {
	MsgType uint8 `json:"msgType"`
	PlayerID uint8 `json:"playerID"`
	InputX int8 `json:"inputX"`
	InputZ int8 `json:"inputZ"`
	CordX float32 `json:"cordX"`
	CordZ float32 `json:"cordZ"`
	Rotation float32 `json:"rotation"`
} 
