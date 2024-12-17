import { Carousel, Typography, Button } from "@material-tailwind/react";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
export function CarouselComponent() {
  return (
    <Carousel className="h-[400px]">
      <div className="relative h-[100%] w-full">
        <img
          src={image1}
          alt="image 1"
          className="h-[100%] w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-2xl md:text-3xl lg:text-4xl"
            >
              Hey, There Welcome to Connectify
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Where conversations happen in real-time. Connect, share, and
              engage like never before. Built with modern technology for
              uninterrupted, safe communication
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-[100%] w-full">
        <img
          src={image2}
          alt="image 2"
          className="h-[100%] w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-2xl md:text-3xl lg:text-4xl"
            >
              Services
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Connect instantly with your friends and colleagues with real-time
              messaging,End-to-end encryption ensures your chats stay private
              and secure,Stay updated with instant notifications for every
              message.
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-[100%] w-full">
        <img
          src={image3}
          alt="image 3"
          className="h-[100%] w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-2xl md:text-3xl lg:text-4xl"
            >
              Transforming Society and Shaping the future through chat.
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Hunt.....
            </Typography>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
