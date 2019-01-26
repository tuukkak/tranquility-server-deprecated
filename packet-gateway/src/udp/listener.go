package udp

import (
	"log"
	"net"
	"packet"
)

func Listener() {
	log.Println("Starting UDP listener...")
	pc, err := net.ListenPacket("udp", ":3000")
	if err != nil {
		log.Fatal(err)
	}
	defer pc.Close()
	for {
		buf := make([]byte, 1024)
		n, addr, err := pc.ReadFrom(buf)
		if err != nil {
			continue
		}
		log.Println("Packet received!")
		log.Println(addr)
		go packet.Handler(buf[:n])
	}
}
