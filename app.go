package main

import (
	"context"
	"fmt"
	"strings"

	"golang.org/x/net/html"
	"golang.org/x/net/html/atom"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// Greet returns a greeting for the given name
func (a *App) ToGomp(code, contextType string) string {
	caser := cases.Title(language.AmericanEnglish)
	r := strings.NewReader(code) // HTML reader, reading from the HTML code

	// Create a node
	context := &html.Node{
		Type:     html.ElementNode,
		Data:     contextType,
		DataAtom: atom.Lookup([]byte(contextType)), // root element
	}

	// parsing the fragment as nodes
	nodes, err := html.ParseFragment(r, context)
	if err != nil {
		return fmt.Sprintf("There was an error: %v", err)
	}

	var f func(*html.Node, int) string // declaring a internal function
	f = func(n *html.Node, indentLevel int) string {
		indent := strings.Repeat("  ", indentLevel)
		if n.Type == html.ElementNode {
			attributes := "" // declare the attributes variable
			for _, a := range n.Attr {
				attributes += fmt.Sprintf(`h.%s("%s"),`, caser.String(a.Key), a.Val) // concatenate any attribute
			}

			children := []string{} // children elements
			for c := n.FirstChild; c != nil; c = c.NextSibling {
				childStr := f(c, indentLevel+1)
				if childStr != "" {
					children = append(children, childStr)
				}
			}
			// joining
			childrenStr := strings.Join(children, "\n"+indent)
			if childrenStr != "" {
				childrenStr = "\n" + indent + childrenStr + "\n" + indent
			}

			//
			return fmt.Sprintf("%sh.%s(%s%s),", indent, caser.String(n.Data), attributes, childrenStr)
		} else if n.Type == html.TextNode {
			trimmedData := strings.TrimSpace(n.Data)
			if trimmedData != "" {
				return fmt.Sprintf("%sg.Text('%s'),", indent, trimmedData)
			}
		}
		return ""
	}

	// Only we use the first root element, if there are many root elements, there would not considered
	if len(nodes) > 0 {
		return fmt.Sprintf("func Container() g.Node {\n  return %s\n}", f(nodes[0], 1))
	}
	return "No nodes to process"
}
