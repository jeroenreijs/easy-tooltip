import '../styles/main.scss';

function easyTooltip() {
  const tips = document.querySelectorAll('[data-tip]');

  // function that returns the top (y) and left (x) position based on a given tooltip position (top, left, right, bottom)
  const setPosition = ({
    width,
    top,
    left,
    height,
    tipPosition,
    arrowWidth,
    arrowHeight,
    tooltip,
    scrollX,
    scrollY,
  }) => {
    let positionLeft = left;
    let positionTop = top;
    if (!tipPosition || tipPosition === 'top') {
      positionLeft = left - tooltip.clientWidth / 2 + width / 2 + scrollX;
      positionTop = top - tooltip.clientHeight - height + arrowHeight + scrollY;
    }
    if (tipPosition === 'bottom') {
      positionLeft = left - tooltip.clientWidth / 2 + width / 2 + scrollX;
      positionTop = top + height + arrowHeight + scrollY;
    }
    if (tipPosition === 'left') {
      positionLeft = left - tooltip.clientWidth - arrowWidth + scrollX;
      positionTop = top - tooltip.clientHeight / 2 + height / 2 + scrollY;
    }
    if (tipPosition === 'right') {
      positionLeft = left + width + arrowWidth + scrollX;
      positionTop = top - tooltip.clientHeight / 2 + height / 2 + scrollY;
    }
    return { positionTop, positionLeft };
  };

  // function that returns the top (y) and left (x) position based on a hard-coded tooltip position (top, left, right, bottom)
  const getNewCorrectedPosition = ({
    width,
    top,
    left,
    height,
    tipPosition,
    arrowWidth,
    arrowHeight,
    tooltip,
    scrollX,
    scrollY,
    forcedPosition,
  }) => {
    const { positionTop, positionLeft } = setPosition({
      width,
      top,
      left,
      height,
      tipPosition: forcedPosition,
      arrowWidth,
      arrowHeight,
      tooltip,
      scrollX,
      scrollY,
    });
    tooltip.classList.remove(`tip-position-${tipPosition}`);
    tooltip.classList.add(`tip-position-${forcedPosition}`);
    return { positionTop, positionLeft };
  };

  // function that determines whether the default top (y) and left (x) need to be corrected
  const setCorrectedPosition = ({
    width,
    top,
    left,
    height,
    tipPosition,
    arrowWidth,
    arrowHeight,
    tooltip,
    scrollX,
    scrollY,
    positionLeft,
    positionTop,
  }) => {
    let newLeftPosition = positionLeft;
    let newTopPosition = positionTop;
    // now handle the fact that the tip might not fit there
    if (tipPosition === 'left' && positionLeft < scrollX) {
      // try right
      const { positionTop: corrTop, positionLeft: corrLeft } =
        getNewCorrectedPosition({
          width,
          top,
          left,
          height,
          tipPosition,
          arrowWidth,
          arrowHeight,
          tooltip,
          scrollX,
          scrollY,
          positionLeft,
          positionTop,
          forcedPosition: 'right',
        });
      newLeftPosition = corrLeft;
      newTopPosition = corrTop;
    }
    if (
      tipPosition === 'right' &&
      positionLeft + tooltip.clientWidth > window.innerWidth + window.scrollX
    ) {
      // try left
      const { positionTop: corrTop, positionLeft: corrLeft } =
        getNewCorrectedPosition({
          width,
          top,
          left,
          height,
          tipPosition,
          arrowWidth,
          arrowHeight,
          tooltip,
          scrollX,
          scrollY,
          positionLeft,
          positionTop,
          forcedPosition: 'left',
        });
      newLeftPosition = corrLeft;
      newTopPosition = corrTop;
    }
    if (tipPosition === 'top' && positionTop < scrollY) {
      // try bottom
      const { positionTop: corrTop, positionLeft: corrLeft } =
        getNewCorrectedPosition({
          width,
          top,
          left,
          height,
          tipPosition,
          arrowWidth,
          arrowHeight,
          tooltip,
          scrollX,
          scrollY,
          positionLeft,
          positionTop,
          forcedPosition: 'bottom',
        });
      newLeftPosition = corrLeft;
      newTopPosition = corrTop;
    }
    if (
      tipPosition === 'bottom' &&
      positionTop + tooltip.clientHeight > window.innerHeight + scrollY
    ) {
      // try top
      const { positionTop: corrTop, positionLeft: corrLeft } =
        getNewCorrectedPosition({
          width,
          top,
          left,
          height,
          tipPosition,
          arrowWidth,
          arrowHeight,
          tooltip,
          scrollX,
          scrollY,
          positionLeft,
          positionTop,
          forcedPosition: 'top',
        });
      newLeftPosition = corrLeft;
      newTopPosition = corrTop;
    }
    return {
      topPositionWithCorrection: newTopPosition,
      leftPositionWithCorrection: newLeftPosition,
    };
  };

  // function to add the tooltip to the DOM
  const showTooltip = (e) => {
    const arrowHeight = 8;
    const arrowWidth = 8;
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const {
      tip,
      tipPosition = 'top',
      tipArrowPosition,
      tipBgColor,
      tipTextColor,
      tipMaxWidth,
    } = e.target.dataset;
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    if (tipPosition) {
      tooltip.classList.add(`tip-position-${tipPosition}`);
    }
    if (tipBgColor) {
      tooltip.style.setProperty('--bg-color', tipBgColor);
    }
    if (tipTextColor) {
      tooltip.style.setProperty('--text-color', tipTextColor);
    }
    if (tipMaxWidth) {
      tooltip.style.setProperty(
        '--max-width',
        tipMaxWidth === 'parent' ? `${width}px` : tipMaxWidth
      );
    }
    if (tipArrowPosition === 'start') {
      tooltip.style.setProperty('--arrow-position', '15%');
    }
    if (tipArrowPosition === 'end') {
      tooltip.style.setProperty('--arrow-position', '85%');
    }
    tooltip.innerHTML = tip;
    document.body.appendChild(tooltip);
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    let { positionTop, positionLeft } = setPosition({
      width,
      top,
      left,
      height,
      tipPosition,
      arrowWidth,
      arrowHeight,
      tooltip,
      scrollX,
      scrollY,
    });

    const { topPositionWithCorrection, leftPositionWithCorrection } =
      setCorrectedPosition({
        width,
        top,
        left,
        height,
        tipPosition,
        arrowWidth,
        arrowHeight,
        tooltip,
        scrollX,
        scrollY,
        positionLeft,
        positionTop,
      });
    tooltip.style.setProperty('--position-top', topPositionWithCorrection);
    tooltip.style.setProperty('--position-left', leftPositionWithCorrection);
  };

  // function that removes the tooltip from the DOM
  const hideTooltip = (e) => {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach((tooltip) => tooltip.remove());
  };

  // add event handlers for all found tooltips
  tips.forEach((tip) => tip.addEventListener('mouseenter', showTooltip));
  tips.forEach((tip) => tip.addEventListener('mouseleave', hideTooltip));
}

export default easyTooltip;
