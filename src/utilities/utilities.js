export const WhichBotstrapBreak = (ww, wh) => {
  if (ww / wh >= 1) {
    if (ww < 576) return "xs";
    if (ww < 768) return "sm";
    if (ww < 992) return "md";
    if (ww < 1200) return "lg";
    if (ww <= 1920) return "xl";
    return "4k";
  } else {
    if (wh < 576) return "xs";
    if (wh < 768) return "sm";
    if (wh < 992) return "md";
    if (wh < 1200) return "lg";
    if (wh <= 1920) return "xl";
    return "4k";
  }
};
