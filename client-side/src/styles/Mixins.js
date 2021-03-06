// general mixins
export const flex = (align_dir = `center`, justify_dir = `center`) => {
    return `display: flex;
            ${align_dir ? `align-items: ${align_dir}` : `` };
            ${justify_dir ? `justify-content: ${justify_dir}` : `` };`;
}

export const position = (pos , top, buttom, right, left) => {
    return `position: ${pos};
            ${top ? `top: ${top}` : ``};
            ${buttom ? `buttom: ${buttom}` : ``};
            ${right ? `right: ${right}` : ``};
            ${left ? `left: ${left}` : ``};`;
}

export const coolBlue = () => {
    return `-webkit-box-shadow: 2px 3px 16px 5px #51c2d5; 
            box-shadow: 2px 3px 16px 5px #51c2d5;`;
}

