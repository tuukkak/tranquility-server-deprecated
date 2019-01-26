package error

import "log"

func Handler(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}
