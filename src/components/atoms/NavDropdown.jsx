import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Dropdown = ({ show = true, items, footerItems = [], cols = 3, small }) => {
    if (!show) return <></>;

    const { length } = items;
    const numPerCol = Math.ceil(length / cols);
    const linkColumns = new Array(cols).fill(null).map((_, colIx) => {
        const col = [];
        const rowLength = colIx === cols - 1 ? length - numPerCol * (cols - 1) : numPerCol;
        for (let i = 0; i < rowLength; i++) {
            col.push(items[i + colIx * numPerCol]);
        }
        return col;
    });
    console.log({ items, linkColumns });

    const className = classNames({
        'vdp-drawer--small': small,
        'vdp-drawer': !small
    });

    return (
        <>
            <div className="vdp-drawer__scroller">
                {linkColumns.map((links, ix) => (
                    <ul className="vdp-link-group--hover" key={ix}>
                        {links.map(({ href, text, dividerAbove = false }) => (
                            <>
                                {dividerAbove && <div className="vdp-link-group__divider" />}
                                <li className="vdp-link-group__item" key={href}>
                                    <a className="vdp-type-link--hover--block" href={href}>
                                        {text}
                                    </a>
                                </li>
                            </>
                        ))}
                    </ul>
                ))}
            </div>
            <div className="vdp-drawer__footer">
                {footerItems.map(({ href, text }) => (
                    <a className="vdp-button--text" href={href} key={href}>
                        {text}
                    </a>
                ))}
            </div>
        </>
    );
};

const item = PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    dividerAbove: PropTypes.bool
});
Dropdown.propTypes = {
    show: PropTypes.bool,
    footerItems: PropTypes.arrayOf(item),
    items: PropTypes.arrayOf(item),
    cols: PropTypes.number,
    small: PropTypes.bool
};

export default memo(Dropdown);
