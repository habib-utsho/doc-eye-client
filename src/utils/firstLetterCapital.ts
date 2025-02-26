export const firstLetterCapital = (sentence: string) => {
  return sentence
    ?.split(" ")
    ?.map((word) => word?.[0]?.toUpperCase() + word?.slice(1))
    .join(" ");
};
