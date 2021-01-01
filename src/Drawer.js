import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import EditorFile from "./EditorFile";
import CustomListItem from "./CustomListItem";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
}));

export default function MiniDrawer() {

    const sn = [
        {
            "name":"conjunction",
            "symbol":"∧"

        },
        {
            "name":"disjunction",
            "symbol":"∨"

        }
    ]


    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerToggle = ()=>{
        setOpen(!open);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            {/*<AppBar*/}
            {/*    position="fixed"*/}
            {/*    className={clsx(classes.appBar, {*/}
            {/*        [classes.appBarShift]: open,*/}
            {/*    })}*/}
            {/*>*/}
            {/*    <Toolbar>*/}
            {/*        <IconButton*/}
            {/*            color="inherit"*/}
            {/*            aria-label="open drawer"*/}
            {/*            onClick={handleDrawerOpen}*/}
            {/*            edge="start"*/}
            {/*            className={clsx(classes.menuButton, {*/}
            {/*                [classes.hide]: open,*/}
            {/*            })}*/}
            {/*        >*/}
            {/*            <h1>1</h1>*/}
            {/*        </IconButton>*/}
            {/*        <Typography variant="h6" noWrap>*/}
            {/*            Mini variant drawer*/}
            {/*        </Typography>*/}
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerToggle}>
                        {theme.direction === 'rtl' ? <h1>1</h1> : <h1>1</h1>}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {sn.map((text, index) => (
                       <CustomListItem name={text.name} symbol={text.symbol} open={open}/>
                    ))}
                </List>
                {/*<Divider />*/}
                {/*<List>*/}
                {/*    {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
                {/*        <ListItem button key={text}>*/}

                {/*            <ListItemText primary={text} />*/}
                {/*        </ListItem>*/}
                {/*    ))}*/}
                {/*</List>*/}
            </Drawer>
            <main className={classes.content}>
                {/*<div className={classes.toolbar} />*/}
                <EditorFile/>
            </main>
        </div>
    );
}
