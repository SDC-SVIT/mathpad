import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import copy from 'copy-to-clipboard'
function CustomListItem(props) {
    const customCopy = ()=>{
        copy(props.symbol)
    }
    return (
        <ListItem button key={props.name} onClick={customCopy}>
            {props.open?<ListItemText primary={props.symbol +" "+ props.name} />:<ListItemText primary={props.symbol} />}

        </ListItem>
    );
}

export default CustomListItem;
