import { CustomLink, Section } from "@/models";

export const customizeSectionObject = (data: Array<Section>): Section[] => {
  return data.map((item) => {
    const subSectionsData = item.subSections?.items.map((section) => {
      switch (section?.type) {
        case "YOUTUBE":
        case "INSTAGRAM":
        case "FACEBOOK":
          return { ...section };
        case "CUSTOMLINK":
          const apps: CustomLink[] = [];
          const external: CustomLink[] = [];
          const product: CustomLink[] = [];
          const custom: CustomLink[] = [];
          const ytLink: CustomLink[] = [];
          const igLink: CustomLink[] = [];

          section.customLinkItems?.items?.forEach((app) => {
            if (app.customLink.linkType === "APP") {
              apps.push(app.customLink);
            } else if (app.customLink.linkType === "EXTERNAL") {
              external.push(app.customLink);
            } else if (app.customLink.linkType === "CUSTOM") {
              custom.push(app.customLink);
            } else if (app.customLink.linkType === "YTLINK") {
              ytLink.push(app.customLink);
            } else if (app.customLink.linkType === "IGLINK") {
              igLink.push(app.customLink);
            } else {
              product.push(app.customLink);
            }
          });

          const linkType = apps.length
            ? "APP"
            : ytLink.length
            ? "YTLINK"
            : igLink.length
            ? "IGLINK"
            : custom.length
            ? "CUSTOM"
            : external.length
            ? "EXTERNAL"
            : "PRODUCT";

          return {
            ...section,
            customLinkType: linkType,
            allItems: apps.length ? apps : external.length ? external : product,
          };

        case "MEDIA":
          const sortedArray: any = [];
          section.mediaItems?.items?.forEach((item) => {
            if (!(item as any)?.isArchived) {
              sortedArray.push(item);
            }
          });
          sortedArray.sort(
            (a: any, b: any) => a.media.position - b.media.position
          );
          return {
            ...section,
            mediaItems: { items: sortedArray },
          };

        case "LOGO":
          const sortedLogoArray: any = [];
          section.logoItems?.items?.forEach((item: any) => {
            if (!(item as any)?.isArchived) {
              sortedLogoArray.push(item);
            }
          });
          sortedLogoArray.sort(
            (a: any, b: any) => a.logo.position - b.logo.position
          );
          return {
            ...section,
            logoItems: { items: sortedLogoArray },
          };
        default:
          return section;
      }
    });

    // const sortingPromises = subSectionsData?.map(async (item) => {
    //   // Check if the item has mediaItems and it's an array
    //   if (item?.mediaItems && Array.isArray(item.mediaItems.items)) {
    //     // Sort the mediaItems array based on media.position
    //     item.mediaItems.items.sort(
    //       (a, b) => (a?.media?.position as any) - (b?.media?.position as any)
    //     );
    //   }
    // });

    return { ...item, subSections: { items: subSectionsData || [] } };
  }) as Section[];
};

export const fetchRandomNumberArr = (totalNumber: number): Array<number> => {
  let arr = [];
  for (let i = 1; i <= totalNumber; i++) {
    arr.push(i);
  }

  for (
    let j, x, i = arr.length;
    i;
    j = parseInt((Math.random() * i).toString()),
      x = arr[--i],
      arr[i] = arr[j],
      arr[j] = x
  ) {
    // do nothing
  }
  return arr;
};

export const fetchColors = (index: number): string => {
  switch (index) {
    case 1:
      return "var(--light-blue-color)";
    case 2:
      return "var(--light-green-color)";
    case 3:
      return "var(--light-yellow-color)";
    case 4:
      return "var(--light-purple-color)";
    default:
      return "var(--light-blue-color)";
  }
};

export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex?.slice(1, 3), 16);
  const g = parseInt(hex?.slice(3, 5), 16);
  const b = parseInt(hex?.slice(5, 7), 16);

  const red = Math.round(r + (255 - r) * 0.9);
  const green = Math.round(g + (255 - g) * 0.9);
  const blue = Math.round(b + (255 - b) * 0.9);

  const hexCode = `#${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

  return hexCode;
};
export const convertToTitleCase = (value: string) => {
  return value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase();
};
export const themeColors = ["#FF69B4", "#4589E4", "#0FA1DE", "#808000"];

export const scrollToSection = () => {
  const targetSection = document.getElementById("contactUs");
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
};
