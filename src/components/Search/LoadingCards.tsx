import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";

type LoadingCardProps = {
  numberOfCards: number;
};

export default function LoadingCards({ numberOfCards }: LoadingCardProps) {
  const cards = [...Array(numberOfCards)].map((_, index) => (
    <Card
      key={index}
      className="relative w-60 h-363 m-4 surface-1 flex flex-col justify-between shadow-lg shadow-color"
    >
      <CardActionArea onClick={() => {}}>
        <div className="relative h-36">
          <div className="h-36 on-surface animate-pulse" />
        </div>
        <CardContent className="on-surface-text text-center">
          <div className="h-3 w-3/5 rounded-lg on-surface animate-pulse"></div>
          <br />
          <div className="h-3 w-4/5 rounded-lg on-surface animate-pulse"></div>
        </CardContent>
      </CardActionArea>
    </Card>
  ));

  return <>{cards}</>;
}
