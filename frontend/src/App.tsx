import { Button } from "@/components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { ToGomp } from "@/lib/wailsjs/go/main/App";
import React from "react";
import { Separator } from "./components/ui/separator";
function App() {
  const [gompCode, setGompCode] = React.useState("");
  const [htmlCode, setHtmlCode] = React.useState("");

  const submit = async () => {
    const context = htmlCode.replace(" ", "-").split("-")[0].replace("<", "");

    const res = await ToGomp(htmlCode, context);
    console.log(res);
    setGompCode(res);
  };

  return (
    <div className="min-h-screen bg-white text-blue-900 text-2xl font-bold flex flex-col items-center mx-auto py-8">
      <h1>
        Gomponerter: Convert HTML code to{" "}
        <a href="https://gomponents.com" className="underline">
          gomponents
        </a>
      </h1>
      <p className="text-lg text-black">
        Write here your HTML Code like you do normally
      </p>
      <div className="flex justify-evenly items-center space-x-4 p-5 w-[90%] gap-5 flex-wrap">
        <div className="flex flex-col items-center gap-y-4 w-[40%]">
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
        <div className="flex flex-col items-center w-[40%] gap-y-4 !mt-0">
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
  );
}

export default App;
