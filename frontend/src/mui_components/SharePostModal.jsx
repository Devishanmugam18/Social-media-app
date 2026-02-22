import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
// import PersonIcon from "@mui/icons-material/Person";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";
import SmartToyIcon from "@mui/icons-material/SmartToy"; //dicord icon- NA
import WhatsApp from "@mui/icons-material/WhatsApp";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt"; // messager icon - NA
import Telegram from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const socialMedia = [
  { name: "Twitter", icon: <TwitterIcon /> },
  { name: "Facebook", icon: <FacebookIcon /> },
  { name: "Reddit", icon: <RedditIcon /> },
  { name: "Discord", icon: <SmartToyIcon /> },
  { name: "WhatsApp", icon: <WhatsApp /> },
  { name: "Messenger", icon: <OfflineBoltIcon /> },
  { name: "Telegram", icon: <Telegram /> },
  { name: "Instagram", icon: <InstagramIcon /> },
];

function SimpleDialog(props) {
  const { onClose, /*selectedValue,*/ open } = props;

  const handleClose = () => {
    console.log("handle close executed");
    // onClose(selectedValue);
    onClose(open);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ border: "red 5px solid" }}>
      <DialogTitle>Share Post</DialogTitle>
      <Box sx={{ px: 0 }}>
        <Grid container spacing={2} sx={{ mx: 1.4 }} rowGap={2}>
          {socialMedia.map((item) => (
            <Grid
              // xs={3}
              size={3}
              key={item.name}
              sx={{ mx: 0 }}
              // columnGap={8}

              // sx={{ my: 2 }}
            >
              <Button onClick={() => handleListItemClick(item.name)}>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  {item.icon}
                </Avatar>
              </Button>
              <Typography /*textAlign="center"*/>{item.name}</Typography>
            </Grid>
          ))}
          {/* <Grid>
            <ListItem disablePadding>
              <ListItemButton
                autoFocus
                onClick={() => handleListItemClick("addAccount")}
              >
                <ListItemAvatar>
                  <Avatar>
                    <AddIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Add account" />
              </ListItemButton>
            </ListItem>
          </Grid> */}
          {/* </List> */}
        </Grid>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function () {
  const [open, setOpen] = React.useState(false);
  //   const [selectedValue, setSelectedValue] = React.useState(socialMedia[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    //   setSelectedValue(value);
  };

  return (
    <div>
      {/* <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography> */}
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
