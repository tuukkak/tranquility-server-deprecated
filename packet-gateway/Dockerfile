FROM golang:1.11.4-alpine

RUN apk add --no-cache git

WORKDIR /go/src
COPY src .

RUN go get -d -v ./...

EXPOSE 3000

CMD ["go", "run", "main.go"]
