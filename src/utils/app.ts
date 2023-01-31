const generateAvatar: (
  name: string,
  background_color: string,
  avatar_color: string,
  bold: boolean
) => string = (name, background_color, avatar_color, bold) => {
  return `https://ui-avatars.com/api/?name=${name}&background=${background_color}&color=${avatar_color}&bold=${bold}&font-size=0.33`;
};

const app_utils = { generateAvatar};

export default app_utils;
