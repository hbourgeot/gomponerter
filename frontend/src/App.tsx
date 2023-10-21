import { Button } from "@/components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { ToGomp } from "@/lib/wailsjs/go/main/App";
import React from "react";
import { Info } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  const [gompCode, setGompCode] = React.useState("");
  const [htmlCode, setHtmlCode] = React.useState("");

  const submit = async () => {
    const context = htmlCode.replace(" ", "-").split("-")[0].replace("<", "");

    const res = await ToGomp(htmlCode, context);
    setGompCode(res);
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen text-2xl font-bold flex flex-col items-center mx-auto py-8">
        <div className="absolute top-5 right-5 flex justify-end gap-3">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button size={"icon"} variant={"default"}>
                <Info className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl mb-3">
                  How To Use Gomponerter?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <p>
                    Copy any HTML Element with children nodes and paste it into
                    the left textarea and click on{" "}
                    <span className="italic">Send HTML</span> button to convert
                    it into a{" "}
                    <a
                      href="https://gomponents.com"
                      className="underline text-blue-900 font-semibold">
                      gomponent code
                    </a>
                  </p>
                  <p className="my-2">
                    <span className="text-destructive">NOTE:</span> if the HTML
                    provided has many root elements, only the first would be
                    considered and the rest ignored
                  </p>
                </AlertDialogDescription>
                <AlertDialogDescription>
                  Made with ❤️ by hbourgeot using Wails
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ModeToggle />
        </div>
        <h1 className="text-blue-900 dark:text-blue-600">
          Gomponerter: Convert HTML code to{" "}
          <a href="https://gomponents.com" className="underline">
            gomponents
          </a>
        </h1>
        <p className="text-lg">
          Write here your HTML Code like you do normally
        </p>
        <div className="flex justify-evenly items-center space-x-4 p-5 w-[90%] gap-1 flex-wrap">
          <div className="flex flex-col items-center gap-y-4 w-[47%]">
            <Label htmlFor="html" className="self-start">
              HTML code
            </Label>
            <Textarea
              className="w-full monospace"
              placeholder="<div class='my class'></div>"
              name="html"
              onChange={(e) => setHtmlCode(e.target.value)}
              value={htmlCode}
              id="html"
            />
          </div>
          <div className="border-l-2 border-l-gray-300/50 border-solid hidden md:block w-1/10 h-[100px]"></div>
          <div className="flex flex-col items-center w-[47%] gap-y-4 !mt-0">
            <Label htmlFor="gomp" className="self-start">
              Gomponent code
            </Label>
            <Textarea
              className="w-full monospace"
              placeholder="func Container() g.Node {
              return h.Div(h.Class('my class'))
            }"
              value={gompCode}
              name="gomp"
              readOnly
              id="gomp"
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-4 flex-wrap">
          <Button variant={"default"} onClick={submit}>
            Send HTML
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              //@ts-ignore
              document.querySelector("#html").value = "";
              setGompCode("");
            }}>
            Clear
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
