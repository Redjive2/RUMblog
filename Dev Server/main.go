package main

import (
	"io"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	fsys := os.DirFS("../Site")
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var (
			path      = r.URL.Path
			file, err = open(fsys, path)
		)

		if err != nil {
			panic(err)
		}

		defer file.Close()

		bytes, err := io.ReadAll(file)

		if err != nil {
			panic(err)
		}
		contentType := "text/plain"

		switch filepath.Ext(path) {
		case ".js":
			contentType = "text/javascript"
		case ".css":
			contentType = "text/css"
		case ".html", ".htm":
			contentType = "text/html"
		default:
			log.Println(path, strings.Split(path, ".")[1], contentType)
			contentType = http.DetectContentType(bytes)
		}
		w.Header().Add("Content-Type", contentType)

		w.Write(bytes)
	})

	err := http.ListenAndServe(":8080", handler)
	panic(err)
}

func open(fsys fs.FS, path string) (fs.File, error) {
	if path == "/" {
		return fsys.Open("/index.html")
	}
	
	return fsys.Open(path[1:])
}