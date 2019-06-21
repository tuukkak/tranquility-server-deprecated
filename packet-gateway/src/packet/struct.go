package packet

// Incoming packet
type Packet struct {
	MsgType  uint8 `json:"-"`
	PlayerId uint8 `json:"playerId,omitempty"`
	Login
	Movement
	Spell
}

type Login struct {
	Name    string `json:"name,omitempty"`
	Address string `json:"address,omitempty"`
}

type Movement struct {
	InputX   int8    `json:"inputX,omitempty"`
	InputZ   int8    `json:"inputZ,omitempty"`
	CordX    float32 `json:"cordX,omitempty"`
	CordZ    float32 `json:"cordZ,omitempty"`
	Rotation float32 `json:"rotation,omitempty"`
}

type Spell struct {
	TargetId uint8 `json:"targetId,omitempty"`
	SpellId  uint8 `json:"spellId,omitempty"`
}

// Outgoing packet
type PacketOut struct {
	To      []string `json:"to,omitempty"`
	MsgType uint8    `json:"type,omitempty"`
	Content `json:"content,omitempty"`
}

type Content struct {
	LoginResponse
	GameStart
	MovementOut
}

type LoginResponse struct {
	Id uint8 `json:"id,omitempty"`
}

type GameStart struct {
	Length  uint8 `json:"length,omitempty"`
	Players []Player
}

type Player struct {
	Id   uint8  `json:"id,omitempty"`
	Name string `json:"name,omitempty"`
	Team uint8  `json:"team,omitempty"`
}

type MovementOut struct {
	PlayerId uint8   `json:"playerId,omitempty"`
	InputX   int8    `json:"inputX,omitempty"`
	InputZ   int8    `json:"inputZ,omitempty"`
	CordX    float32 `json:"cordX,omitempty"`
	CordZ    float32 `json:"cordZ,omitempty"`
	Rotation float32 `json:"rotation,omitempty"`
}
