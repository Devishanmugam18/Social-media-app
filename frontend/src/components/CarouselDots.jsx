import { Box } from "@mui/material";
import React from "react";

const CarouselDots = ({ mediaList }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1, gap: 1 }}>
        {mediaList.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => swiperRef.current?.slideTo(idx)}
            sx={{
              width: 8,
              height: 8,
              bgcolor: activeIndex === idx ? "#000" : "#ccc",
              //   bgcolor: "#000",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </div>
  );
};

export default CarouselDots;
