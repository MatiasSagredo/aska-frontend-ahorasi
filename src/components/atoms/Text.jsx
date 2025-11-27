function Text({ variant = 'p', className, index, children, ...props }) {
    const Tag = variant;
    return <Tag key={index} className={className} {...props}>{children}</Tag>;
}

export default Text;
