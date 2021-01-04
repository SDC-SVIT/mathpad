import React from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import CanvasDraw from "react-canvas-draw";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputSlider from './InputSlider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import BrushIcon from '@material-ui/icons/Brush';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
const useStyles = makeStyles((theme) => ({
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
    background: 'white',

  },
  root: {
    width: 300 + theme.spacing(3) * 2,
    marginLeft: 'auto',
    // marginRight: 'auto',
  },
  // margin: {
  //   height: theme.spacing(3),
  // },
}));


// const useStyles = makeStyles({

// });

function Canvas(props) {
  const classes = useStyles();
  const saveableCanvas = React.useRef(null);
  const { onClose, selectedValue, open } = props;
  const [value, setValue] = React.useState(4);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const saveCanvas = () => {
    localStorage.setItem(
      "savedDrawing",
      saveableCanvas.current.getSaveData()
    );
  }


  const handleSliderChange = (event, newValue) => {
    setValue(Number(newValue));
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? 0 : Math.min(Number(event.target.value), 30));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 30) {
      setValue(30);
    }
  };

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
          <div className={classes.root}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <BrushIcon />
              </Grid>
              <Grid item xs>
                <PrettoSlider
                  value={typeof value === 'number' ? value : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  step={2}
                  min={1}
                  max={30}
                />
              </Grid>
              <Grid item>
                <Input
                  className={classes.input}
                  value={value}
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 2,
                    min: 1,
                    max: 30,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </div>
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
        brushRadius={value}
        onChange={saveCanvas}
        lazyRadius={0}
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
