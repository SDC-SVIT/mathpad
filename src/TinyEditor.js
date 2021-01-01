import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class TinyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            editor: null
        };
    }

    sendTextToEditor(text) {
        var { editor } = this.state;
        var content = this.state.content;
        content = content.substring(0, content.length - 4) + text + content.substring(content.length - 4) + " ";
        if (this.state.editor) {
            console.log("IN if");
            this.state.editor.focus();
            // var newNode = editor.dom.select('span#temp-span');
            // editor.selection.select(newNode[0]);
            // editor.setContent('');
            // editor.selection.setContent(content);
            editor.selection.select(editor.getBody(), true);
            editor.selection.collapse(false);
        }
        this.setState({ content });
    }

    handleEditorChange = (content, editor) => {
        this.setState({ content, editor })
    }

    render() {
        return (
            <Editor
                value={this.state.content}
                apiKey="vkvx98huzejm0kh3grzsouftsgr2e9lco85s66hb8q136tgc"
                onEditorChange={this.handleEditorChange}
                // outputFormat='text'
                init={{
                    height: 500,
                    menubar: true,
                    auto_focus: true,
                    content_style: "body {font-size: 24pt;}",
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | fontsizeselect | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
                }}
            />
        );
    }
}

export default TinyEditor;
