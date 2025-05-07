declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
} 

declare module '*.png';

declare module '*.mp4' {
  const src: string;
  export default src;
}
