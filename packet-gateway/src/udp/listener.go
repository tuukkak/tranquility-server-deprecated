package udp

import (
	"log"
	"net"
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
		log.Println("Packet received!")
		log.Println(buf[:n])
		log.Println(addr)
		if err != nil {
			continue
		}
	}
}

