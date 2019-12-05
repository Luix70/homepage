export const WhichBotstrapBreak = (ww, wh) => {
  const dim = wh && wh / ww > 1 ? wh : ww; //dimension a tener en cuenta

  if (dim < 576) return "xs";
  if (dim < 768) return "sm";
  if (dim < 992) return "md";
  if (dim < 1200) return "lg";
  if (dim <= 1920) return "xl";

  return "4k";
};

export const randomArray = oldArray => {
  const array = [...oldArray];

  for (let i = array.length - 1; i > -1; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  //console.log(oldArray, array);
  return array;
};
