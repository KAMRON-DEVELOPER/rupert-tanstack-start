const FlagRu = ({ size = 4 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'>
      <g clipPath='url(#RU_svg__a)'>
        <path
          d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z'
          fill='#F0F0F0'
        />
        <path
          d='M23.254 16.173c.482-1.3.746-2.706.746-4.173 0-1.468-.264-2.874-.746-4.174H.746A11.974 11.974 0 0 0 0 11.999c0 1.468.264 2.874.746 4.174L12 17.217l11.254-1.044Z'
          fill='#0052B4'
        />
        <path
          d='M12 24c5.16 0 9.559-3.257 11.254-7.827H.747C2.443 20.743 6.841 24 12.001 24Z'
          fill='#D80027'
        />
      </g>
      <defs>
        <clipPath id='RU_svg__a'>
          <path
            fill='#fff'
            d='M0 0h24v24H0z'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FlagRu;
