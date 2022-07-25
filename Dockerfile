FROM golang:1.18.4-bullseye as build

WORKDIR /go/src/app
COPY /GoLang_image/hello.go .

RUN go mod init fc-test && \
	go mod verify && \
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /main .


FROM scratch

COPY --from=build /main .

CMD ["./main"]