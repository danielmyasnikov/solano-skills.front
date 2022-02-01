const AddImage = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_960_4659)">
      <circle cx="28" cy="25" r="11" fill="#7469EF" />
    </g>
    <path d="M28 20V30" stroke="white" />
    <path d="M33 25L23 25" stroke="white" />
    <defs>
      <filter
        id="filter0_d_960_4659"
        x="0"
        y="0"
        width="56"
        height="56"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="8.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.454902 0 0 0 0 0.411765 0 0 0 0 0.937255 0 0 0 0.15 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_960_4659" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_960_4659"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default AddImage;
