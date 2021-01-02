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

    replaceString = (chars, editorState) => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const block = contentState.getBlockForKey( selectionState.getAnchorKey() );

        this.shortcuts.forEach((val) => {
            const SC =  val.shortcut;
        const SYM = val.symbol;
        // Detect a match. Can be substituted with a RegEx test condition.
        if ( block.getText().indexOf( SC ) !== -1 ) {
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

    // Lord if u exist plij forgive me for dis.
    //OK dis works but cannot apply inline stylez
    onEditorStateChange = (editorState) => {
        var contentNow = editorState.getCurrentContent().getPlainText();
        // if (contentNow !== this.state.editorText) {
            // contentNow = contentNow.replace("Ayaan", "Genius");
            // var cs = ContentState.createFromText(contentNow);
            // const currentSelection = editorState.getSelection();
            // let currentContent = editorState.getCurrentContent();
            // const firstBlock = currentContent.getBlockMap().first();
            // const lastBlock = currentContent.getBlockMap().last();
            // const firstBlockKey = firstBlock.getKey();
            // const lastBlockKey = lastBlock.getKey();
            // const lengthOfLastBlock = lastBlock.getLength();
          
            // let newSelection = new SelectionState({
            //   anchorKey: firstBlockKey,
            //   anchorOffset: 0,
            //   focusKey: lastBlockKey,
            //   focusOffset: lengthOfLastBlock
            // });
            // const newContent = Modifier.replaceText(
            //     editorState.getCurrentContent(),
            //     newSelection,
            //     contentNow,
            //     editorState.getCurrentInlineStyle()
            // );
            // const stateWithContent = EditorState.createWithContent(newContent);
            
            // let updateSelection = stateWithContent.getSelection().merge({
            //     anchorOffset: currentSelection.getAnchorOffset(),
            //     focusOffset: currentSelection.getFocusOffset(),
            //     isBackward: true,
            //   })
            this.setState({
                editorState: editorState,
                editorText: contentNow,
                // inlineStyle: stateWithContent.getCurrentInlineStyle()
            });
        // }
        // else if(this.state.inlineStyle !== editorState.getCurrentInlineStyle()){
        //     console.log("In INline STyle Change");
        //     console.log(editorState.getCurrentInlineStyle().toList().toString());
        //     const contentState = Modifier.applyInlineStyle(editorState.getCurrentContent(), editorState.getSelection(), editorState.getCurrentInlineStyle().first());
        //     console.log(contentState.getCurrentInlineStyle)
        //     this.setState({
        //         editorState: EditorState.push(editorState, contentState, "change-inline-style"),
        //         editorText: contentNow,
        //         inlineStyle: editorState.getCurrentInlineStyle()
        //     });
        // }
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    ref={this.editorRef}
                    editorState={editorState}
                    handleBeforeInput={ this.replaceString }
                    toolbarClassName="demo-toolbar"
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>

        )
    }
}
