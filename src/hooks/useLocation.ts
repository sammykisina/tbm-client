import axios from "axios";
import { useEffect, useState } from "react";

const useLocation = () => {
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);

  const [location, setLocation] = useState();

  const base_url = `https://api.openweathermap.org/data/2.5/onecall?`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    if (latitude !== undefined && longitude !== undefined) {
      // axios
      //   .get(
      //     `${base_url}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
      //   )
      //   .then((response) => {
      //     if (response.data) {
      //       setLocation(response.data);
      //     }
      //   });
    }
  }, [base_url, latitude, longitude]);

  return { latitude, longitude };
};

export default useLocation;
