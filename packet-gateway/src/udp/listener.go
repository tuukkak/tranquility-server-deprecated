package udp

import (
	"log"
	"packet"
	"conn"
)

func Listener() {
	log.Println("Starting UDP listener...")
	for {
		buf := make([]byte, 1024)
		n, addr, err := conn.Udp.ReadFrom(buf)
		if err != nil {
			continue
		}
		go packet.Handler(buf[:n], addr)
	}
}
