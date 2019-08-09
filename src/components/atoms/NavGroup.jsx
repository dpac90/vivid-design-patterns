import React, { useState } from 'react';
import PropTypes from 'prop-types';

const isMobile = false;

const NavGroup = ({ text, href, children, active, setActive, activeKey }) => {
    return (
        <li className="vdp-menu__item">
            <a
                className="vdp-tab"
                data-state={active === activeKey ? 'active' : ''}
                href={href}
                onMouseEnter={() => {
                    setActive(activeKey);
                }}>
                {text}
            </a>
            {active === activeKey && (
                <div className="vdp-drawer" data-state="visible">
                    <div className="vdp-drawer__body--compressed">{children}</div>
                </div>
            )}
        </li>
    );
};

NavGroup.propTypes = {
    text: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default NavGroup;
