package err

import "log"

func Handler(e error, msg string) {
	if e != nil {
		log.Fatalf("%s: %s", msg, e)
	}
}
