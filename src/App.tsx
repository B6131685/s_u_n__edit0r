import "./App.css";
import SunEditor from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css";
import { useRef } from "react";

function App() {
  const editor = useRef<SunEditorCore>();

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const post = () => {
    const el = document.querySelector("section") as HTMLElement;
    // var doc = new DOMParser().parseFromString(editor.current?.getContents(true) ?? "", "text/xml");
    
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

      // const parser = new DOMParser();
      const doc = new DOMParser().parseFromString(editor.current?.getContents(true) as string, "text/html");
      
      // console.log(doc.body);
      
      
      console.log(doc.body.getElementsByTagName('img')[0]);

      
      for (let i=0 ; i < [...doc.body.getElementsByTagName('img')].length ; i++ ) {
        const urlFromBackend = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
        let img = doc.body.getElementsByTagName('img')[i]
        // img.setAttribute('src', urlFromBackend)
        img.setAttribute('width', '100%')
        if(img.parentElement){
        }
        img.parentElement && (img.parentElement.style.textAlign = 'center')
      }
      
      el.insertAdjacentHTML(
        "afterbegin",
        doc.body.outerHTML ?? ""
      );
  };

  const edit = () => {
    const el = document.querySelector("section") as HTMLElement;
    // console.log(el.children[0] instanceof Element); // true
    // console.log(el.children[0].outerHTML); // string
   
    let str = ''
    for (const iterator of el.children) {
      str+= iterator.outerHTML
    }

    editor.current?.setContents(str)
  };
  return (
    <div>
      <p>
        {" "}
       <button onClick={post}>Post</button>{" "}
      </p>
      <SunEditor 
        width="800px"
        getSunEditorInstance={getSunEditorInstance} 
        placeholder="Write Text ..."
        setOptions={{
          defaultStyle:'font-size: 20px ',
          imageAlignShow: false,
          fontSize: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72],
          buttonList: [
            ["undo", "redo"],
            [
              "bold",
              "italic",
              "underline",
              "strike",
              'fontSize',
              "fontColor",
              "hiliteColor",
              "outdent",
              "indent",
              "list",
              "removeFormat"
            ],
            ["image"],
            ["showBlocks", "codeView", "preview"]
          ]
        }}/>

      <br />
      <br />
      <button onClick={edit}>Edit</button>
      <section
        style={{
          width: "800px",
          wordWrap: "break-word",
          padding: "5px",
          border: "1px solid #000",
          minHeight:"100px"
        }}
      ></section>
    </div>
  );
}

export default App;
