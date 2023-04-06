import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export type SearchCardProps = {
  heading: string;
  subheading: string;
  image: string;
};

export default function SearchCard({
  heading,
  subheading,
  image,
}: SearchCardProps) {
  return (
    <Card
      key={`${heading}${subheading}`}
      className="relative w-60 m-4 surface-1 flex flex-col justify-between shadow-lg shadow-color"
    >
      <CardActionArea onClick={() => {}}>
        <div className="relative h-36">
          <CardMedia
            className="h-36"
            image={image}
            title="Contemplative Reptile"
          />
          <div className="inset-0 absolute h-full w-full flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-500">
            <PlayArrowIcon style={{ fontSize: 90 }} className="primary-text" />
          </div>
        </div>
        <CardContent className="on-surface-text text-center">
          <p className="on-surface-text">{heading}</p>
          <br />
          <p className="on-surface-text opacity-70">{subheading}</p>
        </CardContent>
      </CardActionArea>
      <CardActions className="flex justify-end items-end">
        <Tooltip
          title="Add to queue"
          placement="top"
          className="flex justify-end"
        >
          <IconButton
            onClick={() => {}}
            className="primary-text"
            aria-label="add to queue"
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
