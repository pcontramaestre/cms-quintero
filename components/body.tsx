import { HTMLReactParserOptions } from "html-react-parser";
import parse from "html-react-parser";
import Image from "next/image";

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode.type === 'tag' && domNode.name === "img") {
      const { src, alt, width, height, class: className } = domNode.attribs;

      if (!src) {
        console.warn("Image tag found without src attribute.");
        return domNode; 
      }

      const finalSrc = src.startsWith('/') ? `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${src}` : src;

      const imgWidth = width ? parseInt(width, 10) : undefined;
      const imgHeight = height ? parseInt(height, 10) : undefined;

      if (imgWidth === undefined || imgHeight === undefined || isNaN(imgWidth) || isNaN(imgHeight)) {
           console.warn(`Image tag missing valid width or height attributes for intrinsic layout: ${src}. Falling back to default rendering.`);
           return (
              <img src={finalSrc} alt={alt || ''} className={className} />
           );
       }


      return (
        <Image
          src={finalSrc}
          width={imgWidth}
          height={imgHeight}
          alt={alt || ''}
          layout="intrinsic"
          objectFit="contain"
          className="mx-auto"
        />
      );
    }

    return domNode;
  },
};

export function Body({ value }: { value: string }) {
  if (!value || typeof value !== 'string') {
      return null;
  }
  return <>{parse(value, options)}</>;
}