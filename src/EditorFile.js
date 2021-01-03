import React, { Component } from 'react';
import { EditorState, ContentState, Modifier, SelectionState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { shortCuts } from "./config";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomOption from "./CustomOption.js";


export default class ControlledEditor extends Component {
    constructor(props) {
        super(props);
        this.editorRef = React.createRef();

        this.state = {
            editorState: EditorState.createEmpty(),
            editorText: '',
            inlineStyle: new Set(),
        };
        this.shortcuts = shortCuts;
        this.options = ['inline', 'blockType', 'fontSize', 'fontFamily', 'textAlign', 'emoji', 'history'];
    }

    componentDidMount = () => {
       // var text = localStorage.getItem('editorText') === 'true'?localStorage.getItem('editorText'):'';
      //  console.log("In component did mount ",localStorage.getItem('editorText') === 'true')
        this.sendTextToEditor(localStorage.getItem('editorText'));
        //Content getting
        console.log("In component did mount",localStorage.getItem('editorText'))
    }

    replaceString = (chars, editorState) => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const block = contentState.getBlockForKey( selectionState.getAnchorKey() );

        this.shortcuts.forEach((val) => {
            const SC =  val.shortcut;
        const SYM = val.symbol;
        // Detect a match. Can be substituted with a RegEx test condition.
        if ( block.getText().indexOf(SC) !== -1 ) {
            const currentSelectionState = this.state.editorState.getSelection();
            const newContentState = Modifier.replaceText(
                contentState,
                // The text to replace, which is represented as a range with a start & end offset.
                selectionState.merge( {
                    // The starting position of the range to be replaced.
                    anchorOffset: currentSelectionState.getEndOffset() - SC.length,
                    // The end position of the range to be replaced.
                    focusOffset: currentSelectionState.getEndOffset()
                } ),
                // The new string to replace the old string.
               SYM
            );

            this.setState( {
                editorState: EditorState.push(
                    editorState,
                    newContentState,
                    'replace-text'
                )
            } )
        }
    });
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
        localStorage.setItem('editorText', contentNow);
            this.setState({
                editorState: editorState,
                editorText: contentNow,
            });

        console.log("In editor state change",localStorage.getItem('editorText') === 'true')
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    toolbar={{
                        options: this.options,
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                      }}
                    ref={this.editorRef}
                    editorState={editorState}
                    handleBeforeInput={ this.replaceString }
                    toolbarClassName="demo-toolbar"
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbarCustomButtons={[<CustomOption />]}
                />
            </div>

        )
    }
}
