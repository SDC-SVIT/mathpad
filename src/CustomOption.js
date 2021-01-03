import React from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import CanvasDraw from "react-canvas-draw";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  button: {
    height: '28px',
    border: '1px solid #F1F1F1',
    borderRadius: '2px',
    background: 'white'
  }
});

function Canvas(props) {
  const classes = useStyles();
  const saveableCanvas = React.useRef(null);
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const saveCanvas = () => {
    localStorage.setItem(
      "savedDrawing",
      saveableCanvas.current.getSaveData()
    );
  }

  return (
    <Dialog fullScreen onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Canvas
            </Typography>
          <div className={classes.toolbarButtons}>
            <Button color="inherit" onClick={() => { saveableCanvas.current.clear(); saveCanvas(); }}>
              Clear
            </Button>
            <Button color="inherit" onClick={() => { saveableCanvas.current.undo(); saveCanvas(); }}>
              Undo
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <CanvasDraw
        ref={saveableCanvas}
        saveData={localStorage.getItem("savedDrawing")}
        brushRadius={4}
        onChange={saveCanvas}
        immediateLoading={true}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Dialog>
  );
}

export default function CustomOption() {
  const classes = useStyles();
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button className={classes.button}
        onClick={openModal}>Canvas</button>
      <Canvas open={modalIsOpen} onClose={closeModal} />
    </div>
  );
}
