import React, { useState, useEffect } from "react";
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
  backgroundColor: "var(--orange)",
  color: "black",
  marginBottom: theme.spacing(2),
  width: "100%",
}));

const LocationTypography = styled(Typography)({
  fontSize: "1.2em",
  marginBottom: "20px",
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  color: "black",
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default function Vendor({ vendor }) {
  const [expanded, setExpanded] = useState(false);
  const [favorited, setFavorited] = useState(false);

  // Use local storage to save the the favorited status of a vendor 
  useEffect(() => {
    const isFavorited = localStorage.getItem(`favorited_${vendor._id}`);
    if (isFavorited) {
      setFavorited(true);
    }
  }, [vendor._id]);

  const { vendorName, description, image, popular, location } = vendor;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    const newFavorited = !favorited;
    setFavorited(newFavorited);
    if (newFavorited) {
      localStorage.setItem(`favorited_${vendor._id}`, "true");
    } else {
      localStorage.removeItem(`favorited_${vendor._id}`);
    }
  };

  return (
    <CardsContainer>
      <CustomCard sx={{ maxWidth: 345 }}>
        <a className={styles.foodtrucklink} href={`/food-truck/${vendor._id}`}>
          <CardHeader
            action={<IconButton aria-label="settings"></IconButton>}
            title={
              <Typography variant="h5" component="div" style={{ fontFamily: "'Radley', serif" }}>
                {vendorName}
              </Typography>
            }
          />
          <LocationTypography
            style={{ fontFamily: "'Radley', serif" }}
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
            <Typography variant="body2" color="text.secondary" style={{ fontFamily: "'Radley', serif" }}>
              {description}
            </Typography>
          </CardContent>
        </a>
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
            <Typography paragraph style={{ fontFamily: "'Radley', serif" }}>
              {popular}
            </Typography>
          </CardContent>
        </Collapse>
      </CustomCard>
    </CardsContainer>
  );
}
