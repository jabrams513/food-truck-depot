import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Vendor.module.css";
import * as vendors from "../../assets";

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: "var(--orange)", // Orange background color
  color: "black", // Black text color
  marginBottom: theme.spacing(2), // Add space between cards
  width: "100%", // Set a fixed width for all cards
}));

const LocationTypography = styled(Typography)({
  fontSize: "1.2em", // Increase font size
  marginBottom: "20px", // Add space between location and image
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  color: "black", // Black icon color
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // Center horizontally
});

export default function Vendor({ vendor }) {
  console.log("LOGGING VENDOR IN THE VENDOR COMPONENT");

  console.log(vendor);
  const [expanded, setExpanded] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const { vendorName, description, image, popular, location } = vendor;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    setFavorited(!favorited);
  };

  return (
    <CardsContainer>
      <CustomCard sx={{ maxWidth: 345 }}>
        <CardHeader
          action={<IconButton aria-label="settings"></IconButton>}
          title={vendorName}
        />
        <LocationTypography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          {location}
        </LocationTypography>
        <CardMedia
          component="img"
          height="194"
          image={vendor.image}
          alt={popular}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="favorite" onClick={handleFavoriteClick}>
            <FavoriteIcon
              style={{ color: favorited ? "var(--green)" : "inherit" }}
            />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{popular}</Typography>
          </CardContent>
        </Collapse>
      </CustomCard>
    </CardsContainer>
  );
}
