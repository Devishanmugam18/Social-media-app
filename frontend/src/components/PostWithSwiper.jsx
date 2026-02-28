import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef, useState } from "react";

const PostWithSwiper = ({ mediaList, carouselDots, imageCountLabel }) => {
  //   const mediaList = [
  //     {
  //       id: 1,
  //       url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NlbmljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  //       mediaType: "image",
  //     },
  //     {
  //       id: 2,
  //       url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NlbmljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  //       mediaType: "image",
  //     },
  //   ];

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div>
      {/* <Box sx={{ display: "flex", justifyContent: "center" }}> */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          // width: 260,
          // height: 260,
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          slidesPerView={1}
          style={{ width: "100%", height: "100%" }}
        >
          {mediaList.map((m, idx) => (
            <SwiperSlide key={m.id || idx}>
              {m.mediaType === "video" ? (
                <video
                  src={m.url}
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              ) : (
                <img
                  src={m.url}
                  alt={`preview-${idx}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        {imageCountLabel && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.95)",
              px: 1,
              py: 0.4,
              borderRadius: 2,
              fontSize: 12,
              fontWeight: 700,
              zIndex: 10,
            }}
          >
            {activeIndex + 1}/{mediaList.length}
          </Box>
        )}
      </Box>
      {/* </Box> */}
      {/* custom carousel dots below the preview */}
      {carouselDots && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1, gap: 1 }}>
          {mediaList.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => swiperRef.current?.slideTo(idx)}
              sx={{
                width: 8,
                height: 8,
                bgcolor: activeIndex === idx ? "#000" : "#ccc",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default PostWithSwiper;
