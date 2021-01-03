import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import copy from 'copy-to-clipboard'
import { makeStyles } from '@material-ui/core/styles';
import { shortCuts } from './config';
import { Tooltip } from "@material-ui/core";

function CustomListItem(props) {
    const useStyles = makeStyles({
        listItemText: {
            fontSize: '1.5rem'
        }
    });
    var title = shortCuts.filter(v =>
        v.symbol === props.symbol
    )[0].shortcut;
    const classes = useStyles();
    const customCopy = () => {
        copy(props.symbol);
        props.editor.current.sendTextToEditor(props.symbol);
    }
    return (
        <Tooltip title={title}>
            <ListItem button key={props.name} onClick={customCopy}>
                {props.open ? <ListItemText classes={{ primary: classes.listItemText }} primary={props.symbol} secondary={props.name} />
                    :
                    <ListItemText classes={{ primary: classes.listItemText }} primary={props.symbol} />}

            </ListItem>
        </Tooltip>
    );
}

export default CustomListItem;
