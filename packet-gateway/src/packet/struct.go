package packet

const (
	ACK	= iota
	LOGIN
	JOIN
	MOVEMENT
	SPELL
)

type Packet struct {
	MsgType uint8 `json:"-"`
	PlayerId uint8 `json:"playerId,omitempty"`
	Login
	Movement
}

type Login struct {
	Name string `json:"name,omitempty"`
	Address string `json:"address,omitempty"`
}

type Movement struct {
	InputX int8 `json:"inputX,omitempty"`
	InputZ int8 `json:"inputZ,omitempty"`
	CordX float32 `json:"cordX,omitempty"`
	CordZ float32 `json:"cordZ,omitempty"`
	Rotation float32 `json:"rotation,omitempty"`
}
