package packet

import (
	"rabbitmq"
	"encoding/json"
	"error"
)

func Handler(buf []byte) {
	packet := Unpack(buf);

	switch packet.MsgType {
	case MOVEMENT:
		json, err := json.Marshal(packet)
		error.Handler(err, "Couldn't json marshal the packet")
		rabbitmq.Send("movement", json)
	}
}
