import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import copy from 'copy-to-clipboard'
import { makeStyles} from '@material-ui/core/styles';

function CustomListItem(props) {
    const useStyles = makeStyles({
        listItemText: {
          fontSize: '1.5rem'
      }
    });
    
    const classes = useStyles();
    const customCopy = () => {
        copy(props.symbol);
        props.editor.current.sendTextToEditor(props.symbol);
    }
    return (
        <ListItem button key={props.name} onClick={customCopy}>
            {props.open ? <ListItemText classes={{ primary: classes.listItemText }} primary={props.symbol}  secondary={props.name} /> 
            : 
            <ListItemText classes={{ primary: classes.listItemText }} primary={props.symbol} />}

        </ListItem>
    );
}

export default CustomListItem;
