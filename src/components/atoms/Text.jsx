function Text({ variant = 'p', className, index, children }) {
    const Tag = variant;
    return <Tag key={index} className={className}>{children}</Tag>;
}

export default Text;
