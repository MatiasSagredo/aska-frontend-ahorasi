function Div({ children, variant = "div", ...props }) {
    const Tag = variant;
    return (
        <Tag {...props}>
            {children}
        </Tag>
    )
}

export default Div;
