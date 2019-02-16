package main

import (
	"log"
	"udp"
	"conn"
	"err"
	"net"
	"rabbitmq"
)

func main() {
	log.Println("Starting packet gateway...")
	initializeUdpConnector()
	defer conn.Udp.Close()
	go udp.Listener()
	go rabbitmq.Listener("outward")
	select {}
}

func initializeUdpConnector() {
	var e error
	conn.Udp, e = net.ListenPacket("udp", ":3000")
	err.Handler(e, "Can't create udp connector")
}
