declare module '*.css';
declare module '*.less';

declare module '*.jpg';
declare module '*.jpeg';

declare module '*.pdf';

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png';
declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}
