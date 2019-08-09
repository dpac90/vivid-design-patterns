import React from 'react';

const isMobile = false;

const NavSubGroup = ({ children, text, href, active, setActive, activeKey }) => {
    return (
        <li className="vdp-menu__item">
            <a
                className="vdp-tab"
                href={href}
                data-state={active === activeKey ? 'active' : ''}
                onMouseEnter={() => {
                    setActive(activeKey);
                }}>
                {text}
            </a>
            {active === activeKey && (
                <div className="vdp-drawer" data-state="visible" data-position="0">
                    <div className="vdp-drawer__body" data-state="visible" data-position="0">
                        {children}
                    </div>
                </div>
            )}
        </li>
    );
};

export default NavSubGroup;
