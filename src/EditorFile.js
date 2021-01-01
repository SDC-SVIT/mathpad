import React, { Component } from 'react';
import { EditorState, ContentState, Modifier, SelectionState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { shortCuts } from "./config";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default class ControlledEditor extends Component {
    constructor(props) {
        super(props);
        this.editorRef = React.createRef();
        this.state = {
            editorState: EditorState.createEmpty(),
            editorText: "",
            inlineStyle: new Set(),
        };
        this.shortcuts = shortCuts;
        // setTimeout(()=>{
        //     this.sendTextToEditor("My bich is itching")
        // }, 2000);
    }

    componentDidMount = () => {
        this.sendTextToEditor("");
    }

    focusEditor = () => {
        if (this.editor) {
            //   this.editor.focusEditor();
            EditorState.moveFocusToEnd(this.state.editorState)
            console.log("1. Editor has the focus now");
        }
    };

    sendTextToEditor = (text) => {
        this.setState({ editorState: this.insertText(text, this.state.editorState) });
        this.focusEditor();
    }

    insertText = (text, editorState) => {
        const currentContent = editorState.getCurrentContent(),
            currentSelection = editorState.getSelection();

        const newContent = Modifier.replaceText(
            currentContent,
            currentSelection,
            text,
            editorState.getCurrentInlineStyle()
        );

        const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
        return EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
    }

    // Lord if u exist plij forgive me for dis.
    onEditorStateChange = (editorState) => {
        var contentNow = editorState.getCurrentContent().getPlainText();
        if (contentNow !== this.state.editorText) {
            this.shortcuts.forEach((val) => {
                contentNow = contentNow.replace(val.shortcut, val.symbol);
            });
            contentNow = contentNow.replace("Ayaan", "Genius");
            // var cs = ContentState.createFromText(contentNow);
            // const currentSelection = editorState.getSelection();
            let currentContent = editorState.getCurrentContent();
            const firstBlock = currentContent.getBlockMap().first();
            const lastBlock = currentContent.getBlockMap().last();
            const firstBlockKey = firstBlock.getKey();
            const lastBlockKey = lastBlock.getKey();
            const lengthOfLastBlock = lastBlock.getLength();
          
            let newSelection = new SelectionState({
              anchorKey: firstBlockKey,
              anchorOffset: 0,
              focusKey: lastBlockKey,
              focusOffset: lengthOfLastBlock
            });
            const newContent = Modifier.replaceText(
                editorState.getCurrentContent(),
                newSelection,
                contentNow,
                editorState.getCurrentInlineStyle()
            );
            const stateWithContent = EditorState.createWithContent(newContent);
            
            // let updateSelection = stateWithContent.getSelection().merge({
            //     anchorOffset: currentSelection.getAnchorOffset(),
            //     focusOffset: currentSelection.getFocusOffset(),
            //     isBackward: true,
            //   })
            this.setState({
                editorState: EditorState.forceSelection(stateWithContent, newContent.getSelectionAfter()),
                editorText: contentNow,
                inlineStyle: stateWithContent.getCurrentInlineStyle()
            });
        }
        else if(this.state.inlineStyle !== editorState.getCurrentInlineStyle()){
            console.log("In INline STyle Change");
            console.log(editorState.getCurrentInlineStyle().toString());
            this.setState({
                editorState: editorState,
                editorText: contentNow,
                inlineStyle: editorState.getCurrentInlineStyle()
            });
        }
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    ref={this.editorRef}
                    editorState={editorState}
                    toolbarClassName="demo-toolbar"
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>

        )
    }
}
