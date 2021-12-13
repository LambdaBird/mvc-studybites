import styled from 'styled-components';

export const StyledWrapper = styled.div`
  @media (min-width: 768px) {
    .thumbsup-icon {
      position: relative;
      width: 250px;
      height: 250px;

      display: flex;
      align-items: center;
    }

    .thumbsup-icon svg {
      position: absolute;
    }

    .thumbsup-icon .stripes {
      fill: #f7f7f7;
      animation: 1300ms stripes-swing ease-in-out;
    }

    .thumbsup-icon .stars {
      fill: #febb02;
    }

    .thumbsup-icon .star1 {
      animation: 1300ms star-fly1;
      z-index: 1;
    }

    .thumbsup-icon .star2 {
      animation: 1300ms star-fly2;
      z-index: 1;
    }

    .thumbsup-icon .star3 {
      animation: 1300ms star-fly3;
      z-index: 1;
    }

    .thumbsup-icon .star4 {
      animation: 1300ms star-fly4;
      z-index: 1;
    }

    .thumbsup-icon .star5 {
      animation: 1300ms star-fly5;
      z-index: 1;
    }

    .thumbsup-icon .thumbsup {
      animation: 1300ms thumbsup-shake ease-in-out;
      z-index: 2;
    }
  }

  @media (max-width: 767px) {
    .thumbsup-icon {
      animation: 1300ms hide-mobile ease-in;
      animation-delay: 1000ms;
      animation-fill-mode: forwards;

      @keyframes hide-mobile {
        to {
          opacity: 0;
          width: 0;
          height: 0;
          visibility: hidden;
        }
      }
      position: absolute;
      width: 250px;
      height: 250px;
      bottom: 50px;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
    }

    .thumbsup-icon svg {
      position: absolute;
    }

    .thumbsup-icon .stripes {
      fill: #f7f7f7;
      animation: 1300ms stripes-swing ease-in;
    }

    .thumbsup-icon .stars {
      fill: #febb02;
    }

    .thumbsup-icon .star1 {
      animation: 1300ms star-fly1;
      z-index: 1;
    }

    .thumbsup-icon .star2 {
      animation: 1300ms star-fly2;
      z-index: 1;
    }

    .thumbsup-icon .star3 {
      animation: 1300ms star-fly3;
      z-index: 1;
    }

    .thumbsup-icon .star4 {
      animation: 1300ms star-fly4;
      z-index: 1;
    }

    .thumbsup-icon .star5 {
      animation: 1300ms star-fly5;
      z-index: 1;
    }

    .thumbsup-icon .thumbsup {
      animation: 1300ms thumbsup-shake ease-in;
      z-index: 2;
    }
  }

  @keyframes star-fly1 {
    0% {
      transform: translate(20%, 40%) scale(0.76, 0.76);
      opacity: 0;
    }
    12.8% {
      opacity: 1;
    }
    28.2% {
      transform: translate(0, 0) scale(1, 1);
    }
  }

  @keyframes star-fly2 {
    0% {
      transform: translate(-14%, 40%) scale(0.76, 0.76);
      opacity: 0;
    }
    12.8% {
      opacity: 1;
    }
    28.2% {
      transform: translate(0, 0) scale(1, 1);
    }
  }

  @keyframes star-fly3 {
    0% {
      transform: translate(5%, -35%) scale(0.76, 0.76);
      opacity: 0;
    }
    12.8% {
      opacity: 1;
    }
    28.2% {
      transform: translate(0, 0) scale(1, 1);
    }
  }

  @keyframes star-fly4 {
    0% {
      transform: translate(30%, 0) scale(0.76, 0.76);
      opacity: 0;
    }
    12.8% {
      opacity: 1;
    }
    28.2% {
      transform: translate(0, 0) scale(1, 1);
    }
  }

  @keyframes star-fly5 {
    0% {
      transform: translate(-20%, 0) scale(0.76, 0.76);
      opacity: 0;
    }
    12.8% {
      opacity: 1;
    }
    28.2% {
      transform: translate(0, 0) scale(1, 1);
    }
  }

  @keyframes thumbsup-shake {
    0% {
      transform: rotate(20deg) scale(0.74, 0.74);
      opacity: 0.1;
    }
    7.7% {
      opacity: 1;
      transform: rotate(0) scale(1, 1);
    }
    15.4% {
      transform: rotate(-11deg) scale(1.08, 1.08);
    }
    28.2% {
      transform: rotate(0) scale(1, 1);
    }
  }

  @keyframes stripes-swing {
    20.5% {
      transform: translate(4%, 0);
    }
    38.4% {
      transform: translate(-2%, 0);
    }
    59% {
      transform: translate(3.7%, 0);
    }
    79.5% {
      transform: translate(0, 0);
    }
  }
`;
