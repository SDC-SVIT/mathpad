import React, { Component } from 'react';
import { EditorState, ContentState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default class ControlledEditor extends Component {
    constructor(props) {
        super(props);
        this.editorRef = React.createRef();
        this.state = {
            editorState: EditorState.createEmpty(),
        };
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

    onEditorStateChange = (editorState) => {
        var contentNow = editorState.getCurrentContent().getPlainText();
        // contentNow.replace("Ayaan", "Chakko");
        var cs = ContentState.createFromText(editorState.getCurrentContent().getPlainText());
        var es = EditorState.createWithContent(cs);
        this.setState({
            editorState
        });
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
